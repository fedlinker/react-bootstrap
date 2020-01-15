/** @jsx jsx */
import { jsx } from "theme-ui";
import { PropsComponentProps } from "docz";
import { Prop as PropType } from "docz/dist/components/Props";

export function Props(props: PropsComponentProps) {
  const { title, props: propMap, getPropType, isToggle } = props;
  const entries = Object.entries(propMap);
  return (
    <div>
      <div>{title}</div>
      <div>
        {entries.map(([key, prop]) => {
          return (
            <Prop
              key={key}
              propName={key}
              prop={prop}
              isToggle={isToggle}
              getPropType={getPropType}
            />
          );
        })}
      </div>
    </div>
  );
}

interface IPropProps {
  propName: string;
  prop: PropType;
  getPropType(prop: PropType): string;
  isToggle?: boolean;
}

function Prop(props: IPropProps) {
  const { prop, propName, getPropType } = props;
  return (
    <div
      sx={{
        borderRadius: "6px",
        marginBottom: "16px",
        backgroundColor: "background",
        padding: "16px",
        paddingTop: 0,
        boxSizing: "border-box",
        color: "text",
        transition: "all 0.3s",
        boxShadow: t => `0 3px 15px ${t.colors.shadow}`,
      }}
    >
      <div sx={{ display: "flex", alignItems: "center" }}>
        <h3 sx={{ flex: 1 }}>{propName}</h3>
        <div sx={{ display: "flex" }}>
          {prop.required ? (
            <div sx={{ marginRight: "16px" }}>required</div>
          ) : null}
          {prop.required || !prop.defaultValue ? null : (
            <div>Default: {prop.defaultValue.value}</div>
          )}
        </div>
      </div>
      <div>{prop.description}</div>
      <div>Type: {getPropType(prop)}</div>
    </div>
  );
}
