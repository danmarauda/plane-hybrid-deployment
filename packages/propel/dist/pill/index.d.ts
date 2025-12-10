import * as React$1 from "react";

//#region src/pill/pill.d.ts
declare enum EPillVariant {
  DEFAULT = "default",
  PRIMARY = "primary",
  SUCCESS = "success",
  WARNING = "warning",
  ERROR = "error",
  INFO = "info",
}
declare enum EPillSize {
  SM = "sm",
  MD = "md",
  LG = "lg",
  XS = "xs",
}
type TPillVariant = EPillVariant.DEFAULT | EPillVariant.PRIMARY | EPillVariant.SUCCESS | EPillVariant.WARNING | EPillVariant.ERROR | EPillVariant.INFO;
type TPillSize = EPillSize.SM | EPillSize.MD | EPillSize.LG | EPillSize.XS;
interface PillProps extends React$1.HTMLAttributes<HTMLSpanElement> {
  variant?: TPillVariant;
  size?: TPillSize;
  className?: string;
  children: React$1.ReactNode;
}
declare const Pill: React$1.ForwardRefExoticComponent<PillProps & React$1.RefAttributes<HTMLSpanElement>>;
//#endregion
export { EPillSize, EPillVariant, Pill, type PillProps };
//# sourceMappingURL=index.d.ts.map