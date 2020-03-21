/**
 * placement
 *
 * position example
 *
 *     ┌topLeft───┬───top──┬───topRight┐
 *  leftTop       │        │       rightTop
 *     │          │        │           │
 *   left         │        │         right
 *     │          │        │           │
 * leftBottom     │        │      rightBottom
 *     └topLeft───┴─bottom─┴───topRight┘
 *
 */
export enum EPlacement {
  topLeft = "topLeft",
  top = "top",
  topRight = "topRight",

  leftTop = "leftTop",
  left = "left",
  leftBottom = "leftBottom",

  rightTop = "rightTop",
  right = "right",
  rightBottom = "rightBottom",

  bottomLeft = "bottomLeft",
  bottom = "bottom",
  bottomRight = "bottomRight",
}

export type IPlacementType = keyof typeof EPlacement;
