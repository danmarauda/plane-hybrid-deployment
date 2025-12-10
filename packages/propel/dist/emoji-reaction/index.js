import { t as cn } from "../classname-iNHf9Pb8.js";
import { t as convertPlacementToSideAndAlign } from "../placement-Db9Qu3XD.js";
import "../utils-MPqvUdqq.js";
import { t as AnimatedCounter } from "../animated-counter-B_t30jm9.js";
import { Pn as AddReactionIcon } from "../icons-BueZeOyQ.js";
import { t as Popover } from "../popover-C2bLVK6Y.js";
import { f as stringToEmoji, p as EmojiRoot, u as emojiToString } from "../emoji-icon-picker-BEd3RBLu.js";
import { t as Tooltip } from "../tooltip-B1dEWWz7.js";
import * as React$1 from "react";
import React, { useCallback, useMemo } from "react";
import { jsx, jsxs } from "react/jsx-runtime";

//#region src/emoji-reaction/emoji-reaction.tsx
const EmojiReaction = React$1.forwardRef(function EmojiReaction$1({ emoji, count, reacted = false, users = [], onReactionClick, className, showCount = true,...props }, ref) {
	const handleClick = () => {
		onReactionClick?.(emoji);
	};
	const tooltipContent = React$1.useMemo(() => {
		if (!users.length) return null;
		const displayUsers = users.slice(0, 5);
		const remainingCount = users.length - displayUsers.length;
		return /* @__PURE__ */ jsxs("div", {
			className: "text-xs",
			children: [/* @__PURE__ */ jsx("div", {
				className: "font-medium mb-1",
				children: stringToEmoji(emoji)
			}), /* @__PURE__ */ jsxs("div", { children: [displayUsers.join(", "), remainingCount > 0 && ` and ${remainingCount} more`] })]
		});
	}, [emoji, users]);
	const button = /* @__PURE__ */ jsxs("button", {
		ref,
		onClick: handleClick,
		className: cn("inline-flex items-center rounded-full border px-1.5 text-xs gap-0.5 transition-all duration-200", reacted ? "bg-custom-primary-100/10 border-custom-primary-100 text-custom-primary-100" : "bg-custom-background-100 border-custom-border-200 text-custom-text-300 hover:border-custom-border-300 hover:bg-custom-background-90", className),
		...props,
		children: [/* @__PURE__ */ jsx("span", {
			className: "text-base leading-unset",
			children: emoji
		}), showCount && count > 0 && /* @__PURE__ */ jsx(AnimatedCounter, {
			count,
			size: "sm",
			className: "text-xs leading-normal"
		})]
	});
	if (tooltipContent && users.length > 0) return /* @__PURE__ */ jsx(Tooltip, {
		tooltipContent,
		children: button
	});
	return button;
});
const EmojiReactionButton = React$1.forwardRef(function EmojiReactionButton$1({ onAddReaction, className,...props }, ref) {
	return /* @__PURE__ */ jsx("button", {
		ref,
		onClick: onAddReaction,
		className: cn("inline-flex items-center justify-center rounded-full border border-dashed border-custom-border-300", "bg-custom-background-100 text-custom-text-400 transition-all duration-200", "hover:border-custom-primary-100 hover:text-custom-primary-100 hover:bg-custom-primary-100/5", "focus:outline-none focus:ring-2 focus:ring-custom-primary-100/20 focus:ring-offset-1", "h-6 w-6", className),
		title: "Add reaction",
		...props,
		children: /* @__PURE__ */ jsx(AddReactionIcon, { className: "h-3 w-3" })
	});
});
const EmojiReactionGroup = React$1.forwardRef(function EmojiReactionGroup$1({ reactions, onReactionClick, onAddReaction, className, showAddButton = true, maxDisplayUsers = 5,...props }, ref) {
	return /* @__PURE__ */ jsxs("div", {
		ref,
		className: cn("flex flex-wrap items-center gap-2", className),
		...props,
		children: [reactions.map((reaction, index) => /* @__PURE__ */ jsx(EmojiReaction, {
			emoji: reaction.emoji,
			count: reaction.count,
			reacted: reaction.reacted,
			users: reaction.users?.slice(0, maxDisplayUsers),
			onReactionClick
		}, `${reaction.emoji}-${index}`)), showAddButton && /* @__PURE__ */ jsx(EmojiReactionButton, { onAddReaction })]
	});
});
EmojiReaction.displayName = "EmojiReaction";
EmojiReactionButton.displayName = "EmojiReactionButton";
EmojiReactionGroup.displayName = "EmojiReactionGroup";

//#endregion
//#region src/emoji-reaction/emoji-reaction-picker.tsx
function EmojiReactionPicker(props) {
	const { isOpen, handleToggle, buttonClassName, closeOnSelect = true, disabled = false, dropdownClassName, label, onChange, placement = "bottom-start", searchDisabled = false, searchPlaceholder = "Search", side = "bottom", align = "start" } = props;
	const { finalSide, finalAlign } = useMemo(() => {
		if (placement) {
			const converted = convertPlacementToSideAndAlign(placement);
			return {
				finalSide: converted.side,
				finalAlign: converted.align
			};
		}
		return {
			finalSide: side,
			finalAlign: align
		};
	}, [
		placement,
		side,
		align
	]);
	const handleEmojiChange = useCallback((value) => {
		onChange(emojiToString(value));
		if (closeOnSelect) handleToggle(false);
	}, [
		onChange,
		closeOnSelect,
		handleToggle
	]);
	return /* @__PURE__ */ jsxs(Popover, {
		open: isOpen,
		onOpenChange: handleToggle,
		children: [/* @__PURE__ */ jsx(Popover.Button, {
			className: cn("outline-none", buttonClassName),
			disabled,
			children: label
		}), /* @__PURE__ */ jsx(Popover.Panel, {
			positionerClassName: "z-50",
			className: cn("w-80 bg-custom-background-100 rounded-md border-[0.5px] border-custom-border-300 overflow-hidden", dropdownClassName),
			side: finalSide,
			align: finalAlign,
			sideOffset: 8,
			"data-prevent-outside-click": "true",
			children: /* @__PURE__ */ jsx("div", {
				className: "h-80 overflow-hidden overflow-y-auto",
				children: /* @__PURE__ */ jsx(EmojiRoot, {
					onChange: handleEmojiChange,
					searchPlaceholder,
					searchDisabled
				})
			})
		})]
	});
}

//#endregion
export { EmojiReaction, EmojiReactionButton, EmojiReactionGroup, EmojiReactionPicker };
//# sourceMappingURL=index.js.map