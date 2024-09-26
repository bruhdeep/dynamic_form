import React from 'react';

interface TextInputProps {
  name: string;
  title: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput: React.FC<TextInputProps> = ({ name, title, value, onChange }) => {
  return (
    <div>
      <label>{title}</label>
      <input type="text" name={name} value={value} onChange={onChange} />
    </div>
  );
};

export default TextInput;
