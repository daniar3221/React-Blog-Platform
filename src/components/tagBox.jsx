import React from 'react';

export const TagBox = ({tagValue, onChangeTagValue, index, onDeleteTag}) => {
  const inputRef = React.createRef();


  return (
    <div className='tag'>
      <input
        placeholder='Tag'
        ref={inputRef}
        value={tagValue}
        onChange={(event) => onChangeTagValue(event, index)}
        required

      />

      <button className='delete-tag'
        onClick={() => {
          onDeleteTag(index);
        }}>Delete</button>

      {/* <button
                className='add-tag'
                onClick={(event) => {
                    onAddButton(event)

                }}>Add tag</button> */}

    </div >
  );
};
