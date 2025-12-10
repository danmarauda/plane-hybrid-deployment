import * as React$1 from "react";
import * as react_jsx_runtime9 from "react/jsx-runtime";
import { Command as Command$1 } from "cmdk";

//#region src/command/command.d.ts
declare function CommandComponent({
  className,
  ...props
}: React$1.ComponentProps<typeof Command$1>): react_jsx_runtime9.JSX.Element;
declare function CommandInput({
  className,
  ...props
}: React$1.ComponentProps<typeof Command$1.Input>): react_jsx_runtime9.JSX.Element;
declare function CommandList({
  ...props
}: React$1.ComponentProps<typeof Command$1.List>): react_jsx_runtime9.JSX.Element;
declare function CommandEmpty({
  ...props
}: React$1.ComponentProps<typeof Command$1.Empty>): react_jsx_runtime9.JSX.Element;
declare function CommandItem({
  ...props
}: React$1.ComponentProps<typeof Command$1.Item>): react_jsx_runtime9.JSX.Element;
declare const Command: typeof CommandComponent & {
  Input: typeof CommandInput;
  List: typeof CommandList;
  Empty: typeof CommandEmpty;
  Item: typeof CommandItem;
};
//#endregion
export { Command };
//# sourceMappingURL=index.d.ts.map