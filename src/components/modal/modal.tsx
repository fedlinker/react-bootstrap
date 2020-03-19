/** @jsx jsx */
import React from "react";
import { jsx } from "../theme";
import { ModalBase, IModalBaseProps } from "./modal-base";
import { getCss } from "../theme";
import { SolidTimes } from "@fedlinker/font-awesome";
import { Button, IButtonProps } from "../button";

export interface IModalProps extends IModalBaseProps {
  title: string;
  noBtnProps?: IButtonProps;
  noBtnText?: React.ReactNode;
  yesBtnProps?: IButtonProps;
  yesBtnText?: React.ReactNode;
}

export const Modal = React.forwardRef<HTMLDivElement, IModalProps>(
  (props, ref) => {
    const {
      title,
      children,
      onClose,
      noBtnProps,
      noBtnText,
      yesBtnProps,
      yesBtnText,
      ...modalbaseProps
    } = props;
    return (
      <ModalBase {...modalbaseProps} onClose={onClose} ref={ref}>
        <div
          css={getCss({
            padding: 5,
            display: "flex",
          })}
        >
          <div css={{ flex: 1, fontWeight: "bold" }}>{title}</div>
          <div
            css={getCss({
              padding: 5,
              margin: -5,
              color: "secondary",
              cursor: "pointer",
              transition: "all 0.3s",
              "&:hover": {
                color: "text",
              },
            })}
            onClick={onClose}
          >
            <SolidTimes />
          </div>
        </div>

        <div
          css={getCss({
            padding: 5,
            border: "1px solid",
            borderColor: "border",
            borderLeft: "none",
            borderRight: "none",
          })}
        >
          {children}
        </div>

        <div
          css={getCss({
            padding: 5,
            textAlign: "right",
            "& > button": {
              margin: 1,
            },
          })}
        >
          <Button type="danger" onClick={onClose} {...noBtnProps}>
            {noBtnText}
          </Button>
          <Button type="primary" {...yesBtnProps}>
            {yesBtnText}
          </Button>
        </div>
      </ModalBase>
    );
  }
);

Modal.defaultProps = {
  noBtnText: "No",
  noBtnProps: {},
  yesBtnText: "Yes",
  yesBtnProps: {},
};
