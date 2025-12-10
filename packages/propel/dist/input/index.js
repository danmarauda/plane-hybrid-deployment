import { t as cn } from "../classname-iNHf9Pb8.js";
import "../placement-Db9Qu3XD.js";
import "../utils-MPqvUdqq.js";
import * as React$1 from "react";
import { jsx } from "react/jsx-runtime";
import { Input as Input$1 } from "@base-ui-components/react/input";

//#region src/input/input.tsx
const Input = React$1.forwardRef(function Input$2(props, ref) {
	const { id, type, name, mode = "primary", inputSize = "sm", hasError = false, className = "", autoComplete = "off",...rest } = props;
	return /* @__PURE__ */ jsx(Input$1, {
		id,
		ref,
		type,
		name,
		className: cn("block rounded-md bg-transparent text-sm placeholder-custom-text-400 focus:outline-none", {
			"rounded-md border-[0.5px] border-custom-border-200": mode === "primary",
			"rounded border-none bg-transparent ring-0 transition-all focus:ring-1 focus:ring-custom-primary": mode === "transparent",
			"rounded border-none bg-transparent ring-0": mode === "true-transparent",
			"border-red-500": hasError,
			"px-1.5 py-1": inputSize === "xs",
			"px-3 py-2": inputSize === "sm",
			"p-3": inputSize === "md"
		}, className),
		"aria-invalid": hasError || void 0,
		autoComplete,
		...rest
	});
});
Input.displayName = "form-input-field";

//#endregion
export { Input };
//# sourceMappingURL=index.js.map