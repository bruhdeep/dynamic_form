import React, { useState, ChangeEvent, FormEvent } from "react";

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
    const { name, value, type } = event.target;
    if (type === "checkbox") {
      const { checked } = event.target as HTMLInputElement;
      setFormData({
        ...formData,
        [name]: checked,
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
          <div key={key}>
            <label>{title}</label>
            <input
              type="text"
              name={key}
              value={formData[key] || ""}
              onChange={handleChange}
            />
          </div>
        );
      case "number":
        return (
          <div key={key}>
            <label>{title}</label>
            <input
              type="number"
              name={key}
              value={formData[key] || ""}
              onChange={handleChange}
            />
          </div>
        );
      case "boolean":
        return (
          <div key={key}>
            <label>{title}</label>
            <input
              type="checkbox"
              name={key}
              checked={formData[key] || false}
              onChange={handleChange}
            />
          </div>
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
