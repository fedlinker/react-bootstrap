import React from "react";
import { Carousel, CarouselItem } from "./index";
import { getCss, jsx, BASE_COLORS, Interpolation } from "../theme";
export default {
  title: "Carousel",
  component: Carousel,
};

// TODO:
const CarouselItemStyle: Interpolation = {
  width: "300px",
  height: "300px",
  background: "#777777",
  color: "#444444",
  fontSize: "30px",
  textAlign: "center",
};

export const BasicUsage = () => (
  <Carousel navigationControl>
    {["First", "Second", "Third"].map((name) => (
      <CarouselItem
        key={name}
        style={CarouselItemStyle}
      >{`${name} Slide`}</CarouselItem>
    ))}
  </Carousel>
);
