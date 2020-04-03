import React from "react";
import { action } from "@storybook/addon-actions";
import { Collapse } from "../collapse";
import { Button } from "../../button";

export default { title: "Collapse" };

export function BasicUsage() {
  const [show, setShow] = React.useState(false);
  return (
    <div>
      <Button onClick={() => setShow(!show)}>{show ? "hide" : "show"}</Button>
      <Collapse
        show={show}
        onShown={action("onShown")}
        onShow={action("onShow")}
        onHidden={action("onHidden")}
        onHide={action("onHide")}
      >
        <div>demo</div>
      </Collapse>
    </div>
  );
}

export function NestedCollapse() {
  const [show, setShow] = React.useState(false);
  const [show2, setShow2] = React.useState(false);
  return (
    <div style={{ padding: "16px" }}>
      <Button style={{ marginBottom: "24px" }} onClick={() => setShow(!show)}>
        {show ? "hide" : "show"}
      </Button>
      <Collapse show={show}>
        <div
          style={{
            backgroundColor: "#f3f3f3",
            padding: "16px",
            border: "1px solid #eee",
            borderRadius: "8px",
          }}
        >
          <div>demo</div>
          <Button onClick={() => setShow2(!show2)}>inner collapse</Button>
          <Collapse show={show2}>
            <div>inner collapse</div>
          </Collapse>
        </div>
      </Collapse>
    </div>
  );
}

export const Demo = () => {
  const [a, setA] = React.useState("");
  const [b, setB] = React.useState("");

  React.useEffect(() => {
    console.log(a);
  }, [b]);

  React.useEffect(() => {
    setA("222");
    setTimeout(() => {
      setB("111");
    }, 1000);
  }, []);

  return 111;
};
