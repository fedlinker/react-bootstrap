import React from "react";
import { Formik, Form as FormikForm, FormikValues, FormikConfig } from "formik";

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
  const { ...formikProps } = props;
  return <Formik<Values, ExtraProps> {...formikProps}></Formik>;
};
