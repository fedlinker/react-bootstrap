import React, { useState } from "react";
import { action } from "@storybook/addon-actions";
import { Input } from "../input";
import { ISizeType } from "src/components/enum/size";

export default {
  title: "Input",
  component: Input,
};

export const BasicUsage = () => {
  const [value, setValue] = useState("");
  const handleInput = action("input");
  return (
    <Input
      placeholder="basic usage"
      value={value}
      onChange={e => {
        handleInput(e);
        setValue(e.target.value);
      }}
    />
  );
};

export const Size = () => {
  const sizes: ISizeType[] = ["default", "lg", "sm"];
  return (
    <div>
      {sizes.map(o => {
        return (
          <Input
            size={o}
            key={o}
            placeholder={`size-${o}`}
            style={{ marginBottom: "1rem" }}
          />
        );
      })}
    </div>
  );
};
