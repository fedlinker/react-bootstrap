import React, { useState } from "react";
import { action } from "@storybook/addon-actions";
import { ClickOutside } from "../click-outside";
import { Button } from "../../button";
import { Portal } from "../../portal";

export default {
  title: "Click Outside",
};

export const BasicUsage = () => {
  return (
    <ClickOutside onClickOutside={action("click-outside")}>
      <div>
        <div>Inner content</div>
        <div>Inner content2</div>
      </div>
    </ClickOutside>
  );
};

export const PortalUsage = () => {
  const [show, setShow] = useState(false);

  return (
    <div>
      <div>
        <Button onClick={() => setShow(true)}>Show portal</Button>
      </div>
      <Portal>
        <ClickOutside onClickOutside={() => setShow(false)}>
          {show ? (
            <div
              style={{
                position: "absolute",
                top: "200px",
                left: "36px",
                border: "1px dashed #eee",
                padding: "16px",
                boxShadow: "0 0 16px #ccc",
                borderRadius: "8px",
                color: "#999",
              }}
            >
              I'm Portal content
            </div>
          ) : null}
        </ClickOutside>
      </Portal>
    </div>
  );
};
