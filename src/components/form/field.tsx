/** @jsx jsx */
import React from "react";
import {
  Field as FormikField,
  FieldConfig,
  FieldProps,
  useField,
} from "formik";
import { jsx, getCss } from "../theme";

export type IFieldChildrenProps<
  Val = any,
  FormVals extends object = {}
> = FieldProps<Val, FormVals> & { error?: string };

export interface IFieldProps<Val = any, FormVals extends object = {}>
  extends Omit<FieldConfig<Val>, "render" | "as" | "component"> {
  children?:
    | ((props: IFieldChildrenProps<Val, FormVals>) => React.ReactNode)
    | React.ReactNode;
  label?: React.ReactNode;
  helperText?: React.ReactNode;
}

export function Field<Val = any, FormVals extends object = {}>(
  props: IFieldProps<Val, FormVals> & { error?: string }
) {
  const { children, label, helperText, ...rest } = props;
  const [, meta] = useField<Val>(rest.name);

  const labelID = React.useMemo(() => {
    return `bootstrap-${rest.name}-${parseInt(
      (Math.random() * 1000).toFixed(0),
      10
    )}`;
  }, []);

  const error = React.useMemo(() => {
    return meta.touched ? meta.error : undefined;
  }, [meta]);

  return (
    <FormikField {...rest}>
      {(p: FieldProps<Val, FormVals>) => {
        return (
          <div css={{ width: "100%" }}>
            {label ? (
              <label
                htmlFor={labelID}
                css={getCss({
                  display: "inline-block",
                  color: error ? "danger" : "text",
                  fontSize: 2,
                  marginBottom: 3,
                })}
              >
                {label}
              </label>
            ) : null}
            {typeof children === "function"
              ? React.cloneElement(
                  children({
                    ...p,
                    error,
                  }),
                  { id: labelID }
                )
              : children}
            <div css={getCss({ marginBottom: 5 })}>
              {error ? (
                <span
                  css={getCss({
                    color: "danger",
                    fontSize: 0,
                    fontFamily: "body",
                  })}
                >
                  {meta.error}
                </span>
              ) : (
                <span
                  css={getCss({
                    fontSize: 0,
                    fontFamily: "body",
                    color: "placeholder",
                  })}
                >
                  {helperText}
                </span>
              )}
            </div>
          </div>
        );
      }}
    </FormikField>
  );
}
