/** @jsx jsx */
import React, {
  FunctionComponent,
  ReactNode,
  useState,
  Fragment,
  useImperativeHandle,
  forwardRef,
  ReactElement,
  useEffect,
} from "react";
import { jsx } from "../theme";
import { getCss, BASE_COLORS } from "../theme";
import { animated, useTransition } from "react-spring";

const baseStyles = getCss({
  maxWidth: "350px",
  overflow: "hidden", // cheap rounded corners on nested items
  fontSize: "14px",
  backgroundColor: "rgba(255, 255, 255, 0.85)",
  backgroundClip: "padding-box",
  border: "1px solid rgba(0,0,0,.1)",
  boxShadow: "0 4px 12px rgba(0,0,0,.1)",
  backdropFilter: "blur(10px)",
  borderRadius: "4px",
  "&:not(:last-child)": {
    marginBottom: "12px",
  },
});

const headerStyles = getCss({
  display: "flex",
  alignItems: "center",
  padding: "4px 12px",
  color: BASE_COLORS.gray600,
  backgroundColor: "rgba(255,255,255,0.85)",
  backgroundClip: "padding-box",
  borderBottom: "1px solid rgba(0,0,0,0.05)",
  "& > strong": {
    marginRight: "auto!important",
    marginLeft: "8px",
  },
});

const bodyStyles = getCss({
  padding: "12px",
});

const closeStyles = getCss({
  float: "right",
  fontSize: "1.5rem",
  fontWeight: "700",
  lineHeight: 1,
  color: "#000000",
  textShadow: "0 1px 0 #ffffff",
  opacity: ".5",
  cursor: "pointer",
  padding: 0,
  backgroundColor: "transparent",
  border: 0,
  appearance: "none",
});

export interface IToastProps {
  title?: string | ReactNode;
  isAutoDisappear?: boolean;
  disappearTime?: number;
  haveTimeTip?: boolean;
  icon?: ReactNode;
  body?: ReactNode;
  children?: ReactNode;
}

export const Toast = React.forwardRef<ReactElement, IToastProps>(
  (props, ref) => {
    const {
      title,
      children,
      haveTimeTip,
      icon,
      body,
      disappearTime,
      isAutoDisappear,
    } = props;
    const [hide, setHide] = useState(false);
    const transitions = useTransition(hide, null, {
      from: { opacity: 0 },
      enter: { opacity: 1 },
      leave: { opacity: 0 },
    });
    useEffect(() => {
      isAutoDisappear &&
        setTimeout(() => {
          setHide(true);
        }, disappearTime || 3500);
    }, [disappearTime]);
    return (
      <Fragment>
        {transitions.map(
          ({ item, key, props }) =>
            !item && (
              <animated.div key={key} style={props} css={[baseStyles]}>
                <div css={[headerStyles]}>
                  {icon}
                  <strong>{title}</strong>
                  {haveTimeTip && <small></small>}
                  <button
                    css={[closeStyles]}
                    onClick={() => {
                      setHide(true);
                    }}
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div css={[bodyStyles]}>{body || children}</div>
              </animated.div>
            )
        )}
      </Fragment>
    );
  }
);
