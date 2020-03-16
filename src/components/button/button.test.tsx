import React from "react";
import renderer from "react-test-renderer";
import { Button } from "./index";

describe("<Button />", () => {
  test("prop link works", () => {
    const component = renderer.create(<Button link>button</Button>);
    const link = component.toJSON();
    expect(link?.type).toEqual("a");

    component.update(<Button>button</Button>);
    const button = component.toJSON();
    // wrapper tag is button when link is false
    expect(button?.type).toEqual("button");
  });
});
