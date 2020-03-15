import React from "react";
import renderer from "react-test-renderer";
import { Button } from "./index";

describe("<Button />", () => {
  test("prop link", () => {
    const component = renderer.create(<Button link>button</Button>);
    const tree = component.toJSON();
    expect(tree?.type).toEqual("a");
  });
});
