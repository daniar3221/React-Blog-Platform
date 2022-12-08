import React, { Suspense } from 'react';
import { Await, defer, useLoaderData } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { getDay, getYear, parseISO, format } from 'date-fns'
import { enGB } from 'date-fns/locale';
import { v4 as uuidv4 } from 'uuid';
import LoadingNote from '../../components/loadingNote/LoadingNote';

import './singlePostPage.css'

export const SinglePostPage = () => {
    const { post } = useLoaderData()

    const getDatePost = (post) => {
        const date = parseISO(post.createdAt)
        let month = format(date, 'LLLL', { locale: enGB })
        month = month.charAt(0).toUpperCase() + month.slice(1);
        const day = getDay(date)
        const year = getYear(date)
        return `${month} ${day}, ${year}`
    }

    const getPostTags = (post) => {
        return post.tagList.map((tagList) => {
            if (!tagList) return null
            else {
                return <div key={uuidv4()} className='post-tag'>
                    {tagList}
                </div>
            }
        })
    }



    return (
        <div className='single-blog-page'>

            <Suspense fallback={<LoadingNote />}>
                <Await resolve={post}>
                    {
                        (resolvedPost) => (
                            <div className='post'>
                                <div className='post-header'>
                                    <div className='post-header__info'>
                                        <h1>{resolvedPost.article.title}</h1>
                                        <button><i className="fa-regular fa-heart"></i></button>
                                        <span>{resolvedPost.article.favoritesCount}</span>
                                        <div className='post-tag-list'>
                                            {getPostTags(resolvedPost.article)}
                                        </div>
                                    </div>
                                    <div className='post-header__user'>
                                        <div>
                                            <h4>{resolvedPost.article.author.username}</h4>
                                            <p>{getDatePost(resolvedPost.article)}</p>
                                        </div>
                                        <div>
                                            <img src={resolvedPost.article.author.image} alt='user img' />
                                        </div>
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
    )
}

async function getSinglePost(params) {
    const res = await fetch(`https://blog.kata.academy/api/articles/${params.slug.slice(1)}`)
    return res.json()
}

export const singlePostLoader = async ({ request, params }) => {
    // console.log(request, params);
    return defer({
        post: getSinglePost(params)
    })
}