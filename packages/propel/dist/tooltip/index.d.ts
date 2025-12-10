import { n as TPlacement, r as TSide, t as TAlign } from "../placement-CnF1q1iR.js";
import * as React$1 from "react";
import * as react_jsx_runtime17 from "react/jsx-runtime";

//#region src/tooltip/root.d.ts
type ITooltipProps = {
  tooltipHeading?: string;
  tooltipContent?: string | React$1.ReactNode | null;
  position?: TPlacement;
  children: React$1.ReactElement;
  disabled?: boolean;
  className?: string;
  openDelay?: number;
  closeDelay?: number;
  isMobile?: boolean;
  renderByDefault?: boolean;
  side?: TSide;
  align?: TAlign;
  sideOffset?: number;
};
declare function Tooltip(props: ITooltipProps): react_jsx_runtime17.JSX.Element;
//#endregion
export { Tooltip };
//# sourceMappingURL=index.d.ts.map