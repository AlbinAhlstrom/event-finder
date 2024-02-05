import React from "react";

type TextAreaProps = {
  title: string;
  name: string;
  value: string;
  onChange: (formEvent: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

const TextArea: React.FC<TextAreaProps> = ({ title, name, value, onChange }) => {
  return (
    <div>
      <label>
        <div className="label">
          <span className="label-text">{title}</span>
        </div>
        <textarea
          name={name}
          className="input input-bordered input-ghost"
          value={value}
          onChange={onChange}
        />
      </label>
    </div>
  );
};

export default TextArea;
