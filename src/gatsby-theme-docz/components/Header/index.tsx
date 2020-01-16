/** @jsx jsx */
import { jsx } from "theme-ui";
import { useConfig } from "docz";
import { BrandsBootstrap } from "@fedlinker/font-awesome";

export default function Header() {
  const config = useConfig();

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
      <div
        sx={{
          display: "flex",
          flex: 1,
          color: "#fff",
          fontWeight: "bold",
          fontSize: 4,
          alignItems: "center",
        }}
      >
        <BrandsBootstrap sx={{ fontSize: "36px", marginRight: "8px" }} />
        {config.title}
      </div>
    </div>
  );
}
