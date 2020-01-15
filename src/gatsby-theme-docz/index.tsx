import React, { PropsWithChildren } from "react";
import { ComponentsProvider, ComponentsMap, useConfig } from "docz";
import ConfigProvider from "@/config-provider";
import { theme } from "docz";
import { DEFAULT_THEME } from "@/config-provider/ConfigContext";
import { Playground } from "./components/Playground";
import { Props } from "./components/Props";
import { Layout } from "./components/Layout";
import { Styled } from "theme-ui";

const componentsMap: ComponentsMap = {
  playground: Playground,
  props: Props,
  layout: Layout,
};

function Theme(props: PropsWithChildren<unknown>) {
  const { children } = props;
  const config = useConfig();
  return (
    <ConfigProvider config={{ theme: config.themeConfig as any }}>
      <ComponentsProvider components={componentsMap}>
        <Styled.root>{children}</Styled.root>
      </ComponentsProvider>
    </ConfigProvider>
  );
}

export default theme(DEFAULT_THEME)(Theme);
