import React, { useEffect, useState } from 'react';
import './createArticlePage.css'
import uniqid from 'uniqid';
import { TagBox } from '../../components/tagBox';

export const CreateArticlePage = () => {

    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [text, setText] = useState('')
    const [tagList, setTagList] = useState([])
    // const [tagBoxes, setTagBoxes] = useState([])

    const [titleDirty, setTitleDirty] = useState(false)
    const [descDirty, setDescDirty] = useState(false)
    const [textDirty, setTextDirty] = useState(false)

    const [titleError, setTitleError] = useState("Title shouldn't be empty")
    const [descError, setDescError] = useState("Description shouldn't be empty")
    const [textError, setTextError] = useState("Text shouldn't be empty")



    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'title':
                setTitleDirty(true)
                break
            case 'desc':
                setDescDirty(true)
                break
            case 'text':
                setTextDirty(true)
                break
            default:
                return
        }
    }

    const onTitleChange = (e) => {
        setTitle(e.target.value)
        if (!e.target.value) {
            setTitleError("Title shouldn't be empty")
        } else {
            setTitleError('')
        }
    }

    const onDescChange = (e) => {
        setDesc(e.target.value)
        if (!e.target.value) {
            setDescError("Description shouldn't be empty")
        } else {
            setDescError('')
        }
    }

    const onTextChange = (e) => {
        setText(e.target.value)
        if (!e.target.value) {
            setTextError("Text shouldn't be empty")
        } else {
            setTextError('')
        }
    }

    const onSubmit = (e) => {
        e.preventDefault()
    }



    console.log(tagList);


    return (
        <div className='create-article-page'>
            <form className='create-article-form' onSubmit={onSubmit}>
                <h2>Create new article</h2>

                <div className='title-block'>
                    <label htmlFor="title">Title</label>
                    <input id='title'
                        value={title}
                        onChange={onTitleChange}
                        onBlur={blurHandler}
                        name='title'
                        placeholder='Title'
                        type="text" />
                    {(titleDirty && titleError) && <div style={{ color: 'red' }}>{titleError}</div>}
                </div>

                <div className='desc-block'>
                    <label htmlFor="desc">Short description</label>
                    <input id='desc'
                        value={desc}
                        onBlur={blurHandler}
                        onChange={onDescChange}
                        name='desc'
                        placeholder='Description'
                        type="text" />
                    {(descDirty && descError) && <div style={{ color: 'red' }}>{descError}</div>}
                </div>

                <div className='text-block'>
                    <label htmlFor="text">Text</label>
                    <textarea id='text'
                        value={text}
                        onBlur={blurHandler}
                        onChange={onTextChange}
                        name='text'
                        placeholder='Text' />
                    {(textDirty && textError) && <div style={{ color: 'red' }}>{textError}</div>}
                </div>

                <div className='create-tags-block'>
                    <h4>Tags</h4>

                    <div className='tags-container'>
                        {tagList.map((tag) => (
                            <TagBox key={uniqid()}
                                tag={tag}
                                id={uniqid()}
                                onAddButton={(text, id) => setTagList((prev) => {
                                    return [...prev, { id, text }]
                                }
                                )}
                            />
                        ))}
                    </div>


                </div>
                <button className='send-article'>Send</button>
            </form>
        </div>
    )
}


