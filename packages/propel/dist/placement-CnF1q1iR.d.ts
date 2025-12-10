//#region src/utils/placement.d.ts
type TPlacement = "auto" | "auto-start" | "auto-end" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end" | "top" | "bottom" | "right" | "left";
type TSide = "top" | "bottom" | "left" | "right";
type TAlign = "start" | "center" | "end";
declare function convertPlacementToSideAndAlign(placement: TPlacement): {
  side: TSide;
  align: TAlign;
};
//#endregion
export { convertPlacementToSideAndAlign as i, TPlacement as n, TSide as r, TAlign as t };
//# sourceMappingURL=placement-CnF1q1iR.d.ts.map