/** @jsx jsx */
import React from "react";
import map from "lodash/map";
import { jsx } from "../theme";
import { Radio, IRadioProps } from "./radio";
import { ArrayOrObject } from "../utils/type-utils";

export type IRadioValue = string | number;
export interface IOptionFieldType<V = IRadioValue> {
  label: string;
  value: V;
}
export type IRadioElementType<
  V extends IRadioValue = IRadioValue
> = React.FunctionComponentElement<IRadioProps<V>>;

export interface IRadioGroupProps<V extends IRadioValue = IRadioValue> {
  children?: ArrayOrObject<IRadioElementType<V>>;
  defaultValue?: V;
  disabled?: boolean;
  options?: IOptionFieldType<V>[];
  inline?: boolean;
  name?: string;
  forwardRef?: React.Ref<any>;
  value?: V;
  onChange?(value: V): void;
}

let count = 0;
function getName() {
  return `bs-radio-${count++}`;
}

export const RadioGroup = <V extends IRadioValue = IRadioValue>(
  props: IRadioGroupProps<V>
) => {
  const { forwardRef, ...rest } = props;
  const InnerRadioGroup = React.forwardRef<HTMLDivElement, IRadioGroupProps<V>>(
    (props, ref) => {
      const {
        value,
        options,
        inline,
        onChange,
        children,
        name,
        defaultValue,
      } = props;
      const [innerValue, setInnerValue] = React.useState<
        IRadioValue | undefined
      >(value || defaultValue);

      const innerName = React.useMemo(() => {
        return name || getName();
      }, [name]);

      const realValue = React.useMemo(() => {
        return value == null ? innerValue : value;
      }, [value, innerValue]);

      const handleValueChange = (val: V) => {
        onChange && onChange(val);
        setInnerValue(val);
      };

      // sync innerValue
      React.useEffect(() => {
        if (value != null) {
          setInnerValue(value);
        }
      }, [value]);

      const renderOptionsRadio = () => {
        return map(options, opt => {
          return (
            <Radio<V>
              value={opt.value}
              label={opt.label}
              inline={inline}
              onChange={handleValueChange}
              checked={realValue === opt.value}
              name={innerName}
              key={opt.value}
            />
          );
        });
      };

      return (
        <div ref={ref}>
          {options == null && children
            ? React.Children.map(children, (ch: IRadioElementType<V>) => {
                const { onChange, disabled, value, ...rest } = ch.props;
                return React.cloneElement<IRadioProps<V>>(ch, {
                  ...rest,
                  inline,
                  onChange: (val: V) => {
                    handleValueChange(val);
                    onChange && onChange(val);
                  },
                  name: innerName,
                  disabled: disabled || props.disabled,
                  checked: realValue === value,
                });
              })
            : renderOptionsRadio()}
        </div>
      );
    }
  );
  return <InnerRadioGroup ref={forwardRef} {...rest} />;
};
