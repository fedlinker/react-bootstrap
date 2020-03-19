import React, { useState } from "react";
import { ModalBase } from "../modal-base";
import { Modal } from "../modal";
import { Button } from "../../button";
import times from "lodash/times";
import { action } from "@storybook/addon-actions";

export default {
  title: "Modal",
};

export const ModalbaseUsage = () => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div>
      <Button type="primary" onClick={() => setOpen(true)}>
        Open Modal
      </Button>
      <ModalBase open={open} onClose={() => setOpen(false)}>
        <div>I'am is Modal base</div>
      </ModalBase>
    </div>
  );
};

export const ModalUsage = () => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div>
      <Button type="primary" onClick={() => setOpen(true)}>
        Open Modal
      </Button>
      {times(30, o => {
        return (
          <div style={{ fontSize: "24px", textAlign: "center" }} key={o}>
            This is the count: {o}.
          </div>
        );
      })}
      <Modal
        title="Modal title"
        open={open}
        onClose={() => setOpen(false)}
        onOpen={action("onOpen")}
        onOpened={action("onOpened")}
        onExit={action("onExit")}
        onExited={action("onExited")}
      >
        <div>I'am is Modal base</div>
      </Modal>
    </div>
  );
};

export const CustomizeButton = () => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div>
      <Button type="primary" onClick={() => setOpen(true)}>
        Open Modal
      </Button>
      <Modal
        title="Modal title"
        open={open}
        onClose={() => setOpen(false)}
        noBtnProps={{ disabled: true }}
        noBtnText="Close"
        yesBtnProps={{ loading: true }}
        yesBtnText="Save changes"
        maskClosable={false}
      >
        <div>I'am is Modal base</div>
      </Modal>
    </div>
  );
};
