/** @jsx jsx */
import { useColorMode, jsx } from "theme-ui";
import { useConfig } from "docz";
import Button from "@/button";
import { SolidSun, SolidMoon } from "@fedlinker/font-awesome";

export default function Header() {
  const config = useConfig();
  const [colorMode, setColorMode] = useColorMode();

  const toggleColorMode = () => {
    setColorMode(colorMode === "light" ? "dark" : "light");
  };

  return (
    <div
      sx={{
        display: "flex",
        width: "100%",
        boxShadow: t => `0 3px 8px ${t.colors.shadow}`,
        padding: 3,
        boxSizing: "border-box",
        transition: "all 0.3s",
        backgroundColor: "background",
        position: "sticky",
        top: 0,
        left: 0,
        zIndex: 10000,
      }}
    >
      <div sx={{ flex: 1, color: "text", fontWeight: "bold", fontSize: 4 }}>
        {config.title}
      </div>
      <Button
        type="primary"
        onClick={toggleColorMode}
        icon={colorMode === "light" ? SolidSun : SolidMoon}
      >
        {colorMode}
      </Button>
    </div>
  );
}
