import React from "react";
import { Popper } from "../popper";
import { Button } from "../../button";
import times from "lodash/times";

export default {
  title: "Popper",
};

export const BasicUsage = () => {
  return times(100, o => {
    return (
      <Popper
        content={
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
        }
        key={o}
        placement="top"
      >
        <Button>Popper Button</Button>
      </Popper>
    );
  });
};

export const PlacementUsage = () => {
  const content = (
    <div
      style={{
        padding: "8px",
        backgroundColor: "#f8f8f8",
        border: "1px solid #eee",
        boxShadow: "0 0 8px #f3f3f3",
      }}
    >
      Popper
    </div>
  );
  return (
    <div style={{ padding: "64px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingBottom: "16px",
        }}
      >
        <Popper content={content} placement="topLeft">
          <Button style={{ marginRight: "16px" }}>top left</Button>
        </Popper>
        <Popper content={content} placement="top">
          <Button style={{ marginRight: "16px" }}>top center</Button>
        </Popper>
        <Popper content={content} placement="topRight">
          <Button>top right</Button>
        </Popper>
      </div>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <div style={{}}>
          <Popper content={content} placement="leftTop">
            <Button style={{ marginBottom: "16px" }}>left top</Button>
          </Popper>
          <Popper content={content} placement="left">
            <Button style={{ marginBottom: "16px" }}>left center</Button>
          </Popper>
          <Popper content={content} placement="leftBottom">
            <Button>left bottom</Button>
          </Popper>
        </div>
        <div style={{}}>
          <Popper content={content} placement="rightTop">
            <Button style={{ marginBottom: "16px" }}>right top</Button>
          </Popper>
          <Popper content={content} placement="right">
            <Button style={{ marginBottom: "16px" }}>right center</Button>
          </Popper>
          <Popper content={content} placement="rightBottom">
            <Button>right bottom</Button>
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
        <Popper content={content} placement="bottomLeft">
          <Button style={{ marginRight: "16px" }}>bottom left</Button>
        </Popper>
        <Popper content={content} placement="bottom">
          <Button style={{ marginRight: "16px" }}>bottom center</Button>
        </Popper>
        <Popper content={content} placement="bottomRight">
          <Button>bottom right</Button>
        </Popper>
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
      <Popper content={content} placement="bottom" trigger="click">
        <Button style={{ marginBottom: "16px" }}>click trigger</Button>
      </Popper>
      <Popper content={content} placement="bottom" trigger="hover">
        <Button>hover trigger</Button>
      </Popper>
      {times(100, o => {
        return <div key={o}>{o}</div>;
      })}
    </div>
  );
};
