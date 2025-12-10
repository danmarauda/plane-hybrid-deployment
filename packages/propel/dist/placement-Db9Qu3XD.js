//#region src/utils/placement.ts
const PLACEMENT_MAP = new Map([
	["auto", {
		side: "bottom",
		align: "center"
	}],
	["auto-start", {
		side: "bottom",
		align: "start"
	}],
	["auto-end", {
		side: "bottom",
		align: "end"
	}],
	["top", {
		side: "top",
		align: "center"
	}],
	["bottom", {
		side: "bottom",
		align: "center"
	}],
	["left", {
		side: "left",
		align: "center"
	}],
	["right", {
		side: "right",
		align: "center"
	}],
	["top-start", {
		side: "top",
		align: "start"
	}],
	["top-end", {
		side: "top",
		align: "end"
	}],
	["bottom-start", {
		side: "bottom",
		align: "start"
	}],
	["bottom-end", {
		side: "bottom",
		align: "end"
	}],
	["left-start", {
		side: "left",
		align: "start"
	}],
	["left-end", {
		side: "left",
		align: "end"
	}],
	["right-start", {
		side: "right",
		align: "start"
	}],
	["right-end", {
		side: "right",
		align: "end"
	}]
]);
function convertPlacementToSideAndAlign(placement) {
	return PLACEMENT_MAP.get(placement) || {
		side: "bottom",
		align: "center"
	};
}

//#endregion
export { convertPlacementToSideAndAlign as t };
//# sourceMappingURL=placement-Db9Qu3XD.js.map