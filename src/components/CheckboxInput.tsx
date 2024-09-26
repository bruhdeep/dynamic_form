import React from 'react';

interface CheckboxInputProps {
  name: string;
  title: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CheckboxInput: React.FC<CheckboxInputProps> = ({ name, title, checked, onChange }) => {
  return (
    <div>
      <label>{title}</label>
      <input type="checkbox" name={name} checked={checked} onChange={onChange} />
    </div>
  );
};

export default CheckboxInput;
