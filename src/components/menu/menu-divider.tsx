/** @jsx jsx */
import { jsx, getStyles } from "../theme";

const styles = getStyles({
  base: {
    borderTop: "1px solid",
    borderTopColor: "border",
    marginTop: 3,
    marginBottom: 3,
  },
});

export const MenuDivider = () => {
  return <div css={styles.base} />;
};
