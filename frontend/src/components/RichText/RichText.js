import React from 'react';
import './RichText.css';

import { Controller } from "react-hook-form";

import { Editor } from "draft-js";

const RichText = ({control}) => {
  return(
    <Controller
      name="DraftJS"
      control={control}
      render={({ field: { value, onChange } }) => {
        return <Editor editorState={value} onChange={onChange} />;
      }}
    />
  );
};

export default RichText;
