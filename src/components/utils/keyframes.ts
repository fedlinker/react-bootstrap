import { keyframes } from "@emotion/react";
import { Keyframes } from "@emotion/serialize";

/**
 * rotate keyframe
 */
export const rotate: Keyframes = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const fadeScaleOut: Keyframes = keyframes`
 0% {
   transform: scale(0);
   opacity: 1;
 }
 100% {
   opacity: 0;
   transform: scale(1);
 }
`;
