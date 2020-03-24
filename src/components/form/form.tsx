/** @jsx jsx */
import React from "react";
import { Formik, Form as FormikForm, FormikValues, FormikConfig } from "formik";
import { jsx } from "../theme";

export type IFormProps<
  Values extends FormikValues = FormikValues,
  ExtraProps = {}
> = FormikConfig<Values> & ExtraProps;

export const Form = <
  Values extends FormikValues = FormikValues,
  ExtraProps = {}
>(
  props: IFormProps<Values, ExtraProps>
) => {
  const { children } = props;
  return (
    <Formik<Values, ExtraProps> {...props}>
      {props => {
        return (
          <FormikForm>
            {typeof children === "function" ? children(props) : children}
          </FormikForm>
        );
      }}
    </Formik>
  );
};
