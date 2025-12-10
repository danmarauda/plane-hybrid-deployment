import { t as cn } from "../classname-iNHf9Pb8.js";
import "../placement-Db9Qu3XD.js";
import "../utils-MPqvUdqq.js";
import { Nn as CloseIcon } from "../icons-BueZeOyQ.js";
import "react";
import { AlertTriangle, CheckCircle2, XCircle } from "lucide-react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { Toast as Toast$1 } from "@base-ui-components/react/toast";

//#region src/spinners/circular-bar-spinner.tsx
function CircularBarSpinner({ height = "16px", width = "16px", className = "" }) {
	return /* @__PURE__ */ jsx("div", {
		role: "status",
		children: /* @__PURE__ */ jsx("svg", {
			xmlns: "http://www.w3.org/2000/svg",
			width,
			height,
			viewBox: "0 0 24 24",
			className,
			children: /* @__PURE__ */ jsxs("g", { children: [
				/* @__PURE__ */ jsx("rect", {
					width: 2,
					height: 5,
					x: 11,
					y: 1,
					fill: "currentColor",
					opacity: .14
				}),
				/* @__PURE__ */ jsx("rect", {
					width: 2,
					height: 5,
					x: 11,
					y: 1,
					fill: "currentColor",
					opacity: .29,
					transform: "rotate(30 12 12)"
				}),
				/* @__PURE__ */ jsx("rect", {
					width: 2,
					height: 5,
					x: 11,
					y: 1,
					fill: "currentColor",
					opacity: .43,
					transform: "rotate(60 12 12)"
				}),
				/* @__PURE__ */ jsx("rect", {
					width: 2,
					height: 5,
					x: 11,
					y: 1,
					fill: "currentColor",
					opacity: .57,
					transform: "rotate(90 12 12)"
				}),
				/* @__PURE__ */ jsx("rect", {
					width: 2,
					height: 5,
					x: 11,
					y: 1,
					fill: "currentColor",
					opacity: .71,
					transform: "rotate(120 12 12)"
				}),
				/* @__PURE__ */ jsx("rect", {
					width: 2,
					height: 5,
					x: 11,
					y: 1,
					fill: "currentColor",
					opacity: .86,
					transform: "rotate(150 12 12)"
				}),
				/* @__PURE__ */ jsx("rect", {
					width: 2,
					height: 5,
					x: 11,
					y: 1,
					fill: "currentColor",
					transform: "rotate(180 12 12)"
				}),
				/* @__PURE__ */ jsx("animateTransform", {
					attributeName: "transform",
					calcMode: "discrete",
					dur: "0.75s",
					repeatCount: "indefinite",
					type: "rotate",
					values: "0 12 12;30 12 12;60 12 12;90 12 12;120 12 12;150 12 12;180 12 12;210 12 12;240 12 12;270 12 12;300 12 12;330 12 12;360 12 12"
				})
			] })
		})
	});
}

//#endregion
//#region src/toast/toast.tsx
let TOAST_TYPE = /* @__PURE__ */ function(TOAST_TYPE$1) {
	TOAST_TYPE$1["SUCCESS"] = "success";
	TOAST_TYPE$1["ERROR"] = "error";
	TOAST_TYPE$1["INFO"] = "info";
	TOAST_TYPE$1["WARNING"] = "warning";
	TOAST_TYPE$1["LOADING"] = "loading";
	TOAST_TYPE$1["LOADING_TOAST"] = "loading-toast";
	return TOAST_TYPE$1;
}({});
const toastManager = Toast$1.createToastManager();
function Toast(props) {
	return /* @__PURE__ */ jsx(Toast$1.Provider, {
		toastManager,
		children: /* @__PURE__ */ jsx(Toast$1.Portal, { children: /* @__PURE__ */ jsx(Toast$1.Viewport, {
			"data-theme": props.theme,
			children: /* @__PURE__ */ jsx(ToastList, {})
		}) })
	});
}
const TOAST_DATA = {
	[TOAST_TYPE.SUCCESS]: {
		icon: /* @__PURE__ */ jsx(CheckCircle2, {
			width: 24,
			height: 24,
			strokeWidth: 1.5,
			className: "text-toast-text-success"
		}),
		textColorClassName: "text-toast-text-success",
		backgroundColorClassName: "bg-toast-background-success",
		borderColorClassName: "border-toast-border-success"
	},
	[TOAST_TYPE.ERROR]: {
		icon: /* @__PURE__ */ jsx(XCircle, {
			width: 24,
			height: 24,
			strokeWidth: 1.5,
			className: "text-toast-text-error"
		}),
		textColorClassName: "text-toast-text-error",
		backgroundColorClassName: "bg-toast-background-error",
		borderColorClassName: "border-toast-border-error"
	},
	[TOAST_TYPE.WARNING]: {
		icon: /* @__PURE__ */ jsx(AlertTriangle, {
			width: 24,
			height: 24,
			strokeWidth: 1.5,
			className: "text-toast-text-warning"
		}),
		textColorClassName: "text-toast-text-warning",
		backgroundColorClassName: "bg-toast-background-warning",
		borderColorClassName: "border-toast-border-warning"
	},
	[TOAST_TYPE.INFO]: {
		icon: /* @__PURE__ */ jsx(Fragment, {}),
		textColorClassName: "text-toast-text-info",
		backgroundColorClassName: "bg-toast-background-info",
		borderColorClassName: "border-toast-border-info"
	},
	[TOAST_TYPE.LOADING]: {
		icon: /* @__PURE__ */ jsx(CircularBarSpinner, { className: "text-toast-text-tertiary" }),
		textColorClassName: "text-toast-text-loading",
		backgroundColorClassName: "bg-toast-background-loading",
		borderColorClassName: "border-toast-border-loading"
	},
	[TOAST_TYPE.LOADING_TOAST]: {
		icon: /* @__PURE__ */ jsx(CircularBarSpinner, { className: "text-toast-text-tertiary" }),
		textColorClassName: "text-toast-text-loading",
		backgroundColorClassName: "bg-toast-background-loading",
		borderColorClassName: "border-toast-border-loading"
	}
};
function ToastList() {
	const { toasts } = Toast$1.useToastManager();
	return toasts.map((toast) => /* @__PURE__ */ jsx(ToastRender, {
		id: toast.id,
		toast
	}, toast.id));
}
function ToastRender({ id, toast }) {
	const toastData = toast.data;
	const data = TOAST_DATA[toastData.type];
	return /* @__PURE__ */ jsx(Toast$1.Root, {
		toast,
		className: cn("flex group items-center rounded-lg border shadow-sm p-2 w-[350px]", "absolute right-3 bottom-3 z-[calc(1000-var(--toast-index))]", "select-none transition-[opacity,transform] duration-500 ease-&lsqb;cubic-bezier(0.22,1,0.36,1)&rsqb;", "[transform:translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)+calc(min(var(--toast-index),10)*-10px)))_scale(calc(max(0,1-(var(--toast-index)*0.1))))]", "after:absolute after:bottom-full after:left-0 after:h-[calc(var(--gap)+1px)] after:w-full after:content-['']", "data-[ending-style]:opacity-0 data-[limited]:opacity-0", "data-[starting-style]:[transform:translateY(150%)]", "data-[expanded]:[transform:translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-offset-y)*-1+calc(var(--toast-index)*var(--gap)*-1)+var(--toast-swipe-movement-y)))]", "data-[ending-style]:data-[swipe-direction=down]:[transform:translateY(calc(var(--toast-swipe-movement-y)+150%))]", "data-[ending-style]:data-[swipe-direction=up]:[transform:translateY(calc(var(--toast-swipe-movement-y)-150%))]", "data-[ending-style]:data-[swipe-direction=left]:[transform:translateX(calc(var(--toast-swipe-movement-x)-150%))_translateY(var(--offset-y))]", "data-[ending-style]:data-[swipe-direction=right]:[transform:translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(var(--offset-y))]", "data-[ending-style]:[&:not([data-limited])]:[transform:translateY(150%)]", data.backgroundColorClassName, data.borderColorClassName),
		style: {
			["--gap"]: "1rem",
			["--offset-y"]: "calc(var(--toast-offset-y) * -1 + (var(--toast-index) * var(--gap) * -1) + var(--toast-swipe-movement-y))"
		},
		onMouseDown: (e) => {
			e.stopPropagation();
			e.preventDefault();
		},
		children: toastData.type === TOAST_TYPE.LOADING ? /* @__PURE__ */ jsxs("div", {
			className: "w-full h-full flex items-center justify-center px-4 py-2",
			children: [data.icon && /* @__PURE__ */ jsx("div", {
				className: "flex items-center justify-center",
				children: data.icon
			}), /* @__PURE__ */ jsxs("div", {
				className: cn("w-full flex items-center gap-0.5 pr-1", data.icon ? "pl-4" : "pl-1"),
				children: [/* @__PURE__ */ jsx("div", {
					className: cn("grow text-sm font-semibold", data.textColorClassName),
					children: toastData.title ?? "Loading..."
				}), /* @__PURE__ */ jsx(Toast$1.Close, {
					className: "absolute top-2 right-2.5 text-toast-text-secondary hover:text-toast-text-tertiary cursor-pointer",
					"aria-label": "Close",
					children: /* @__PURE__ */ jsx(CloseIcon, {
						strokeWidth: 1.5,
						width: 14,
						height: 14
					})
				})]
			})]
		}) : /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Toast$1.Close, {
			className: "absolute top-2 right-2.5 text-toast-text-secondary hover:text-toast-text-tertiary cursor-pointer",
			children: /* @__PURE__ */ jsx(CloseIcon, {
				strokeWidth: 1.5,
				width: 14,
				height: 14
			})
		}), /* @__PURE__ */ jsxs("div", {
			className: "w-full flex flex-col gap-2 p-2",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "flex items-center w-full",
				children: [data.icon && /* @__PURE__ */ jsx("div", {
					className: "flex items-center justify-center",
					children: data.icon
				}), /* @__PURE__ */ jsxs("div", {
					className: cn("flex flex-col gap-0.5 pr-1", data.icon ? "pl-4" : "pl-1"),
					children: [/* @__PURE__ */ jsx(Toast$1.Title, {
						className: cn("text-sm font-semibold", data.textColorClassName),
						children: toastData.title
					}), toastData.message && /* @__PURE__ */ jsx(Toast$1.Description, {
						className: "text-toast-text-secondary text-xs font-medium",
						children: toastData.message
					})]
				})]
			}), toastData.actionItems && /* @__PURE__ */ jsx("div", {
				className: "flex items-center pl-[32px]",
				children: toastData.actionItems
			})]
		})] })
	}, id);
}
const setToast = (props) => {
	let toastId;
	if (props.type !== TOAST_TYPE.LOADING) toastId = toastManager.add({ data: {
		type: props.type,
		title: props.title,
		message: props.message,
		actionItems: props.actionItems
	} });
	else toastId = toastManager.add({ data: {
		type: props.type,
		title: props.title
	} });
	return toastId;
};
const updateToast = (id, props) => {
	toastManager.update(id, { data: props.type === TOAST_TYPE.LOADING ? {
		type: TOAST_TYPE.LOADING,
		title: props.title
	} : {
		type: props.type,
		title: props.title,
		message: props.message,
		actionItems: props.actionItems
	} });
};
const setPromiseToast = (promise, options) => {
	toastManager.promise(promise, {
		loading: { data: {
			title: options.loading ?? "Loading...",
			type: TOAST_TYPE.LOADING,
			message: void 0,
			actionItems: void 0
		} },
		success: (data) => ({ data: {
			type: TOAST_TYPE.SUCCESS,
			title: options.success.title,
			message: options.success.message?.(data),
			actionItems: options.success.actionItems?.(data)
		} }),
		error: (data) => ({ data: {
			type: TOAST_TYPE.ERROR,
			title: options.error.title,
			message: options.error.message?.(data),
			actionItems: options.error.actionItems?.(data)
		} })
	});
};
const dismissToast = (tId) => {
	toastManager.close(tId);
};

//#endregion
export { TOAST_TYPE, Toast, dismissToast, setPromiseToast, setToast, updateToast };
//# sourceMappingURL=index.js.map