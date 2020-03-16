import React from "react";
import { ConfigProvider, IConfigProviderProps } from "../config-provider";
import { Button, ButtonGroup } from "../../button";
import { useColorMode } from "../../theme/color-mode/color-mode-context";
import { BASE_COLORS } from "../../theme";

export default {
  title: "Config Provider",
  component: ConfigProvider,
};

const withConfigProvider = (
  Comp: React.SFC,
  config: IConfigProviderProps = {}
) => {
  return (props: React.PropsWithChildren<{}>) => {
    return (
      <ConfigProvider {...config}>
        <Comp>{props.children}</Comp>
      </ConfigProvider>
    );
  };
};

export const BasicUsage = () => {
  return (
    <ConfigProvider>
      <Button type="primary">Custom Config</Button>
    </ConfigProvider>
  );
};

export const ColorMode = withConfigProvider(() => {
  const [colorMode, setColorMode] = useColorMode();
  return (
    <div>
      <div>{colorMode}</div>
      <div style={{ margin: "1rem 0" }}>
        <ButtonGroup size="lg">
          <Button type="primary">primary</Button>
          <Button type="danger">danger</Button>
          <Button type="info">info</Button>
          <Button type="success">success</Button>
          <Button type="warning">warning</Button>
        </ButtonGroup>
      </div>
      <ButtonGroup type="primary" outline>
        <Button onClick={() => setColorMode("default")}>default</Button>
        <Button onClick={() => setColorMode("dark")}>dark</Button>
      </ButtonGroup>
    </div>
  );
});

export const CustomTheme = withConfigProvider(
  () => {
    const [colorMode, setColorMode] = useColorMode();
    return (
      <div>
        <div>{colorMode}</div>
        <div style={{ margin: "1rem 0" }}>
          <ButtonGroup size="lg">
            <Button type="primary">primary</Button>
            <Button type="danger">danger</Button>
            <Button type="info">info</Button>
            <Button type="success">success</Button>
            <Button type="warning">warning</Button>
          </ButtonGroup>
        </div>
        <ButtonGroup type="primary" outline>
          <Button onClick={() => setColorMode("default")}>to default</Button>
          <Button onClick={() => setColorMode("dark")}>to dark</Button>
          <Button onClick={() => setColorMode("myMode")}>to myMode</Button>
        </ButtonGroup>
      </div>
    );
  },
  {
    config: {
      theme: {
        colors: {
          modes: {
            myMode: {
              text: BASE_COLORS.gray900,
              secondary: BASE_COLORS.gray600,
              background: BASE_COLORS.white,
              primary: "#30B338",
              success: "#59A1FF",
              warning: "#FFA53F",
              danger: "#FF342D",
              info: "#FFE5B2",
              light: BASE_COLORS.gray100,
              dark: BASE_COLORS.gray800,
              border: BASE_COLORS.gray300,
              input: BASE_COLORS.gray700,
              inputBorder: BASE_COLORS.gray400,
              placeholder: BASE_COLORS.gray600,
            },
          },
        },
      },
    },
    defaultColorMode: "myMode",
  }
);
