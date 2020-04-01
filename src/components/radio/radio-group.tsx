/** @jsx jsx */
import React from "react";
import map from "lodash/map";
import { jsx } from "../theme";
import { Radio, IRadioProps } from "./radio";
import { ArrayOrObject } from "../utils/type-utils";

export type IRadioValue = string | number;
export interface IOptionFieldType {
  label: string;
  value: IRadioValue;
}
export type IRadioElementType = React.FunctionComponentElement<IRadioProps>;

export interface IRadioGroupProps {
  value?: IRadioValue;
  options?: IOptionFieldType[];
  inline?: boolean;
  onChange?(value: IRadioValue): void;
  children?: ArrayOrObject<IRadioElementType>;
  name?: string;
  disabled?: boolean;
  defaultValue?: IRadioValue;
}

let count = 0;
function getName() {
  return `bs-radio-${count++}`;
}

export const RadioGroup = React.forwardRef<HTMLDivElement, IRadioGroupProps>(
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
    const [innerValue, setInnerValue] = React.useState<IRadioValue | undefined>(
      value || defaultValue
    );

    const innerName = React.useMemo(() => {
      return name || getName();
    }, [name]);

    const realValue = React.useMemo(() => {
      return value == null ? innerValue : value;
    }, [value, innerValue]);

    const handleValueChange = (val: IRadioValue) => {
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
          <Radio
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
          ? React.Children.map(children, (ch: IRadioElementType) => {
              const { onChange, disabled, value } = ch.props;
              return React.cloneElement(ch, {
                inline,
                onChange: (val: IRadioValue) => {
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
