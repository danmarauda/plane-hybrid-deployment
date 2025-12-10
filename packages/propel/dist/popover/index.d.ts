import { n as TPlacement, r as TSide, t as TAlign } from "../placement-CnF1q1iR.js";
import * as react5 from "react";
import { Popover as Popover$1 } from "@base-ui-components/react/popover";

//#region src/popover/root.d.ts
interface PopoverContentProps extends React.ComponentProps<typeof Popover$1.Popup> {
  placement?: TPlacement;
  align?: TAlign;
  sideOffset?: Popover$1.Positioner.Props["sideOffset"];
  side?: TSide;
  containerRef?: React.RefObject<HTMLElement>;
  positionerClassName?: string;
}
declare const Popover: react5.NamedExoticComponent<Popover$1.Root.Props> & {
  Button: react5.NamedExoticComponent<Popover$1.Trigger.Props & react5.RefAttributes<any>>;
  Panel: react5.NamedExoticComponent<PopoverContentProps>;
};
//#endregion
export { Popover, PopoverContentProps };
//# sourceMappingURL=index.d.ts.map