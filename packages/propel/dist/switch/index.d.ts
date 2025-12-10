import * as react_jsx_runtime22 from "react/jsx-runtime";

//#region src/switch/root.d.ts
interface IToggleSwitchProps {
  value: boolean;
  onChange: (value: boolean) => void;
  label?: string;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  className?: string;
}
declare function Switch({
  value,
  onChange,
  label,
  size,
  disabled,
  className
}: IToggleSwitchProps): react_jsx_runtime22.JSX.Element;
declare namespace Switch {
  var displayName: string;
}
//#endregion
export { IToggleSwitchProps, Switch };
//# sourceMappingURL=index.d.ts.map