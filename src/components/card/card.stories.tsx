import React, { useState } from "react";
import { Card } from "./index";
import { width } from "styled-system";

export default {
  title: "Card",
};

export const BasicUsage = () => (
  <Card
    style={{ width: "300px" }}
    cover={<img src="https://via.placeholder.com/640x640.png?text=cover" />}
    title={"Card title"}
    content={
      "Some quick example text to build on the card title and make up the bulk of the card's content."
    }
  />
);
