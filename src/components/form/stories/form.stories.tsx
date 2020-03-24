import React from "react";
import { string, object } from "yup";
import { Form } from "../form";
import { Field } from "../field";
import { Input } from "../../input";
import { Container, Row, Col } from "../../layout";

export default {
  title: "Form",
};

export const formUsage = () => {
  const schema = object().shape({
    name: string()
      .min(2, "too short")
      .max(10, "too long")
      .required("required"),
  });

  return (
    <div>
      <Form
        initialValues={{ name: "" }}
        validationSchema={schema}
        onSubmit={val => {
          console.log(val);
        }}
      >
        <Field<string>
          name="name"
          label="Name:"
          helperText="please input your first name"
        >
          {({ field, meta }) => {
            return <Input {...field} error={meta.error} />;
          }}
        </Field>
        <button type="submit">submit</button>
      </Form>
    </div>
  );
};

export const CustomizeLayout = () => {
  const schema = object().shape({
    firstName: string()
      .min(2, "too short")
      .max(10, "too long")
      .required("required"),
    lastName: string().required("required"),
  });
  return (
    <Form
      initialValues={{ firstName: "", lastName: "", description: "" }}
      validationSchema={schema}
      onSubmit={val => {
        console.log(val);
      }}
    >
      <Container>
        <Row>
          <Col style={{ marginRight: "8px" }}>
            <Field<string>
              name="firstName"
              label="First name:"
              helperText="please input your first name"
            >
              {({ field, error }) => {
                return <Input {...field} error={error} />;
              }}
            </Field>
          </Col>
          <Col>
            <Field<string>
              name="lastName"
              label="Last name:"
              helperText="please input your last name"
            >
              {({ field, error }) => {
                return <Input {...field} error={error} />;
              }}
            </Field>
          </Col>
        </Row>
        <Row>
          <Field<string> name="description" label="Description:">
            {({ field, error }) => {
              return <Input {...field} error={error} />;
            }}
          </Field>
        </Row>
      </Container>
      <button type="submit">submit</button>
    </Form>
  );
};
