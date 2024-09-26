import React from 'react';

interface NumberInputProps {
  name: string;
  title: string;
  value: number | '';
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const NumberInput: React.FC<NumberInputProps> = ({ name, title, value, onChange }) => {
  return (
    <div>
      <label>{title}</label>
      <input type="number" name={name} value={value} onChange={onChange} />
    </div>
  );
};

export default NumberInput;
