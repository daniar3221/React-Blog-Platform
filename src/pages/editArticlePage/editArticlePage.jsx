/* eslint-disable new-cap */
/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import {TagBox} from '../../components/tagBox';
import {WithArticle} from '../../components/HOC/withArticle';

function EditArticlePage({
  addTag,
  onDeleteTag,
  onChangeTagValue,
  onSubmitEdit,
  onTextChange,
  onDescChange,
  onTitleChange,
  blurHandler,
  title,
  desc,
  text,
  tagList,
  titleDirty,
  descDirty,
  textDirty,
  titleError,
  descError,
  textError,
  tagError,
  isUserLoggedIn,
}) {
  return (
    <div className="create-article-page">
      <form className="create-article-form" onSubmit={onSubmitEdit}>
        <h2>Edit new article</h2>

        <div className="title-block">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            value={title}
            onChange={onTitleChange}
            onBlur={blurHandler}
            name="title"
            placeholder="Title"
            type="text"
          />
          {(titleDirty && titleError) && <div style={{color: 'red'}}>{titleError}</div>}
        </div>

        <div className="desc-block">
          <label htmlFor="desc">Short description</label>
          <input
            id="desc"
            value={desc}
            onBlur={blurHandler}
            onChange={onDescChange}
            name="desc"
            placeholder="Description"
            type="text"
          />
          {(descDirty && descError) && <div style={{color: 'red'}}>{descError}</div>}
        </div>

        <div className="text-block">
          <label htmlFor="text">Text</label>
          <textarea
            id="text"
            value={text}
            onBlur={blurHandler}
            onChange={onTextChange}
            name="text"
            placeholder="Text"
          />
          {(textDirty && textError) && <div style={{color: 'red'}}>{textError}</div>}
        </div>

        <div className="create-tags-block">
          <h4>Tags</h4>

          <div className="tags-container">
            {tagList.map((tagValue, index) => (
              <TagBox
                key={index}
                onAddButton={addTag}
                tagValue={tagValue}
                onChangeTagValue={onChangeTagValue}
                index={index}
                onDeleteTag={onDeleteTag}
              />
            ))}
            {tagError ? <p style={{color: 'red'}}>Tags shouldn't be empty</p> : null}
            <button
              className="add-tag"
              onClick={(event) => {
                event.preventDefault();
                addTag(event);
              }}
            >
                            Add tag

            </button>
          </div>

        </div>
        <button className="send-article" onClick={onSubmitEdit}>Send</button>
      </form>
    </div>
  );
}

export default WithArticle(EditArticlePage);
