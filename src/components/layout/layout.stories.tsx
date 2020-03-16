import React from "react";
import { Container } from "./container";
import { Col } from "./col";
import { Row } from "./row";
import { Interpolation, getCss } from "../theme";

export default {
  title: "Flex Container",
  component: Container,
};

export const ContainerUsage = () => {
  const style = getCss({
    backgroundColor: "primary",
    textAlign: "center",
    color: "#fff",
    marginBottom: "16px",
  });
  return (
    <div>
      <Container style={style}>Container</Container>
      <Container style={style} fluid>
        Container(fluid is true)
      </Container>
    </div>
  );
};

export const ResponsiveLayout = () => {
  return (
    <div>
      <p>
        You can customize the media query through <code>getCss</code> function.
      </p>
      <p>
        The default value is the breakpoints of bootstrap("576px", "768px",
        "992px", "1200px").
      </p>
      <p>
        The default breakpoints represents the layout list below:
        <ul>
          <li>{"- Extra small < 576px"}</li>
          <li>{"- Small < 768"}</li>
          <li>{"- Medium < 992px"}</li>
          <li>{"- Large < 1200px"}</li>
          <li>- Extra large ≥ 1200px</li>
        </ul>
      </p>
      <Container
        style={getCss({
          width: ["100px", "200px", "300px", "400px", "500px"],
          background: "#eeeeee",
          textAlign: "center",
        })}
      >
        Container
      </Container>
    </div>
  );
};

export const GridLayout = () => {
  const row1Col1Style: Interpolation = {
    backgroundColor: "blue",
    color: "#fff",
    padding: "16px",
    textAlign: "center",
  };
  const row1Col2Style: Interpolation = {
    backgroundColor: "red",
    color: "#fff",
    padding: "16px",
    textAlign: "center",
  };
  const row1Col3Style: Interpolation = {
    backgroundColor: "orange",
    color: "#fff",
    padding: "16px",
    textAlign: "center",
  };
  const styles: Interpolation = {
    padding: "16px",
    border: "1px solid #eee",
    textAlign: "center",
  };
  return (
    <div>
      <Row style={{ marginBottom: "16px" }}>
        <Col style={row1Col1Style}>col-1</Col>
        <Col style={row1Col2Style}>col-2</Col>
        <Col style={row1Col3Style}>col-3</Col>
      </Row>

      <Row>
        <Col style={styles} cols={6}>
          column-1
        </Col>
        <Col style={styles} cols={6}>
          column-2
        </Col>
        <Col style={styles} cols={12}>
          column-3
        </Col>
      </Row>
    </div>
  );
};

export const ResponsiveGridLayout = () => {
  const styles: Interpolation = {
    padding: "16px",
    border: "1px solid #eee",
    textAlign: "center",
  };
  const percent100 = "100%";
  return (
    <div>
      <Row>
        <Col style={styles} cols={[percent100, 6, 6]}>
          column-1
        </Col>
        <Col style={styles} cols={[percent100, 18, 6]}>
          column-2
        </Col>
        <Col style={styles} cols={[percent100, 24, 12]}>
          column-3
        </Col>
      </Row>
    </div>
  );
};
