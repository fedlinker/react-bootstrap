import React from "react";
import { Popper } from "../popper";
import { Button } from "../../button";
import times from "lodash/times";
import { boolean } from "@storybook/addon-knobs";

export default {
  title: "Popper",
  component: Popper,
};

export const BasicUsage = () => {
  const content = (
    <div
      style={{
        padding: "8px",
        backgroundColor: "#f8f8f8",
        border: "1px solid #eee",
        boxShadow: "0 0 8px #f3f3f3",
      }}
    >
      Popper content
    </div>
  );
  return times(10, o => {
    return (
      <div style={{ marginBottom: "16px" }}>
        <Popper content={content} key={o} placement="right">
          <Button>Popper Button</Button>
        </Popper>
      </div>
    );
  });
};

export const Arrow = () => {
  const content = (
    <div
      style={{
        padding: "8px",
        backgroundColor: "#f8f8f8",
        border: "1px solid #eee",
        boxShadow: "0 0 8px #f3f3f3",
      }}
    >
      Popper content
    </div>
  );
  return (
    <div>
      <Popper
        content={content}
        placement="bottom"
        arrow={{ borderColor: "#eee", backgroundColor: "#f8f8f8" }}
      >
        <Button>Popper With Arrow</Button>
      </Popper>
    </div>
  );
};

export const PlacementUsage = () => {
  const content = (
    <div
      style={{
        padding: "3px",
        backgroundColor: "#f8f8f8",
        border: "1px solid #eee",
        boxShadow: "0 0 8px #f3f3f3",
        borderRadius: "4px",
      }}
    >
      Popper
    </div>
  );
  return (
    <div style={{ width: "3000px", height: "3000px" }}>
      <div style={{ padding: "64px", width: "500px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingBottom: "16px",
          }}
        >
          <Popper content={content} placement="top-start" trigger="click">
            <Button style={{ marginRight: "16px" }}>top-start</Button>
          </Popper>
          <Popper content={content} placement="top">
            <Button style={{ marginRight: "16px" }}>top</Button>
          </Popper>
          <Popper content={content} placement="top-end">
            <Button>top-end</Button>
          </Popper>
        </div>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Popper content={content} placement="left-start" trigger="click">
              <Button style={{ marginBottom: "16px" }}>left-start</Button>
            </Popper>
            <Popper content={content} placement="left">
              <Button style={{ marginBottom: "16px" }}>left</Button>
            </Popper>
            <Popper content={content} placement="left-end">
              <Button>left-end</Button>
            </Popper>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Popper content={content} placement="right-start" trigger="click">
              <Button style={{ marginBottom: "16px" }}>right-start</Button>
            </Popper>
            <Popper content={content} placement="right">
              <Button style={{ marginBottom: "16px" }}>right</Button>
            </Popper>
            <Popper content={content} placement="right-end">
              <Button>right-end</Button>
            </Popper>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "16px",
          }}
        >
          <Popper content={content} placement="bottom-start" trigger="click">
            <Button style={{ marginRight: "16px" }}>bottom-start</Button>
          </Popper>
          <Popper content={content} placement="bottom">
            <Button style={{ marginRight: "16px" }}>bottom</Button>
          </Popper>
          <Popper content={content} placement="bottom-end">
            <Button>bottom-end</Button>
          </Popper>
        </div>
      </div>
    </div>
  );
};

export const TriggerUsage = () => {
  const content = (
    <div
      style={{
        padding: "8px",
        backgroundColor: "#f8f8f8",
        border: "1px solid #eee",
        boxShadow: "0 0 8px #f3f3f3",
      }}
    >
      Popper content
    </div>
  );
  return (
    <div style={{ padding: "64px" }}>
      <div>
        <Popper content={content} placement="top" trigger="click">
          <Button style={{ marginBottom: "16px" }}>click trigger</Button>
        </Popper>
      </div>
      <div>
        <Popper content={content} placement="bottom" trigger="hover">
          <Button>hover trigger</Button>
        </Popper>
      </div>

      {times(100, o => {
        return <div key={o}>{o}</div>;
      })}
    </div>
  );
};

export const Delay = () => {
  return (
    <div>
      <Popper content={<div>delay content</div>} placement="bottom" delay={500}>
        <Button style={{ marginBottom: "16px" }} block>
          delay number
        </Button>
      </Popper>
      <Popper
        content={<div>delay content</div>}
        placement="bottom"
        delay={{ show: 500, hide: 100 }}
      >
        <Button style={{ marginBottom: "16px" }} block>
          delay object
        </Button>
      </Popper>
    </div>
  );
};

export const Disabled = () => {
  const isDisabled = boolean("disabled", true);
  return (
    <Popper
      content={<div>content</div>}
      placement="bottom"
      disabled={isDisabled}
    >
      <Button style={{ marginBottom: "16px" }}>{`popper${
        isDisabled ? " disabled" : ""
      }`}</Button>
    </Popper>
  );
};

export const CustomizeAnimation = () => {
  return (
    <div style={{ padding: "120px" }}>
      <div>
        <Popper
          content={<div>content</div>}
          placement="bottom"
          animationFunc={({ visible }) => {
            return { transform: `translate3d(${visible ? 0 : -20}px,0,0)` };
          }}
        >
          <Button style={{ marginBottom: "48px" }}>Customize animation</Button>
        </Popper>
      </div>
      <div>
        <Popper
          content={<div>content</div>}
          placement="top"
          animationFunc={({ visible, placement }) => {
            const isTop = placement.indexOf("top") === 0;
            return {
              transform: `translate3d(${visible ? 0 : isTop ? 0 : -20}px,${
                visible ? 0 : isTop ? -20 : 0
              }px,0)`,
            };
          }}
        >
          <Button style={{ marginBottom: "16px" }}>Customize animation</Button>
        </Popper>
      </div>
    </div>
  );
};

export const NestedPopper = () => {
  return (
    <div style={{ padding: "600px" }}>
      <Popper
        content={
          <Popper
            content={
              <Popper content={"Nested3"} inline>
                <Button>Nested2</Button>
              </Popper>
            }
            inline
          >
            <Button>Nested1</Button>
          </Popper>
        }
      >
        <Button>Nested</Button>
      </Popper>
    </div>
  );
};

export const InnerPopper = () => {
  return (
    <div
      style={{
        position: "relative",
        overflow: "auto",
        margin: "300px 32px",
        border: "1px solid #eee",
        width: "300px",
        height: "300px",
        background: "#f3f3f3",
      }}
    >
      <div style={{ padding: "360px" }}>
        <Popper
          content={
            <div style={{ padding: "3px 6px", background: "#fff" }}>
              popper content
            </div>
          }
          trigger="click"
          placement="bottom-start"
          inline
          arrow={{ borderColor: "#fff", backgroundColor: "#fff" }}
        >
          <Button>Inner popper</Button>
        </Popper>
      </div>
    </div>
  );
};

export const ConstrolledPopper = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <div>
      <div>
        <Popper
          content={
            <div style={{ padding: "3px 6px", background: "#fff" }}>
              popper content
            </div>
          }
          isOpen={open}
          trigger="click"
          placement="bottom-start"
          inline
          arrow={{ borderColor: "#fff", backgroundColor: "#fff" }}
          onOpen={() => {
            console.log("open");
          }}
          onOpened={() => {
            console.log("opened");
          }}
          onClose={() => {
            console.log("close");
          }}
          onClosed={() => {
            console.log("closed");
          }}
          onIsOpenChange={isOpen => {
            setOpen(isOpen);
          }}
        >
          <Button>Inner popper</Button>
        </Popper>
      </div>

      <div style={{ marginTop: "48px" }}>
        <div>isOpen: {open ? "true" : "false"}</div>
        <Button onClick={() => setOpen(!open)}>
          {open ? "Close" : "Open"}
        </Button>
      </div>
    </div>
  );
};
