/** @jsx jsx */
import React, {
  useMemo,
  FunctionComponent,
  useState,
  Fragment,
  ReactNode,
} from "react";
import { getCss, jsx, BASE_COLORS, Interpolation } from "../theme";
import { BORDER_WIDTH, BORDER_RADIUS } from "../theme/constant";
import { CARD_SPACER_X } from "./styleVariables";

export const cardStyle = getCss({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  minWidth: 0,
  height: "height",
  wordWrap: "break-word",
  backgroundColor: BASE_COLORS.white,
  backgroundClip: "border-box",
  borderColor: "borderColor",
  borderStyle: "solid",
  borderWidth: `${BORDER_WIDTH}`,
  borderRadius: BORDER_RADIUS,
});

export const cardCoverStyle = getCss({
  flexShrink: 0,
  width: "100%",
  "& > img": {
    width: "100%",
  },
});

export const cardBodyStyle = getCss({
  flex: "1 1 auto",
  minHeight: "1px",
  padding: CARD_SPACER_X,
});

export interface ICardBaseProps {
  cover?: ReactNode;
  style?: Interpolation;
}

export interface ICardProps extends ICardBaseProps {
  title?: string | ReactNode;
  subTitle?: string | ReactNode;
  content?: string | ReactNode;
}

const CardPoster: FunctionComponent<ICardBaseProps> = ({ children, style }) =>
  children ? <div css={[cardCoverStyle, style]}>{children}</div> : <Fragment />;

export const Card: FunctionComponent<ICardProps> = ({
  cover,
  style,
  title,
  subTitle,
  content,
}) => {
  return (
    <div css={[cardStyle, style]}>
      <CardPoster>{cover}</CardPoster>
      <div css={[cardBodyStyle]}>
        {title && <h3>{title}</h3>}
        {subTitle && <h4>{subTitle}</h4>}
        <p>{content}</p>
      </div>
    </div>
  );
};
