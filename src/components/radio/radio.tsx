/** @jsx jsx */
import React from "react";
import { IRadioValue } from "./radio-group";
import { jsx, getCss } from "../theme";
import { useSpring, animated } from "react-spring";
import { transparentizeTheme } from "../utils/colors";
import { easeCubicOut } from "d3-ease";

export interface IRadioProps {
  onChange?(value: IRadioValue): void;
  label: string;
  value: IRadioValue;
  checked?: boolean;
  name?: string;
  inline?: boolean;
  disabled?: boolean;
}

const RadioIcon = (props: { checked?: boolean; size?: string | number }) => {
  const { checked, size = 20 } = props;
  const anime = useSpring({
    opacity: checked ? 1 : 0,
    transform: `scale(${checked ? 0.8 : 0})`,
    config: {
      duration: 500,
      easing: easeCubicOut,
    },
  });
  const s = React.useMemo(() => {
    if (typeof size === "number") {
      return `${size}px`;
    } else {
      return size;
    }
  }, [size]);

  return (
    <div
      css={getCss({
        width: s,
        height: s,
        borderRadius: "50%",
        boxSizing: "border-box",
        border: "2px solid",
        borderColor: checked ? "primary" : "secondary",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transition: "border-color 0.3s",
        marginRight: 3,
      })}
      id="bs-radio-icon"
    >
      <animated.div
        style={anime}
        css={getCss({
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          backgroundColor: "primary",
        })}
      ></animated.div>
    </div>
  );
};

export const Radio = React.forwardRef<HTMLLabelElement, IRadioProps>(
  (props, ref) => {
    const { label, value, checked, onChange, name, inline, disabled } = props;
    return (
      <label
        ref={ref}
        css={getCss({
          position: "relative",
          backgroundColor: "background",
          transition: "all 0.3s",
          color: "text",
          display: inline ? "inline-flex" : "flex",
          flexDirection: "row",
          alignItems: "center",
          paddingTop: 2,
          paddingBottom: 2,
          paddingLeft: 3,
          paddingRight: 3,
          cursor: disabled ? "not-allowed" : "pointer",
          ...(disabled
            ? {}
            : {
                "&:active": {
                  "& > #bs-radio-icon": {
                    boxShadow: "0 0 4px #999 inset",
                  },
                },
                "&:hover": {
                  color: transparentizeTheme("text", 0.3),
                },
              }),
          opacity: disabled ? 0.7 : 1,
        })}
      >
        <RadioIcon checked={disabled ? false : checked} />
        {label}
        <input
          type="radio"
          name={name}
          onChange={e => {
            if (!checked && e.target.checked && !disabled) {
              onChange && onChange(value);
            }
          }}
          css={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: -1,
            opacity: 0,
          }}
        />
      </label>
    );
  }
);

Radio.defaultProps = {
  inline: false,
  disabled: false,
};
