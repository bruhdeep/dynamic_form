import React, { useState, ChangeEvent, FormEvent } from "react";
import TextInput from "./TextInput";
import NumberInput from "./NumberInput";
import CheckboxInput from "./CheckboxInput";
// Import other input components as needed

interface Schema {
  title: string;
  type: string;
  properties: {
    [key: string]: {
      type: string;
      title: string;
    };
  };
  required?: string[];
}

interface FormProps {
  schema: Schema;
}

const Form: React.FC<FormProps> = ({ schema }) => {
  const [formData, setFormData] = useState<{ [key: string]: any }>({});

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, type, value } = event.target;

    if (type === "checkbox") {
      const target = event.target as HTMLInputElement;
      setFormData({
        ...formData,
        [name]: target.checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log("Form Data Submitted:", formData);
  };

  const inputComponents: { [key: string]: React.FC<any> } = {
    string: TextInput,
    number: NumberInput,
    boolean: CheckboxInput,
  };

  const renderInput = (
    key: string,
    property: { type: string; title: string }
  ) => {
    const { type, title } = property;
    const InputComponent = inputComponents[type];

    if (!InputComponent) return null;

    const commonProps = {
      key,
      name: key,
      title,
      value: formData[key] || "",
      onChange: handleChange,
    };

    if (type === "boolean") {
      return (
        <InputComponent {...commonProps} checked={formData[key] || false} />
      );
    }

    return <InputComponent {...commonProps} />;
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{schema.title}</h2>
      {Object.keys(schema.properties).map((key) =>
        renderInput(key, schema.properties[key])
      )}
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
