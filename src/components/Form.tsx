import React, { useState, ChangeEvent, FormEvent } from "react";
import TextInput from "./TextInput";
import NumberInput from "./NumberInput";
import CheckboxInput from "./CheckboxInput";

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

  const renderInput = (
    key: string,
    property: { type: string; title: string }
  ) => {
    const { type, title } = property;
    switch (type) {
      case "string":
        return (
          <TextInput
            key={key}
            name={key}
            title={title}
            value={formData[key] || ""}
            onChange={handleChange}
          />
        );
      case "number":
        return (
          <NumberInput
            key={key}
            name={key}
            title={title}
            value={formData[key] || ""}
            onChange={handleChange}
          />
        );
      case "boolean":
        return (
          <CheckboxInput
            key={key}
            name={key}
            title={title}
            checked={formData[key] || false}
            onChange={handleChange}
          />
        );
      default:
        return null;
    }
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
