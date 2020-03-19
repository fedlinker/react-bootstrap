import React from "react";
import { Form } from "../form";

export default {
  title: "Form",
};

export const formUsage = () => {
  return (
    <div>
      <Form
        initialValues={{ name: "" }}
        onSubmit={val => {
          console.log(val);
        }}
      >
        {props => {
          console.log(props);
          return null;
        }}
      </Form>
    </div>
  );
};
