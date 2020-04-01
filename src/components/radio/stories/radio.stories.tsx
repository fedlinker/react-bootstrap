import React from "react";
import { RadioGroup } from "../radio-group";
import { Radio } from "../radio";

export default {
  title: "Radio",
};

export const BasicUsage = () => {
  return (
    <div>
      <div>Use options:</div>
      <RadioGroup
        options={[
          { label: "one", value: "one" },
          { label: "two", value: "two" },
        ]}
      />
      <div>Use jsx:</div>
      <RadioGroup>
        <Radio label="Jane" value="jane" />
        <Radio label="Jeffery" value="jeffery" />
      </RadioGroup>
    </div>
  );
};

export const InlineLayout = () => {
  return (
    <RadioGroup inline>
      <Radio label="Jane" value="jane" />
      <Radio label="Jeffery" value="jeffery" />
    </RadioGroup>
  );
};

export const DefaultValue = () => {
  return (
    <RadioGroup defaultValue="jane" inline>
      <Radio label="Jane" value="jane" />
      <Radio label="Jeffery" value="jeffery" />
    </RadioGroup>
  );
};

export const Disabled = () => {
  return (
    <RadioGroup inline>
      <Radio label="Jane" value="jane" disabled />
      <Radio label="Jeffery" value="jeffery" />
    </RadioGroup>
  );
};

export const CustomizeName = () => {
  return (
    <RadioGroup name="username" inline>
      <Radio label="Jane" value="jane" />
      <Radio label="Jeffery" value="jeffery" />
    </RadioGroup>
  );
};
