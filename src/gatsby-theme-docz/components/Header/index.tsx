/** @jsx jsx */
import { jsx, useColorMode } from "theme-ui";
import { useConfig } from "docz";
import { BrandsBootstrap, SolidSun, SolidMoon } from "@fedlinker/font-awesome";
import { Button } from "@/index";

export default function Header() {
  const config = useConfig();
  const [colorMode, setColorMode] = useColorMode();
  const isDarkMode = colorMode === "dark";

  return (
    <div
      sx={{
        display: "flex",
        width: "100%",
        padding: 3,
        boxSizing: "border-box",
        transition: "all 0.3s",
        backgroundColor: "#563d7c",
        position: "sticky",
        top: 0,
        left: 0,
        zIndex: 10000,
      }}
    >
      <a
        href="/"
        sx={{
          display: "flex",
          flex: 1,
          color: "#fff",
          fontWeight: "bold",
          fontSize: 4,
          alignItems: "center",
          textDecoration: "none",
        }}
      >
        <BrandsBootstrap sx={{ fontSize: "36px", marginRight: "8px" }} />
        {config.title}
      </a>
      <Button
        type="light"
        icon={isDarkMode ? SolidMoon : SolidSun}
        size="sm"
        onClick={() => setColorMode(isDarkMode ? "light" : "dark")}
      >
        {colorMode}
      </Button>
    </div>
  );
}
