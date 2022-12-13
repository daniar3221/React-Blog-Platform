/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable react/no-children-prop */
import React, {Suspense} from 'react';
import {Await, defer, useLoaderData, Link, useNavigate} from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import {getYear, parseISO, format} from 'date-fns';
import {enGB} from 'date-fns/locale';
import {v4 as uuidv4} from 'uuid';
import LoadingNote from '../../components/loadingNote/LoadingNote';
import './singlePostPage.css';
import {ExclamationCircleFilled} from '@ant-design/icons';
import {Modal} from 'antd';
import {deleteArticle} from '../../services';
import {likeArticle, unLikeArticle} from '../../services';
import {useState} from 'react';
import {useEffect} from 'react';


const {confirm} = Modal;


export const SinglePostPage = ({isUserLoggedIn, userProfile}) => {
  const {post} = useLoaderData();
  const navigate = useNavigate();

  const [isPostFavorited, setPostFavorited] = useState();
  const [favoritesCount, setFavoritesCount] = useState();

  const showPromiseConfirm = (post) => {
    console.log(userProfile);
    console.log(post);
    confirm({
      title: 'Are you sure to delete this article??',
      icon: <ExclamationCircleFilled />,
      content: 'Really?',
      onOk() {
        return new Promise((resolve, reject) => {
          deleteArticle(userProfile.token, post.slug)
              .then((res) => {
                            res.ok ? resolve() : reject();
                            return navigate('/posts');
              });
        }).catch((e) => console.log(e));
      },
      onCancel() { },
    });
  };

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

  const likeArticleHandler = (post) => {
    if (isPostFavorited) {
      unLikeArticle(userProfile.token, post.slug)
          .then((res) => {
            setPostFavorited(false);
            setFavoritesCount(res.article.favoritesCount);
            console.log(res.article);
          });
    } else {
      likeArticle(userProfile.token, post.slug)
          .then((res) => {
            setPostFavorited(true);
            setFavoritesCount(res.article.favoritesCount);
            console.log(res.article);
          });
    }
  };


  useEffect(() => {
    post.then((post) => {
      setPostFavorited(post.article.favorited);
      setFavoritesCount(post.article.favoritesCount);
    });
  }, [post]);


  return (
    <div className='single-blog-page'>

      <Suspense fallback={<LoadingNote />}>
        <Await resolve={post}>
          {
            (resolvedPost) => (
              <div className='post'>
                <div className='post-header'>
                  <div className='post-header__info'>
                    <div className='post-header__wrapper'>
                      <h1>{resolvedPost.article.title}</h1>
                      <div className='post-header__likes'>
                        <button style={{color: isPostFavorited ? 'red' : 'gray'}}
                          onClick={() => likeArticleHandler(resolvedPost.article)}>
                          <i className="fa-regular fa-heart"></i>
                        </button>
                        <span style={{color: isPostFavorited ? 'red' : 'gray'}}>{favoritesCount}</span>
                      </div>
                    </div>


                    <div className='post-tag-list'>
                      {getPostTags(resolvedPost.article)}
                    </div>
                  </div>
                  <div className='post-header_user_info'>
                    <div className='post-header_user'>
                      <div>
                        <h4>{resolvedPost.article.author.username}</h4>
                        <p>{getDatePost(resolvedPost.article)}</p>
                      </div>
                      <div>
                        <img src={resolvedPost.article.author.image} alt='user img'
                          onError={(e) => e.target.setAttribute('src', 'https://static.productionready.io/images/smiley-cyrus.jpg')} />
                      </div>
                    </div>
                    {
                                            isUserLoggedIn &&
                                                resolvedPost.article.author.username === userProfile.username ?
                                                <div>
                                                  <button className='delete-btn'
                                                    onClick={() => showPromiseConfirm(resolvedPost.article)}>
                                                        Delete
                                                  </button>

                                                  <Link to={`edit-article`}>
                                                    <button className='edit-btn'>Edit</button>
                                                  </Link>


                                                </div> :
                                                null
                    }

                  </div>
                </div>
                <div className='post-description'>
                  <ReactMarkdown children={resolvedPost.article.description} />
                </div>
                <div className='post-text'>
                  <ReactMarkdown children={resolvedPost.article.body} />

                </div>
              </div>
            )
          }
        </Await>
      </Suspense>
    </div>
  );
};

async function getSinglePost(params) {
  const res = await fetch(`https://blog.kata.academy/api/articles/${params.slug.slice(1)}`);
  return res.json();
}

export const singlePostLoader = async ({request, params}) => {
  return defer({
    post: getSinglePost(params),
  });
};

