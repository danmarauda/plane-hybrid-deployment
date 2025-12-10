import * as React$1 from "react";
import * as react_jsx_runtime23 from "react/jsx-runtime";
import { ScrollArea as ScrollArea$1 } from "@base-ui-components/react/scroll-area";

//#region src/scrollarea/scrollarea.d.ts
type ScrollAreaOrientation = "horizontal" | "vertical";
type ScrollAreaScrollType = "always" | "scroll" | "hover";
type ScrollAreaSize = "sm" | "md" | "lg";
interface ScrollAreaProps extends React$1.ComponentProps<typeof ScrollArea$1.Root> {
  orientation?: ScrollAreaOrientation;
  scrollType?: ScrollAreaScrollType;
  size?: ScrollAreaSize;
  rootClassName?: string;
  viewportClassName?: string;
}
declare function ScrollArea({
  children,
  orientation,
  scrollType,
  size,
  rootClassName,
  viewportClassName,
  ...props
}: ScrollAreaProps): react_jsx_runtime23.JSX.Element;
//#endregion
export { ScrollArea, type ScrollAreaOrientation, type ScrollAreaProps, type ScrollAreaScrollType, type ScrollAreaSize };
//# sourceMappingURL=index.d.ts.map