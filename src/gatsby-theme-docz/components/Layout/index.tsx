/** @jsx jsx */
import { PropsWithChildren } from "react";
import { Global, css } from "@emotion/core";
import { jsx } from "theme-ui";
import Header from "../Header";
import Sidebar from "../Sidebar";

export function Layout(props: PropsWithChildren<unknown>) {
  const { children } = props;
  return (
    <div
      sx={{
        backgroundColor: "background",
        minHeight: "100vh",
        transition: "all 0.3s",
      }}
    >
      <Global
        styles={css`
          body,
          html {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
        `}
      />
      <Header />
      <div sx={{ display: "flex", position: "relative" }}>
        <div
          sx={{
            flex: "0 0 120px",
            flexBasis: [160, 240, 320],
            height: "100%",
            position: "relative",
          }}
        >
          <div
            sx={{
              position: "fixed",
              width: [160, 240, 320],
              height: "100%",
              top: 0,
              left: 0,
            }}
          >
            <Sidebar />
          </div>
        </div>
        <div sx={{ padding: 3, boxSizing: "border-box" }}>{children}</div>
      </div>
    </div>
  );
}
