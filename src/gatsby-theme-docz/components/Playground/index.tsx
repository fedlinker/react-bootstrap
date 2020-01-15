import React, { ComponentType } from "react";
import { PlaygroundProps } from "docz/dist/hooks";
import { LiveProvider, LivePreview, LiveEditor } from "react-live";

export const Playground: ComponentType<PlaygroundProps> = props => {
  const { code, scope } = props;
  return (
    <div>
      <LiveProvider scope={scope} code={code}>
        <LivePreview />
        <LiveEditor disabled style={{ outline: "none", border: "none" }} />
      </LiveProvider>
    </div>
  );
};
