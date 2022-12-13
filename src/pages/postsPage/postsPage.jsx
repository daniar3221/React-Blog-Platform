/* eslint-disable react/no-children-prop */
import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {getYear, parseISO, format} from 'date-fns';
import {enGB} from 'date-fns/locale';
import {v4 as uuidv4} from 'uuid';
import ReactMarkdown from 'react-markdown';
import {Pagination} from 'antd';
import LoadingNote from '../../components/loadingNote/LoadingNote';
import ErrorNote from '../../components/errorNote/errorNote';
import {likeArticle, unLikeArticle} from '../../services';

import './postsPage.css';

export const PostsPage = ({userProfile}) => {
  const [onLoading, setOnLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(null);
  const [onError, setOnError] = useState(false);
  const disallowed = ['a'];

  useEffect(() => {
    setOnError(false);
    setOnLoading(true);
    fetch(`https://blog.kata.academy/api/articles/?limit=5&offset=${page}`)
        .then((response) => response.json())
        .then((posts) => {
          setPosts(posts.articles);
          setTotalPages(posts.articlesCount);
          setOnLoading(false);
        })
        .catch(() => setOnError(true));
  }, [page]);

  const getDatePost = (post) => {
    const date = parseISO(post.createdAt);
    let month = format(date, 'LLLL', {locale: enGB});
    month = month.charAt(0).toUpperCase() + month.slice(1);
    const day = format(date, 'd', {locale: enGB});
    const year = getYear(date);
    return `${month} ${day}, ${year}`;
  };

  const getPostTags = (post) => {
    return post.tagList.map((tagList) => {
      if (!tagList) return null;
      else {
        return <div key={uuidv4()} className='post-tag'>
          {tagList}
        </div>;
      }
    });
  };

  const paginationHandler = (num) => {
    if (num === 1) {
      setPage(0);
    } else {
      setPage(num * 5);
    }
  };

  const likeArticleHandler = (post) => {
    console.log(post);
    if (post.favorited) {
      unLikeArticle(userProfile.token, post.slug)
          .then((res) => setPosts((prevState) => {
            const actPost = res.article;
            const index = posts.findIndex((item) => item.slug === actPost.slug);
            return [
              ...prevState.slice(0, index),
              actPost,
              ...prevState.slice(index + 1),
            ];
          }));
    } else {
      likeArticle(userProfile.token, post.slug)
          .then((res) => setPosts((prevState) => {
            const actPost = res.article;
            const index = posts.findIndex((item) => item.slug === actPost.slug);
            return [
              ...prevState.slice(0, index),
              actPost,
              ...prevState.slice(index + 1),
            ];
          }));
    }
  };


  return (
    <div className='blog-page'>
      {onLoading ?

                onError ?

                    <ErrorNote /> :

                    <LoadingNote /> :

                posts.map((post) => (
                  <div key={uuidv4()} className='post'>

                    <div className='post-header'>
                      <div className='post-header__info'>
                        <div className='post-header__wrapper'>
                          <Link to={`/posts/:${post.slug}`}>
                            <h1>{post.title}</h1>
                          </Link>
                          <div className='post-header__likes' >
                            <button onClick={() => likeArticleHandler(post)}><i style={{color: post.favorited ? 'red' : 'gray'}} className="fa-regular fa-heart"></i></button>
                            <span style={{color: post.favorited ? 'red' : 'gray'}}>{post.favoritesCount}</span>
                          </div>
                        </div>
                        <div className='post-tag-list'>
                          {getPostTags(post)}
                        </div>
                      </div>
                      <div className='post-header__user'>
                        <div>
                          <h4>{post.author.username}</h4>
                          <p>{getDatePost(post)}</p>
                        </div>
                        <div>
                          <img src={post.author.image}
                            alt='user img' onError={(e) => e.target.setAttribute('src', 'https://static.productionready.io/images/smiley-cyrus.jpg')} />
                        </div>
                      </div>
                    </div>
                    <div className='post-text'>
                      <ReactMarkdown disallowedElements={disallowed} children={post.body} />

                    </div>


                  </div>
                ))
      }
      <Pagination className='pagination' onChange={(num) => paginationHandler(num)}
        showSizeChanger={false}
        defaultCurrent={1}
        total={totalPages - 5}
        pageSize={5}
      />

    </div>
  );
};
