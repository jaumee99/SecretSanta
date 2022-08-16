import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

import { useForm, useField, splitFormProps } from "react-form";

const InputField = React.forwardRef((props, ref) => {
  const [field, fieldOptions, rest] = splitFormProps(props);

  const { getInputProps } = useField(field, fieldOptions);

  return (
    <>
      <input {...getInputProps({ ref, ...rest })} />
    </>
  );
});

function App() {
  const defaultValues = React.useMemo(
    () => ({
      friends: [""],
      excluded: [""]
    }),
    []
  );
  const { Form, values, pushFieldValue, removeFieldValue } = useForm({
    defaultValues
  });

  return (
    <Form>
      <div>
        Friends
        <div
          style={{
            border: "1px solid black",
            padding: "1rem"
          }}
        >
          {values.friends.map((friend, i) => (
            <div key={i}>
              <label>
                Friend: <InputField field={`friends.${i}`} />{" "}
              </label>
              <label>
                Excluded: <InputField field={`excluded.${i}`} />{" "}
              </label>
              <button
                  type="button"
                  onClick={() => removeFieldValue("friends", i)}
                >
                  X
                </button>
            </div>
          ))}
          <button type="button" onClick={() => pushFieldValue("friends", "")}>
            Add Friend
          </button>
          <button type="button" onClick={() => pushFieldValue("friends", "")}>
            Excluded Friend
          </button>
        </div>
      </div>
    </Form>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
