import React from 'react'
import { useState } from 'react'


export const TagBox = ({ id, onAddButton, tag }) => {
    const inputRef = React.createRef()
    const addButtonRef = React.createRef()
    const deleteButtonRef = React.createRef()

    const [inputText, setInputText] = useState(tag.text)

    return (
        <div className='tag'>
            <input ref={inputRef} type="text" value={inputText} onChange={(e) => setInputText(e.value)} />

            <button className='delete-tag'
                ref={deleteButtonRef}
                onClick={() => {

                }}>Delete</button>

            <button ref={addButtonRef}
                className='add-tag'
                onClick={() => {
                    onAddButton(inputRef.current.value, id)
                }}>Add tag</button>

        </div>
    )
}
