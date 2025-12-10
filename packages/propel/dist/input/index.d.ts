import * as React$1 from "react";

//#region src/input/input.d.ts
interface InputProps extends React$1.InputHTMLAttributes<HTMLInputElement> {
  mode?: "primary" | "transparent" | "true-transparent";
  inputSize?: "xs" | "sm" | "md";
  hasError?: boolean;
}
declare const Input: React$1.ForwardRefExoticComponent<InputProps & React$1.RefAttributes<HTMLInputElement>>;
//#endregion
export { Input, InputProps };
//# sourceMappingURL=index.d.ts.map