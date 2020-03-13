import { keyframes } from "@emotion/react";
import { Keyframes } from "@emotion/serialize";

/**
 * rotate keyframe
 */
export const rotate: Keyframes = keyframes`
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  75% {
    transform: rotate(270deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;
