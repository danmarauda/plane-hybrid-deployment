import * as React$1 from "react";

//#region src/card/helper.d.ts
declare enum ECardVariant {
  WITHOUT_SHADOW = "without-shadow",
  WITH_SHADOW = "with-shadow",
}
declare enum ECardDirection {
  ROW = "row",
  COLUMN = "column",
}
declare enum ECardSpacing {
  SM = "sm",
  LG = "lg",
}
type TCardVariant = ECardVariant.WITHOUT_SHADOW | ECardVariant.WITH_SHADOW;
type TCardDirection = ECardDirection.ROW | ECardDirection.COLUMN;
type TCardSpacing = ECardSpacing.SM | ECardSpacing.LG;
//#endregion
//#region src/card/card.d.ts
interface CardProps extends React$1.HTMLAttributes<HTMLDivElement> {
  variant?: TCardVariant;
  spacing?: TCardSpacing;
  direction?: TCardDirection;
  className?: string;
  children: React$1.ReactNode;
}
declare const Card: React$1.ForwardRefExoticComponent<CardProps & React$1.RefAttributes<HTMLDivElement>>;
//#endregion
export { Card, CardProps, ECardDirection, ECardSpacing, ECardVariant };
//# sourceMappingURL=index.d.ts.map