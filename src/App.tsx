import React from "react";
import ReactDOM from "react-dom";
import Form from "../components/Form";
import schema from "./schema.json";
import "./styles.css";

const App: React.FC = () => {
  return (
    <div>
      <Form schema={schema} />
    </div>
  );
};

export default App;

ReactDOM.render(<App />, document.getElementById("root"));
