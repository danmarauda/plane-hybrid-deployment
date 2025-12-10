import { t as cn } from "../classname-iNHf9Pb8.js";
import "../placement-Db9Qu3XD.js";
import "../utils-MPqvUdqq.js";
import { An as ChevronDownIcon, On as ChevronRightIcon } from "../icons-BueZeOyQ.js";
import * as React$1 from "react";
import { MoreHorizontal } from "lucide-react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { Menu as Menu$2 } from "@base-ui-components/react/menu";

//#region src/menu/menu.tsx
const MenuContext = React$1.createContext(null);
const SubMenuContext = React$1.createContext(null);
const useSubMenu = () => React$1.useContext(SubMenuContext);
function SubMenu(props) {
	const { children, trigger, disabled = false, className = "" } = props;
	return /* @__PURE__ */ jsxs(Menu$2.SubmenuRoot, {
		disabled,
		children: [/* @__PURE__ */ jsxs(Menu$2.SubmenuTrigger, {
			className: "",
			children: [/* @__PURE__ */ jsx("span", {
				className: "flex-1",
				children: trigger
			}), /* @__PURE__ */ jsx(ChevronRightIcon, {})]
		}), /* @__PURE__ */ jsx(Menu$2.Portal, { children: /* @__PURE__ */ jsx(Menu$2.Positioner, {
			className: "",
			alignOffset: -4,
			sideOffset: -4,
			children: /* @__PURE__ */ jsxs(Menu$2.Popup, {
				className,
				children: [children, " "]
			})
		}) })]
	});
}
function MenuItem(props) {
	const { children, disabled = false, onClick, className } = props;
	const submenuContext = useSubMenu();
	return /* @__PURE__ */ jsx(Menu$2.Item, {
		disabled,
		className: cn("w-full select-none truncate rounded px-1 py-1.5 text-left text-custom-text-200 hover:bg-custom-background-80 cursor-pointer outline-none", { "text-custom-text-400": disabled }, className),
		onClick: (e) => {
			close();
			onClick?.(e);
			submenuContext?.closeSubmenu();
		},
		children
	});
}
function Menu(props) {
	const { ariaLabel, buttonClassName = "", customButtonClassName = "", customButtonTabIndex = 0, children, customButton, disabled = false, ellipsis = false, label, maxHeight = "md", noBorder = false, noChevron = false, optionsClassName = "", menuItemsClassName = "", verticalEllipsis = false, menuButtonOnClick, onMenuClose, tabIndex, openOnHover = false, handleOpenChange = () => {} } = props;
	const [isOpen, setIsOpen] = React$1.useState(false);
	const submenuClosersRef = React$1.useRef(/* @__PURE__ */ new Set());
	const closeAllSubmenus = React$1.useCallback(() => {
		submenuClosersRef.current.forEach((closeSubmenu) => closeSubmenu());
	}, []);
	const registerSubmenu = React$1.useCallback((closeSubmenu) => {
		submenuClosersRef.current.add(closeSubmenu);
		return () => {
			submenuClosersRef.current.delete(closeSubmenu);
		};
	}, []);
	const openDropdown = () => {
		setIsOpen(true);
	};
	const closeDropdown = React$1.useCallback(() => {
		if (isOpen) {
			closeAllSubmenus();
			onMenuClose?.();
		}
		setIsOpen(false);
	}, [
		isOpen,
		closeAllSubmenus,
		onMenuClose
	]);
	const handleMenuButtonClick = (e) => {
		e.stopPropagation();
		e.preventDefault();
		if (isOpen) closeDropdown();
		else openDropdown();
		if (menuButtonOnClick) menuButtonOnClick();
	};
	return /* @__PURE__ */ jsxs(Menu$2.Root, {
		openOnHover,
		onOpenChange: handleOpenChange,
		children: [customButton ? /* @__PURE__ */ jsx(Menu$2.Trigger, {
			type: "button",
			onClick: handleMenuButtonClick,
			className: cn(customButtonClassName, "outline-none"),
			tabIndex: customButtonTabIndex,
			disabled,
			"aria-label": ariaLabel,
			children: customButton
		}) : /* @__PURE__ */ jsx(Fragment, { children: ellipsis || verticalEllipsis ? /* @__PURE__ */ jsx(Menu$2.Trigger, {
			type: "button",
			onClick: handleMenuButtonClick,
			disabled,
			className: `relative grid place-items-center rounded p-1 text-custom-text-200 outline-none hover:text-custom-text-100 ${disabled ? "cursor-not-allowed" : "cursor-pointer hover:bg-custom-background-80"} ${buttonClassName}`,
			tabIndex: customButtonTabIndex,
			"aria-label": ariaLabel,
			children: /* @__PURE__ */ jsx(MoreHorizontal, { className: `h-3.5 w-3.5 ${verticalEllipsis ? "rotate-90" : ""}` })
		}) : /* @__PURE__ */ jsxs(Menu$2.Trigger, {
			type: "button",
			className: `flex items-center justify-between gap-1 whitespace-nowrap rounded-md px-2.5 py-1 text-xs duration-300 outline-none ${isOpen ? "bg-custom-background-90 text-custom-text-100" : "text-custom-text-200"} ${noBorder ? "" : "border border-custom-border-300 shadow-sm focus:outline-none"} ${disabled ? "cursor-not-allowed text-custom-text-200" : "cursor-pointer hover:bg-custom-background-80"} ${buttonClassName}`,
			onClick: handleMenuButtonClick,
			tabIndex: customButtonTabIndex,
			disabled,
			"aria-label": ariaLabel,
			children: [label, !noChevron && /* @__PURE__ */ jsx(ChevronDownIcon, { className: "h-3.5 w-3.5" })]
		}) }), /* @__PURE__ */ jsx(Menu$2.Portal, { children: /* @__PURE__ */ jsx(Menu$2.Positioner, {
			align: "start",
			className: cn("fixed z-30 translate-y-0", menuItemsClassName),
			children: /* @__PURE__ */ jsx(Menu$2.Popup, {
				tabIndex,
				className: cn("my-1 overflow-y-scroll rounded-md border-[0.5px] border-custom-border-300 bg-custom-background-100 px-2 py-2.5 text-xs shadow-custom-shadow-rg focus:outline-none min-w-[12rem] whitespace-nowrap", {
					"max-h-60": maxHeight === "lg",
					"max-h-48": maxHeight === "md",
					"max-h-36": maxHeight === "rg",
					"max-h-28": maxHeight === "sm"
				}, optionsClassName),
				"data-main-menu": "true",
				children: /* @__PURE__ */ jsx(MenuContext.Provider, {
					value: {
						closeAllSubmenus,
						registerSubmenu
					},
					children
				})
			})
		}) })]
	});
}
Menu.MenuItem = MenuItem;
Menu.SubMenu = SubMenu;

//#endregion
export { Menu };
//# sourceMappingURL=index.js.map