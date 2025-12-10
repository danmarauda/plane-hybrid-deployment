import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useLayoutEffect, useMemo, useRef, useState } from "react";
import { cn, sanitizeHTML } from "@plane/utils";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { NodeViewWrapper, ReactNodeViewRenderer, ReactRenderer, useEditorState } from "@tiptap/react";
import { AlignCenter, AlignLeft, AlignRight, ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Ban, Bold, CaseSensitive, Code2, Copy, Download, Ellipsis, ExternalLink, Heading1, Heading2, Heading3, Heading4, Heading5, Heading6, Image, ImageIcon, Italic, List, ListOrdered, ListTodo, Maximize, Minus, Palette, Plus, RotateCcw, Strikethrough, Table, TextQuote, ToggleRight, Trash2, Underline } from "lucide-react";
import { ChevronDownIcon, ChevronRightIcon, CloseIcon } from "@plane/propel/icons";
import { InputRule, Mark, Node as Node$1, PasteRule, callOrReturn, combineTransactionSteps, escapeForRegEx, findChildren, findChildrenInRange, findParentNode, findParentNodeClosestToPos as findParentNodeClosestToPos$1, getAttributes, getChangedRanges, getExtensionField, getMarksBetween, getSchema, isNodeSelection, markInputRule, markPasteRule, mergeAttributes, nodeInputRule, posToDOMRect, removeDuplicates, textblockTypeInputRule } from "@tiptap/core";
import { NodeSelection, Plugin, PluginKey, Selection, TextSelection } from "@tiptap/pm/state";
import ts from "highlight.js/lib/languages/typescript";
import { common, createLowlight } from "lowlight";
import { Decoration, DecorationSet } from "@tiptap/pm/view";
import highlight from "highlight.js/lib/core";
import { Tooltip } from "@plane/ui";
import { find, registerCustomProtocol, reset } from "linkifyjs";
import { useOutsideClickDetector } from "@plane/hooks";
import ReactDOM from "react-dom";
import { Image as Image$1 } from "@tiptap/extension-image";
import Mention from "@tiptap/extension-mention";
import { autoUpdate, computePosition, flip, shift } from "@floating-ui/dom";
import { FloatingOverlay, FloatingPortal, autoUpdate as autoUpdate$1, flip as flip$1, shift as shift$1, useClick, useDismiss, useFloating, useInteractions, useRole } from "@floating-ui/react";
import Suggestion from "@tiptap/suggestion";
import { CellSelection, TableMap, addColumn, addColumnAfter, addColumnBefore, addRow, addRowAfter, addRowBefore, columnResizing, deleteCellSelection, deleteColumn, deleteRow, deleteTable, fixTables, goToNextCell, mergeCells, removeColumn, removeRow, setCellAttr, splitCell, tableEditing, toggleHeader, toggleHeaderCell, updateColumnsOnResize } from "@tiptap/pm/tables";
import { Fragment as Fragment$1 } from "@tiptap/pm/model";
import { Disclosure } from "@headlessui/react";
import { h } from "jsx-dom-cjs";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import { TextStyle } from "@tiptap/extension-text-style";
import { Underline as Underline$1 } from "@tiptap/extension-underline";
import { emojiToShortcode, emojis, gitHubEmojis, shortcodeToEmoji } from "@tiptap/extension-emoji";
import emojiRegex from "emoji-regex";
import { isEmojiSupported } from "is-emoji-supported";
import Blockquote from "@tiptap/extension-blockquote";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import * as Y from "yjs";
import Document from "@tiptap/extension-document";
import Heading from "@tiptap/extension-heading";
import Text from "@tiptap/extension-text";
import { Buffer } from "buffer";
import { generateHTML, generateJSON } from "@tiptap/html";
import { prosemirrorJSONToYDoc, yXmlFragmentToProseMirrorRootNode } from "y-prosemirror";

//#region src/core/constants/config.ts
const DEFAULT_DISPLAY_CONFIG = {
	fontSize: "large-font",
	fontStyle: "sans-serif",
	lineSpacing: "regular",
	wideLayout: false
};
const ACCEPTED_IMAGE_MIME_TYPES = [
	"image/jpeg",
	"image/jpg",
	"image/png",
	"image/webp",
	"image/gif"
];
const ACCEPTED_ATTACHMENT_MIME_TYPES = [
	"image/jpeg",
	"image/png",
	"image/gif",
	"image/svg+xml",
	"image/webp",
	"image/tiff",
	"image/bmp",
	"application/pdf",
	"application/msword",
	"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
	"application/vnd.ms-excel",
	"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
	"application/vnd.ms-powerpoint",
	"application/vnd.openxmlformats-officedocument.presentationml.presentation",
	"text/plain",
	"application/rtf",
	"audio/mpeg",
	"audio/wav",
	"audio/ogg",
	"audio/midi",
	"audio/x-midi",
	"audio/aac",
	"audio/flac",
	"audio/x-m4a",
	"video/mp4",
	"video/mpeg",
	"video/ogg",
	"video/webm",
	"video/quicktime",
	"video/x-msvideo",
	"video/x-ms-wmv",
	"application/zip",
	"application/x-rar-compressed",
	"application/x-tar",
	"application/gzip",
	"model/gltf-binary",
	"model/gltf+json",
	"application/octet-stream",
	"font/ttf",
	"font/otf",
	"font/woff",
	"font/woff2",
	"text/css",
	"text/javascript",
	"application/json",
	"text/xml",
	"text/csv",
	"application/xml"
];

//#endregion
//#region src/core/constants/extension.ts
let CORE_EXTENSIONS$1 = /* @__PURE__ */ function(CORE_EXTENSIONS$2) {
	CORE_EXTENSIONS$2["BLOCKQUOTE"] = "blockquote";
	CORE_EXTENSIONS$2["BOLD"] = "bold";
	CORE_EXTENSIONS$2["BULLET_LIST"] = "bulletList";
	CORE_EXTENSIONS$2["CALLOUT"] = "calloutComponent";
	CORE_EXTENSIONS$2["CHARACTER_COUNT"] = "characterCount";
	CORE_EXTENSIONS$2["CODE_BLOCK"] = "codeBlock";
	CORE_EXTENSIONS$2["CODE_INLINE"] = "code";
	CORE_EXTENSIONS$2["CUSTOM_COLOR"] = "customColor";
	CORE_EXTENSIONS$2["CUSTOM_IMAGE"] = "imageComponent";
	CORE_EXTENSIONS$2["CUSTOM_LINK"] = "link";
	CORE_EXTENSIONS$2["DOCUMENT"] = "doc";
	CORE_EXTENSIONS$2["DROP_CURSOR"] = "dropCursor";
	CORE_EXTENSIONS$2["ENTER_KEY"] = "enterKey";
	CORE_EXTENSIONS$2["GAP_CURSOR"] = "gapCursor";
	CORE_EXTENSIONS$2["HARD_BREAK"] = "hardBreak";
	CORE_EXTENSIONS$2["HEADING"] = "heading";
	CORE_EXTENSIONS$2["HEADINGS_LIST"] = "headingsList";
	CORE_EXTENSIONS$2["HISTORY"] = "history";
	CORE_EXTENSIONS$2["HORIZONTAL_RULE"] = "horizontalRule";
	CORE_EXTENSIONS$2["IMAGE"] = "image";
	CORE_EXTENSIONS$2["ITALIC"] = "italic";
	CORE_EXTENSIONS$2["LIST_ITEM"] = "listItem";
	CORE_EXTENSIONS$2["MARKDOWN_CLIPBOARD"] = "markdownClipboard";
	CORE_EXTENSIONS$2["MENTION"] = "mention";
	CORE_EXTENSIONS$2["ORDERED_LIST"] = "orderedList";
	CORE_EXTENSIONS$2["PARAGRAPH"] = "paragraph";
	CORE_EXTENSIONS$2["PLACEHOLDER"] = "placeholder";
	CORE_EXTENSIONS$2["SIDE_MENU"] = "editorSideMenu";
	CORE_EXTENSIONS$2["SLASH_COMMANDS"] = "slash-command";
	CORE_EXTENSIONS$2["STRIKETHROUGH"] = "strike";
	CORE_EXTENSIONS$2["TABLE"] = "table";
	CORE_EXTENSIONS$2["TABLE_CELL"] = "tableCell";
	CORE_EXTENSIONS$2["TABLE_HEADER"] = "tableHeader";
	CORE_EXTENSIONS$2["TABLE_ROW"] = "tableRow";
	CORE_EXTENSIONS$2["TASK_ITEM"] = "taskItem";
	CORE_EXTENSIONS$2["TASK_LIST"] = "taskList";
	CORE_EXTENSIONS$2["TEXT_ALIGN"] = "textAlign";
	CORE_EXTENSIONS$2["TEXT_STYLE"] = "textStyle";
	CORE_EXTENSIONS$2["TYPOGRAPHY"] = "typography";
	CORE_EXTENSIONS$2["UNDERLINE"] = "underline";
	CORE_EXTENSIONS$2["UTILITY"] = "utility";
	CORE_EXTENSIONS$2["WORK_ITEM_EMBED"] = "issue-embed-component";
	CORE_EXTENSIONS$2["EMOJI"] = "emoji";
	CORE_EXTENSIONS$2["UNIQUE_ID"] = "uniqueID";
	return CORE_EXTENSIONS$2;
}({});
const BLOCK_NODE_TYPES = [
	CORE_EXTENSIONS$1.PARAGRAPH,
	CORE_EXTENSIONS$1.HEADING,
	CORE_EXTENSIONS$1.BLOCKQUOTE,
	CORE_EXTENSIONS$1.CODE_BLOCK,
	CORE_EXTENSIONS$1.HORIZONTAL_RULE,
	CORE_EXTENSIONS$1.BULLET_LIST,
	CORE_EXTENSIONS$1.ORDERED_LIST,
	CORE_EXTENSIONS$1.LIST_ITEM,
	CORE_EXTENSIONS$1.TASK_LIST,
	CORE_EXTENSIONS$1.TASK_ITEM,
	CORE_EXTENSIONS$1.TABLE,
	CORE_EXTENSIONS$1.IMAGE,
	CORE_EXTENSIONS$1.CUSTOM_IMAGE,
	CORE_EXTENSIONS$1.CALLOUT,
	CORE_EXTENSIONS$1.WORK_ITEM_EMBED
];

//#endregion
//#region src/core/helpers/common.ts
const getEditorClassNames = ({ noBorder, borderOnFocus, containerClassName }) => cn("w-full max-w-full sm:rounded-lg focus:outline-none focus:border-0", {
	"border border-custom-border-200": !noBorder,
	"focus:border border-custom-border-300": borderOnFocus
}, containerClassName);
const findParentNodeOfType = (selection, typeName) => {
	let depth = selection.$anchor.depth;
	while (depth > 0) {
		const node = selection.$anchor.node(depth);
		if (typeName.includes(node.type.name)) return {
			node,
			pos: selection.$anchor.start(depth) - 1,
			depth
		};
		depth--;
	}
	return null;
};
const findTableAncestor = (node) => {
	while (node !== null && node.nodeName !== "TABLE") node = node.parentNode;
	return node;
};
const getTrimmedHTML = (html) => html.replace(/^(?:<p><\/p>)+/g, "").replace(/(?:<p><\/p>)+$/g, "");
const isValidHttpUrl = (string) => {
	const blockedProtocols = [
		"javascript:",
		"data:",
		"vbscript:",
		"file:",
		"about:"
	];
	try {
		const url = new URL(string);
		const protocol = url.protocol.toLowerCase();
		if (blockedProtocols.some((p) => protocol === p)) return {
			isValid: false,
			url: string
		};
		if (url.protocol && url.protocol !== "") return {
			isValid: true,
			url: string
		};
	} catch {}
	try {
		const urlWithHttps = `https://${string}`;
		new URL(urlWithHttps);
		return {
			isValid: true,
			url: urlWithHttps
		};
	} catch {
		return {
			isValid: false,
			url: string
		};
	}
};
const getParagraphCount = (editorState) => {
	if (!editorState) return 0;
	let paragraphCount = 0;
	editorState.doc.descendants((node) => {
		if (node.type.name === CORE_EXTENSIONS$1.PARAGRAPH && node.content.size > 0) paragraphCount++;
	});
	return paragraphCount;
};

//#endregion
//#region src/core/helpers/insert-empty-paragraph-at-node-boundary.ts
const insertEmptyParagraphAtNodeBoundaries = (direction, nodeType) => ({ editor }) => {
	try {
		const { selection, doc } = editor.state;
		const { $from, $to } = selection;
		let targetNode = null;
		let targetNodePos = null;
		doc.nodesBetween($from.pos, $to.pos, (node, pos) => {
			if (node.type.name === nodeType) {
				targetNode = node;
				targetNodePos = pos;
				return false;
			}
			return true;
		});
		if (targetNode === null || targetNodePos === null) return false;
		const docSize = doc.content.size;
		switch (direction) {
			case "up": {
				const insertPosUp = targetNodePos;
				if (insertPosUp < 0 || insertPosUp > docSize) return false;
				if (insertPosUp === 0) {
					editor.chain().insertContentAt(insertPosUp, { type: CORE_EXTENSIONS$1.PARAGRAPH }).run();
					editor.chain().setTextSelection(insertPosUp).run();
				} else {
					const prevNode = doc.nodeAt(insertPosUp - 1);
					if (prevNode && prevNode.type.name === CORE_EXTENSIONS$1.PARAGRAPH) editor.chain().setTextSelection(insertPosUp - 1).run();
					else return false;
				}
				break;
			}
			case "down": {
				const insertPosDown = targetNodePos + targetNode.nodeSize;
				if (insertPosDown < 0 || insertPosDown > docSize) return false;
				const nextNode = doc.nodeAt(insertPosDown);
				if (nextNode && nextNode.type.name === CORE_EXTENSIONS$1.PARAGRAPH) {
					const endOfParagraphPos = insertPosDown + nextNode.nodeSize - 1;
					editor.chain().setTextSelection(endOfParagraphPos).run();
				} else if (!nextNode) {
					editor.chain().insertContentAt(insertPosDown, { type: CORE_EXTENSIONS$1.PARAGRAPH }).run();
					editor.chain().setTextSelection(insertPosDown + 1).run();
				} else return false;
				break;
			}
			default: return false;
		}
		return true;
	} catch (error) {
		console.error(`An error occurred while inserting a line ${direction} the ${nodeType}:`, error);
		return false;
	}
};

//#endregion
//#region src/core/constants/common.ts
const TYPOGRAPHY_ITEMS = [
	{
		itemKey: "text",
		renderKey: "text",
		name: "Text",
		icon: CaseSensitive,
		editors: ["document"]
	},
	{
		itemKey: "h1",
		renderKey: "h1",
		name: "Heading 1",
		icon: Heading1,
		editors: ["document"]
	},
	{
		itemKey: "h2",
		renderKey: "h2",
		name: "Heading 2",
		icon: Heading2,
		editors: ["document"]
	},
	{
		itemKey: "h3",
		renderKey: "h3",
		name: "Heading 3",
		icon: Heading3,
		editors: ["document"]
	},
	{
		itemKey: "h4",
		renderKey: "h4",
		name: "Heading 4",
		icon: Heading4,
		editors: ["document"]
	},
	{
		itemKey: "h5",
		renderKey: "h5",
		name: "Heading 5",
		icon: Heading5,
		editors: ["document"]
	},
	{
		itemKey: "h6",
		renderKey: "h6",
		name: "Heading 6",
		icon: Heading6,
		editors: ["document"]
	}
];
const TEXT_ALIGNMENT_ITEMS = [
	{
		itemKey: "text-align",
		renderKey: "text-align-left",
		name: "Left align",
		icon: AlignLeft,
		shortcut: [
			"Cmd",
			"Shift",
			"L"
		],
		editors: ["lite", "document"],
		extraProps: { alignment: "left" }
	},
	{
		itemKey: "text-align",
		renderKey: "text-align-center",
		name: "Center align",
		icon: AlignCenter,
		shortcut: [
			"Cmd",
			"Shift",
			"E"
		],
		editors: ["lite", "document"],
		extraProps: { alignment: "center" }
	},
	{
		itemKey: "text-align",
		renderKey: "text-align-right",
		name: "Right align",
		icon: AlignRight,
		shortcut: [
			"Cmd",
			"Shift",
			"R"
		],
		editors: ["lite", "document"],
		extraProps: { alignment: "right" }
	}
];
const BASIC_MARK_ITEMS = [
	{
		itemKey: "bold",
		renderKey: "bold",
		name: "Bold",
		icon: Bold,
		shortcut: ["Cmd", "B"],
		editors: ["lite", "document"]
	},
	{
		itemKey: "italic",
		renderKey: "italic",
		name: "Italic",
		icon: Italic,
		shortcut: ["Cmd", "I"],
		editors: ["lite", "document"]
	},
	{
		itemKey: "underline",
		renderKey: "underline",
		name: "Underline",
		icon: Underline,
		shortcut: ["Cmd", "U"],
		editors: ["lite", "document"]
	},
	{
		itemKey: "strikethrough",
		renderKey: "strikethrough",
		name: "Strikethrough",
		icon: Strikethrough,
		shortcut: [
			"Cmd",
			"Shift",
			"S"
		],
		editors: ["lite", "document"]
	}
];
const LIST_ITEMS = [
	{
		itemKey: "bulleted-list",
		renderKey: "bulleted-list",
		name: "Bulleted list",
		icon: List,
		shortcut: [
			"Cmd",
			"Shift",
			"7"
		],
		editors: ["lite", "document"]
	},
	{
		itemKey: "numbered-list",
		renderKey: "numbered-list",
		name: "Numbered list",
		icon: ListOrdered,
		shortcut: [
			"Cmd",
			"Shift",
			"8"
		],
		editors: ["lite", "document"]
	},
	{
		itemKey: "to-do-list",
		renderKey: "to-do-list",
		name: "To-do list",
		icon: ListTodo,
		shortcut: [
			"Cmd",
			"Shift",
			"9"
		],
		editors: ["lite", "document"]
	}
];
const USER_ACTION_ITEMS = [{
	itemKey: "quote",
	renderKey: "quote",
	name: "Quote",
	icon: TextQuote,
	editors: ["lite", "document"]
}, {
	itemKey: "code",
	renderKey: "code",
	name: "Code",
	icon: Code2,
	editors: ["lite", "document"]
}];
const COMPLEX_ITEMS = [{
	itemKey: "table",
	renderKey: "table",
	name: "Table",
	icon: Table,
	editors: ["document"]
}, {
	itemKey: "image",
	renderKey: "image",
	name: "Image",
	icon: Image,
	editors: ["lite", "document"]
}];
const TOOLBAR_ITEMS = {
	lite: {
		basic: BASIC_MARK_ITEMS.filter((item) => item.editors.includes("lite")),
		alignment: TEXT_ALIGNMENT_ITEMS.filter((item) => item.editors.includes("lite")),
		list: LIST_ITEMS.filter((item) => item.editors.includes("lite")),
		userAction: USER_ACTION_ITEMS.filter((item) => item.editors.includes("lite")),
		complex: COMPLEX_ITEMS.filter((item) => item.editors.includes("lite"))
	},
	document: {
		basic: BASIC_MARK_ITEMS.filter((item) => item.editors.includes("document")),
		alignment: TEXT_ALIGNMENT_ITEMS.filter((item) => item.editors.includes("document")),
		list: LIST_ITEMS.filter((item) => item.editors.includes("document")),
		userAction: USER_ACTION_ITEMS.filter((item) => item.editors.includes("document")),
		complex: COMPLEX_ITEMS.filter((item) => item.editors.includes("document"))
	}
};
const COLORS_LIST = [
	{
		key: "gray",
		label: "Gray",
		textColor: "var(--editor-colors-gray-text)",
		backgroundColor: "var(--editor-colors-gray-background)"
	},
	{
		key: "peach",
		label: "Peach",
		textColor: "var(--editor-colors-peach-text)",
		backgroundColor: "var(--editor-colors-peach-background)"
	},
	{
		key: "pink",
		label: "Pink",
		textColor: "var(--editor-colors-pink-text)",
		backgroundColor: "var(--editor-colors-pink-background)"
	},
	{
		key: "orange",
		label: "Orange",
		textColor: "var(--editor-colors-orange-text)",
		backgroundColor: "var(--editor-colors-orange-background)"
	},
	{
		key: "green",
		label: "Green",
		textColor: "var(--editor-colors-green-text)",
		backgroundColor: "var(--editor-colors-green-background)"
	},
	{
		key: "light-blue",
		label: "Light blue",
		textColor: "var(--editor-colors-light-blue-text)",
		backgroundColor: "var(--editor-colors-light-blue-background)"
	},
	{
		key: "dark-blue",
		label: "Dark blue",
		textColor: "var(--editor-colors-dark-blue-text)",
		backgroundColor: "var(--editor-colors-dark-blue-background)"
	},
	{
		key: "purple",
		label: "Purple",
		textColor: "var(--editor-colors-purple-text)",
		backgroundColor: "var(--editor-colors-purple-background)"
	}
];

//#endregion
//#region src/core/extensions/callout/types.ts
let ECalloutAttributeNames = /* @__PURE__ */ function(ECalloutAttributeNames$1) {
	ECalloutAttributeNames$1["ICON_COLOR"] = "data-icon-color";
	ECalloutAttributeNames$1["ICON_NAME"] = "data-icon-name";
	ECalloutAttributeNames$1["EMOJI_UNICODE"] = "data-emoji-unicode";
	ECalloutAttributeNames$1["EMOJI_URL"] = "data-emoji-url";
	ECalloutAttributeNames$1["LOGO_IN_USE"] = "data-logo-in-use";
	ECalloutAttributeNames$1["BACKGROUND"] = "data-background";
	ECalloutAttributeNames$1["BLOCK_TYPE"] = "data-block-type";
	return ECalloutAttributeNames$1;
}({});

//#endregion
//#region src/core/extensions/callout/utils.ts
const DEFAULT_CALLOUT_BLOCK_ATTRIBUTES = {
	[ECalloutAttributeNames.LOGO_IN_USE]: "emoji",
	[ECalloutAttributeNames.ICON_COLOR]: void 0,
	[ECalloutAttributeNames.ICON_NAME]: void 0,
	[ECalloutAttributeNames.EMOJI_UNICODE]: "128161",
	[ECalloutAttributeNames.EMOJI_URL]: "https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f4a1.png",
	[ECalloutAttributeNames.BACKGROUND]: void 0,
	[ECalloutAttributeNames.BLOCK_TYPE]: "callout-component"
};
const getStoredLogo = () => {
	const fallBackValues = {
		[ECalloutAttributeNames.LOGO_IN_USE]: "emoji",
		[ECalloutAttributeNames.EMOJI_UNICODE]: DEFAULT_CALLOUT_BLOCK_ATTRIBUTES[ECalloutAttributeNames.EMOJI_UNICODE],
		[ECalloutAttributeNames.EMOJI_URL]: DEFAULT_CALLOUT_BLOCK_ATTRIBUTES[ECalloutAttributeNames.EMOJI_URL]
	};
	if (typeof window !== "undefined") {
		const storedData = sanitizeHTML(localStorage.getItem("editor-calloutComponent-logo") ?? "");
		if (storedData) {
			let parsedData;
			try {
				parsedData = JSON.parse(storedData);
			} catch (error) {
				console.error(`Error parsing stored callout logo, stored value- ${storedData}`, error);
				localStorage.removeItem("editor-calloutComponent-logo");
				return fallBackValues;
			}
			if (parsedData.in_use === "emoji" && parsedData.emoji?.value) return {
				[ECalloutAttributeNames.LOGO_IN_USE]: "emoji",
				[ECalloutAttributeNames.EMOJI_UNICODE]: parsedData.emoji.value || DEFAULT_CALLOUT_BLOCK_ATTRIBUTES[ECalloutAttributeNames.EMOJI_UNICODE],
				[ECalloutAttributeNames.EMOJI_URL]: parsedData.emoji.url || DEFAULT_CALLOUT_BLOCK_ATTRIBUTES[ECalloutAttributeNames.EMOJI_URL]
			};
			if (parsedData.in_use === "icon" && parsedData.icon?.name) return {
				[ECalloutAttributeNames.LOGO_IN_USE]: "icon",
				[ECalloutAttributeNames.ICON_NAME]: parsedData.icon.name || DEFAULT_CALLOUT_BLOCK_ATTRIBUTES[ECalloutAttributeNames.ICON_NAME],
				[ECalloutAttributeNames.ICON_COLOR]: parsedData.icon.color || DEFAULT_CALLOUT_BLOCK_ATTRIBUTES[ECalloutAttributeNames.ICON_COLOR]
			};
		}
	}
	return fallBackValues;
};
const updateStoredLogo = (value) => {
	if (typeof window === "undefined") return;
	localStorage.setItem("editor-calloutComponent-logo", JSON.stringify(value));
};
const getStoredBackgroundColor = () => {
	if (typeof window !== "undefined") return sanitizeHTML(localStorage.getItem("editor-calloutComponent-background") ?? "");
	return null;
};
const updateStoredBackgroundColor = (value) => {
	if (typeof window === "undefined") return;
	if (value === null) {
		localStorage.removeItem("editor-calloutComponent-background");
		return;
	} else localStorage.setItem("editor-calloutComponent-background", value);
};

//#endregion
//#region src/core/extensions/callout/extension-config.ts
const CustomCalloutExtensionConfig = Node$1.create({
	name: CORE_EXTENSIONS$1.CALLOUT,
	group: "block",
	content: "block+",
	addAttributes() {
		return { ...Object.values(ECalloutAttributeNames).reduce((acc, value) => {
			acc[value] = { default: DEFAULT_CALLOUT_BLOCK_ATTRIBUTES[value] };
			return acc;
		}, {}) };
	},
	addStorage() {
		return { markdown: { serialize(state, node) {
			const attrs = node.attrs;
			if (attrs["data-logo-in-use"] === "emoji") state.write(`> <img src="${attrs["data-emoji-url"]}" alt="${attrs["data-emoji-unicode"]}" width="30px" />\n`);
			else state.write(`> <icon>${attrs["data-icon-name"]} icon</icon>\n`);
			state.write("> \n");
			state.wrapBlock("> ", null, node, () => state.renderContent(node));
			state.closeBlock(node);
		} } };
	},
	parseHTML() {
		return [{ tag: `div[${ECalloutAttributeNames.BLOCK_TYPE}="${DEFAULT_CALLOUT_BLOCK_ATTRIBUTES[ECalloutAttributeNames.BLOCK_TYPE]}"]` }];
	},
	renderHTML({ HTMLAttributes }) {
		return [
			"div",
			mergeAttributes(HTMLAttributes),
			0
		];
	}
});

//#endregion
//#region src/core/extensions/code/code-block.ts
const backtickInputRegex = /^```([a-z]+)?[\s\n]$/;
const tildeInputRegex = /^~~~([a-z]+)?[\s\n]$/;
const CodeBlock = Node$1.create({
	name: CORE_EXTENSIONS$1.CODE_BLOCK,
	addOptions() {
		return {
			languageClassPrefix: "language-",
			exitOnTripleEnter: true,
			exitOnArrowDown: true,
			HTMLAttributes: {}
		};
	},
	content: "text*",
	marks: "",
	group: "block",
	code: true,
	defining: true,
	addAttributes() {
		return { language: {
			default: null,
			parseHTML: (element) => {
				const { languageClassPrefix } = this.options;
				const language = [...element.firstElementChild?.classList || []].filter((className) => className.startsWith(languageClassPrefix)).map((className) => className.replace(languageClassPrefix, ""))[0];
				if (!language) return null;
				return language;
			},
			rendered: false
		} };
	},
	parseHTML() {
		return [{
			tag: "pre",
			preserveWhitespace: "full"
		}];
	},
	renderHTML({ node, HTMLAttributes }) {
		return [
			"pre",
			mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
			[
				"code",
				{ class: node.attrs.language ? this.options.languageClassPrefix + node.attrs.language : null },
				0
			]
		];
	},
	addCommands() {
		return {
			setCodeBlock: (attributes) => ({ commands }) => commands.setNode(this.name, attributes),
			toggleCodeBlock: (attributes) => ({ commands }) => commands.toggleNode(this.name, CORE_EXTENSIONS$1.PARAGRAPH, attributes)
		};
	},
	addKeyboardShortcuts() {
		return {
			"Mod-Alt-c": () => this.editor.commands.toggleCodeBlock(),
			Backspace: () => {
				try {
					const { empty, $anchor } = this.editor.state.selection;
					const isAtStart = $anchor.pos === 1;
					if (!empty || $anchor.parent.type.name !== this.name) return false;
					if (isAtStart || !$anchor.parent.textContent.length) return this.editor.commands.clearNodes();
					return false;
				} catch (error) {
					console.error("Error handling Backspace in code block:", error);
					return false;
				}
			},
			Enter: ({ editor }) => {
				try {
					if (!this.options.exitOnTripleEnter) return false;
					const { state } = editor;
					const { selection } = state;
					const { $from, empty } = selection;
					if (!empty || $from.parent.type !== this.type) return false;
					const isAtEnd = $from.parentOffset === $from.parent.nodeSize - 2;
					const endsWithDoubleNewline = $from.parent.textContent.endsWith("\n\n");
					if (!isAtEnd || !endsWithDoubleNewline) return false;
					return editor.chain().command(({ tr }) => {
						tr.delete($from.pos - 2, $from.pos);
						return true;
					}).exitCode().run();
				} catch (error) {
					console.error("Error handling Enter in code block:", error);
					return false;
				}
			},
			ArrowDown: ({ editor }) => {
				try {
					if (!this.options.exitOnArrowDown) return false;
					const { state } = editor;
					const { selection, doc } = state;
					const { $from, empty } = selection;
					if (!empty || $from.parent.type !== this.type) return false;
					if (!($from.parentOffset === $from.parent.nodeSize - 2)) return false;
					const after = $from.after();
					if (after === void 0) return false;
					if (doc.nodeAt(after)) return false;
					return editor.commands.exitCode();
				} catch (error) {
					console.error("Error handling ArrowDown in code block:", error);
					return false;
				}
			}
		};
	},
	addInputRules() {
		return [textblockTypeInputRule({
			find: backtickInputRegex,
			type: this.type,
			getAttributes: (match) => ({ language: match[1] })
		}), textblockTypeInputRule({
			find: tildeInputRegex,
			type: this.type,
			getAttributes: (match) => ({ language: match[1] })
		})];
	},
	addProseMirrorPlugins() {
		return [new Plugin({
			key: new PluginKey("codeBlockVSCodeHandlerCustom"),
			props: { handlePaste: (view, event) => {
				try {
					if (!event.clipboardData) return false;
					if (this.editor.isActive(this.type.name)) return false;
					if (this.editor.isActive(CORE_EXTENSIONS$1.CODE_INLINE)) {
						event.preventDefault();
						const text$1 = event.clipboardData.getData("text/plain");
						if (!text$1) {
							console.error("Pasted text is empty.");
							return false;
						}
						const { tr } = view.state;
						const { $from, $to } = tr.selection;
						if ($from.pos > $to.pos) {
							console.error("Invalid selection range.");
							return false;
						}
						const docSize = tr.doc.content.size;
						if ($from.pos < 0 || $to.pos > docSize) {
							console.error("Selection range is out of document bounds.");
							return false;
						}
						const codeMark = view.state.schema.marks.code.create();
						tr.replaceWith($from.pos, $to.pos, view.state.schema.text(text$1, [codeMark]));
						view.dispatch(tr);
						return true;
					}
					event.preventDefault();
					const text = event.clipboardData.getData("text/plain");
					const vscode = event.clipboardData.getData("vscode-editor-data");
					const vscodeData = vscode ? JSON.parse(vscode) : void 0;
					const language = vscodeData?.mode;
					if (vscodeData && language) {
						const { tr } = view.state;
						const { $from } = tr.selection;
						const isCurrentLineEmpty = !$from.parent.textContent.trim();
						let insertPos;
						if (isCurrentLineEmpty) insertPos = $from.pos - 1;
						else insertPos = $from.end($from.depth) + 1;
						if (insertPos < 0 || insertPos > tr.doc.content.size) {
							console.error("Invalid insert position.");
							return false;
						}
						const textNode = view.state.schema.text(text.replace(/\r\n?/g, "\n"));
						const codeBlock = this.type.create({ language }, textNode);
						if (insertPos <= tr.doc.content.size) {
							tr.insert(insertPos, codeBlock);
							view.dispatch(tr);
							return true;
						}
						return false;
					} else return false;
				} catch (error) {
					console.error("Error handling paste in CodeBlock extension:", error);
					return false;
				}
			} }
		})];
	}
});

//#endregion
//#region src/core/extensions/code/lowlight-plugin.ts
function parseNodes(nodes, className = []) {
	return nodes.map((node) => {
		const classes = [...className, ...node.properties ? node.properties.className : []];
		if (node.children) return parseNodes(node.children, classes);
		return {
			text: node.value,
			classes
		};
	}).flat();
}
function getHighlightNodes(result) {
	return result.value || result.children || [];
}
function registered(aliasOrLanguage) {
	return Boolean(highlight.getLanguage(aliasOrLanguage));
}
function getDecorations({ doc, name, lowlight: lowlight$1, defaultLanguage }) {
	const decorations = [];
	findChildren(doc, (node) => node.type.name === name).forEach((block) => {
		let from = block.pos + 1;
		const language = block.node.attrs.language || defaultLanguage;
		const languages = lowlight$1.listLanguages();
		parseNodes(language && (languages.includes(language) || registered(language)) ? getHighlightNodes(lowlight$1.highlight(language, block.node.textContent)) : getHighlightNodes(lowlight$1.highlightAuto(block.node.textContent))).forEach((node) => {
			const to = from + node.text.length;
			if (node.classes.length) {
				const decoration = Decoration.inline(from, to, { class: node.classes.join(" ") });
				decorations.push(decoration);
			}
			from = to;
		});
	});
	return DecorationSet.create(doc, decorations);
}
function isFunction(param) {
	return typeof param === "function";
}
function LowlightPlugin({ name, lowlight: lowlight$1, defaultLanguage }) {
	if (![
		"highlight",
		"highlightAuto",
		"listLanguages"
	].every((api) => isFunction(lowlight$1[api]))) throw Error("You should provide an instance of lowlight to use the code-block-lowlight extension");
	const lowlightPlugin = new Plugin({
		key: new PluginKey("lowlight"),
		state: {
			init: (_, { doc }) => getDecorations({
				doc,
				name,
				lowlight: lowlight$1,
				defaultLanguage
			}),
			apply: (transaction, decorationSet, oldState, newState) => {
				const oldNodeName = oldState.selection.$head.parent.type.name;
				const newNodeName = newState.selection.$head.parent.type.name;
				const oldNodes = findChildren(oldState.doc, (node) => node.type.name === name);
				const newNodes = findChildren(newState.doc, (node) => node.type.name === name);
				if (transaction.docChanged && ([oldNodeName, newNodeName].includes(name) || newNodes.length !== oldNodes.length || transaction.steps.some((step) => step.from !== void 0 && step.to !== void 0 && oldNodes.some((node) => node.pos >= step.from && node.pos + node.node.nodeSize <= step.to)))) return getDecorations({
					doc: transaction.doc,
					name,
					lowlight: lowlight$1,
					defaultLanguage
				});
				return decorationSet.map(transaction.mapping, transaction.doc);
			}
		},
		props: { decorations(state) {
			return lowlightPlugin.getState(state);
		} }
	});
	return lowlightPlugin;
}

//#endregion
//#region src/core/extensions/code/code-block-lowlight.ts
const CodeBlockLowlight = CodeBlock.extend({
	addOptions() {
		return {
			...this.parent?.() ?? {
				languageClassPrefix: "language-",
				exitOnTripleEnter: true,
				exitOnArrowDown: true,
				HTMLAttributes: {}
			},
			lowlight: {},
			defaultLanguage: null
		};
	},
	addProseMirrorPlugins() {
		return [...this.parent?.() || [], LowlightPlugin({
			name: this.name,
			lowlight: this.options.lowlight,
			defaultLanguage: this.options.defaultLanguage
		})];
	}
});

//#endregion
//#region src/core/extensions/code-inline/index.tsx
const inputRegex$1 = /(?:^|\s)((?:`)((?:[^`]+))(?:`))$/;
const pasteRegex$1 = /(?:^|\s)((?:`)((?:[^`]+))(?:`))/g;
const CustomCodeInlineExtension = Mark.create({
	name: CORE_EXTENSIONS$1.CODE_INLINE,
	addOptions() {
		return { HTMLAttributes: {
			class: "rounded bg-custom-background-80 px-[6px] py-[1.5px] font-mono font-medium text-orange-500 border-[0.5px] border-custom-border-200",
			spellcheck: "false"
		} };
	},
	excludes: "_",
	code: true,
	exitable: true,
	parseHTML() {
		return [{ tag: "code" }];
	},
	renderHTML({ HTMLAttributes }) {
		return [
			"code",
			mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
			0
		];
	},
	addCommands() {
		return {
			setCode: () => ({ commands }) => commands.setMark(this.name),
			toggleCode: () => ({ commands }) => commands.toggleMark(this.name),
			unsetCode: () => ({ commands }) => commands.unsetMark(this.name)
		};
	},
	addKeyboardShortcuts() {
		return { "Mod-e": () => this.editor.commands.toggleCode() };
	},
	addInputRules() {
		return [markInputRule({
			find: inputRegex$1,
			type: this.type
		})];
	},
	addPasteRules() {
		return [markPasteRule({
			find: pasteRegex$1,
			type: this.type
		})];
	}
});

//#endregion
//#region src/core/extensions/custom-link/helpers/autolink.ts
function autolink(options) {
	return new Plugin({
		key: new PluginKey("autolink"),
		appendTransaction: (transactions, oldState, newState) => {
			const docChanges = transactions.some((transaction) => transaction.docChanged) && !oldState.doc.eq(newState.doc);
			const preventAutolink = transactions.some((transaction) => transaction.getMeta("preventAutolink"));
			if (!docChanges || preventAutolink) return;
			const { tr } = newState;
			getChangedRanges(combineTransactionSteps(oldState.doc, [...transactions])).forEach(({ newRange }) => {
				const nodesInChangedRanges = findChildrenInRange(newState.doc, newRange, (node) => node.isTextblock);
				let textBlock;
				let textBeforeWhitespace;
				if (nodesInChangedRanges.length > 1) {
					textBlock = nodesInChangedRanges[0];
					textBeforeWhitespace = newState.doc.textBetween(textBlock.pos, textBlock.pos + textBlock.node.nodeSize, void 0, " ");
				} else if (nodesInChangedRanges.length && newState.doc.textBetween(newRange.from, newRange.to, " ", " ").endsWith(" ")) {
					textBlock = nodesInChangedRanges[0];
					textBeforeWhitespace = newState.doc.textBetween(textBlock.pos, newRange.to, void 0, " ");
				}
				if (textBlock && textBeforeWhitespace) {
					const wordsBeforeWhitespace = textBeforeWhitespace.split(" ").filter((s) => s !== "");
					if (wordsBeforeWhitespace.length <= 0) return false;
					const lastWordBeforeSpace = wordsBeforeWhitespace[wordsBeforeWhitespace.length - 1];
					const lastWordAndBlockOffset = textBlock.pos + textBeforeWhitespace.lastIndexOf(lastWordBeforeSpace);
					if (!lastWordBeforeSpace) return false;
					find(lastWordBeforeSpace).filter((link) => link.isLink).map((link) => ({
						...link,
						from: lastWordAndBlockOffset + link.start + 1,
						to: lastWordAndBlockOffset + link.end + 1
					})).filter((link) => {
						if (!newState.schema.marks.code) return true;
						return !newState.doc.rangeHasMark(link.from, link.to, newState.schema.marks.code);
					}).filter((link) => {
						if (options.validate) return options.validate(link.value);
						return true;
					}).forEach((link) => {
						if (getMarksBetween(link.from, link.to, newState.doc).some((item) => item.mark.type === options.type)) return;
						tr.addMark(link.from, link.to, options.type.create({ href: link.href }));
					});
				}
			});
			if (!tr.steps.length) return;
			return tr;
		}
	});
}

//#endregion
//#region src/core/extensions/custom-link/helpers/clickHandler.ts
function clickHandler(options) {
	return new Plugin({
		key: new PluginKey("handleClickLink"),
		props: { handleClick: (view, pos, event) => {
			if (event.button !== 0) return false;
			let a = event.target;
			const els = [];
			while (a?.nodeName !== "DIV") {
				els.push(a);
				a = a?.parentNode;
			}
			if (!els.find((value) => value.nodeName === "A")) return false;
			const attrs = getAttributes(view.state, options.type.name);
			const link = event.target;
			const href = link?.href ?? attrs.href;
			const target = link?.target ?? attrs.target;
			if (link && href) {
				window.open(href, target);
				return true;
			}
			return false;
		} }
	});
}

//#endregion
//#region src/core/extensions/custom-link/helpers/pasteHandler.ts
function pasteHandler(options) {
	return new Plugin({
		key: new PluginKey("handlePasteLink"),
		props: { handlePaste: (view, event, slice) => {
			const { state } = view;
			const { selection } = state;
			const { empty } = selection;
			if (empty) return false;
			let textContent = "";
			slice.content.forEach((node) => {
				textContent += node.textContent;
			});
			const link = find(textContent).find((item) => item.isLink && item.value === textContent);
			if (!textContent || !link) return false;
			options.editor.commands.setMark(options.type, { href: link.href });
			return true;
		} }
	});
}

//#endregion
//#region src/core/extensions/custom-link/extension.tsx
const CustomLinkExtension = Mark.create({
	name: CORE_EXTENSIONS$1.CUSTOM_LINK,
	priority: 1e3,
	keepOnSplit: false,
	onCreate() {
		this.options.protocols.forEach((protocol) => {
			if (typeof protocol === "string") {
				registerCustomProtocol(protocol);
				return;
			}
			registerCustomProtocol(protocol.scheme, protocol.optionalSlashes);
		});
	},
	onDestroy() {
		reset();
	},
	inclusive() {
		return this.options.inclusive;
	},
	addOptions() {
		return {
			openOnClick: true,
			linkOnPaste: true,
			autolink: true,
			inclusive: false,
			protocols: ["http", "https"],
			HTMLAttributes: {
				target: "_blank",
				rel: "noopener noreferrer nofollow",
				class: "text-custom-primary-300 underline underline-offset-[3px] hover:text-custom-primary-500 transition-colors cursor-pointer"
			},
			validate: (url) => isValidHttpUrl(url).isValid
		};
	},
	addAttributes() {
		return {
			href: { default: null },
			target: { default: this.options.HTMLAttributes.target },
			rel: { default: this.options.HTMLAttributes.rel },
			class: { default: this.options.HTMLAttributes.class }
		};
	},
	parseHTML() {
		return [{
			tag: "a[href]",
			getAttrs: (node) => {
				if (typeof node === "string") return null;
				const href = node.getAttribute("href")?.toLowerCase() || "";
				if (href.startsWith("javascript:") || href.startsWith("data:") || href.startsWith("vbscript:")) return false;
				return {};
			}
		}];
	},
	renderHTML({ HTMLAttributes }) {
		const href = HTMLAttributes.href?.toLowerCase() || "";
		if (href.startsWith("javascript:") || href.startsWith("data:") || href.startsWith("vbscript:")) return [
			"a",
			mergeAttributes(this.options.HTMLAttributes, {
				...HTMLAttributes,
				href: ""
			}),
			0
		];
		return [
			"a",
			mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
			0
		];
	},
	addCommands() {
		return {
			setLink: (attributes) => ({ chain }) => chain().setMark(this.name, attributes).setMeta("preventAutolink", true).run(),
			toggleLink: (attributes) => ({ chain }) => chain().toggleMark(this.name, attributes, { extendEmptyMarkRange: true }).setMeta("preventAutolink", true).run(),
			unsetLink: () => ({ chain }) => chain().unsetMark(this.name, { extendEmptyMarkRange: true }).setMeta("preventAutolink", true).run()
		};
	},
	addPasteRules() {
		return [markPasteRule({
			find: (text) => {
				const foundLinks = [];
				if (text) {
					const links = find(text).filter((item) => item.isLink);
					if (links.length) links.forEach((link) => foundLinks.push({
						text: link.value,
						data: { href: link.href },
						index: link.start
					}));
				}
				return foundLinks;
			},
			type: this.type,
			getAttributes: (match) => ({ href: match.data?.href })
		})];
	},
	addProseMirrorPlugins() {
		const plugins = [];
		if (this.options.autolink) plugins.push(autolink({
			type: this.type,
			validate: this.options.validate
		}));
		if (this.options.openOnClick) plugins.push(clickHandler({ type: this.type }));
		if (this.options.linkOnPaste) plugins.push(pasteHandler({
			editor: this.editor,
			type: this.type
		}));
		return plugins;
	},
	addStorage() {
		return {
			isPreviewOpen: false,
			isBubbleMenuOpen: false,
			posToInsert: {
				from: 0,
				to: 0
			}
		};
	}
});

//#endregion
//#region src/core/extensions/custom-image/types.ts
let ECustomImageAttributeNames = /* @__PURE__ */ function(ECustomImageAttributeNames$1) {
	ECustomImageAttributeNames$1["ID"] = "id";
	ECustomImageAttributeNames$1["WIDTH"] = "width";
	ECustomImageAttributeNames$1["HEIGHT"] = "height";
	ECustomImageAttributeNames$1["ASPECT_RATIO"] = "aspectRatio";
	ECustomImageAttributeNames$1["SOURCE"] = "src";
	ECustomImageAttributeNames$1["ALIGNMENT"] = "alignment";
	ECustomImageAttributeNames$1["STATUS"] = "status";
	return ECustomImageAttributeNames$1;
}({});
let ECustomImageStatus = /* @__PURE__ */ function(ECustomImageStatus$1) {
	ECustomImageStatus$1["PENDING"] = "pending";
	ECustomImageStatus$1["UPLOADING"] = "uploading";
	ECustomImageStatus$1["UPLOADED"] = "uploaded";
	ECustomImageStatus$1["DUPLICATING"] = "duplicating";
	ECustomImageStatus$1["DUPLICATION_FAILED"] = "duplication-failed";
	return ECustomImageStatus$1;
}({});

//#endregion
//#region src/core/extensions/custom-image/utils.ts
const DEFAULT_CUSTOM_IMAGE_ATTRIBUTES = {
	[ECustomImageAttributeNames.SOURCE]: null,
	[ECustomImageAttributeNames.ID]: null,
	[ECustomImageAttributeNames.WIDTH]: "35%",
	[ECustomImageAttributeNames.HEIGHT]: "auto",
	[ECustomImageAttributeNames.ASPECT_RATIO]: null,
	[ECustomImageAttributeNames.ALIGNMENT]: "left",
	[ECustomImageAttributeNames.STATUS]: ECustomImageStatus.PENDING
};
const getImageComponentImageFileMap = (editor) => editor.storage.imageComponent?.fileMap;
const ensurePixelString = (value, defaultValue) => {
	if (!value || value === defaultValue) return defaultValue;
	if (typeof value === "number") return `${value}px`;
	return value;
};
const IMAGE_ALIGNMENT_OPTIONS = [
	{
		label: "Left",
		value: "left",
		icon: AlignLeft
	},
	{
		label: "Center",
		value: "center",
		icon: AlignCenter
	},
	{
		label: "Right",
		value: "right",
		icon: AlignRight
	}
];
const getImageBlockId = (id) => `editor-image-block-${id}`;
const isImageDuplicating = (status) => status === ECustomImageStatus.DUPLICATING;
const hasImageDuplicationFailed = (status) => status === ECustomImageStatus.DUPLICATION_FAILED;

//#endregion
//#region src/core/extensions/custom-image/components/toolbar/alignment.tsx
function ImageAlignmentAction(props) {
	const { activeAlignment, handleChange, isTouchDevice, toggleToolbarViewStatus } = props;
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const dropdownRef = useRef(null);
	const activeAlignmentDetails = IMAGE_ALIGNMENT_OPTIONS.find((option) => option.value === activeAlignment);
	useOutsideClickDetector(dropdownRef, () => setIsDropdownOpen(false));
	useEffect(() => {
		toggleToolbarViewStatus(isDropdownOpen);
	}, [isDropdownOpen, toggleToolbarViewStatus]);
	return /* @__PURE__ */ jsxs("div", {
		ref: dropdownRef,
		className: "h-full relative",
		children: [/* @__PURE__ */ jsx(Tooltip, {
			disabled: isTouchDevice,
			tooltipContent: "Align",
			children: /* @__PURE__ */ jsxs("button", {
				type: "button",
				className: "h-full flex items-center gap-1 text-white/60 hover:text-white transition-colors",
				onClick: () => setIsDropdownOpen((prev) => !prev),
				children: [activeAlignmentDetails && /* @__PURE__ */ jsx(activeAlignmentDetails.icon, { className: "flex-shrink-0 size-3" }), /* @__PURE__ */ jsx(ChevronDownIcon, { className: "flex-shrink-0 size-2" })]
			})
		}), isDropdownOpen && /* @__PURE__ */ jsx("div", {
			className: "absolute top-full left-1/2 -translate-x-1/2 mt-0.5 h-7 bg-black/80 flex items-center gap-2 px-2 rounded",
			children: IMAGE_ALIGNMENT_OPTIONS.map((option) => /* @__PURE__ */ jsx(Tooltip, {
				disabled: isTouchDevice,
				tooltipContent: option.label,
				children: /* @__PURE__ */ jsx("button", {
					type: "button",
					className: "flex-shrink-0 h-full grid place-items-center text-white/60 hover:text-white transition-colors",
					onClick: () => {
						handleChange(option.value);
						setIsDropdownOpen(false);
					},
					children: /* @__PURE__ */ jsx(option.icon, { className: "size-3" })
				})
			}, option.value))
		})]
	});
}

//#endregion
//#region src/core/extensions/custom-image/components/toolbar/download.tsx
function ImageDownloadAction(props) {
	const { src } = props;
	return /* @__PURE__ */ jsx(Tooltip, {
		tooltipContent: "Download",
		children: /* @__PURE__ */ jsx("button", {
			type: "button",
			onClick: () => window.open(src, "_blank"),
			className: "flex-shrink-0 h-full grid place-items-center text-white/60 hover:text-white transition-colors",
			"aria-label": "Download image",
			children: /* @__PURE__ */ jsx(Download, { className: "size-3" })
		})
	});
}

//#endregion
//#region src/core/extensions/custom-image/components/toolbar/full-screen/modal.tsx
const MIN_ZOOM = .5;
const MAX_ZOOM = 2;
const ZOOM_SPEED = .05;
const ZOOM_STEPS = [
	.5,
	1,
	1.5,
	2
];
function ImageFullScreenModalWithoutPortal(props) {
	const { aspectRatio, isFullScreenEnabled, isTouchDevice, downloadSrc, src, toggleFullScreenMode, width } = props;
	const dragStart = useRef({
		x: 0,
		y: 0
	});
	const dragOffset = useRef({
		x: 0,
		y: 0
	});
	const [magnification, setMagnification] = useState(1);
	const [initialMagnification, setInitialMagnification] = useState(1);
	const [isDragging, setIsDragging] = useState(false);
	const modalRef = useRef(null);
	const imgRef = useRef(null);
	const widthInNumber = useMemo(() => {
		if (!width) return 0;
		return Number(width.replace("px", ""));
	}, [width]);
	const setImageRef = useCallback((node) => {
		if (!node || !isFullScreenEnabled) return;
		imgRef.current = node;
		const viewportWidth = window.innerWidth * .9;
		const viewportHeight = window.innerHeight * .75;
		const imageWidth = widthInNumber;
		const imageHeight = imageWidth / aspectRatio;
		const widthRatio = viewportWidth / imageWidth;
		const heightRatio = viewportHeight / imageHeight;
		setInitialMagnification(Math.min(widthRatio, heightRatio));
		setMagnification(1);
		node.style.left = "0px";
		node.style.top = "0px";
	}, [
		isFullScreenEnabled,
		widthInNumber,
		aspectRatio
	]);
	const handleClose = useCallback(() => {
		if (isDragging) return;
		toggleFullScreenMode(false);
		setMagnification(1);
		setInitialMagnification(1);
	}, [isDragging, toggleFullScreenMode]);
	const handleMagnification = useCallback((direction) => {
		setMagnification((prev) => {
			let targetZoom;
			if (direction === "increase") targetZoom = ZOOM_STEPS.find((step) => step > prev) ?? MAX_ZOOM;
			else targetZoom = [...ZOOM_STEPS].reverse().find((step) => step < prev) ?? MIN_ZOOM;
			if (targetZoom === 1 && imgRef.current) {
				imgRef.current.style.left = "0px";
				imgRef.current.style.top = "0px";
			}
			return targetZoom;
		});
	}, []);
	const handleKeyDown = useCallback((e) => {
		if (e.key === "Escape" || e.key === "+" || e.key === "=" || e.key === "-") {
			e.preventDefault();
			e.stopPropagation();
			if (e.key === "Escape") handleClose();
			if (e.key === "+" || e.key === "=") handleMagnification("increase");
			if (e.key === "-") handleMagnification("decrease");
		}
	}, [handleClose, handleMagnification]);
	const handleMouseDown = (e) => {
		if (!imgRef.current) return;
		const imgWidth = imgRef.current.offsetWidth * magnification;
		const imgHeight = imgRef.current.offsetHeight * magnification;
		const viewportWidth = window.innerWidth;
		const viewportHeight = window.innerHeight;
		if (imgWidth > viewportWidth || imgHeight > viewportHeight) {
			e.preventDefault();
			e.stopPropagation();
			setIsDragging(true);
			dragStart.current = {
				x: e.clientX,
				y: e.clientY
			};
			dragOffset.current = {
				x: parseInt(imgRef.current.style.left || "0"),
				y: parseInt(imgRef.current.style.top || "0")
			};
		}
	};
	const handleMouseMove = useCallback((e) => {
		if (!isDragging || !imgRef.current) return;
		const dx = e.clientX - dragStart.current.x;
		const dy = e.clientY - dragStart.current.y;
		const scaledDx = dx / magnification;
		const scaledDy = dy / magnification;
		imgRef.current.style.left = `${dragOffset.current.x + scaledDx}px`;
		imgRef.current.style.top = `${dragOffset.current.y + scaledDy}px`;
	}, [isDragging, magnification]);
	const handleMouseUp = useCallback(() => {
		if (!isDragging || !imgRef.current) return;
		setIsDragging(false);
	}, [isDragging]);
	const handleWheel = useCallback((e) => {
		if (!imgRef.current || !isFullScreenEnabled) return;
		e.preventDefault();
		if (e.ctrlKey || e.metaKey) {
			const delta = e.deltaY;
			setMagnification((prev) => {
				const newZoom = prev * (1 - delta * ZOOM_SPEED);
				const clampedZoom = Math.min(Math.max(newZoom, MIN_ZOOM), MAX_ZOOM);
				if (clampedZoom === 1 && imgRef.current) {
					imgRef.current.style.left = "0px";
					imgRef.current.style.top = "0px";
				}
				return clampedZoom;
			});
			return;
		}
	}, [isFullScreenEnabled]);
	useEffect(() => {
		if (!isFullScreenEnabled) return;
		document.addEventListener("keydown", handleKeyDown);
		window.addEventListener("mousemove", handleMouseMove);
		window.addEventListener("mouseup", handleMouseUp);
		window.addEventListener("wheel", handleWheel, { passive: false });
		return () => {
			document.removeEventListener("keydown", handleKeyDown);
			window.removeEventListener("mousemove", handleMouseMove);
			window.removeEventListener("mouseup", handleMouseUp);
			window.removeEventListener("wheel", handleWheel);
		};
	}, [
		isFullScreenEnabled,
		handleKeyDown,
		handleMouseMove,
		handleMouseUp,
		handleWheel
	]);
	if (!isFullScreenEnabled) return null;
	return /* @__PURE__ */ jsx("div", {
		className: cn("fixed inset-0 size-full z-50 bg-black/90 opacity-0 pointer-events-none transition-opacity", {
			"opacity-100 pointer-events-auto editor-image-full-screen-modal": isFullScreenEnabled,
			"cursor-default": !isDragging,
			"cursor-grabbing": isDragging
		}),
		role: "dialog",
		"aria-modal": "true",
		"aria-label": "Fullscreen image viewer",
		children: /* @__PURE__ */ jsxs("div", {
			ref: modalRef,
			onMouseDown: (e) => e.target === modalRef.current && handleClose(),
			className: "relative size-full grid place-items-center overflow-hidden",
			children: [
				/* @__PURE__ */ jsx("button", {
					type: "button",
					onClick: handleClose,
					className: "absolute top-10 right-10 size-8 grid place-items-center",
					"aria-label": "Close image viewer",
					children: /* @__PURE__ */ jsx(CloseIcon, { className: "size-8 text-white/60 hover:text-white transition-colors" })
				}),
				/* @__PURE__ */ jsx("img", {
					ref: setImageRef,
					src,
					className: "read-only-image rounded-lg",
					style: {
						width: `${widthInNumber * initialMagnification}px`,
						maxWidth: "none",
						maxHeight: "none",
						aspectRatio,
						position: "relative",
						transform: `scale(${magnification})`,
						transformOrigin: "center",
						transition: "width 0.2s ease, transform 0.2s ease"
					},
					onMouseDown: handleMouseDown
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "fixed bottom-10 left-1/2 -translate-x-1/2 flex items-center justify-center gap-1 rounded-md border border-white/20 py-2 divide-x divide-white/20 bg-black",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-center",
							children: [
								/* @__PURE__ */ jsx("button", {
									type: "button",
									onClick: (e) => {
										if (isTouchDevice) {
											e.preventDefault();
											e.stopPropagation();
										}
										handleMagnification("decrease");
									},
									className: "size-6 grid place-items-center text-white/60 hover:text-white disabled:text-white/30 transition-colors duration-200",
									disabled: magnification <= MIN_ZOOM,
									"aria-label": "Zoom out",
									children: /* @__PURE__ */ jsx(Minus, { className: "size-4" })
								}),
								/* @__PURE__ */ jsxs("span", {
									className: "text-sm w-12 text-center text-white",
									children: [Math.round(100 * magnification), "%"]
								}),
								/* @__PURE__ */ jsx("button", {
									type: "button",
									onClick: (e) => {
										if (isTouchDevice) {
											e.preventDefault();
											e.stopPropagation();
										}
										handleMagnification("increase");
									},
									className: "size-6 grid place-items-center text-white/60 hover:text-white disabled:text-white/30 transition-colors duration-200",
									disabled: magnification >= MAX_ZOOM,
									"aria-label": "Zoom in",
									children: /* @__PURE__ */ jsx(Plus, { className: "size-4" })
								})
							]
						}),
						!isTouchDevice && /* @__PURE__ */ jsx("button", {
							type: "button",
							onClick: () => window.open(downloadSrc, "_blank"),
							className: "flex-shrink-0 size-8 grid place-items-center text-white/60 hover:text-white transition-colors duration-200",
							"aria-label": "Download image",
							children: /* @__PURE__ */ jsx(Download, { className: "size-4" })
						}),
						!isTouchDevice && /* @__PURE__ */ jsx("button", {
							type: "button",
							onClick: () => window.open(src, "_blank"),
							className: "flex-shrink-0 size-8 grid place-items-center text-white/60 hover:text-white transition-colors duration-200",
							"aria-label": "Open image in new tab",
							children: /* @__PURE__ */ jsx(ExternalLink, { className: "size-4" })
						})
					]
				})
			]
		})
	});
}
function ImageFullScreenModal(props) {
	let modal = /* @__PURE__ */ jsx(ImageFullScreenModalWithoutPortal, { ...props });
	const portal = document.querySelector("#editor-portal");
	if (portal) modal = ReactDOM.createPortal(modal, portal);
	else {
		console.warn("Portal element #editor-portal not found. Rendering in document.body");
		if (typeof document !== "undefined" && document.body) modal = ReactDOM.createPortal(modal, document.body);
	}
	return modal;
}

//#endregion
//#region src/core/extensions/custom-image/components/toolbar/full-screen/root.tsx
function ImageFullScreenActionRoot(props) {
	const { image, isTouchDevice, toggleToolbarViewStatus } = props;
	const [isFullScreenEnabled, setIsFullScreenEnabled] = useState(false);
	const { downloadSrc, src, width, aspectRatio } = image;
	useEffect(() => {
		toggleToolbarViewStatus(isFullScreenEnabled);
	}, [isFullScreenEnabled, toggleToolbarViewStatus]);
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(ImageFullScreenModal, {
		aspectRatio,
		downloadSrc,
		isFullScreenEnabled,
		isTouchDevice,
		src,
		width,
		toggleFullScreenMode: setIsFullScreenEnabled
	}), /* @__PURE__ */ jsx(Tooltip, {
		tooltipContent: "View in full screen",
		disabled: isTouchDevice,
		children: /* @__PURE__ */ jsx("button", {
			type: "button",
			onClick: (e) => {
				e.preventDefault();
				e.stopPropagation();
				setIsFullScreenEnabled(true);
			},
			className: "flex-shrink-0 h-full grid place-items-center text-white/60 hover:text-white transition-colors",
			"aria-label": "View image in full screen",
			children: /* @__PURE__ */ jsx(Maximize, { className: "size-3" })
		})
	})] });
}

//#endregion
//#region src/core/extensions/custom-image/components/toolbar/root.tsx
function ImageToolbarRoot(props) {
	const { alignment, editor, downloadSrc, handleAlignmentChange, isTouchDevice } = props;
	const [shouldShowToolbar, setShouldShowToolbar] = useState(false);
	const isEditable = editor.isEditable;
	return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", {
		className: cn("absolute top-1 right-1 h-7 z-20 bg-black/80 rounded flex items-center gap-2 px-2 opacity-0 pointer-events-none group-hover/image-component:opacity-100 group-hover/image-component:pointer-events-auto transition-opacity", { "opacity-100 pointer-events-auto": shouldShowToolbar }),
		children: [
			!isTouchDevice && /* @__PURE__ */ jsx(ImageDownloadAction, { src: downloadSrc }),
			isEditable && /* @__PURE__ */ jsx(ImageAlignmentAction, {
				activeAlignment: alignment,
				handleChange: handleAlignmentChange,
				isTouchDevice,
				toggleToolbarViewStatus: setShouldShowToolbar
			}),
			/* @__PURE__ */ jsx(ImageFullScreenActionRoot, {
				image: props,
				isTouchDevice,
				toggleToolbarViewStatus: setShouldShowToolbar
			})
		]
	}) });
}

//#endregion
//#region src/core/extensions/custom-image/components/upload-status.tsx
function ImageUploadStatus(props) {
	const { editor, nodeId } = props;
	const [displayStatus, setDisplayStatus] = useState(0);
	const animationFrameRef = useRef(null);
	const uploadStatus = useEditorState({
		editor,
		selector: ({ editor: editor$1 }) => editor$1.storage.utility?.assetsUploadStatus?.[nodeId]
	});
	useEffect(() => {
		const animateToValue = (start, end, startTime) => {
			const duration = 200;
			const animation = (currentTime) => {
				const elapsed = currentTime - startTime;
				const progress = Math.min(elapsed / duration, 1);
				const easeOutCubic = 1 - Math.pow(1 - progress, 3);
				setDisplayStatus(Math.floor(start + (end - start) * easeOutCubic));
				if (progress < 1) animationFrameRef.current = requestAnimationFrame((time) => animation(time));
			};
			animationFrameRef.current = requestAnimationFrame((time) => animation(time));
		};
		animateToValue(displayStatus, uploadStatus == void 0 ? 100 : uploadStatus, performance.now());
		return () => {
			if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
		};
	}, [displayStatus, uploadStatus]);
	if (uploadStatus === void 0) return null;
	return /* @__PURE__ */ jsxs("div", {
		className: "absolute top-1 right-1 z-20 bg-black/60 rounded text-xs font-medium w-10 text-center",
		children: [displayStatus, "%"]
	});
}

//#endregion
//#region src/core/extensions/custom-image/components/block.tsx
const MIN_SIZE = 100;
function CustomImageBlock(props) {
	const { editor, editorContainer, extension, getPos, imageFromFileSystem, node, selected, setEditorContainer, setFailedToLoadImage, src: resolvedImageSrc, downloadSrc: resolvedDownloadSrc, updateAttributes } = props;
	const { width: nodeWidth, height: nodeHeight, aspectRatio: nodeAspectRatio, src: imgNodeSrc, alignment: nodeAlignment, status } = node.attrs;
	const [size, setSize] = useState({
		width: ensurePixelString(nodeWidth, "35%") ?? "35%",
		height: ensurePixelString(nodeHeight, "auto") ?? "auto",
		aspectRatio: nodeAspectRatio || null
	});
	const [isResizing, setIsResizing] = useState(false);
	const [initialResizeComplete, setInitialResizeComplete] = useState(false);
	const containerRef = useRef(null);
	const containerRect = useRef(null);
	const imageRef = useRef(null);
	const [hasErroredOnFirstLoad, setHasErroredOnFirstLoad] = useState(false);
	const [hasTriedRestoringImageOnce, setHasTriedRestoringImageOnce] = useState(false);
	const isTouchDevice = !!editor.storage.utility.isTouchDevice;
	const updateAttributesSafely = useCallback((attributes, errorMessage) => {
		try {
			updateAttributes(attributes);
		} catch (error) {
			console.error(`${errorMessage}:`, error);
		}
	}, [updateAttributes]);
	const handleImageLoad = useCallback(() => {
		const img = imageRef.current;
		if (!img) return;
		let closestEditorContainer = null;
		if (editorContainer) closestEditorContainer = editorContainer;
		else {
			closestEditorContainer = img.closest(".editor-container");
			if (!closestEditorContainer) {
				console.error("Editor container not found");
				return;
			}
		}
		if (!closestEditorContainer) {
			console.error("Editor container not found");
			return;
		}
		setEditorContainer(closestEditorContainer);
		const aspectRatioCalculated = img.naturalWidth / img.naturalHeight;
		if (nodeWidth === "35%") {
			const editorWidth = closestEditorContainer.clientWidth;
			const initialWidth = Math.max(editorWidth * .35, MIN_SIZE);
			const initialHeight = initialWidth / aspectRatioCalculated;
			const initialComputedSize = {
				width: `${Math.round(initialWidth)}px`,
				height: `${Math.round(initialHeight)}px`,
				aspectRatio: aspectRatioCalculated
			};
			setSize(initialComputedSize);
			updateAttributesSafely(initialComputedSize, "Failed to update attributes while initializing an image for the first time:");
		} else if (!nodeAspectRatio || nodeAspectRatio !== aspectRatioCalculated) setSize((prevSize) => {
			const newSize = {
				...prevSize,
				aspectRatio: aspectRatioCalculated
			};
			updateAttributesSafely(newSize, "Failed to update attributes while initializing images with width but no aspect ratio:");
			return newSize;
		});
		setInitialResizeComplete(true);
	}, [
		nodeWidth,
		updateAttributesSafely,
		editorContainer,
		nodeAspectRatio,
		setEditorContainer
	]);
	useLayoutEffect(() => {
		setSize((prevSize) => ({
			...prevSize,
			width: ensurePixelString(nodeWidth) ?? "35%",
			height: ensurePixelString(nodeHeight) ?? "auto",
			aspectRatio: nodeAspectRatio
		}));
	}, [
		nodeWidth,
		nodeHeight,
		nodeAspectRatio
	]);
	const handleResize = useCallback((e) => {
		if (!containerRef.current || !containerRect.current || !size.aspectRatio) return;
		const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
		if (nodeAlignment === "right") {
			const newWidth = Math.max(containerRect.current.right - clientX, MIN_SIZE);
			const newHeight = newWidth / size.aspectRatio;
			setSize((prevSize) => ({
				...prevSize,
				width: `${newWidth}px`,
				height: `${newHeight}px`
			}));
		} else {
			const newWidth = Math.max(clientX - containerRect.current.left, MIN_SIZE);
			const newHeight = newWidth / size.aspectRatio;
			setSize((prevSize) => ({
				...prevSize,
				width: `${newWidth}px`,
				height: `${newHeight}px`
			}));
		}
	}, [nodeAlignment, size.aspectRatio]);
	const handleResizeEnd = useCallback(() => {
		setIsResizing(false);
		updateAttributesSafely(size, "Failed to update attributes at the end of resizing:");
	}, [size, updateAttributesSafely]);
	const handleResizeStart = useCallback((e) => {
		e.preventDefault();
		e.stopPropagation();
		setIsResizing(true);
		if (containerRef.current) containerRect.current = containerRef.current.getBoundingClientRect();
	}, []);
	useEffect(() => {
		if (isResizing) {
			window.addEventListener("mousemove", handleResize);
			window.addEventListener("mouseup", handleResizeEnd);
			window.addEventListener("mouseleave", handleResizeEnd);
			window.addEventListener("touchmove", handleResize);
			window.addEventListener("touchend", handleResizeEnd);
			return () => {
				window.removeEventListener("mousemove", handleResize);
				window.removeEventListener("mouseup", handleResizeEnd);
				window.removeEventListener("mouseleave", handleResizeEnd);
				window.removeEventListener("touchmove", handleResize);
				window.removeEventListener("touchend", handleResizeEnd);
			};
		}
	}, [
		isResizing,
		handleResize,
		handleResizeEnd
	]);
	const handleImageMouseDown = useCallback((e) => {
		e.stopPropagation();
		if (isTouchDevice) {
			e.preventDefault();
			editor.commands.blur();
		}
		const pos = getPos();
		if (pos === void 0) return;
		const nodeSelection = NodeSelection.create(editor.state.doc, pos);
		editor.view.dispatch(editor.state.tr.setSelection(nodeSelection));
	}, [
		editor,
		getPos,
		isTouchDevice
	]);
	const isDuplicating = isImageDuplicating(status);
	const showImageLoader = !resolvedImageSrc && !isDuplicating || !initialResizeComplete || hasErroredOnFirstLoad || isDuplicating;
	const showUploadStatus = !resolvedImageSrc && !isDuplicating;
	const showImageToolbar = resolvedImageSrc && resolvedDownloadSrc && initialResizeComplete && !isDuplicating;
	const showImageResizer = editor.isEditable && resolvedImageSrc && initialResizeComplete && !isDuplicating;
	const displayedImageSrc = resolvedImageSrc || imageFromFileSystem;
	return /* @__PURE__ */ jsx("div", {
		id: getImageBlockId(node.attrs.id ?? ""),
		className: cn("w-fit max-w-full transition-all", {
			"ml-[50%] -translate-x-1/2": nodeAlignment === "center",
			"ml-[100%] -translate-x-full": nodeAlignment === "right"
		}),
		children: /* @__PURE__ */ jsxs("div", {
			ref: containerRef,
			className: "group/image-component relative inline-block max-w-full",
			onMouseDown: handleImageMouseDown,
			style: {
				width: size.width,
				...size.aspectRatio && { aspectRatio: size.aspectRatio }
			},
			children: [
				showImageLoader && /* @__PURE__ */ jsx("div", {
					className: "animate-pulse bg-custom-background-80 rounded-md",
					style: {
						width: size.width,
						height: size.height
					}
				}),
				/* @__PURE__ */ jsx("img", {
					ref: imageRef,
					src: displayedImageSrc,
					onLoad: handleImageLoad,
					onError: async (e) => {
						if (!extension.options.restoreImage || hasTriedRestoringImageOnce) {
							setFailedToLoadImage(true);
							return;
						}
						try {
							setHasErroredOnFirstLoad(true);
							if (!imgNodeSrc) throw new Error("No source image to restore from");
							await extension.options.restoreImage?.(imgNodeSrc);
							if (!imageRef.current) throw new Error("Image reference not found");
							if (!resolvedImageSrc) throw new Error("No resolved image source available");
							if (isTouchDevice) {
								const refreshedSrc = await extension.options.getImageSource?.(imgNodeSrc);
								imageRef.current.src = refreshedSrc;
							} else imageRef.current.src = resolvedImageSrc;
						} catch {
							setFailedToLoadImage(true);
							console.error("Error while loading image", e);
						} finally {
							setHasErroredOnFirstLoad(false);
							setHasTriedRestoringImageOnce(true);
						}
					},
					width: size.width,
					className: cn("image-component block rounded-md", {
						hidden: showImageLoader,
						"read-only-image": !editor.isEditable,
						"blur-sm opacity-80 loading-image": !resolvedImageSrc
					}),
					style: {
						width: size.width,
						...size.aspectRatio && { aspectRatio: size.aspectRatio }
					}
				}),
				showUploadStatus && node.attrs.id && /* @__PURE__ */ jsx(ImageUploadStatus, {
					editor,
					nodeId: node.attrs.id
				}),
				showImageToolbar && /* @__PURE__ */ jsx(ImageToolbarRoot, {
					alignment: nodeAlignment ?? "left",
					editor,
					aspectRatio: size.aspectRatio === null ? 1 : size.aspectRatio,
					downloadSrc: resolvedDownloadSrc,
					handleAlignmentChange: (alignment) => updateAttributesSafely({ alignment }, "Failed to update attributes while changing alignment:"),
					height: size.height,
					isTouchDevice,
					width: size.width,
					src: resolvedImageSrc
				}),
				selected && displayedImageSrc === resolvedImageSrc && /* @__PURE__ */ jsx("div", { className: "absolute inset-0 size-full bg-custom-primary-500/30 pointer-events-none" }),
				showImageResizer && /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("div", { className: cn("absolute inset-0 border-2 border-custom-primary-100 pointer-events-none rounded-md transition-opacity duration-100 ease-in-out", {
					"opacity-100": isResizing,
					"opacity-0 group-hover/image-component:opacity-100": !isResizing
				}) }), /* @__PURE__ */ jsx("div", {
					className: cn("absolute bottom-0 translate-y-1/2 size-4 rounded-full bg-custom-primary-100 border-2 border-white transition-opacity duration-100 ease-in-out", {
						"opacity-100 pointer-events-auto": isResizing,
						"opacity-0 pointer-events-none group-hover/image-component:opacity-100 group-hover/image-component:pointer-events-auto": !isResizing,
						"left-0 -translate-x-1/2 cursor-nesw-resize": nodeAlignment === "right",
						"right-0 translate-x-1/2 cursor-nwse-resize": nodeAlignment !== "right"
					}),
					onMouseDown: handleResizeStart,
					onTouchStart: handleResizeStart
				})] })
			]
		})
	});
}

//#endregion
//#region src/core/helpers/file.ts
let EFileError = /* @__PURE__ */ function(EFileError$1) {
	EFileError$1["INVALID_FILE_TYPE"] = "INVALID_FILE_TYPE";
	EFileError$1["FILE_SIZE_TOO_LARGE"] = "FILE_SIZE_TOO_LARGE";
	EFileError$1["NO_FILE_SELECTED"] = "NO_FILE_SELECTED";
	return EFileError$1;
}({});
const isFileValid = (args) => {
	const { acceptedMimeTypes, file, maxFileSize, onError } = args;
	if (!file) {
		onError(EFileError.NO_FILE_SELECTED, "No file selected. Please select a file to upload.");
		return false;
	}
	if (!acceptedMimeTypes.includes(file.type)) {
		onError(EFileError.INVALID_FILE_TYPE, "Invalid file type.");
		return false;
	}
	if (file.size > maxFileSize) {
		onError(EFileError.FILE_SIZE_TOO_LARGE, `File size too large. Please select a file smaller than ${maxFileSize / 1024 / 1024}MB.`);
		return false;
	}
	return true;
};

//#endregion
//#region src/core/plugins/drop.ts
const DropHandlerPlugin = (props) => {
	const { disabledExtensions, flaggedExtensions, editor } = props;
	return new Plugin({
		key: new PluginKey("drop-handler-plugin"),
		props: {
			handlePaste: (view, event) => {
				if (editor.isEditable && event.clipboardData && event.clipboardData.files && event.clipboardData.files.length > 0) {
					event.preventDefault();
					const acceptedFiles = Array.from(event.clipboardData.files).filter((f) => ACCEPTED_IMAGE_MIME_TYPES.includes(f.type) || ACCEPTED_ATTACHMENT_MIME_TYPES.includes(f.type));
					if (acceptedFiles.length) {
						const pos = view.state.selection.from;
						insertFilesSafely({
							disabledExtensions,
							flaggedExtensions,
							editor,
							files: acceptedFiles,
							initialPos: pos,
							event: "drop"
						});
					}
					return true;
				}
				return false;
			},
			handleDrop: (view, event, _slice, moved) => {
				if (editor.isEditable && !moved && event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files.length > 0) {
					event.preventDefault();
					const acceptedFiles = Array.from(event.dataTransfer.files).filter((f) => ACCEPTED_IMAGE_MIME_TYPES.includes(f.type) || ACCEPTED_ATTACHMENT_MIME_TYPES.includes(f.type));
					if (acceptedFiles.length) {
						const coordinates = view.posAtCoords({
							left: event.clientX,
							top: event.clientY
						});
						if (coordinates) {
							const pos = coordinates.pos;
							insertFilesSafely({
								disabledExtensions,
								editor,
								files: acceptedFiles,
								initialPos: pos,
								event: "drop"
							});
						}
						return true;
					}
				}
				return false;
			}
		}
	});
};
const insertFilesSafely = async (args) => {
	const { disabledExtensions, editor, event, files, initialPos, type } = args;
	let pos = initialPos;
	for (const file of files) {
		const docSize = editor.state.doc.content.size;
		pos = Math.min(pos, docSize);
		let fileType = null;
		try {
			if (type) if (["image", "attachment"].includes(type)) fileType = type;
			else throw new Error("Wrong file type passed");
			else if (ACCEPTED_IMAGE_MIME_TYPES.includes(file.type)) fileType = "image";
			else if (ACCEPTED_ATTACHMENT_MIME_TYPES.includes(file.type)) fileType = "attachment";
			if (fileType === "image" && !disabledExtensions?.includes("image")) editor.commands.insertImageComponent({
				file,
				pos,
				event
			});
			else if (fileType === "attachment") {}
		} catch (error) {
			console.error(`Error while ${event}ing file:`, error);
		}
		pos += 1;
	}
};

//#endregion
//#region src/core/hooks/use-file-upload.ts
const useUploader = (args) => {
	const { acceptedMimeTypes, editorCommand, handleProgressStatus, loadFileFromFileSystem, maxFileSize, onInvalidFile, onUpload } = args;
	const [isUploading, setIsUploading] = useState(false);
	return {
		isUploading,
		uploadFile: useCallback(async (file) => {
			handleProgressStatus?.(true);
			setIsUploading(true);
			if (!isFileValid({
				acceptedMimeTypes,
				file,
				maxFileSize,
				onError: (error, message) => onInvalidFile(error, file, message)
			})) {
				handleProgressStatus?.(false);
				setIsUploading(false);
				return;
			}
			try {
				if (loadFileFromFileSystem) {
					const reader = new FileReader();
					reader.onload = () => {
						if (reader.result) loadFileFromFileSystem(reader.result);
						else console.error("Failed to read the file: reader.result is null");
					};
					reader.onerror = () => {
						console.error("Error reading file");
					};
					reader.readAsDataURL(file);
				}
				const url = await editorCommand(file);
				if (!url) throw new Error("Something went wrong while uploading the file.");
				onUpload(url, file);
			} catch {
				console.error("useFileUpload: Error in uploading file");
			} finally {
				handleProgressStatus?.(false);
				setIsUploading(false);
			}
		}, [
			acceptedMimeTypes,
			editorCommand,
			handleProgressStatus,
			loadFileFromFileSystem,
			maxFileSize,
			onInvalidFile,
			onUpload
		])
	};
};
const useDropZone = (args) => {
	const { editor, getPos, type, uploader } = args;
	const [isDragging, setIsDragging] = useState(false);
	const [draggedInside, setDraggedInside] = useState(false);
	useEffect(() => {
		const dragStartHandler = () => {
			setIsDragging(true);
		};
		const dragEndHandler = () => {
			setIsDragging(false);
		};
		document.body.addEventListener("dragstart", dragStartHandler);
		document.body.addEventListener("dragend", dragEndHandler);
		return () => {
			document.body.removeEventListener("dragstart", dragStartHandler);
			document.body.removeEventListener("dragend", dragEndHandler);
		};
	}, []);
	const onDrop = useCallback(async (e) => {
		e.preventDefault();
		setDraggedInside(false);
		const filesList = e.dataTransfer.files;
		const pos = getPos();
		if (filesList.length === 0 || !editor.isEditable || pos === void 0) return;
		await uploadFirstFileAndInsertRemaining({
			editor,
			filesList,
			pos,
			type,
			uploader
		});
	}, [
		editor,
		type,
		uploader,
		getPos
	]);
	return {
		isDragging,
		draggedInside,
		onDragEnter: useCallback(() => setDraggedInside(true), []),
		onDragLeave: useCallback(() => setDraggedInside(false), []),
		onDrop
	};
};
const uploadFirstFileAndInsertRemaining = async (args) => {
	const { editor, filesList, pos, type, uploader } = args;
	const filesArray = Array.from(filesList);
	if (filesArray.length === 0) {
		console.error("No files found to upload.");
		return;
	}
	const firstFile = filesArray[0];
	uploader(firstFile);
	const remainingFiles = filesArray.slice(1);
	if (remainingFiles.length > 0) {
		const docSize = editor.state.doc.content.size;
		insertFilesSafely({
			editor,
			files: remainingFiles,
			initialPos: Math.min(pos + 1, docSize),
			event: "drop",
			type
		});
	}
};

//#endregion
//#region src/core/extensions/custom-image/components/uploader.tsx
function CustomImageUploader(props) {
	const { editor, extension, failedToLoadImage, getPos, loadImageFromFileSystem, maxFileSize, node, selected, setIsUploaded, updateAttributes, hasDuplicationFailed } = props;
	const fileInputRef = useRef(null);
	const hasTriggeredFilePickerRef = useRef(false);
	const hasTriedUploadingOnMountRef = useRef(false);
	const { id: imageEntityId } = node.attrs;
	const imageComponentImageFileMap = useMemo(() => getImageComponentImageFileMap(editor), [editor]);
	const isTouchDevice = !!editor.storage.utility.isTouchDevice;
	const onUpload = useCallback((url) => {
		if (url) {
			if (!imageEntityId) return;
			setIsUploaded(true);
			updateAttributes({
				src: url,
				status: ECustomImageStatus.UPLOADED
			});
			imageComponentImageFileMap?.delete(imageEntityId);
			const pos = getPos();
			const getCurrentSelection = editor.state.selection;
			const currentNode = editor.state.doc.nodeAt(getCurrentSelection.from);
			if (currentNode && currentNode.type.name === node.type.name && currentNode.attrs.src === url && pos !== void 0) {
				const nextNode = editor.state.doc.nodeAt(pos + 1);
				if (nextNode && nextNode.type.name === CORE_EXTENSIONS$1.PARAGRAPH) editor.commands.setTextSelection(pos + 1);
				else editor.commands.createParagraphNear();
			}
		}
	}, [
		imageComponentImageFileMap,
		imageEntityId,
		updateAttributes,
		getPos
	]);
	const { isUploading: isImageBeingUploaded, uploadFile } = useUploader({
		acceptedMimeTypes: ACCEPTED_IMAGE_MIME_TYPES,
		editorCommand: useCallback(async (file) => {
			updateAttributes({ status: ECustomImageStatus.UPLOADING });
			return await extension.options.uploadImage?.(imageEntityId ?? "", file);
		}, [
			extension.options,
			imageEntityId,
			updateAttributes
		]),
		handleProgressStatus: useCallback((isUploading) => {
			editor.storage.utility.uploadInProgress = isUploading;
		}, [editor]),
		loadFileFromFileSystem: loadImageFromFileSystem,
		maxFileSize,
		onInvalidFile: useCallback((_error, _file, message) => {
			alert(message);
		}, []),
		onUpload
	});
	const { draggedInside, onDrop, onDragEnter, onDragLeave } = useDropZone({
		editor,
		getPos,
		type: "image",
		uploader: uploadFile
	});
	useEffect(() => {
		if (hasTriedUploadingOnMountRef.current) return;
		const meta = imageComponentImageFileMap?.get(imageEntityId ?? "");
		if (meta) {
			if (meta.event === "drop" && "file" in meta) {
				hasTriedUploadingOnMountRef.current = true;
				uploadFile(meta.file);
			} else if (meta.event === "insert" && fileInputRef.current && !hasTriggeredFilePickerRef.current) {
				if (meta.hasOpenedFileInputOnce) return;
				if (!isTouchDevice) fileInputRef.current.click();
				hasTriggeredFilePickerRef.current = true;
				imageComponentImageFileMap?.set(imageEntityId ?? "", {
					...meta,
					hasOpenedFileInputOnce: true
				});
			}
		} else hasTriedUploadingOnMountRef.current = true;
	}, [
		imageEntityId,
		isTouchDevice,
		uploadFile,
		imageComponentImageFileMap
	]);
	const onFileChange = useCallback(async (e) => {
		e.preventDefault();
		const filesList = e.target.files;
		const pos = getPos();
		if (!filesList || pos === void 0) return;
		await uploadFirstFileAndInsertRemaining({
			editor,
			filesList,
			pos,
			type: "image",
			uploader: uploadFile
		});
	}, [
		uploadFile,
		editor,
		getPos
	]);
	const getDisplayMessage = useCallback(() => {
		const isUploading = isImageBeingUploaded;
		if (failedToLoadImage || hasDuplicationFailed) return "Error loading image";
		if (isUploading) return "Uploading...";
		if (draggedInside && editor.isEditable) return "Drop image here";
		return "Add an image";
	}, [
		draggedInside,
		editor.isEditable,
		failedToLoadImage,
		isImageBeingUploaded,
		hasDuplicationFailed
	]);
	const handleRetryClick = useCallback((e) => {
		e.stopPropagation();
		if (hasDuplicationFailed && editor.isEditable) updateAttributes({ status: ECustomImageStatus.DUPLICATING });
	}, [
		hasDuplicationFailed,
		editor.isEditable,
		updateAttributes
	]);
	return /* @__PURE__ */ jsxs("div", {
		className: cn("image-upload-component flex items-center justify-start gap-2 py-3 px-2 rounded-lg text-custom-text-300 bg-custom-background-90 border border-dashed border-custom-border-300 transition-all duration-200 ease-in-out cursor-default", {
			"hover:text-custom-text-200 hover:bg-custom-background-80 cursor-pointer": editor.isEditable,
			"bg-custom-background-80 text-custom-text-200": draggedInside && editor.isEditable,
			"text-custom-primary-200 bg-custom-primary-100/10 border-custom-primary-200/10 hover:bg-custom-primary-100/10 hover:text-custom-primary-200": selected && editor.isEditable,
			"text-red-500 cursor-default": failedToLoadImage || hasDuplicationFailed,
			"hover:text-red-500": (failedToLoadImage || hasDuplicationFailed) && editor.isEditable,
			"bg-red-500/10": (failedToLoadImage || hasDuplicationFailed) && selected,
			"hover:bg-red-500/10": (failedToLoadImage || hasDuplicationFailed) && selected && editor.isEditable
		}),
		onDrop,
		onDragOver: onDragEnter,
		onDragLeave,
		contentEditable: false,
		onClick: () => {
			if (!failedToLoadImage && editor.isEditable && !hasDuplicationFailed) fileInputRef.current?.click();
		},
		children: [
			/* @__PURE__ */ jsx(ImageIcon, { className: "size-4" }),
			/* @__PURE__ */ jsx("div", {
				className: "text-base font-medium flex-1",
				children: getDisplayMessage()
			}),
			hasDuplicationFailed && editor.isEditable && /* @__PURE__ */ jsxs("button", {
				type: "button",
				onClick: handleRetryClick,
				className: cn("flex items-center gap-1 px-2 py-1 text-xs font-medium text-custom-text-300 hover:bg-custom-background-90 hover:text-custom-text-200 rounded-md transition-all duration-200 ease-in-out", { "hover:bg-red-500/20": selected }),
				title: "Retry duplication",
				children: [/* @__PURE__ */ jsx(RotateCcw, { className: "size-3" }), "Retry"]
			}),
			/* @__PURE__ */ jsx("input", {
				className: "size-0 overflow-hidden",
				ref: fileInputRef,
				hidden: true,
				type: "file",
				accept: ACCEPTED_IMAGE_MIME_TYPES.join(","),
				onChange: onFileChange,
				multiple: true
			})
		]
	});
}

//#endregion
//#region src/core/extensions/custom-image/components/node-view.tsx
function CustomImageNodeView(props) {
	const { editor, extension, node, updateAttributes } = props;
	const { src: imgNodeSrc, status } = node.attrs;
	const [isUploaded, setIsUploaded] = useState(!!imgNodeSrc);
	const [resolvedSrc, setResolvedSrc] = useState(void 0);
	const [resolvedDownloadSrc, setResolvedDownloadSrc] = useState(void 0);
	const [imageFromFileSystem, setImageFromFileSystem] = useState(void 0);
	const [failedToLoadImage, setFailedToLoadImage] = useState(false);
	const [editorContainer, setEditorContainer] = useState(null);
	const imageComponentRef = useRef(null);
	const hasRetriedOnMount = useRef(false);
	const isDuplicatingRef = useRef(false);
	useEffect(() => {
		const closestEditorContainer = imageComponentRef.current?.closest(".editor-container");
		if (closestEditorContainer) setEditorContainer(closestEditorContainer);
	}, []);
	useEffect(() => {
		if (resolvedSrc || imgNodeSrc) {
			setIsUploaded(true);
			setImageFromFileSystem(void 0);
		} else setIsUploaded(false);
	}, [resolvedSrc, imgNodeSrc]);
	useEffect(() => {
		if (!imgNodeSrc) {
			setResolvedSrc(void 0);
			setResolvedDownloadSrc(void 0);
			return;
		}
		setResolvedSrc(void 0);
		setResolvedDownloadSrc(void 0);
		setFailedToLoadImage(false);
		const getImageSource = async () => {
			try {
				setResolvedSrc(await extension.options.getImageSource?.(imgNodeSrc));
				setResolvedDownloadSrc(await extension.options.getImageDownloadSource?.(imgNodeSrc));
			} catch (error) {
				console.error("Error fetching image source:", error);
				setFailedToLoadImage(true);
			}
		};
		getImageSource();
	}, [imgNodeSrc, extension.options]);
	useEffect(() => {
		const handleDuplication = async () => {
			if (status !== ECustomImageStatus.DUPLICATING || !extension.options.duplicateImage || !imgNodeSrc) return;
			if (isDuplicatingRef.current) return;
			isDuplicatingRef.current = true;
			try {
				hasRetriedOnMount.current = true;
				const newAssetId = await extension.options.duplicateImage(imgNodeSrc);
				if (!newAssetId) throw new Error("Duplication returned invalid asset ID");
				setFailedToLoadImage(false);
				updateAttributes({
					src: newAssetId,
					status: ECustomImageStatus.UPLOADED
				});
			} catch (error) {
				console.error("Failed to duplicate image:", error);
				updateAttributes({ status: ECustomImageStatus.DUPLICATION_FAILED });
			} finally {
				isDuplicatingRef.current = false;
			}
		};
		handleDuplication();
	}, [
		status,
		imgNodeSrc,
		extension.options.duplicateImage,
		updateAttributes
	]);
	useEffect(() => {
		if (hasImageDuplicationFailed(status) && !hasRetriedOnMount.current && imgNodeSrc) {
			hasRetriedOnMount.current = true;
			updateAttributes({ status: ECustomImageStatus.DUPLICATING });
		}
	}, [
		status,
		imgNodeSrc,
		updateAttributes
	]);
	useEffect(() => {
		if (status === ECustomImageStatus.UPLOADED) {
			hasRetriedOnMount.current = false;
			setFailedToLoadImage(false);
		}
	}, [status]);
	const hasDuplicationFailed = hasImageDuplicationFailed(status);
	const shouldShowBlock = (imageFromFileSystem || isUploaded && resolvedSrc) && !failedToLoadImage && !hasDuplicationFailed;
	return /* @__PURE__ */ jsx(NodeViewWrapper, { children: /* @__PURE__ */ jsx("div", {
		className: "p-0 mx-0 my-2",
		"data-drag-handle": true,
		ref: imageComponentRef,
		children: shouldShowBlock && !hasDuplicationFailed ? /* @__PURE__ */ jsx(CustomImageBlock, {
			editorContainer,
			imageFromFileSystem,
			setEditorContainer,
			setFailedToLoadImage,
			src: resolvedSrc,
			downloadSrc: resolvedDownloadSrc,
			...props
		}) : /* @__PURE__ */ jsx(CustomImageUploader, {
			failedToLoadImage,
			hasDuplicationFailed,
			loadImageFromFileSystem: setImageFromFileSystem,
			maxFileSize: editor.storage.imageComponent?.maxFileSize,
			setIsUploaded,
			...props
		})
	}) });
}

//#endregion
//#region src/core/extensions/image/extension-config.tsx
const ImageExtensionConfig = Image$1.extend({ addAttributes() {
	return {
		...this.parent?.(),
		width: { default: "35%" },
		height: { default: null },
		aspectRatio: { default: null },
		alignment: { default: "left" }
	};
} });

//#endregion
//#region src/core/extensions/image/extension.tsx
function ImageExtension(props) {
	const { fileHandler } = props;
	const { getAssetSrc } = fileHandler;
	return ImageExtensionConfig.extend({
		addOptions() {
			return {
				...this.parent?.(),
				getImageSource: getAssetSrc
			};
		},
		addKeyboardShortcuts() {
			return {
				ArrowDown: insertEmptyParagraphAtNodeBoundaries("down", this.name),
				ArrowUp: insertEmptyParagraphAtNodeBoundaries("up", this.name)
			};
		},
		addStorage() {
			const maxFileSize = "validation" in fileHandler ? fileHandler.validation?.maxFileSize : 0;
			return {
				deletedImageSet: /* @__PURE__ */ new Map(),
				maxFileSize
			};
		},
		addNodeView() {
			return ReactNodeViewRenderer((props$1) => /* @__PURE__ */ jsx(CustomImageNodeView, {
				...props$1,
				node: props$1.node
			}));
		}
	});
}

//#endregion
//#region src/core/extensions/mentions/types.ts
let EMentionComponentAttributeNames = /* @__PURE__ */ function(EMentionComponentAttributeNames$1) {
	EMentionComponentAttributeNames$1["ID"] = "id";
	EMentionComponentAttributeNames$1["ENTITY_IDENTIFIER"] = "entity_identifier";
	EMentionComponentAttributeNames$1["ENTITY_NAME"] = "entity_name";
	return EMentionComponentAttributeNames$1;
}({});

//#endregion
//#region src/core/extensions/mentions/extension-config.ts
const CustomMentionExtensionConfig = Mention.extend({
	addAttributes() {
		return {
			[EMentionComponentAttributeNames.ID]: { default: null },
			[EMentionComponentAttributeNames.ENTITY_IDENTIFIER]: { default: null },
			[EMentionComponentAttributeNames.ENTITY_NAME]: { default: null }
		};
	},
	parseHTML() {
		return [{ tag: "mention-component" }];
	},
	renderHTML({ HTMLAttributes }) {
		return ["mention-component", mergeAttributes(HTMLAttributes)];
	},
	renderText({ node }) {
		return getMentionDisplayText(this.options, node);
	},
	addStorage() {
		const options = this.options;
		return { markdown: { serialize(state, node) {
			state.write(getMentionDisplayText(options, node));
		} } };
	}
});
function getMentionDisplayText(options, node) {
	const attrs = node.attrs;
	const mentionEntityId = attrs[EMentionComponentAttributeNames.ENTITY_IDENTIFIER];
	return `@${(options.getMentionedEntityDetails?.(mentionEntityId ?? ""))?.display_name ?? attrs[EMentionComponentAttributeNames.ID] ?? mentionEntityId}`;
}

//#endregion
//#region src/core/helpers/floating-ui.ts
const updateFloatingUIFloaterPosition = (editor, element, options) => {
	document.body.appendChild(element);
	const virtualElement = { getBoundingClientRect: () => posToDOMRect(editor.view, editor.state.selection.from, editor.state.selection.to) };
	return { cleanup: autoUpdate(virtualElement, element, () => {
		computePosition(virtualElement, element, {
			placement: options?.placement ?? "bottom-start",
			strategy: options?.strategy ?? "fixed",
			middleware: [shift(), flip()]
		}).then(({ x, y, strategy }) => {
			Object.assign(element.style, {
				width: "max-content",
				position: strategy,
				left: `${x}px`,
				top: `${y}px`,
				...options?.elementStyle
			});
		}).catch((error) => console.error("An error occurred while updating floating UI floater position:", error));
	}) };
};

//#endregion
//#region src/core/helpers/tippy.ts
const DROPDOWN_NAVIGATION_KEYS = [
	"ArrowUp",
	"ArrowDown",
	"Enter"
];
const getNextValidIndex = (args) => {
	const { event, sections, selectedIndex } = args;
	const direction = event.key === "ArrowUp" ? "up" : "down";
	if (!sections.length) return {
		section: 0,
		item: 0
	};
	let nextSection = selectedIndex.section;
	let nextItem = selectedIndex.item;
	if (direction === "up") {
		nextItem--;
		if (nextItem < 0) {
			nextSection--;
			if (nextSection < 0) nextSection = sections?.length - 1;
			nextItem = sections?.[nextSection]?.items?.length - 1;
		}
	} else {
		nextItem++;
		if (nextItem >= sections?.[nextSection]?.items?.length) {
			nextSection++;
			if (nextSection >= sections?.length) nextSection = 0;
			nextItem = 0;
		}
	}
	return {
		section: nextSection,
		item: nextItem
	};
};

//#endregion
//#region src/core/extensions/table/table/utilities/helpers.ts
/**
* @description Check if the selection is a cell selection
* @param {Selection} selection - The selection to check
* @returns {boolean} True if the selection is a cell selection, false otherwise
*/
const isCellSelection = (selection) => selection instanceof CellSelection;
/**
* @description Check if a cell is empty
* @param {ProseMirrorNode | null} cell - The cell to check
* @returns {boolean} True if the cell is empty, false otherwise
*/
const isCellEmpty = (cell) => {
	if (!cell || cell.content.size === 0) return true;
	let hasContent = false;
	cell.content.forEach((node) => {
		if (node.type.name === CORE_EXTENSIONS$1.PARAGRAPH) {
			if (node.content.size > 0) hasContent = true;
		} else if (node.content.size > 0 || node.isText) hasContent = true;
	});
	return !hasContent;
};
/**
* @description Find the table node location from the selection.
* @param {Selection} selection - The selection.
* @returns {TableNodeLocation | undefined} The table node location.
*/
const findTable = (selection) => findParentNode((node) => node.type.spec.tableRole === "table")(selection);
/**
* @description Check if the selection has table related changes.
* @param {Editor} editor - The editor instance.
* @param {TableNodeLocation | undefined} table - The table node location.
* @param {EditorState} oldState - The old editor state.
* @param {EditorState} newState - The new editor state.
* @param {Transaction} tr - The transaction.
* @returns {boolean} True if the selection has table related changes, false otherwise.
*/
const haveTableRelatedChanges = (editor, table, oldState, newState, tr) => editor.isEditable && table !== void 0 && (tr.docChanged || !newState.selection.eq(oldState.selection));
/**
* @description Get the selected rect from the cell selection.
* @param {CellSelection} selection - The cell selection.
* @param {TableMap} map - The table map.
* @returns {Rect} The selected rect.
*/
const getSelectedRect = (selection, map) => {
	const start = selection.$anchorCell.start(-1);
	return map.rectBetween(selection.$anchorCell.pos - start, selection.$headCell.pos - start);
};
/**
* @description Get the selected columns from the cell selection.
* @param {Selection} selection - The selection.
* @param {TableMap} map - The table map.
* @returns {number[]} The selected columns.
*/
const getSelectedColumns = (selection, map) => {
	if (isCellSelection(selection) && selection.isColSelection()) {
		const selectedRect = getSelectedRect(selection, map);
		return [...Array(selectedRect.right - selectedRect.left).keys()].map((idx) => idx + selectedRect.left);
	}
	return [];
};
/**
* @description Get the selected rows from the cell selection.
* @param {Selection} selection - The selection.
* @param {TableMap} map - The table map.
* @returns {number[]} The selected rows.
*/
const getSelectedRows = (selection, map) => {
	if (isCellSelection(selection) && selection.isRowSelection()) {
		const selectedRect = getSelectedRect(selection, map);
		return [...Array(selectedRect.bottom - selectedRect.top).keys()].map((idx) => idx + selectedRect.top);
	}
	return [];
};
/**
* @description Select the column.
* @param {TableNodeLocation} table - The table node location.
* @param {number} index - The column index.
* @param {Transaction} tr - The transaction.
* @returns {Transaction} The updated transaction.
*/
const selectColumn = (table, index, tr) => {
	const { map } = TableMap.get(table.node);
	const anchorCell = table.start + map[index];
	const $anchor = tr.doc.resolve(anchorCell);
	return tr.setSelection(CellSelection.colSelection($anchor));
};
/**
* @description Select the row.
* @param {TableNodeLocation} table - The table node location.
* @param {number} index - The row index.
* @param {Transaction} tr - The transaction.
* @returns {Transaction} The updated transaction.
*/
const selectRow = (table, index, tr) => {
	const { map, width } = TableMap.get(table.node);
	const anchorCell = table.start + map[index * width];
	const $anchor = tr.doc.resolve(anchorCell);
	return tr.setSelection(CellSelection.rowSelection($anchor));
};
/**
* @description Get the position of the cell widget decoration.
* @param {TableNodeLocation} table - The table node location.
* @param {TableMap} map - The table map.
* @param {number} index - The index.
* @returns {number} The position of the cell widget decoration.
*/
const getTableCellWidgetDecorationPos = (table, map, index) => table.start + map.map[index] + 1;
/**
* @description Get the height of the table in pixels.
* @param {TableNodeLocation} table - The table node location.
* @param {Editor} editor - The editor instance.
* @returns {number} The height of the table in pixels.
*/
const getTableHeightPx = (table, editor) => {
	return editor.view.domAtPos(table.start).node.parentElement?.offsetHeight ?? 0;
};
/**
* @description Get the width of the table in pixels.
* @param {TableNodeLocation} table - The table node location.
* @param {Editor} editor - The editor instance.
* @returns {number} The width of the table in pixels.
*/
const getTableWidthPx = (table, editor) => {
	return editor.view.domAtPos(table.start).node.parentElement?.offsetWidth ?? 0;
};

//#endregion
//#region src/core/extensions/table/plugins/drag-handles/actions.ts
/**
* Move the selected columns to the specified index.
* @param {Editor} editor - The editor instance.
* @param {TableNodeLocation} table - The table node location.
* @param {CellSelection} selection - The cell selection.
* @param {number} to - The index to move the columns to.
* @param {Transaction} tr - The transaction.
* @returns {Transaction} The updated transaction.
*/
const moveSelectedColumns = (editor, table, selection, to, tr) => {
	const tableMap = TableMap.get(table.node);
	let columnStart = -1;
	let columnEnd = -1;
	selection.forEachCell((_node, pos) => {
		const cell = tableMap.findCell(pos - table.pos - 1);
		for (let i = cell.left; i < cell.right; i++) {
			columnStart = columnStart >= 0 ? Math.min(cell.left, columnStart) : cell.left;
			columnEnd = columnEnd >= 0 ? Math.max(cell.right, columnEnd) : cell.right;
		}
	});
	if (columnStart === -1 || columnEnd === -1) {
		console.warn("Invalid column selection");
		return tr;
	}
	if (to < 0 || to > tableMap.width || to >= columnStart && to < columnEnd) return tr;
	const rows = tableToCells(table);
	for (const row of rows) {
		const range = row.splice(columnStart, columnEnd - columnStart);
		const offset$1 = to > columnStart ? to - (columnEnd - columnStart - 1) : to;
		row.splice(offset$1, 0, ...range);
	}
	tableFromCells(editor, table, rows, tr);
	return tr;
};
/**
* Move the selected rows to the specified index.
* @param {Editor} editor - The editor instance.
* @param {TableNodeLocation} table - The table node location.
* @param {CellSelection} selection - The cell selection.
* @param {number} to - The index to move the rows to.
* @param {Transaction} tr - The transaction.
* @returns {Transaction} The updated transaction.
*/
const moveSelectedRows = (editor, table, selection, to, tr) => {
	const tableMap = TableMap.get(table.node);
	let rowStart = -1;
	let rowEnd = -1;
	selection.forEachCell((_node, pos) => {
		const cell = tableMap.findCell(pos - table.pos - 1);
		for (let i = cell.top; i < cell.bottom; i++) {
			rowStart = rowStart >= 0 ? Math.min(cell.top, rowStart) : cell.top;
			rowEnd = rowEnd >= 0 ? Math.max(cell.bottom, rowEnd) : cell.bottom;
		}
	});
	if (rowStart === -1 || rowEnd === -1) {
		console.warn("Invalid row selection");
		return tr;
	}
	if (to < 0 || to > tableMap.height || to >= rowStart && to < rowEnd) return tr;
	const rows = tableToCells(table);
	const range = rows.splice(rowStart, rowEnd - rowStart);
	const offset$1 = to > rowStart ? to - (rowEnd - rowStart - 1) : to;
	rows.splice(offset$1, 0, ...range);
	tableFromCells(editor, table, rows, tr);
	return tr;
};
/**
* @description Duplicate the selected rows.
* @param {TableNodeLocation} table - The table node location.
* @param {number[]} rowIndices - The indices of the rows to duplicate.
* @param {Transaction} tr - The transaction.
* @returns {Transaction} The updated transaction.
*/
const duplicateRows = (table, rowIndices, tr) => {
	const rows = tableToCells(table);
	const { map, width } = TableMap.get(table.node);
	const maxRow = rows.length - 1;
	if (rowIndices.some((idx) => idx < 0 || idx > maxRow)) {
		console.warn("Invalid row indices for duplication");
		return tr;
	}
	const mapStart = tr.mapping.maps.length;
	const lastRowPos = map[rowIndices[rowIndices.length - 1] * width + width - 1];
	const nextRowStart = lastRowPos + (table.node.nodeAt(lastRowPos)?.nodeSize ?? 0) + 1;
	const insertPos = tr.mapping.slice(mapStart).map(table.start + nextRowStart);
	for (let i = rowIndices.length - 1; i >= 0; i--) tr.insert(insertPos, rows[rowIndices[i]].filter((r) => r !== null));
	return tr;
};
/**
* @description Duplicate the selected columns.
* @param {TableNodeLocation} table - The table node location.
* @param {number[]} columnIndices - The indices of the columns to duplicate.
* @param {Transaction} tr - The transaction.
* @returns {Transaction} The updated transaction.
*/
const duplicateColumns = (table, columnIndices, tr) => {
	const rows = tableToCells(table);
	const { map, width, height } = TableMap.get(table.node);
	if (columnIndices.some((idx) => idx < 0 || idx >= width)) {
		console.warn("Invalid column indices for duplication");
		return tr;
	}
	const mapStart = tr.mapping.maps.length;
	for (let row = 0; row < height; row++) {
		const lastColumnPos = map[row * width + columnIndices[columnIndices.length - 1]];
		const nextColumnStart = lastColumnPos + (table.node.nodeAt(lastColumnPos)?.nodeSize ?? 0);
		const insertPos = tr.mapping.slice(mapStart).map(table.start + nextColumnStart);
		for (let i = columnIndices.length - 1; i >= 0; i--) {
			const copiedNode = rows[row][columnIndices[i]];
			if (copiedNode !== null) tr.insert(insertPos, copiedNode);
		}
	}
	return tr;
};
/**
* @description Convert the table to cells.
* @param {TableNodeLocation} table - The table node location.
* @returns {TableRows} The table rows.
*/
const tableToCells = (table) => {
	const { map, width, height } = TableMap.get(table.node);
	const visitedCells = /* @__PURE__ */ new Set();
	const rows = [];
	for (let row = 0; row < height; row++) {
		const cells = [];
		for (let col = 0; col < width; col++) {
			const pos = map[row * width + col];
			cells.push(!visitedCells.has(pos) ? table.node.nodeAt(pos) : null);
			visitedCells.add(pos);
		}
		rows.push(cells);
	}
	return rows;
};
/**
* @description Convert the cells to a table.
* @param {Editor} editor - The editor instance.
* @param {TableNodeLocation} table - The table node location.
* @param {TableRows} rows - The table rows.
* @param {Transaction} tr - The transaction.
*/
const tableFromCells = (editor, table, rows, tr) => {
	const schema = editor.schema.nodes;
	const newRowNodes = rows.map((row) => schema.tableRow.create(null, row.filter((cell) => cell !== null)));
	const newTableNode = table.node.copy(Fragment$1.from(newRowNodes));
	tr.replaceWith(table.pos, table.pos + table.node.nodeSize, newTableNode);
};

//#endregion
//#region src/core/extensions/table/plugins/drag-handles/marker-utils.ts
const DROP_MARKER_CLASS = "table-drop-marker";
const COL_DRAG_MARKER_CLASS = "table-col-drag-marker";
const ROW_DRAG_MARKER_CLASS = "table-row-drag-marker";
const DROP_MARKER_THICKNESS = 2;
const getDropMarker = (tableElement) => tableElement.querySelector(`.${DROP_MARKER_CLASS}`);
const hideDropMarker = (element) => {
	if (!element.classList.contains("hidden")) element.classList.add("hidden");
};
const updateColDropMarker = ({ element, left, width }) => {
	element.style.height = "100%";
	element.style.width = `${width}px`;
	element.style.top = "0";
	element.style.left = `${left}px`;
	element.classList.remove("hidden");
};
const updateRowDropMarker = ({ element, top, height }) => {
	element.style.width = "100%";
	element.style.height = `${height}px`;
	element.style.left = "0";
	element.style.top = `${top}px`;
	element.classList.remove("hidden");
};
const getColDragMarker = (tableElement) => tableElement.querySelector(`.${COL_DRAG_MARKER_CLASS}`);
const getRowDragMarker = (tableElement) => tableElement.querySelector(`.${ROW_DRAG_MARKER_CLASS}`);
const hideDragMarker = (element) => {
	if (!element.classList.contains("hidden")) element.classList.add("hidden");
};
const updateColDragMarker = ({ element, left, width, pseudoColumn }) => {
	element.style.left = `${left}px`;
	element.style.width = `${width}px`;
	element.classList.remove("hidden");
	if (pseudoColumn) {
		while (element.firstChild) element.removeChild(element.firstChild);
		element.appendChild(pseudoColumn.cloneNode(true));
	}
};
const updateRowDragMarker = ({ element, top, height, pseudoRow }) => {
	element.style.top = `${top}px`;
	element.style.height = `${height}px`;
	element.classList.remove("hidden");
	if (pseudoRow) {
		while (element.firstChild) element.removeChild(element.firstChild);
		element.appendChild(pseudoRow.cloneNode(true));
	}
};

//#endregion
//#region src/core/constants/meta.ts
let CORE_EDITOR_META = /* @__PURE__ */ function(CORE_EDITOR_META$1) {
	CORE_EDITOR_META$1["SKIP_FILE_DELETION"] = "skipFileDeletion";
	CORE_EDITOR_META$1["INTENTIONAL_DELETION"] = "intentionalDeletion";
	CORE_EDITOR_META$1["ADD_TO_HISTORY"] = "addToHistory";
	return CORE_EDITOR_META$1;
}({});

//#endregion
//#region src/core/extensions/table/plugins/drag-handles/utils.ts
/**
* @description Construct a pseudo table element which will act as a parent for column and row drag previews.
* @returns {HTMLTableElement} The pseudo table.
*/
const constructDragPreviewTable = () => {
	const tableElement = document.createElement("table");
	tableElement.classList.add("table-drag-preview");
	tableElement.classList.add("bg-custom-background-100");
	tableElement.style.opacity = "0.9";
	const tableBodyElement = document.createElement("tbody");
	tableElement.appendChild(tableBodyElement);
	return {
		tableElement,
		tableBodyElement
	};
};
/**
* @description Clone a table cell element.
* @param {HTMLElement} cellElement - The cell element to clone.
* @returns {HTMLElement} The cloned cell element.
*/
const cloneTableCell = (cellElement) => {
	const clonedCellElement = cellElement.cloneNode(true);
	clonedCellElement.style.setProperty("visibility", "visible", "important");
	clonedCellElement.querySelectorAll(".ProseMirror-widget").forEach((widget) => widget.remove());
	return { clonedCellElement };
};
/**
* @description This function updates the `hideContent` attribute of the table cells and headers.
* @param {Editor} editor - The editor instance.
* @param {boolean} hideContent - Whether to hide the content.
* @returns {boolean} Whether the content visibility was updated.
*/
const updateCellContentVisibility = (editor, hideContent) => editor.chain().focus().setMeta(CORE_EDITOR_META.ADD_TO_HISTORY, false).updateAttributes(CORE_EXTENSIONS$1.TABLE_CELL, { hideContent }).updateAttributes(CORE_EXTENSIONS$1.TABLE_HEADER, { hideContent }).run();

//#endregion
//#region src/core/extensions/table/plugins/drag-handles/color-selector.tsx
const handleBackgroundColorChange = (editor, color) => {
	editor.chain().focus().updateAttributes(CORE_EXTENSIONS$1.TABLE_CELL, { background: color }).run();
};
function TableDragHandleDropdownColorSelector(props) {
	const { editor, onSelect } = props;
	return /* @__PURE__ */ jsxs(Disclosure, {
		defaultOpen: true,
		children: [/* @__PURE__ */ jsx(Disclosure.Button, {
			as: "button",
			type: "button",
			className: "flex items-center justify-between gap-2 w-full rounded px-1 py-1.5 text-xs text-left truncate text-custom-text-200 hover:bg-custom-background-80",
			children: ({ open }) => /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs("span", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ jsx(Palette, { className: "shrink-0 size-3" }), "Color"]
			}), /* @__PURE__ */ jsx(ChevronRightIcon, { className: cn("shrink-0 size-3 transition-transform duration-200", { "rotate-90": open }) })] })
		}), /* @__PURE__ */ jsx(Disclosure.Panel, {
			className: "p-1 space-y-2 mb-1.5",
			children: /* @__PURE__ */ jsxs("div", {
				className: "space-y-1",
				children: [/* @__PURE__ */ jsx("p", {
					className: "text-xs text-custom-text-300 font-semibold",
					children: "Background colors"
				}), /* @__PURE__ */ jsxs("div", {
					className: "flex items-center flex-wrap gap-2",
					children: [COLORS_LIST.map((color) => /* @__PURE__ */ jsx("button", {
						type: "button",
						className: "flex-shrink-0 size-6 rounded border-[0.5px] border-custom-border-400 hover:opacity-60 transition-opacity",
						style: { backgroundColor: color.backgroundColor },
						onClick: () => {
							handleBackgroundColorChange(editor, color.backgroundColor);
							onSelect(color.backgroundColor);
						}
					}, color.key)), /* @__PURE__ */ jsx("button", {
						type: "button",
						className: "flex-shrink-0 size-6 grid place-items-center rounded text-custom-text-300 border-[0.5px] border-custom-border-400 hover:bg-custom-background-80 transition-colors",
						onClick: () => {
							handleBackgroundColorChange(editor, null);
							onSelect(null);
						},
						children: /* @__PURE__ */ jsx(Ban, { className: "size-4" })
					})]
				})]
			})
		})]
	});
}

//#endregion
//#region src/core/extensions/table/plugins/drag-handles/column/dropdown.tsx
const DROPDOWN_ITEMS$1 = [
	{
		key: "insert-left",
		label: "Insert left",
		icon: ArrowLeft,
		action: (editor) => editor.chain().focus().addColumnBefore().run()
	},
	{
		key: "insert-right",
		label: "Insert right",
		icon: ArrowRight,
		action: (editor) => editor.chain().focus().addColumnAfter().run()
	},
	{
		key: "duplicate",
		label: "Duplicate",
		icon: Copy,
		action: (editor) => {
			const table = findTable(editor.state.selection);
			if (!table) return;
			const tableMap = TableMap.get(table.node);
			let tr = editor.state.tr;
			tr = duplicateColumns(table, getSelectedColumns(editor.state.selection, tableMap), tr);
			editor.view.dispatch(tr);
		}
	},
	{
		key: "clear-contents",
		label: "Clear contents",
		icon: CloseIcon,
		action: (editor) => editor.chain().focus().clearSelectedCells().run()
	},
	{
		key: "delete",
		label: "Delete",
		icon: Trash2,
		action: (editor) => editor.chain().focus().deleteColumn().run()
	}
];
function ColumnOptionsDropdown(props) {
	const { editor, onClose } = props;
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsxs("button", {
			type: "button",
			className: "flex items-center justify-between gap-2 w-full rounded px-1 py-1.5 text-xs text-left truncate text-custom-text-200 hover:bg-custom-background-80",
			onClick: (e) => {
				e.preventDefault();
				e.stopPropagation();
				editor.chain().focus().toggleHeaderColumn().run();
				onClose();
			},
			children: [/* @__PURE__ */ jsx("div", {
				className: "flex-grow truncate",
				children: "Header column"
			}), /* @__PURE__ */ jsx(ToggleRight, { className: "shrink-0 size-3" })]
		}),
		/* @__PURE__ */ jsx("hr", { className: "my-2 border-custom-border-200" }),
		/* @__PURE__ */ jsx(TableDragHandleDropdownColorSelector, {
			editor,
			onSelect: onClose
		}),
		DROPDOWN_ITEMS$1.map((item) => /* @__PURE__ */ jsxs("button", {
			type: "button",
			className: "flex items-center gap-2 w-full rounded px-1 py-1.5 text-xs text-left truncate text-custom-text-200 hover:bg-custom-background-80",
			onClick: (e) => {
				e.preventDefault();
				e.stopPropagation();
				item.action(editor);
				onClose();
			},
			children: [/* @__PURE__ */ jsx(item.icon, { className: "shrink-0 size-3" }), /* @__PURE__ */ jsx("div", {
				className: "flex-grow truncate",
				children: item.label
			})]
		}, item.key))
	] });
}

//#endregion
//#region src/core/extensions/table/plugins/drag-handles/column/utils.ts
/**
* @description Calculate the index where the dragged column should be dropped.
* @param {number} col - The column index.
* @param {TableColumn[]} columns - The columns.
* @param {number} left - The left position of the dragged column.
* @returns {number} The index where the dragged column should be dropped.
*/
const calculateColumnDropIndex = (col, columns, left) => {
	const currentColumnLeft = columns[col].left;
	const currentColumnRight = currentColumnLeft + columns[col].width;
	const draggedColumnLeft = left;
	const draggedColumnRight = draggedColumnLeft + columns[col].width;
	const isDraggingToLeft = draggedColumnLeft < currentColumnLeft;
	const isDraggingToRight = draggedColumnRight > currentColumnRight;
	const isFirstColumn = col === 0;
	const isLastColumn = col === columns.length - 1;
	if (isFirstColumn && isDraggingToLeft || isLastColumn && isDraggingToRight) return col;
	const firstColumn = columns[0];
	if (isDraggingToLeft && draggedColumnLeft <= firstColumn.left) return 0;
	const lastColumn = columns[columns.length - 1];
	if (isDraggingToRight && draggedColumnRight >= lastColumn.left + lastColumn.width) return columns.length - 1;
	let dropColumnIndex = col;
	if (isDraggingToRight) {
		const findHoveredColumn = columns.find((p, index) => {
			if (index === col) return false;
			const currentColumnCenter = p.left + p.width / 2;
			const currentColumnEdge = p.left + p.width;
			const nextColumn = columns[index + 1];
			const nextColumnCenter = nextColumn ? nextColumn.width / 2 : 0;
			return draggedColumnRight >= currentColumnCenter && draggedColumnRight < currentColumnEdge + nextColumnCenter;
		});
		if (findHoveredColumn) dropColumnIndex = columns.indexOf(findHoveredColumn);
	}
	if (isDraggingToLeft) {
		const findHoveredColumn = columns.find((p, index) => {
			if (index === col) return false;
			const currentColumnCenter = p.left + p.width / 2;
			const prevColumn = columns[index - 1];
			const prevColumnLeft = prevColumn ? prevColumn.left : 0;
			const prevColumnCenter = prevColumn ? prevColumn.width / 2 : 0;
			return draggedColumnLeft <= currentColumnCenter && draggedColumnLeft > prevColumnLeft + prevColumnCenter;
		});
		if (findHoveredColumn) dropColumnIndex = columns.indexOf(findHoveredColumn);
	}
	return dropColumnIndex;
};
/**
* @description Get the node information of the columns in the table- their offset left and width.
* @param {TableNodeLocation} table - The table node location.
* @param {Editor} editor - The editor instance.
* @returns {TableColumn[]} The information of the columns in the table.
*/
const getTableColumnNodesInfo = (table, editor) => {
	const result = [];
	let leftPx = 0;
	const tableMap = TableMap.get(table.node);
	if (!tableMap || tableMap.height === 0 || tableMap.width === 0) return result;
	for (let col = 0; col < tableMap.width; col++) {
		const cellPos = tableMap.map[col];
		if (cellPos === void 0) continue;
		const dom = editor.view.domAtPos(table.start + cellPos + 1);
		if (dom.node instanceof HTMLElement) {
			if (col === 0) leftPx = dom.node.offsetLeft;
			result.push({
				left: dom.node.offsetLeft - leftPx,
				width: dom.node.offsetWidth
			});
		}
	}
	return result;
};
/**
* @description Construct a pseudo column from the selected cells for drag preview.
* @param {Editor} editor - The editor instance.
* @param {Selection} selection - The selection.
* @param {TableNodeLocation} table - The table node location.
* @returns {HTMLElement | undefined} The pseudo column.
*/
const constructColumnDragPreview = (editor, selection, table) => {
	if (!isCellSelection(selection)) return;
	const tableMap = TableMap.get(table.node);
	const selectedColRect = getSelectedRect(selection, tableMap);
	const activeColCells = tableMap.cellsInRect(selectedColRect);
	const { tableElement, tableBodyElement } = constructDragPreviewTable();
	activeColCells.forEach((cellPos) => {
		const resolvedCellPos = table.start + cellPos + 1;
		const cellElement = editor.view.domAtPos(resolvedCellPos).node;
		if (cellElement instanceof HTMLElement) {
			const { clonedCellElement } = cloneTableCell(cellElement);
			clonedCellElement.style.height = cellElement.getBoundingClientRect().height + "px";
			const tableRowElement = document.createElement("tr");
			tableRowElement.appendChild(clonedCellElement);
			tableBodyElement.appendChild(tableRowElement);
		}
	});
	updateCellContentVisibility(editor, true);
	return tableElement;
};

//#endregion
//#region src/core/extensions/table/plugins/drag-handles/column/drag-handle.tsx
function ColumnDragHandle(props) {
	const { col, editor } = props;
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const { refs, floatingStyles, context } = useFloating({
		placement: "bottom-start",
		middleware: [flip$1({ fallbackPlacements: [
			"top-start",
			"bottom-start",
			"top-end",
			"bottom-end"
		] }), shift$1({ padding: 8 })],
		open: isDropdownOpen,
		onOpenChange: (open) => {
			setIsDropdownOpen(open);
			if (open) editor.commands.addActiveDropbarExtension(CORE_EXTENSIONS$1.TABLE);
			else setTimeout(() => {
				editor.commands.removeActiveDropbarExtension(CORE_EXTENSIONS$1.TABLE);
			}, 0);
		},
		whileElementsMounted: autoUpdate$1
	});
	const click = useClick(context);
	const { getReferenceProps, getFloatingProps } = useInteractions([
		useDismiss(context),
		click,
		useRole(context)
	]);
	useEffect(() => {
		if (!isDropdownOpen) return;
		const handleKeyDown = (event) => {
			context.onOpenChange(false);
			event.preventDefault();
			event.stopPropagation();
		};
		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [isDropdownOpen, context]);
	const handleMouseDown = useCallback((e) => {
		e.stopPropagation();
		e.preventDefault();
		const table = findTable(editor.state.selection);
		if (!table) return;
		editor.view.dispatch(selectColumn(table, col, editor.state.tr));
		const tableWidthPx = getTableWidthPx(table, editor);
		const columns = getTableColumnNodesInfo(table, editor);
		let dropIndex = col;
		const startLeft = columns[col].left ?? 0;
		const startX = e.clientX;
		const tableElement = editor.view.nodeDOM(table.pos);
		const dropMarker = tableElement instanceof HTMLElement ? getDropMarker(tableElement) : null;
		const dragMarker = tableElement instanceof HTMLElement ? getColDragMarker(tableElement) : null;
		const handleFinish = () => {
			if (!dropMarker || !dragMarker) return;
			hideDropMarker(dropMarker);
			hideDragMarker(dragMarker);
			if (isCellSelection(editor.state.selection)) updateCellContentVisibility(editor, false);
			if (col !== dropIndex) {
				let tr = editor.state.tr;
				const selection = editor.state.selection;
				if (isCellSelection(selection)) {
					const table$1 = findTable(selection);
					if (table$1) tr = moveSelectedColumns(editor, table$1, selection, dropIndex, tr);
				}
				editor.view.dispatch(tr);
			}
			window.removeEventListener("mouseup", handleFinish);
			window.removeEventListener("mousemove", handleMove);
		};
		let pseudoColumn;
		const handleMove = (moveEvent) => {
			if (!dropMarker || !dragMarker) return;
			const currentLeft = startLeft + moveEvent.clientX - startX;
			dropIndex = calculateColumnDropIndex(col, columns, currentLeft);
			if (!pseudoColumn) {
				pseudoColumn = constructColumnDragPreview(editor, editor.state.selection, table);
				const tableHeightPx = getTableHeightPx(table, editor);
				if (pseudoColumn) pseudoColumn.style.height = `${tableHeightPx}px`;
			}
			const dragMarkerWidthPx = columns[col].width;
			const dragMarkerLeftPx = Math.max(0, Math.min(currentLeft, tableWidthPx - dragMarkerWidthPx));
			updateColDropMarker({
				element: dropMarker,
				left: (dropIndex <= col ? columns[dropIndex].left : columns[dropIndex].left + columns[dropIndex].width) - Math.floor(DROP_MARKER_THICKNESS / 2) - 1,
				width: DROP_MARKER_THICKNESS
			});
			updateColDragMarker({
				element: dragMarker,
				left: dragMarkerLeftPx,
				width: dragMarkerWidthPx,
				pseudoColumn
			});
		};
		try {
			window.addEventListener("mouseup", handleFinish);
			window.addEventListener("mousemove", handleMove);
		} catch (error) {
			console.error("Error in ColumnDragHandle:", error);
			handleFinish();
		}
	}, [col, editor]);
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("div", {
		className: "table-col-handle-container absolute z-20 top-0 left-0 flex justify-center items-center w-full -translate-y-1/2",
		children: /* @__PURE__ */ jsx("button", {
			ref: refs.setReference,
			...getReferenceProps(),
			type: "button",
			onMouseDown: handleMouseDown,
			className: cn("px-1 bg-custom-background-90 border border-custom-border-400 rounded outline-none transition-all duration-200", {
				"!opacity-100 bg-custom-primary-100 border-custom-primary-100": isDropdownOpen,
				"hover:bg-custom-background-80": !isDropdownOpen
			}),
			children: /* @__PURE__ */ jsx(Ellipsis, { className: "size-4 text-custom-text-100" })
		})
	}), isDropdownOpen && /* @__PURE__ */ jsxs(FloatingPortal, { children: [/* @__PURE__ */ jsx(FloatingOverlay, {
		style: { zIndex: 99 },
		lockScroll: true
	}), /* @__PURE__ */ jsx("div", {
		className: "max-h-[90vh] w-[12rem] overflow-y-auto rounded-md border-[0.5px] border-custom-border-300 bg-custom-background-100 px-2 py-2.5 shadow-custom-shadow-rg",
		ref: refs.setFloating,
		...getFloatingProps(),
		style: {
			...floatingStyles,
			zIndex: 100
		},
		children: /* @__PURE__ */ jsx(ColumnOptionsDropdown, {
			editor,
			onClose: () => context.onOpenChange(false)
		})
	})] })] });
}

//#endregion
//#region src/core/extensions/table/plugins/drag-handles/column/plugin.ts
const TABLE_COLUMN_DRAG_HANDLE_PLUGIN_KEY = new PluginKey("tableColumnHandlerDecorationPlugin");
const TableColumnDragHandlePlugin = (editor) => new Plugin({
	key: TABLE_COLUMN_DRAG_HANDLE_PLUGIN_KEY,
	state: {
		init: () => ({}),
		apply(tr, prev, oldState, newState) {
			const table = findTable(newState.selection);
			if (!haveTableRelatedChanges(editor, table, oldState, newState, tr)) return table !== void 0 ? prev : {};
			const tableMap = TableMap.get(table.node);
			let isStale = prev.tableWidth !== tableMap.width || prev.tableNodePos !== table.pos;
			if (!isStale) {
				const mapped = prev.decorations?.map(tr.mapping, tr.doc);
				for (let col = 0; col < tableMap.width; col++) {
					const pos = getTableCellWidgetDecorationPos(table, tableMap, col);
					if (mapped?.find(pos, pos + 1)?.length !== 1) {
						isStale = true;
						break;
					}
				}
			}
			if (!isStale) return {
				decorations: prev.decorations?.map(tr.mapping, tr.doc),
				tableWidth: tableMap.width,
				tableNodePos: table.pos
			};
			const decorations = [];
			for (let col = 0; col < tableMap.width; col++) {
				const pos = getTableCellWidgetDecorationPos(table, tableMap, col);
				const dragHandleComponent = new ReactRenderer(ColumnDragHandle, {
					props: {
						col,
						editor
					},
					editor
				});
				decorations.push(Decoration.widget(pos, () => dragHandleComponent.element));
			}
			return {
				decorations: DecorationSet.create(newState.doc, decorations),
				tableWidth: tableMap.width,
				tableNodePos: table.pos
			};
		}
	},
	props: { decorations(state) {
		return TABLE_COLUMN_DRAG_HANDLE_PLUGIN_KEY.getState(state).decorations;
	} }
});

//#endregion
//#region src/core/extensions/table/plugins/drag-handles/row/dropdown.tsx
const DROPDOWN_ITEMS = [
	{
		key: "insert-above",
		label: "Insert above",
		icon: ArrowUp,
		action: (editor) => editor.chain().focus().addRowBefore().run()
	},
	{
		key: "insert-below",
		label: "Insert below",
		icon: ArrowDown,
		action: (editor) => editor.chain().focus().addRowAfter().run()
	},
	{
		key: "duplicate",
		label: "Duplicate",
		icon: Copy,
		action: (editor) => {
			const table = findTable(editor.state.selection);
			if (!table) return;
			const tableMap = TableMap.get(table.node);
			let tr = editor.state.tr;
			tr = duplicateRows(table, getSelectedRows(editor.state.selection, tableMap), tr);
			editor.view.dispatch(tr);
		}
	},
	{
		key: "clear-contents",
		label: "Clear contents",
		icon: CloseIcon,
		action: (editor) => editor.chain().focus().clearSelectedCells().run()
	},
	{
		key: "delete",
		label: "Delete",
		icon: Trash2,
		action: (editor) => editor.chain().focus().deleteRow().run()
	}
];
function RowOptionsDropdown(props) {
	const { editor, onClose } = props;
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsxs("button", {
			type: "button",
			className: "flex items-center justify-between gap-2 w-full rounded px-1 py-1.5 text-xs text-left truncate text-custom-text-200 hover:bg-custom-background-80",
			onClick: (e) => {
				e.preventDefault();
				e.stopPropagation();
				editor.chain().focus().toggleHeaderRow().run();
				onClose();
			},
			children: [/* @__PURE__ */ jsx("div", {
				className: "flex-grow truncate",
				children: "Header row"
			}), /* @__PURE__ */ jsx(ToggleRight, { className: "shrink-0 size-3" })]
		}),
		/* @__PURE__ */ jsx("hr", { className: "my-2 border-custom-border-200" }),
		/* @__PURE__ */ jsx(TableDragHandleDropdownColorSelector, {
			editor,
			onSelect: onClose
		}),
		DROPDOWN_ITEMS.map((item) => /* @__PURE__ */ jsxs("button", {
			type: "button",
			className: "flex items-center gap-2 w-full rounded px-1 py-1.5 text-xs text-left truncate text-custom-text-200 hover:bg-custom-background-80",
			onClick: (e) => {
				e.preventDefault();
				e.stopPropagation();
				item.action(editor);
				onClose();
			},
			children: [/* @__PURE__ */ jsx(item.icon, { className: "shrink-0 size-3" }), /* @__PURE__ */ jsx("div", {
				className: "flex-grow truncate",
				children: item.label
			})]
		}, item.key))
	] });
}

//#endregion
//#region src/core/extensions/table/plugins/drag-handles/row/utils.ts
/**
* @description Calculate the index where the dragged row should be dropped.
* @param {number} row - The row index.
* @param {TableRow[]} rows - The rows.
* @param {number} top - The top position of the dragged row.
* @returns {number} The index where the dragged row should be dropped.
*/
const calculateRowDropIndex = (row, rows, top) => {
	const currentRowTop = rows[row].top;
	const currentRowBottom = currentRowTop + rows[row].height;
	const draggedRowTop = top;
	const draggedRowBottom = draggedRowTop + rows[row].height;
	const isDraggingUp = draggedRowTop < currentRowTop;
	const isDraggingDown = draggedRowBottom > currentRowBottom;
	const isFirstRow = row === 0;
	const isLastRow = row === rows.length - 1;
	if (isFirstRow && isDraggingUp || isLastRow && isDraggingDown) return row;
	const firstRow = rows[0];
	if (isDraggingUp && draggedRowTop <= firstRow.top) return 0;
	const lastRow = rows[rows.length - 1];
	if (isDraggingDown && draggedRowBottom >= lastRow.top + lastRow.height) return rows.length - 1;
	let dropRowIndex = row;
	if (isDraggingDown) {
		const findHoveredRow = rows.find((p, index) => {
			if (index === row) return false;
			const currentRowCenter = p.top + p.height / 2;
			const currentRowEdge = p.top + p.height;
			const nextRow = rows[index + 1];
			const nextRowCenter = nextRow ? nextRow.height / 2 : 0;
			return draggedRowBottom >= currentRowCenter && draggedRowBottom < currentRowEdge + nextRowCenter;
		});
		if (findHoveredRow) dropRowIndex = rows.indexOf(findHoveredRow);
	}
	if (isDraggingUp) {
		const findHoveredRow = rows.find((p, index) => {
			if (index === row) return false;
			const currentRowCenter = p.top + p.height / 2;
			const prevRow = rows[index - 1];
			const prevRowTop = prevRow ? prevRow.top : 0;
			const prevRowCenter = prevRow ? prevRow.height / 2 : 0;
			return draggedRowTop <= currentRowCenter && draggedRowTop > prevRowTop + prevRowCenter;
		});
		if (findHoveredRow) dropRowIndex = rows.indexOf(findHoveredRow);
	}
	return dropRowIndex;
};
/**
* @description Get the node information of the rows in the table- their offset top and height.
* @param {TableNodeLocation} table - The table node location.
* @param {Editor} editor - The editor instance.
* @returns {TableRow[]} The information of the rows in the table.
*/
const getTableRowNodesInfo = (table, editor) => {
	const result = [];
	let topPx = 0;
	const tableMap = TableMap.get(table.node);
	if (!tableMap || tableMap.height === 0 || tableMap.width === 0) return result;
	for (let row = 0; row < tableMap.height; row++) {
		const cellPos = tableMap.map[row * tableMap.width];
		if (cellPos === void 0) continue;
		const dom = editor.view.domAtPos(table.start + cellPos);
		if (dom.node instanceof HTMLElement) {
			const heightPx = dom.node.offsetHeight;
			result.push({
				top: topPx,
				height: heightPx
			});
			topPx += heightPx;
		}
	}
	return result;
};
/**
* @description Construct a pseudo column from the selected cells for drag preview.
* @param {Editor} editor - The editor instance.
* @param {Selection} selection - The selection.
* @param {TableNodeLocation} table - The table node location.
* @returns {HTMLElement | undefined} The pseudo column.
*/
const constructRowDragPreview = (editor, selection, table) => {
	if (!isCellSelection(selection)) return;
	const tableMap = TableMap.get(table.node);
	const selectedRowRect = getSelectedRect(selection, tableMap);
	const activeRowCells = tableMap.cellsInRect(selectedRowRect);
	const { tableElement, tableBodyElement } = constructDragPreviewTable();
	const tableRowElement = document.createElement("tr");
	tableBodyElement.appendChild(tableRowElement);
	activeRowCells.forEach((cellPos) => {
		const resolvedCellPos = table.start + cellPos + 1;
		const cellElement = editor.view.domAtPos(resolvedCellPos).node;
		if (cellElement instanceof HTMLElement) {
			const { clonedCellElement } = cloneTableCell(cellElement);
			clonedCellElement.style.width = cellElement.getBoundingClientRect().width + "px";
			tableRowElement.appendChild(clonedCellElement);
		}
	});
	updateCellContentVisibility(editor, true);
	return tableElement;
};

//#endregion
//#region src/core/extensions/table/plugins/drag-handles/row/drag-handle.tsx
function RowDragHandle(props) {
	const { editor, row } = props;
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const { refs, floatingStyles, context } = useFloating({
		placement: "bottom-start",
		middleware: [flip$1({ fallbackPlacements: [
			"top-start",
			"bottom-start",
			"top-end",
			"bottom-end"
		] }), shift$1({ padding: 8 })],
		open: isDropdownOpen,
		onOpenChange: (open) => {
			setIsDropdownOpen(open);
			if (open) editor.commands.addActiveDropbarExtension(CORE_EXTENSIONS$1.TABLE);
			else setTimeout(() => {
				editor.commands.removeActiveDropbarExtension(CORE_EXTENSIONS$1.TABLE);
			}, 0);
		},
		whileElementsMounted: autoUpdate$1
	});
	const click = useClick(context);
	const { getReferenceProps, getFloatingProps } = useInteractions([
		useDismiss(context),
		click,
		useRole(context)
	]);
	useEffect(() => {
		if (!isDropdownOpen) return;
		const handleKeyDown = (event) => {
			context.onOpenChange(false);
			event.preventDefault();
			event.stopPropagation();
		};
		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [isDropdownOpen, context]);
	const handleMouseDown = useCallback((e) => {
		e.stopPropagation();
		e.preventDefault();
		const table = findTable(editor.state.selection);
		if (!table) return;
		editor.view.dispatch(selectRow(table, row, editor.state.tr));
		const tableHeightPx = getTableHeightPx(table, editor);
		const rows = getTableRowNodesInfo(table, editor);
		let dropIndex = row;
		const startTop = rows[row].top ?? 0;
		const startY = e.clientY;
		const tableElement = editor.view.nodeDOM(table.pos);
		const dropMarker = tableElement instanceof HTMLElement ? getDropMarker(tableElement) : null;
		const dragMarker = tableElement instanceof HTMLElement ? getRowDragMarker(tableElement) : null;
		const handleFinish = () => {
			if (!dropMarker || !dragMarker) return;
			hideDropMarker(dropMarker);
			hideDragMarker(dragMarker);
			if (isCellSelection(editor.state.selection)) updateCellContentVisibility(editor, false);
			if (row !== dropIndex) {
				let tr = editor.state.tr;
				const selection = editor.state.selection;
				if (isCellSelection(selection)) {
					const table$1 = findTable(selection);
					if (table$1) tr = moveSelectedRows(editor, table$1, selection, dropIndex, tr);
				}
				editor.view.dispatch(tr);
			}
			window.removeEventListener("mouseup", handleFinish);
			window.removeEventListener("mousemove", handleMove);
		};
		let pseudoRow;
		const handleMove = (moveEvent) => {
			if (!dropMarker || !dragMarker) return;
			const cursorTop = startTop + moveEvent.clientY - startY;
			dropIndex = calculateRowDropIndex(row, rows, cursorTop);
			if (!pseudoRow) {
				pseudoRow = constructRowDragPreview(editor, editor.state.selection, table);
				const tableWidthPx = getTableWidthPx(table, editor);
				if (pseudoRow) pseudoRow.style.width = `${tableWidthPx}px`;
			}
			const dragMarkerHeightPx = rows[row].height;
			const dragMarkerTopPx = Math.max(0, Math.min(cursorTop, tableHeightPx - dragMarkerHeightPx));
			updateRowDropMarker({
				element: dropMarker,
				top: (dropIndex <= row ? rows[dropIndex].top : rows[dropIndex].top + rows[dropIndex].height) - DROP_MARKER_THICKNESS / 2,
				height: DROP_MARKER_THICKNESS
			});
			updateRowDragMarker({
				element: dragMarker,
				top: dragMarkerTopPx,
				height: dragMarkerHeightPx,
				pseudoRow
			});
		};
		try {
			window.addEventListener("mouseup", handleFinish);
			window.addEventListener("mousemove", handleMove);
		} catch (error) {
			console.error("Error in RowDragHandle:", error);
			handleFinish();
		}
	}, [editor, row]);
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("div", {
		className: "table-row-handle-container absolute z-20 top-0 left-0 flex justify-center items-center h-full -translate-x-1/2",
		children: /* @__PURE__ */ jsx("button", {
			ref: refs.setReference,
			...getReferenceProps(),
			type: "button",
			onMouseDown: handleMouseDown,
			className: cn("py-1 bg-custom-background-90 border border-custom-border-400 rounded outline-none transition-all duration-200", {
				"!opacity-100 bg-custom-primary-100 border-custom-primary-100": isDropdownOpen,
				"hover:bg-custom-background-80": !isDropdownOpen
			}),
			children: /* @__PURE__ */ jsx(Ellipsis, { className: "size-4 text-custom-text-100 rotate-90" })
		})
	}), isDropdownOpen && /* @__PURE__ */ jsxs(FloatingPortal, { children: [/* @__PURE__ */ jsx(FloatingOverlay, {
		style: { zIndex: 99 },
		lockScroll: true
	}), /* @__PURE__ */ jsx("div", {
		className: "max-h-[90vh] w-[12rem] overflow-y-auto rounded-md border-[0.5px] border-custom-border-300 bg-custom-background-100 px-2 py-2.5 shadow-custom-shadow-rg",
		ref: refs.setFloating,
		...getFloatingProps(),
		style: {
			...floatingStyles,
			zIndex: 100
		},
		children: /* @__PURE__ */ jsx(RowOptionsDropdown, {
			editor,
			onClose: () => context.onOpenChange(false)
		})
	})] })] });
}

//#endregion
//#region src/core/extensions/table/plugins/drag-handles/row/plugin.ts
const TABLE_ROW_DRAG_HANDLE_PLUGIN_KEY = new PluginKey("tableRowDragHandlePlugin");
const TableRowDragHandlePlugin = (editor) => new Plugin({
	key: TABLE_ROW_DRAG_HANDLE_PLUGIN_KEY,
	state: {
		init: () => ({}),
		apply(tr, prev, oldState, newState) {
			const table = findTable(newState.selection);
			if (!haveTableRelatedChanges(editor, table, oldState, newState, tr)) return table !== void 0 ? prev : {};
			const tableMap = TableMap.get(table.node);
			let isStale = prev.tableHeight !== tableMap.height || prev.tableNodePos !== table.pos;
			if (!isStale) {
				const mapped = prev.decorations?.map(tr.mapping, tr.doc);
				for (let row = 0; row < tableMap.height; row++) {
					const pos = getTableCellWidgetDecorationPos(table, tableMap, row * tableMap.width);
					if (mapped?.find(pos, pos + 1)?.length !== 1) {
						isStale = true;
						break;
					}
				}
			}
			if (!isStale) return {
				decorations: prev.decorations?.map(tr.mapping, tr.doc),
				tableHeight: tableMap.height,
				tableNodePos: table.pos
			};
			const decorations = [];
			for (let row = 0; row < tableMap.height; row++) {
				const pos = getTableCellWidgetDecorationPos(table, tableMap, row * tableMap.width);
				const dragHandleComponent = new ReactRenderer(RowDragHandle, {
					props: {
						editor,
						row
					},
					editor
				});
				decorations.push(Decoration.widget(pos, () => dragHandleComponent.element));
			}
			return {
				decorations: DecorationSet.create(newState.doc, decorations),
				tableHeight: tableMap.height,
				tableNodePos: table.pos
			};
		}
	},
	props: { decorations(state) {
		return TABLE_ROW_DRAG_HANDLE_PLUGIN_KEY.getState(state).decorations;
	} }
});

//#endregion
//#region src/core/extensions/table/plugins/insert-handlers/utils.ts
const addSvg = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path
  d="M8.5 7.49988V3.49988C8.5 3.22374 8.27614 2.99988 8 2.99988C7.72386 2.99988 7.5 3.22374 7.5 3.49988L7.5 7.49988L3.5 7.49988C3.22386 7.49988 3 7.72374 3 7.99988C3 8.27602 3.22386 8.49988 3.5 8.49988H7.5L7.5 12.4999C7.5 12.776 7.72386 12.9999 8 12.9999C8.27614 12.9999 8.5 12.776 8.5 12.4999L8.5 8.49988L12.5 8.49988C12.7761 8.49988 13 8.27602 13 7.99988C13 7.72374 12.7761 7.49988 12.5 7.49988L8.5 7.49988Z"
  fill="currentColor"
/>
</svg>`;
const createColumnInsertButton = (editor, tableInfo) => {
	const button = document.createElement("button");
	button.type = "button";
	button.className = "table-column-insert-button";
	button.title = "Insert columns";
	button.ariaLabel = "Insert columns";
	const icon = document.createElement("span");
	icon.innerHTML = addSvg;
	button.appendChild(icon);
	let mouseDownX = 0;
	let isDragging = false;
	let dragStarted = false;
	let lastActionX = 0;
	const DRAG_THRESHOLD = 5;
	const ACTION_THRESHOLD = 150;
	const onMouseDown = (e) => {
		if (e.button !== 0) return;
		e.preventDefault();
		e.stopPropagation();
		mouseDownX = e.clientX;
		lastActionX = e.clientX;
		isDragging = false;
		dragStarted = false;
		document.addEventListener("mousemove", onMouseMove);
		document.addEventListener("mouseup", onMouseUp);
	};
	const onMouseMove = (e) => {
		const deltaX = e.clientX - mouseDownX;
		if (!isDragging && Math.abs(deltaX) > DRAG_THRESHOLD) {
			isDragging = true;
			dragStarted = true;
			button.classList.add("dragging");
			document.body.style.userSelect = "none";
		}
		if (isDragging) {
			if (Math.abs(e.clientX - lastActionX) >= ACTION_THRESHOLD) {
				const directionFromLastAction = e.clientX - lastActionX;
				if (directionFromLastAction > 0) {
					insertColumnAfterLast(editor, tableInfo);
					lastActionX = e.clientX;
				} else if (directionFromLastAction < 0) {
					if (removeLastColumn(editor, tableInfo)) lastActionX = e.clientX;
				}
			}
		}
	};
	const onMouseUp = () => {
		document.removeEventListener("mousemove", onMouseMove);
		document.removeEventListener("mouseup", onMouseUp);
		if (isDragging) {
			button.classList.remove("dragging");
			document.body.style.cursor = "";
			document.body.style.userSelect = "";
		} else if (!dragStarted) insertColumnAfterLast(editor, tableInfo);
		isDragging = false;
		dragStarted = false;
	};
	button.addEventListener("mousedown", onMouseDown);
	button.addEventListener("contextmenu", (e) => e.preventDefault());
	button.addEventListener("selectstart", (e) => e.preventDefault());
	return button;
};
const createRowInsertButton = (editor, tableInfo) => {
	const button = document.createElement("button");
	button.type = "button";
	button.className = "table-row-insert-button";
	button.title = "Insert rows";
	button.ariaLabel = "Insert rows";
	const icon = document.createElement("span");
	icon.innerHTML = addSvg;
	button.appendChild(icon);
	let mouseDownY = 0;
	let isDragging = false;
	let dragStarted = false;
	let lastActionY = 0;
	const DRAG_THRESHOLD = 5;
	const ACTION_THRESHOLD = 40;
	const onMouseDown = (e) => {
		if (e.button !== 0) return;
		e.preventDefault();
		e.stopPropagation();
		mouseDownY = e.clientY;
		lastActionY = e.clientY;
		isDragging = false;
		dragStarted = false;
		document.addEventListener("mousemove", onMouseMove);
		document.addEventListener("mouseup", onMouseUp);
	};
	const onMouseMove = (e) => {
		const deltaY = e.clientY - mouseDownY;
		if (!isDragging && Math.abs(deltaY) > DRAG_THRESHOLD) {
			isDragging = true;
			dragStarted = true;
			button.classList.add("dragging");
			document.body.style.userSelect = "none";
		}
		if (isDragging) {
			if (Math.abs(e.clientY - lastActionY) >= ACTION_THRESHOLD) {
				const directionFromLastAction = e.clientY - lastActionY;
				if (directionFromLastAction > 0) {
					insertRowAfterLast(editor, tableInfo);
					lastActionY = e.clientY;
				} else if (directionFromLastAction < 0) {
					if (removeLastRow(editor, tableInfo)) lastActionY = e.clientY;
				}
			}
		}
	};
	const onMouseUp = () => {
		document.removeEventListener("mousemove", onMouseMove);
		document.removeEventListener("mouseup", onMouseUp);
		if (isDragging) {
			button.classList.remove("dragging");
			document.body.style.cursor = "";
			document.body.style.userSelect = "";
		} else if (!dragStarted) insertRowAfterLast(editor, tableInfo);
		isDragging = false;
		dragStarted = false;
	};
	button.addEventListener("mousedown", onMouseDown);
	button.addEventListener("contextmenu", (e) => e.preventDefault());
	button.addEventListener("selectstart", (e) => e.preventDefault());
	return button;
};
const findAllTables = (editor) => {
	const tables = [];
	editor.view.dom.querySelectorAll("table").forEach((tableElement) => {
		let tablePos = -1;
		let tableNode = null;
		editor.state.doc.descendants((node, pos) => {
			if (node.type.spec.tableRole === "table") {
				let domTable = editor.view.domAtPos(pos + 1).node;
				while (domTable && domTable.parentNode && domTable.nodeType !== Node.ELEMENT_NODE) domTable = domTable.parentNode;
				while (domTable && domTable.parentNode && domTable.tagName !== "TABLE") domTable = domTable.parentNode;
				if (domTable === tableElement) {
					tablePos = pos;
					tableNode = node;
					return false;
				}
			}
		});
		if (tablePos !== -1 && tableNode) tables.push({
			tableElement,
			tableNode,
			tablePos
		});
	});
	return tables;
};
const getCurrentTableInfo = (editor, tableInfo) => {
	return findAllTables(editor).find((t) => t.tableElement === tableInfo.tableElement) || tableInfo;
};
const insertColumnAfterLast = (editor, tableInfo) => {
	const { tableNode, tablePos } = getCurrentTableInfo(editor, tableInfo);
	const tableMapData = TableMap.get(tableNode);
	const lastColumnIndex = tableMapData.width;
	const tr = editor.state.tr;
	const newTr = addColumn(tr, {
		map: tableMapData,
		tableStart: tablePos,
		table: tableNode,
		top: 0,
		left: 0,
		bottom: tableMapData.height - 1,
		right: tableMapData.width - 1
	}, lastColumnIndex);
	editor.view.dispatch(newTr);
};
const removeLastColumn = (editor, tableInfo) => {
	const currentTableInfo = getCurrentTableInfo(editor, tableInfo);
	const { tableNode, tablePos } = currentTableInfo;
	const tableMapData = TableMap.get(tableNode);
	if (tableMapData.width <= 1) return false;
	const lastColumnIndex = tableMapData.width - 1;
	if (!isColumnEmpty(currentTableInfo, lastColumnIndex)) return false;
	const tr = editor.state.tr;
	removeColumn(tr, {
		map: tableMapData,
		tableStart: tablePos,
		table: tableNode,
		top: 0,
		left: 0,
		bottom: tableMapData.height - 1,
		right: tableMapData.width - 1
	}, lastColumnIndex);
	editor.view.dispatch(tr);
	return true;
};
const isColumnEmpty = (tableInfo, columnIndex) => {
	const { tableNode } = tableInfo;
	const tableMapData = TableMap.get(tableNode);
	for (let row = 0; row < tableMapData.height; row++) {
		const cellIndex = row * tableMapData.width + columnIndex;
		const cellPos = tableMapData.map[cellIndex];
		if (!isCellEmpty(tableNode.nodeAt(cellPos))) return false;
	}
	return true;
};
const insertRowAfterLast = (editor, tableInfo) => {
	const { tableNode, tablePos } = getCurrentTableInfo(editor, tableInfo);
	const tableMapData = TableMap.get(tableNode);
	const lastRowIndex = tableMapData.height;
	const tr = editor.state.tr;
	const newTr = addRow(tr, {
		map: tableMapData,
		tableStart: tablePos,
		table: tableNode,
		top: 0,
		left: 0,
		bottom: tableMapData.height - 1,
		right: tableMapData.width - 1
	}, lastRowIndex);
	editor.view.dispatch(newTr);
};
const removeLastRow = (editor, tableInfo) => {
	const currentTableInfo = getCurrentTableInfo(editor, tableInfo);
	const { tableNode, tablePos } = currentTableInfo;
	const tableMapData = TableMap.get(tableNode);
	if (tableMapData.height <= 1) return false;
	const lastRowIndex = tableMapData.height - 1;
	if (!isRowEmpty(currentTableInfo, lastRowIndex)) return false;
	const tr = editor.state.tr;
	removeRow(tr, {
		map: tableMapData,
		tableStart: tablePos,
		table: tableNode,
		top: 0,
		left: 0,
		bottom: tableMapData.height - 1,
		right: tableMapData.width - 1
	}, lastRowIndex);
	editor.view.dispatch(tr);
	return true;
};
const isRowEmpty = (tableInfo, rowIndex) => {
	const { tableNode } = tableInfo;
	const tableMapData = TableMap.get(tableNode);
	for (let col = 0; col < tableMapData.width; col++) {
		const cellIndex = rowIndex * tableMapData.width + col;
		const cellPos = tableMapData.map[cellIndex];
		if (!isCellEmpty(tableNode.nodeAt(cellPos))) return false;
	}
	return true;
};

//#endregion
//#region src/core/extensions/table/plugins/insert-handlers/plugin.ts
const TABLE_INSERT_PLUGIN_KEY = new PluginKey("table-insert");
const TableInsertPlugin = (editor) => {
	const tableMap = /* @__PURE__ */ new Map();
	const setupTable = (tableInfo) => {
		const { tableElement } = tableInfo;
		if (!tableInfo.columnButtonElement) {
			const columnButton = createColumnInsertButton(editor, tableInfo);
			tableElement.appendChild(columnButton);
			tableInfo.columnButtonElement = columnButton;
		}
		if (!tableInfo.rowButtonElement) {
			const rowButton = createRowInsertButton(editor, tableInfo);
			tableElement.appendChild(rowButton);
			tableInfo.rowButtonElement = rowButton;
		}
		if (!tableInfo.dragMarkerContainerElement) {
			const dragMarker = createMarkerContainer();
			tableElement.appendChild(dragMarker);
			tableInfo.dragMarkerContainerElement = dragMarker;
		}
		tableMap.set(tableElement, tableInfo);
	};
	const cleanupTable = (tableElement) => {
		const tableInfo = tableMap.get(tableElement);
		tableInfo?.columnButtonElement?.remove();
		tableInfo?.rowButtonElement?.remove();
		tableInfo?.dragMarkerContainerElement?.remove();
		tableMap.delete(tableElement);
	};
	const updateAllTables = () => {
		if (!editor.isEditable) {
			tableMap.forEach((_, tableElement) => {
				cleanupTable(tableElement);
			});
			return;
		}
		const currentTables = findAllTables(editor);
		const currentTableElements = new Set(currentTables.map((t) => t.tableElement));
		tableMap.forEach((_, tableElement) => {
			if (!currentTableElements.has(tableElement)) cleanupTable(tableElement);
		});
		currentTables.forEach((tableInfo) => {
			if (!tableMap.has(tableInfo.tableElement)) setupTable(tableInfo);
		});
	};
	return new Plugin({
		key: TABLE_INSERT_PLUGIN_KEY,
		view() {
			setTimeout(updateAllTables, 0);
			return {
				update(view, prevState) {
					if (!prevState.doc.eq(view.state.doc)) updateAllTables();
				},
				destroy() {
					tableMap.forEach((_, tableElement) => {
						cleanupTable(tableElement);
					});
					tableMap.clear();
				}
			};
		}
	});
};
const createMarkerContainer = () => {
	const el = document.createElement("div");
	el.className = "table-drag-marker-container";
	el.contentEditable = "false";
	el.appendChild(createDropMarker());
	el.appendChild(createColDragMarker());
	el.appendChild(createRowDragMarker());
	return el;
};
const createDropMarker = () => {
	const el = document.createElement("div");
	el.className = DROP_MARKER_CLASS;
	return el;
};
const createColDragMarker = () => {
	const el = document.createElement("div");
	el.className = `${COL_DRAG_MARKER_CLASS} hidden`;
	return el;
};
const createRowDragMarker = () => {
	const el = document.createElement("div");
	el.className = `${ROW_DRAG_MARKER_CLASS} hidden`;
	return el;
};

//#endregion
//#region src/core/extensions/table/table/table-view.tsx
var TableView = class {
	node;
	cellMinWidth;
	decorations;
	editor;
	getPos;
	hoveredCell = null;
	map;
	root;
	table;
	colgroup;
	tbody;
	controls;
	get dom() {
		return this.root;
	}
	get contentDOM() {
		return this.tbody;
	}
	constructor(node, cellMinWidth, decorations, editor, getPos) {
		this.node = node;
		this.cellMinWidth = cellMinWidth;
		this.decorations = decorations;
		this.editor = editor;
		this.getPos = getPos;
		this.hoveredCell = null;
		this.map = TableMap.get(node);
		this.colgroup = h("colgroup", null, Array.from({ length: this.map.width }, () => 1).map(() => h("col")));
		this.tbody = h("tbody");
		this.table = h("table", null, this.colgroup, this.tbody);
		this.root = h("div", { className: "table-wrapper editor-full-width-block horizontal-scrollbar scrollbar-sm" }, this.table);
		this.render();
	}
	update(node, decorations) {
		if (node.type !== this.node.type) return false;
		this.node = node;
		this.decorations = [...decorations];
		this.map = TableMap.get(this.node);
		this.render();
		return true;
	}
	render() {
		if (this.colgroup.children.length !== this.map.width) {
			const cols = Array.from({ length: this.map.width }, () => 1).map(() => h("col"));
			this.colgroup.replaceChildren(...cols);
		}
		updateColumnsOnResize(this.node, this.colgroup, this.table, this.cellMinWidth);
	}
	ignoreMutation() {
		return true;
	}
};

//#endregion
//#region src/core/extensions/table/table/utilities/create-cell.ts
function createCell(cellType, cellContent, attrs) {
	if (cellContent) return cellType.createChecked(attrs, cellContent);
	return cellType.createAndFill(attrs);
}

//#endregion
//#region src/core/extensions/table/table/utilities/get-table-node-types.ts
function getTableNodeTypes(schema) {
	if (schema.cached.tableNodeTypes) return schema.cached.tableNodeTypes;
	const roles = {};
	Object.keys(schema.nodes).forEach((type) => {
		const nodeType = schema.nodes[type];
		if (nodeType.spec.tableRole) roles[nodeType.spec.tableRole] = nodeType;
	});
	schema.cached.tableNodeTypes = roles;
	return roles;
}

//#endregion
//#region src/core/extensions/table/table/utilities/create-table.ts
const createTable = (props) => {
	const { schema, rowsCount, colsCount, withHeaderRow, cellContent, columnWidth } = props;
	const types = getTableNodeTypes(schema);
	const headerCells = [];
	const cells = [];
	for (let index = 0; index < colsCount; index += 1) {
		const cell = createCell(types.cell, cellContent, { colwidth: [columnWidth] });
		if (cell) cells.push(cell);
		if (withHeaderRow) {
			const headerCell = createCell(types.header_cell, cellContent, { colwidth: [columnWidth] });
			if (headerCell) headerCells.push(headerCell);
		}
	}
	const rows = [];
	for (let index = 0; index < rowsCount; index += 1) rows.push(types.row.createChecked(null, withHeaderRow && index === 0 ? headerCells : cells));
	return types.table.createChecked(null, rows);
};

//#endregion
//#region src/core/extensions/table/table/utilities/delete-column.ts
const deleteColumnOrTable = () => ({ state, dispatch }) => {
	const { selection } = state;
	if (!isCellSelection(selection)) return false;
	const tableStart = selection.$anchorCell.start(-1);
	const selectedTable = state.doc.nodeAt(tableStart - 1);
	if (!selectedTable) return false;
	const firstRow = selectedTable.firstChild;
	if (!firstRow) return false;
	let totalColumns = 0;
	for (let i = 0; i < firstRow.childCount; i++) {
		const cell = firstRow.child(i);
		totalColumns += cell.attrs.colspan || 1;
	}
	if (totalColumns === 1) return deleteTable(state, dispatch);
	return deleteColumn(state, dispatch);
};

//#endregion
//#region src/core/extensions/table/table/utilities/delete-key-shortcut.ts
const handleDeleteKeyOnTable = (props) => {
	const { editor } = props;
	const { selection } = editor.state;
	try {
		if (!isCellSelection(selection)) return false;
		const tableInfo = getTableInfo(editor);
		if (!tableInfo) return false;
		const selectedCellCoords = getSelectedCellCoords(selection, tableInfo);
		if (selectedCellCoords.length === 0) return false;
		if (checkCellsHaveContent(selection)) return false;
		const { totalColumnsInSelection, totalRowsInSelection, minRow, minCol } = calculateSelectionBounds(selectedCellCoords);
		if (totalColumnsInSelection === tableInfo.totalColumns) return deleteMultipleRows(editor, totalRowsInSelection, minRow, tableInfo);
		if (totalRowsInSelection === tableInfo.totalRows) return deleteMultipleColumns(editor, totalColumnsInSelection, minCol, tableInfo);
		return false;
	} catch (error) {
		console.error("Error in handleDeleteKeyOnTable", error);
		return false;
	}
};
const getTableInfo = (editor) => {
	const table = findParentNodeClosestToPos$1(editor.state.selection.ranges[0].$from, (node) => node.type.name === CORE_EXTENSIONS$1.TABLE);
	if (!table) return null;
	const tableMap = TableMap.get(table.node);
	return {
		node: table.node,
		pos: table.pos,
		map: tableMap,
		totalColumns: tableMap.width,
		totalRows: tableMap.height
	};
};
const getSelectedCellCoords = (selection, tableInfo) => {
	const selectedCellCoords = [];
	selection.forEachCell((_node, pos) => {
		const coord = findCellCoordinate(pos - tableInfo.pos - 1, tableInfo);
		if (coord) selectedCellCoords.push(coord);
	});
	return selectedCellCoords;
};
const findCellCoordinate = (cellStart, tableInfo) => {
	const cellIndex = tableInfo.map.map.indexOf(cellStart);
	if (cellIndex !== -1) return {
		row: Math.floor(cellIndex / tableInfo.totalColumns),
		col: cellIndex % tableInfo.totalColumns
	};
	for (let i = 0; i < tableInfo.map.map.length; i++) if (tableInfo.map.map[i] === cellStart) return {
		row: Math.floor(i / tableInfo.totalColumns),
		col: i % tableInfo.totalColumns
	};
	return null;
};
const checkCellsHaveContent = (selection) => {
	let hasContent = false;
	selection.forEachCell((node) => {
		if (node && !isCellEmpty(node)) hasContent = true;
	});
	return hasContent;
};
const calculateSelectionBounds = (selectedCellCoords) => {
	const minRow = Math.min(...selectedCellCoords.map((c) => c.row));
	const maxRow = Math.max(...selectedCellCoords.map((c) => c.row));
	const minCol = Math.min(...selectedCellCoords.map((c) => c.col));
	const maxCol = Math.max(...selectedCellCoords.map((c) => c.col));
	return {
		minRow,
		maxRow,
		minCol,
		maxCol,
		totalColumnsInSelection: maxCol - minCol + 1,
		totalRowsInSelection: maxRow - minRow + 1
	};
};
const deleteMultipleRows = (editor, totalRowsInSelection, minRow, initialTableInfo) => {
	setCursorAtPosition(editor, initialTableInfo, minRow, 0);
	for (let i = 0; i < totalRowsInSelection; i++) {
		editor.commands.deleteRow();
		if (i < totalRowsInSelection - 1) {
			const updatedTableInfo = getTableInfo(editor);
			if (updatedTableInfo) setCursorAtPosition(editor, updatedTableInfo, minRow, 0);
		}
	}
	return true;
};
const deleteMultipleColumns = (editor, totalColumnsInSelection, minCol, initialTableInfo) => {
	setCursorAtPosition(editor, initialTableInfo, 0, minCol);
	for (let i = 0; i < totalColumnsInSelection; i++) {
		editor.commands.deleteColumn();
		if (i < totalColumnsInSelection - 1) {
			const updatedTableInfo = getTableInfo(editor);
			if (updatedTableInfo) setCursorAtPosition(editor, updatedTableInfo, 0, minCol);
		}
	}
	return true;
};
const setCursorAtPosition = (editor, tableInfo, row, col) => {
	const cellIndex = row * tableInfo.totalColumns + col;
	const cellPos = tableInfo.pos + tableInfo.map.map[cellIndex] + 1;
	editor.commands.setCellSelection({
		anchorCell: cellPos,
		headCell: cellPos
	});
};

//#endregion
//#region src/core/extensions/table/table/utilities/delete-row.ts
const deleteRowOrTable = () => ({ state, dispatch }) => {
	const { selection } = state;
	if (!isCellSelection(selection)) return false;
	const tableStart = selection.$anchorCell.start(-1);
	const selectedTable = state.doc.nodeAt(tableStart - 1);
	if (!selectedTable) return false;
	if (selectedTable.childCount === 1) return deleteTable(state, dispatch);
	return deleteRow(state, dispatch);
};

//#endregion
//#region src/core/extensions/table/table/utilities/insert-line-above-table-action.ts
const insertLineAboveTableAction = ({ editor }) => {
	if (!editor.isActive(CORE_EXTENSIONS$1.TABLE)) return false;
	try {
		const { selection } = editor.state;
		const tableNode = findParentNodeOfType(selection, [CORE_EXTENSIONS$1.TABLE]);
		if (!tableNode) return false;
		const tablePos = tableNode.pos;
		const firstRow = tableNode.node.child(0);
		if (!selection.$anchor.path.includes(firstRow)) return false;
		if (tablePos === 0) {
			editor.chain().insertContentAt(tablePos, { type: "paragraph" }).run();
			editor.chain().setTextSelection(tablePos + 1).run();
		} else {
			const prevNodePos = tablePos - 1;
			if (prevNodePos <= 0) return false;
			const prevNode = editor.state.doc.nodeAt(prevNodePos - 1);
			if (prevNode && prevNode.type.name === CORE_EXTENSIONS$1.PARAGRAPH) {
				const endOfParagraphPos = tablePos - prevNode.nodeSize;
				editor.chain().setTextSelection(endOfParagraphPos).run();
			} else return false;
		}
		return true;
	} catch (e) {
		console.error("failed to insert line above table", e);
		return false;
	}
};

//#endregion
//#region src/core/extensions/table/table/utilities/insert-line-below-table-action.ts
const insertLineBelowTableAction = ({ editor }) => {
	if (!editor.isActive(CORE_EXTENSIONS$1.TABLE)) return false;
	try {
		const { selection } = editor.state;
		const tableNode = findParentNodeOfType(selection, [CORE_EXTENSIONS$1.TABLE]);
		if (!tableNode) return false;
		const tablePos = tableNode.pos;
		const table = tableNode.node;
		const rowCount = table.childCount;
		const lastRow = table.child(rowCount - 1);
		if (!selection.$anchor.path.includes(lastRow)) return false;
		const nextNodePos = tablePos + table.nodeSize;
		const nextNode = editor.state.doc.nodeAt(nextNodePos);
		if (nextNode && nextNode.type.name === CORE_EXTENSIONS$1.PARAGRAPH) {
			const endOfParagraphPos = nextNodePos + nextNode.nodeSize - 1;
			editor.chain().setTextSelection(endOfParagraphPos).run();
		} else if (!nextNode) {
			editor.chain().insertContentAt(nextNodePos, { type: CORE_EXTENSIONS$1.PARAGRAPH }).run();
			editor.chain().setTextSelection(nextNodePos + 1).run();
		} else return false;
		return true;
	} catch (e) {
		console.error("failed to insert line above table", e);
		return false;
	}
};

//#endregion
//#region src/core/extensions/table/table/table.ts
const Table$1 = Node$1.create({
	name: CORE_EXTENSIONS$1.TABLE,
	addOptions() {
		return {
			HTMLAttributes: {},
			resizable: true,
			handleWidth: 5,
			cellMinWidth: 100,
			lastColumnResizable: true,
			allowTableNodeSelection: true
		};
	},
	content: "tableRow+",
	tableRole: "table",
	isolating: true,
	group: "block",
	allowGapCursor: false,
	parseHTML() {
		return [{ tag: "table" }];
	},
	renderHTML({ HTMLAttributes }) {
		return [
			"table",
			mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
			["tbody", 0]
		];
	},
	addCommands() {
		return {
			insertTable: ({ rows = 3, cols = 3, withHeaderRow = false } = {}) => ({ tr, dispatch, editor }) => {
				const node = createTable({
					schema: editor.schema,
					rowsCount: rows,
					colsCount: cols,
					withHeaderRow,
					columnWidth: DEFAULT_COLUMN_WIDTH
				});
				if (dispatch) {
					const offset$1 = tr.selection.anchor + 1;
					tr.replaceSelectionWith(node).scrollIntoView().setSelection(TextSelection.near(tr.doc.resolve(offset$1)));
				}
				return true;
			},
			addColumnBefore: () => ({ state, dispatch }) => addColumnBefore(state, dispatch),
			addColumnAfter: () => ({ state, dispatch }) => addColumnAfter(state, dispatch),
			deleteColumn: deleteColumnOrTable,
			addRowBefore: () => ({ state, dispatch }) => addRowBefore(state, dispatch),
			addRowAfter: () => ({ state, dispatch }) => addRowAfter(state, dispatch),
			deleteRow: deleteRowOrTable,
			deleteTable: () => ({ state, dispatch }) => deleteTable(state, dispatch),
			mergeCells: () => ({ state, dispatch }) => mergeCells(state, dispatch),
			splitCell: () => ({ state, dispatch }) => splitCell(state, dispatch),
			toggleHeaderColumn: () => ({ state, dispatch }) => toggleHeader("column")(state, dispatch),
			toggleHeaderRow: () => ({ state, dispatch }) => toggleHeader("row")(state, dispatch),
			toggleHeaderCell: () => ({ state, dispatch }) => toggleHeaderCell(state, dispatch),
			clearSelectedCells: () => ({ state, dispatch }) => deleteCellSelection(state, dispatch),
			mergeOrSplit: () => ({ state, dispatch }) => {
				if (mergeCells(state, dispatch)) return true;
				return splitCell(state, dispatch);
			},
			setCellAttribute: (name, value) => ({ state, dispatch }) => setCellAttr(name, value)(state, dispatch),
			goToNextCell: () => ({ state, dispatch }) => goToNextCell(1)(state, dispatch),
			goToPreviousCell: () => ({ state, dispatch }) => goToNextCell(-1)(state, dispatch),
			fixTables: () => ({ state, dispatch }) => {
				if (dispatch) fixTables(state);
				return true;
			},
			setCellSelection: (position) => ({ tr, dispatch }) => {
				if (dispatch) {
					const selection = CellSelection.create(tr.doc, position.anchorCell, position.headCell);
					tr.setSelection(selection);
				}
				return true;
			}
		};
	},
	addKeyboardShortcuts() {
		return {
			Tab: () => {
				if (!this.editor.isActive(CORE_EXTENSIONS$1.TABLE)) return false;
				if (this.editor.isActive(CORE_EXTENSIONS$1.LIST_ITEM) || this.editor.isActive(CORE_EXTENSIONS$1.TASK_ITEM)) return false;
				if (this.editor.commands.goToNextCell()) return true;
				if (!this.editor.can().addRowAfter()) return false;
				return this.editor.chain().addRowAfter().goToNextCell().run();
			},
			"Shift-Tab": () => {
				if (!this.editor.isActive(CORE_EXTENSIONS$1.TABLE)) return false;
				if (this.editor.isActive(CORE_EXTENSIONS$1.LIST_ITEM) || this.editor.isActive(CORE_EXTENSIONS$1.TASK_ITEM)) return false;
				return this.editor.commands.goToPreviousCell();
			},
			Backspace: handleDeleteKeyOnTable,
			"Mod-Backspace": handleDeleteKeyOnTable,
			Delete: handleDeleteKeyOnTable,
			"Mod-Delete": handleDeleteKeyOnTable,
			ArrowDown: insertLineBelowTableAction,
			ArrowUp: insertLineAboveTableAction
		};
	},
	addNodeView() {
		return ({ editor, node, decorations, getPos }) => {
			const { cellMinWidth } = this.options;
			return new TableView(node, cellMinWidth, decorations, editor, getPos);
		};
	},
	addProseMirrorPlugins() {
		const isResizable = this.options.resizable && this.editor.isEditable;
		const plugins = [
			tableEditing({ allowTableNodeSelection: this.options.allowTableNodeSelection }),
			TableInsertPlugin(this.editor),
			TableColumnDragHandlePlugin(this.editor),
			TableRowDragHandlePlugin(this.editor)
		];
		if (isResizable) plugins.unshift(columnResizing({
			handleWidth: this.options.handleWidth,
			cellMinWidth: this.options.cellMinWidth,
			lastColumnResizable: this.options.lastColumnResizable
		}));
		return plugins;
	},
	extendNodeSchema(extension) {
		return { tableRole: callOrReturn(getExtensionField(extension, "tableRole", {
			name: extension.name,
			options: extension.options,
			storage: extension.storage
		})) };
	}
});

//#endregion
//#region src/core/extensions/table/table/index.ts
const DEFAULT_COLUMN_WIDTH = 150;

//#endregion
//#region src/core/extensions/table/plugins/selection-outline/utils.ts
/**
* Calculates the positions of cells adjacent to a given cell in a table
* @param cellStart - The start position of the current cell in the document
* @param tableMap - ProseMirror's table mapping structure containing cell positions and dimensions
* @returns Object with positions of adjacent cells (undefined if cell doesn't exist at table edge)
*/
const getAdjacentCellPositions = (cellStart, tableMap) => {
	const { width, height } = tableMap;
	const cellIndex = tableMap.map.indexOf(cellStart);
	if (cellIndex === -1) return {};
	const row = Math.floor(cellIndex / width);
	const col = cellIndex % width;
	return {
		top: row > 0 ? tableMap.map[(row - 1) * width + col] : void 0,
		bottom: row < height - 1 ? tableMap.map[(row + 1) * width + col] : void 0,
		left: col > 0 ? tableMap.map[row * width + (col - 1)] : void 0,
		right: col < width - 1 ? tableMap.map[row * width + (col + 1)] : void 0
	};
};
const getCellBorderClasses = (cellStart, selectedCells, tableMap) => {
	const adjacent = getAdjacentCellPositions(cellStart, tableMap);
	const classes = [];
	if (adjacent.right === void 0 || !selectedCells.includes(adjacent.right)) classes.push("selectedCell-border-right");
	if (adjacent.left === void 0 || !selectedCells.includes(adjacent.left)) classes.push("selectedCell-border-left");
	if (adjacent.top === void 0 || !selectedCells.includes(adjacent.top)) classes.push("selectedCell-border-top");
	if (adjacent.bottom === void 0 || !selectedCells.includes(adjacent.bottom)) classes.push("selectedCell-border-bottom");
	return classes;
};

//#endregion
//#region src/core/extensions/table/plugins/selection-outline/plugin.ts
const TABLE_SELECTION_OUTLINE_PLUGIN_KEY = new PluginKey("table-cell-selection-outline");
const TableCellSelectionOutlinePlugin = (editor) => new Plugin({
	key: TABLE_SELECTION_OUTLINE_PLUGIN_KEY,
	state: {
		init: () => ({}),
		apply(tr, prev, oldState, newState) {
			if (!editor.isEditable) return {};
			const table = findParentNode((node) => node.type.spec.tableRole === "table")(newState.selection);
			const hasDocChanged = tr.docChanged || !newState.selection.eq(oldState.selection);
			if (!table || !hasDocChanged) return table === void 0 ? {} : prev;
			const { selection } = newState;
			if (!isCellSelection(selection)) return {};
			const decorations = [];
			const tableMap = TableMap.get(table.node);
			const selectedCells = [];
			selection.forEachCell((_node, pos) => {
				const start = pos - table.pos - 1;
				selectedCells.push(start);
			});
			selection.forEachCell((node, pos) => {
				const classes = getCellBorderClasses(pos - table.pos - 1, selectedCells, tableMap);
				decorations.push(Decoration.node(pos, pos + node.nodeSize, { class: classes.join(" ") }));
			});
			return { decorations: DecorationSet.create(newState.doc, decorations) };
		}
	},
	props: { decorations(state) {
		return TABLE_SELECTION_OUTLINE_PLUGIN_KEY.getState(state).decorations;
	} }
});

//#endregion
//#region src/core/extensions/table/table-cell.ts
const TableCell = Node$1.create({
	name: CORE_EXTENSIONS$1.TABLE_CELL,
	addOptions() {
		return { HTMLAttributes: {} };
	},
	content: "block+",
	addAttributes() {
		return {
			colspan: { default: 1 },
			rowspan: { default: 1 },
			colwidth: {
				default: [DEFAULT_COLUMN_WIDTH],
				parseHTML: (element) => {
					const colwidth = element.getAttribute("colwidth");
					return colwidth ? [parseInt(colwidth, 10)] : null;
				}
			},
			background: { default: null },
			textColor: { default: null },
			hideContent: { default: false }
		};
	},
	tableRole: "cell",
	isolating: true,
	addProseMirrorPlugins() {
		return [TableCellSelectionOutlinePlugin(this.editor)];
	},
	addKeyboardShortcuts() {
		return { Backspace: ({ editor }) => {
			const { state } = editor.view;
			const { selection } = state;
			if (isCellSelection(selection)) return false;
			if (selection.from !== selection.to || selection.$head.parentOffset !== 0) return false;
			const tableNode = findParentNodeOfType(selection, [CORE_EXTENSIONS$1.TABLE])?.node;
			const currentCellInfo = findParentNodeOfType(selection, [CORE_EXTENSIONS$1.TABLE_CELL, CORE_EXTENSIONS$1.TABLE_HEADER]);
			const currentCellNode = currentCellInfo?.node;
			const cellPos = currentCellInfo?.pos;
			const cellDepth = currentCellInfo?.depth;
			if (!tableNode || !currentCellNode || cellPos === null || cellDepth === null) return false;
			const tableMap = TableMap.get(tableNode);
			if (!(tableMap.width === 1 && tableMap.height === 1)) return false;
			const cellNodePos = selection.$head.before(cellDepth);
			editor.commands.setCellSelection({
				anchorCell: cellNodePos,
				headCell: cellNodePos
			});
			return true;
		} };
	},
	parseHTML() {
		return [{ tag: "td" }];
	},
	renderHTML({ node, HTMLAttributes }) {
		return [
			"td",
			mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
				class: node.attrs.hideContent ? "content-hidden" : "",
				style: `background-color: ${node.attrs.background}; color: ${node.attrs.textColor};`
			}),
			0
		];
	}
});

//#endregion
//#region src/core/extensions/table/table-header.ts
const TableHeader = Node$1.create({
	name: CORE_EXTENSIONS$1.TABLE_HEADER,
	addOptions() {
		return { HTMLAttributes: {} };
	},
	content: "block+",
	addAttributes() {
		return {
			colspan: { default: 1 },
			rowspan: { default: 1 },
			colwidth: {
				default: [DEFAULT_COLUMN_WIDTH],
				parseHTML: (element) => {
					const colwidth = element.getAttribute("colwidth");
					return colwidth ? [parseInt(colwidth, 10)] : null;
				}
			},
			background: { default: "none" },
			hideContent: { default: false }
		};
	},
	tableRole: "header_cell",
	isolating: true,
	parseHTML() {
		return [{ tag: "th" }];
	},
	renderHTML({ node, HTMLAttributes }) {
		return [
			"th",
			mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
				class: node.attrs.hideContent ? "content-hidden" : "",
				style: `background-color: ${node.attrs.background};`
			}),
			0
		];
	}
});

//#endregion
//#region src/core/extensions/table/table-row.ts
const TableRow = Node$1.create({
	name: CORE_EXTENSIONS$1.TABLE_ROW,
	addOptions() {
		return { HTMLAttributes: {} };
	},
	addAttributes() {
		return {
			background: { default: null },
			textColor: { default: null }
		};
	},
	content: "(tableCell | tableHeader)*",
	tableRole: "row",
	parseHTML() {
		return [{ tag: "tr" }];
	},
	renderHTML({ HTMLAttributes }) {
		const style = HTMLAttributes.background ? `background-color: ${HTMLAttributes.background}; color: ${HTMLAttributes.textColor}` : "";
		return [
			"tr",
			mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, { style }),
			0
		];
	}
});

//#endregion
//#region src/core/extensions/work-item-embed/extension-config.ts
const WorkItemEmbedExtensionConfig = Node$1.create({
	name: CORE_EXTENSIONS$1.WORK_ITEM_EMBED,
	group: "block",
	atom: true,
	selectable: true,
	draggable: true,
	addAttributes() {
		return {
			entity_identifier: { default: void 0 },
			project_identifier: { default: void 0 },
			workspace_identifier: { default: void 0 },
			id: { default: void 0 },
			entity_name: { default: void 0 }
		};
	},
	parseHTML() {
		return [{ tag: "issue-embed-component" }];
	},
	renderHTML({ HTMLAttributes }) {
		return ["issue-embed-component", mergeAttributes(HTMLAttributes)];
	}
});

//#endregion
//#region src/ce/extensions/core/without-props.ts
const CoreEditorAdditionalExtensionsWithoutProps = [];

//#endregion
//#region src/core/extensions/code/without-props.tsx
const lowlight = createLowlight(common);
lowlight.register("ts", ts);
const CustomCodeBlockExtensionWithoutProps = CodeBlockLowlight.extend({ addKeyboardShortcuts() {
	return {
		Tab: ({ editor }) => {
			try {
				const { state } = editor;
				const { selection } = state;
				const { $from, empty } = selection;
				if (!empty || $from.parent.type !== this.type) return false;
				const tr = state.tr.insertText("	", $from.pos, $from.pos);
				editor.view.dispatch(tr);
				return true;
			} catch (error) {
				console.error("Error handling Tab in CustomCodeBlockExtension:", error);
				return false;
			}
		},
		ArrowUp: ({ editor }) => {
			try {
				const { state } = editor;
				const { selection } = state;
				const { $from, empty } = selection;
				if (!empty || $from.parent.type !== this.type) return false;
				if (!($from.parentOffset === 0)) return false;
				if ($from.depth === 1 && $from.index($from.depth - 1) === 0) return editor.commands.command(({ tr }) => {
					const node = editor.schema.nodes.paragraph.create();
					tr.insert(0, node);
					tr.setSelection(Selection.near(tr.doc.resolve(1)));
					return true;
				});
				return false;
			} catch (error) {
				console.error("Error handling ArrowUp in CustomCodeBlockExtension:", error);
				return false;
			}
		},
		ArrowDown: ({ editor }) => {
			try {
				if (!this.options.exitOnArrowDown) return false;
				const { state } = editor;
				const { selection, doc } = state;
				const { $from, empty } = selection;
				if (!empty || $from.parent.type !== this.type) return false;
				if (!($from.parentOffset === $from.parent.nodeSize - 2)) return false;
				const after = $from.after();
				if (after === void 0) return false;
				if (doc.nodeAt(after)) return editor.commands.command(({ tr }) => {
					tr.setSelection(Selection.near(doc.resolve(after)));
					return true;
				});
				return editor.commands.exitCode();
			} catch (error) {
				console.error("Error handling ArrowDown in CustomCodeBlockExtension:", error);
				return false;
			}
		}
	};
} }).configure({
	lowlight,
	defaultLanguage: "plaintext",
	exitOnTripleEnter: false
});

//#endregion
//#region src/core/extensions/custom-color.ts
const CustomColorExtension = Mark.create({
	name: CORE_EXTENSIONS$1.CUSTOM_COLOR,
	addOptions() {
		return { HTMLAttributes: {} };
	},
	addAttributes() {
		return {
			color: {
				default: null,
				parseHTML: (element) => element.getAttribute("data-text-color"),
				renderHTML: (attributes) => {
					const { color } = attributes;
					if (!color) return {};
					let elementAttributes = { "data-text-color": color };
					if (!COLORS_LIST.find((c) => c.key === color)) elementAttributes = {
						...elementAttributes,
						style: `color: ${color}`
					};
					return elementAttributes;
				}
			},
			backgroundColor: {
				default: null,
				parseHTML: (element) => element.getAttribute("data-background-color"),
				renderHTML: (attributes) => {
					const { backgroundColor } = attributes;
					if (!backgroundColor) return {};
					let elementAttributes = { "data-background-color": backgroundColor };
					if (!COLORS_LIST.find((c) => c.key === backgroundColor)) elementAttributes = {
						...elementAttributes,
						style: `background-color: ${backgroundColor}`
					};
					return elementAttributes;
				}
			}
		};
	},
	addStorage() {
		return { markdown: { serialize: {
			open: "",
			close: "",
			mixable: true,
			expelEnclosingWhitespace: true
		} } };
	},
	parseHTML() {
		return [{
			tag: "span",
			getAttrs: (node) => node.getAttribute("data-text-color") && null
		}, {
			tag: "span",
			getAttrs: (node) => node.getAttribute("data-background-color") && null
		}];
	},
	renderHTML({ HTMLAttributes }) {
		return [
			"span",
			mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
			0
		];
	},
	addCommands() {
		return {
			setTextColor: (color) => ({ chain }) => chain().setMark(this.name, { color }).run(),
			unsetTextColor: () => ({ chain }) => chain().setMark(this.name, { color: null }).run(),
			setBackgroundColor: (backgroundColor) => ({ chain }) => chain().setMark(this.name, { backgroundColor }).run(),
			unsetBackgroundColor: () => ({ chain }) => chain().setMark(this.name, { backgroundColor: null }).run()
		};
	}
});

//#endregion
//#region src/core/extensions/custom-image/extension-config.ts
const CustomImageExtensionConfig = Image$1.extend({
	name: CORE_EXTENSIONS$1.CUSTOM_IMAGE,
	group: "block",
	atom: true,
	addAttributes() {
		return {
			...this.parent?.(),
			...Object.values(ECustomImageAttributeNames).reduce((acc, value) => {
				acc[value] = { default: DEFAULT_CUSTOM_IMAGE_ATTRIBUTES[value] };
				return acc;
			}, {})
		};
	},
	parseHTML() {
		return [{ tag: "image-component" }];
	},
	renderHTML({ HTMLAttributes }) {
		return ["image-component", mergeAttributes(HTMLAttributes)];
	}
});

//#endregion
//#region src/core/helpers/find-suggestion-match.ts
function customFindSuggestionMatch(config) {
	const { char, allowSpaces: allowSpacesOption, allowToIncludeChar, allowedPrefixes, startOfLine, $position } = config;
	const allowSpaces = allowSpacesOption && !allowToIncludeChar;
	const escapedChar = escapeForRegEx(char);
	const suffix = /* @__PURE__ */ new RegExp(`\\s${escapedChar}$`);
	const prefix = startOfLine ? "^" : "";
	const finalEscapedChar = allowToIncludeChar ? "" : escapedChar;
	const regexp = allowSpaces ? new RegExp(`${prefix}${escapedChar}.*?(?=\\s${finalEscapedChar}|$)`, "gm") : new RegExp(`${prefix}(?:^)?${escapedChar}[^\\s${finalEscapedChar}]*`, "gm");
	if (!$position.parent.isTextblock) return null;
	const paragraphStart = $position.start();
	const text = $position.doc.textBetween(paragraphStart, $position.pos, "\0", "\0");
	if (!text) return null;
	const textFrom = paragraphStart;
	const match = Array.from(text.matchAll(regexp)).pop();
	if (!match || match.input === void 0 || match.index === void 0) return null;
	const matchPrefix = match.input.slice(Math.max(0, match.index - 1), match.index);
	const matchPrefixIsAllowed = (/* @__PURE__ */ new RegExp(`^[${allowedPrefixes?.join("")}]?$`)).test(matchPrefix);
	if (allowedPrefixes && allowedPrefixes.length > 0 && !matchPrefixIsAllowed) return null;
	const from = textFrom + match.index;
	let to = from + match[0].length;
	if (allowSpaces && suffix.test(text.slice(to - 1, to + 1))) {
		match[0] += " ";
		to += 1;
	}
	if (from < $position.pos && to >= $position.pos) return {
		range: {
			from,
			to
		},
		query: match[0].slice(char.length),
		text: match[0]
	};
	return null;
}

//#endregion
//#region src/core/extensions/emoji/emoji.ts
const EmojiSuggestionPluginKey = new PluginKey("emojiSuggestion");
const inputRegex = /:([a-zA-Z0-9_+-]+):$/;
const pasteRegex = /:([a-zA-Z0-9_+-]+):/g;
const Emoji = Node$1.create({
	name: "emoji",
	inline: true,
	group: "inline",
	selectable: false,
	addOptions() {
		return {
			HTMLAttributes: {},
			emojis,
			enableEmoticons: false,
			forceFallbackImages: false,
			suggestion: {
				char: ":",
				pluginKey: EmojiSuggestionPluginKey,
				command: ({ editor, range, props }) => {
					if (editor.view.state.selection.$to.nodeAfter?.text?.startsWith(" ")) range.to += 1;
					editor.chain().focus().command(({ tr, state, dispatch }) => {
						if (!dispatch) return true;
						const { schema } = state;
						const emojiNode = schema.nodes[this.name].create(props);
						const spaceNode = schema.text(" ");
						const fragment = Fragment$1.from([emojiNode, spaceNode]);
						tr.replaceWith(range.from, range.to, fragment);
						const newPos = range.from + fragment.size;
						tr.setSelection(TextSelection.near(tr.doc.resolve(newPos)));
						tr.setStoredMarks(tr.doc.resolve(range.from).marks());
						return true;
					}).run();
				},
				allow: ({ state, range }) => {
					const $from = state.doc.resolve(range.from);
					const type = state.schema.nodes[this.name];
					return !!$from.parent.type.contentMatch.matchType(type);
				}
			}
		};
	},
	addStorage() {
		const { emojis: emojis$1 } = this.options;
		const supportMap = removeDuplicates(emojis$1.map((item) => item.version)).filter((version) => typeof version === "number").reduce((versions, version) => {
			const emoji = emojis$1.find((item) => item.version === version && item.emoji);
			return {
				...versions,
				[version]: emoji ? isEmojiSupported(emoji.emoji) : false
			};
		}, {});
		return {
			emojis: this.options.emojis,
			isSupported: (emojiItem) => emojiItem.version ? supportMap[emojiItem.version] : false,
			forceOpen: false
		};
	},
	addAttributes() {
		return { name: {
			default: null,
			parseHTML: (element) => element.dataset.name,
			renderHTML: (attributes) => ({ "data-name": attributes.name })
		} };
	},
	parseHTML() {
		return [{ tag: `span[data-type="${this.name}"]` }];
	},
	renderHTML({ HTMLAttributes, node }) {
		const emojiItem = shortcodeToEmoji(node.attrs.name, this.options.emojis);
		const attributes = mergeAttributes(HTMLAttributes, this.options.HTMLAttributes, { "data-type": this.name });
		if (!emojiItem) return [
			"span",
			attributes,
			`:${node.attrs.name}:`
		];
		return [
			"span",
			attributes,
			emojiItem.emoji || `:${emojiItem.shortcodes[0]}:`
		];
	},
	renderText({ node }) {
		return shortcodeToEmoji(node.attrs.name, this.options.emojis)?.emoji || `:${node.attrs.name}:`;
	},
	addCommands() {
		return { setEmoji: (shortcode) => ({ chain }) => {
			const emojiItem = shortcodeToEmoji(shortcode, this.options.emojis);
			if (!emojiItem) return false;
			chain().insertContent({
				type: this.name,
				attrs: { name: emojiItem.name }
			}).command(({ tr, state }) => {
				tr.setStoredMarks(state.doc.resolve(state.selection.to - 1).marks());
				return true;
			}).run();
			return true;
		} };
	},
	addInputRules() {
		const inputRules = [];
		inputRules.push(new InputRule({
			find: inputRegex,
			handler: ({ range, match, chain }) => {
				const name = match[1];
				if (!shortcodeToEmoji(name, this.options.emojis)) return;
				chain().insertContentAt(range, {
					type: this.name,
					attrs: { name }
				}).command(({ tr, state }) => {
					tr.setStoredMarks(state.doc.resolve(state.selection.to - 1).marks());
					return true;
				}).run();
			}
		}));
		if (this.options.enableEmoticons) {
			const emoticons = this.options.emojis.map((item) => item.emoticons).flat().filter((item) => item);
			const emoticonRegex = /* @__PURE__ */ new RegExp(`(?:^|\\s)(${emoticons.map((item) => escapeForRegEx(item)).join("|")}) $`);
			inputRules.push(nodeInputRule({
				find: emoticonRegex,
				type: this.type,
				getAttributes: (match) => {
					const emoji = this.options.emojis.find((item) => item.emoticons?.includes(match[1]));
					if (!emoji) return;
					return { name: emoji.name };
				}
			}));
		}
		return inputRules;
	},
	addPasteRules() {
		return [new PasteRule({
			find: pasteRegex,
			handler: ({ range, match, chain }) => {
				const name = match[1];
				if (!shortcodeToEmoji(name, this.options.emojis)) return;
				chain().insertContentAt(range, {
					type: this.name,
					attrs: { name }
				}, { updateSelection: false }).command(({ tr, state }) => {
					tr.setStoredMarks(state.doc.resolve(state.selection.to - 1).marks());
					return true;
				}).run();
			}
		})];
	},
	addProseMirrorPlugins() {
		if (!!this.editor.storage.utility.isTouchDevice) return [];
		return [Suggestion({
			editor: this.editor,
			findSuggestionMatch: customFindSuggestionMatch,
			...this.options.suggestion
		}), new Plugin({
			key: new PluginKey("emoji"),
			props: { handleDoubleClickOn: (view, pos, node) => {
				if (node.type !== this.type) return false;
				const from = pos;
				const to = from + node.nodeSize;
				this.editor.commands.setTextSelection({
					from,
					to
				});
				return true;
			} },
			appendTransaction: (transactions, oldState, newState) => {
				if (!(transactions.some((transaction) => transaction.docChanged) && !oldState.doc.eq(newState.doc))) return;
				const { tr } = newState;
				getChangedRanges(combineTransactionSteps(oldState.doc, transactions)).forEach(({ newRange }) => {
					if (newState.doc.resolve(newRange.from).parent.type.spec.code) return;
					findChildrenInRange(newState.doc, newRange, (node) => node.type.isText).forEach(({ node, pos }) => {
						if (!node.text) return;
						[...node.text.matchAll(emojiRegex())].forEach((match) => {
							if (match.index === void 0) return;
							const emoji = match[0];
							const name = emojiToShortcode(emoji, this.options.emojis);
							if (!name) return;
							const from = tr.mapping.map(pos + match.index);
							if (newState.doc.resolve(from).parent.type.spec.code) return;
							const to = from + emoji.length;
							const emojiNode = this.type.create({ name });
							tr.replaceRangeWith(from, to, emojiNode);
							tr.setStoredMarks(newState.doc.resolve(from).marks());
						});
					});
				});
				if (!tr.steps.length) return;
				return tr;
			}
		})];
	}
});

//#endregion
//#region src/core/extensions/emoji/components/emojis-list.tsx
const EmojisListDropdown = forwardRef(function EmojisListDropdown$1(props, ref) {
	const { items, command, query, onClose, forceOpen = false } = props;
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [isVisible, setIsVisible] = useState(false);
	const dropdownContainerRef = useRef(null);
	const selectItem = useCallback((index) => {
		const item = items[index];
		if (item) command({ name: item.name });
	}, [command, items]);
	const handleKeyDown = useCallback((event) => {
		if (items.length === 0) return false;
		if (query.length === 0 && !forceOpen) return false;
		if (event.key === "ArrowUp") {
			setSelectedIndex((prev) => (prev + items.length - 1) % items.length);
			return true;
		}
		if (event.key === "ArrowDown") {
			setSelectedIndex((prev) => (prev + 1) % items.length);
			return true;
		}
		if (event.key === "Enter") {
			selectItem(selectedIndex);
			return true;
		}
		return false;
	}, [
		items.length,
		query.length,
		forceOpen,
		selectItem,
		selectedIndex
	]);
	useEffect(() => {
		setIsVisible(false);
		const timeout = setTimeout(() => setIsVisible(true), 50);
		return () => clearTimeout(timeout);
	}, []);
	useEffect(() => setSelectedIndex(0), [items]);
	useEffect(() => {
		const container = dropdownContainerRef.current;
		if (!container) return;
		const item = container.querySelector(`#emoji-item-${selectedIndex}`);
		if (item) {
			const containerRect = container.getBoundingClientRect();
			const itemRect = item.getBoundingClientRect();
			if (itemRect.top < containerRect.top || itemRect.bottom > containerRect.bottom) item.scrollIntoView({ block: "nearest" });
		}
	}, [selectedIndex]);
	useImperativeHandle(ref, () => ({ onKeyDown: ({ event }) => handleKeyDown(event) }), [handleKeyDown]);
	useOutsideClickDetector(dropdownContainerRef, onClose);
	if (query.length === 0 && !forceOpen) return null;
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(FloatingOverlay, {
		style: { zIndex: 99 },
		lockScroll: true
	}), /* @__PURE__ */ jsx("div", {
		ref: dropdownContainerRef,
		className: cn("relative max-h-80 w-[14rem] overflow-y-auto rounded-md border-[0.5px] border-custom-border-300 bg-custom-background-100 px-2 py-2.5 shadow-custom-shadow-rg space-y-2 opacity-0 invisible transition-opacity", { "opacity-100 visible": isVisible }),
		style: { zIndex: 100 },
		onClick: (e) => {
			e.stopPropagation();
		},
		onMouseDown: (e) => {
			e.stopPropagation();
		},
		children: items.length ? items.map((item, index) => {
			const isSelected = index === selectedIndex;
			const emojiKey = item.shortcodes.join(" - ");
			return /* @__PURE__ */ jsxs("button", {
				id: `emoji-item-${index}`,
				type: "button",
				className: cn("flex items-center gap-2 w-full rounded px-2 py-1.5 text-sm text-left truncate text-custom-text-200 hover:bg-custom-background-80 transition-colors duration-150", { "bg-custom-background-80": isSelected }),
				onClick: () => selectItem(index),
				onMouseEnter: () => setSelectedIndex(index),
				children: [/* @__PURE__ */ jsx("span", {
					className: "size-5 grid place-items-center flex-shrink-0 text-base",
					children: item.emoji
				}), /* @__PURE__ */ jsx("span", {
					className: "flex-grow truncate",
					children: /* @__PURE__ */ jsxs("span", {
						className: "font-medium",
						children: [
							":",
							item.name,
							":"
						]
					})
				})]
			}, emojiKey);
		}) : /* @__PURE__ */ jsx("div", {
			className: "text-center text-sm text-custom-text-400 py-2",
			children: "No emojis found"
		})
	})] });
});
EmojisListDropdown.displayName = "EmojisListDropdown";

//#endregion
//#region src/core/extensions/emoji/suggestion.ts
const DEFAULT_EMOJIS = [
	"+1",
	"-1",
	"smile",
	"orange_heart",
	"eyes"
];
const emojiSuggestion = {
	items: ({ editor, query }) => {
		const { emojis: emojis$1 } = editor.storage.emoji;
		if (query.trim() === "") return DEFAULT_EMOJIS.map((name) => emojis$1.find((emoji) => emoji.shortcodes.includes(name) || emoji.name === name)).filter(Boolean).slice(0, 5);
		return emojis$1.filter(({ shortcodes, tags }) => {
			const lowerQuery = query.toLowerCase();
			return shortcodes.find((shortcode) => shortcode.startsWith(lowerQuery)) || tags.find((tag) => tag.startsWith(lowerQuery));
		}).slice(0, 5);
	},
	allowSpaces: false,
	render: () => {
		let component = null;
		let cleanup = () => {};
		let editorRef = null;
		const handleClose = (editor) => {
			component?.destroy();
			component = null;
			(editor || editorRef)?.commands.removeActiveDropbarExtension(CORE_EXTENSIONS$1.EMOJI);
			const emojiStorage = editor?.storage.emoji;
			emojiStorage.forceOpen = false;
			cleanup();
		};
		return {
			onStart: (props) => {
				editorRef = props.editor;
				const forceOpen = props.editor.storage.emoji.forceOpen || false;
				component = new ReactRenderer(EmojisListDropdown, {
					props: {
						...props,
						onClose: () => handleClose(props.editor),
						forceOpen
					},
					editor: props.editor,
					className: "fixed z-[100]"
				});
				if (!props.clientRect) return;
				props.editor.commands.addActiveDropbarExtension(CORE_EXTENSIONS$1.EMOJI);
				const element = component.element;
				cleanup = updateFloatingUIFloaterPosition(props.editor, element).cleanup;
			},
			onUpdate: (props) => {
				if (!component || !component.element) return;
				const forceOpen = props.editor.storage.emoji.forceOpen || false;
				component.updateProps({
					...props,
					forceOpen
				});
				if (!props.clientRect) return;
				cleanup();
				cleanup = updateFloatingUIFloaterPosition(props.editor, component.element).cleanup;
			},
			onKeyDown: ({ event }) => {
				if ([...DROPDOWN_NAVIGATION_KEYS, "Escape"].includes(event.key)) {
					event.preventDefault();
					event.stopPropagation();
				}
				if (event.key === "Escape") {
					handleClose();
					return true;
				}
				return component?.ref?.onKeyDown({ event }) ?? false;
			},
			onExit: ({ editor }) => {
				component?.element.remove();
				handleClose(editor);
			}
		};
	}
};

//#endregion
//#region src/core/extensions/emoji/extension.ts
const EmojiExtension = Emoji.extend({ addStorage() {
	const extensionOptions = this.options;
	return {
		...this.parent?.(),
		markdown: { serialize(state, node) {
			const emojiItem = shortcodeToEmoji(node.attrs.name, extensionOptions.emojis);
			if (emojiItem?.emoji) state.write(emojiItem?.emoji);
			else state.write(`:${node.attrs.name}:`);
		} }
	};
} }).configure({
	emojis: gitHubEmojis.filter((item) => item.emoji).map(({ fallbackImage,...emoji }) => emoji),
	suggestion: emojiSuggestion,
	enableEmoticons: true
});

//#endregion
//#region src/core/extensions/horizontal-rule.ts
const CustomHorizontalRule = Node$1.create({
	name: CORE_EXTENSIONS$1.HORIZONTAL_RULE,
	group: "block",
	addOptions() {
		return { HTMLAttributes: { class: "py-4 border-custom-border-400" } };
	},
	parseHTML() {
		return [{ tag: `div[data-type="${this.name}"]` }, { tag: "hr" }];
	},
	renderHTML({ HTMLAttributes }) {
		return [
			"div",
			mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, { "data-type": this.name }),
			["div", {}]
		];
	},
	addCommands() {
		return { setHorizontalRule: () => ({ chain, state }) => {
			const { selection } = state;
			const { $from: $originFrom, $to: $originTo } = selection;
			const currentChain = chain();
			if ($originFrom.parentOffset === 0) currentChain.insertContentAt({
				from: Math.max($originFrom.pos - 1, 0),
				to: $originTo.pos
			}, { type: this.name });
			else if (isNodeSelection(selection)) currentChain.insertContentAt($originTo.pos, { type: this.name });
			else currentChain.insertContent({ type: this.name });
			return currentChain.command(({ tr, dispatch }) => {
				if (dispatch) {
					const { $to } = tr.selection;
					const posAfter = $to.end();
					if ($to.nodeAfter) if ($to.nodeAfter.isTextblock) tr.setSelection(TextSelection.create(tr.doc, $to.pos + 1));
					else if ($to.nodeAfter.isBlock) tr.setSelection(NodeSelection.create(tr.doc, $to.pos));
					else tr.setSelection(TextSelection.create(tr.doc, $to.pos));
					else {
						const node = $to.parent.type.contentMatch.defaultType?.create();
						if (node) {
							tr.insert(posAfter, node);
							tr.setSelection(TextSelection.create(tr.doc, posAfter + 1));
						}
					}
					tr.scrollIntoView();
				}
				return true;
			}).run();
		} };
	},
	addInputRules() {
		return [nodeInputRule({
			find: /^(?:---|—-|___\s|\*\*\*\s)$/,
			type: this.type
		})];
	}
});

//#endregion
//#region src/core/extensions/quote.ts
const CustomQuoteExtension = Blockquote.extend({ addKeyboardShortcuts() {
	return { Enter: () => {
		try {
			const { $from, $to, $head } = this.editor.state.selection;
			const parent = $head.node(-1);
			if (!parent) return false;
			if (parent.type.name !== CORE_EXTENSIONS$1.BLOCKQUOTE) return false;
			if ($from.pos !== $to.pos) return false;
			this.editor.chain().splitBlock().lift(this.name).run();
			return true;
		} catch (error) {
			console.error("Error handling Enter in blockquote:", error);
			return false;
		}
	} };
} });

//#endregion
//#region src/core/extensions/starter-kit.ts
const CustomStarterKitExtension = (args) => {
	const { enableHistory } = args;
	return StarterKit.configure({
		bulletList: { HTMLAttributes: { class: "list-disc pl-7 space-y-[--list-spacing-y]" } },
		orderedList: { HTMLAttributes: { class: "list-decimal pl-7 space-y-[--list-spacing-y]" } },
		listItem: { HTMLAttributes: { class: "not-prose space-y-2" } },
		code: false,
		codeBlock: false,
		horizontalRule: false,
		blockquote: false,
		paragraph: { HTMLAttributes: { class: "editor-paragraph-block" } },
		heading: { HTMLAttributes: { class: "editor-heading-block" } },
		dropcursor: { class: "text-custom-text-300 transition-all motion-reduce:transition-none motion-reduce:hover:transform-none duration-200 ease-[cubic-bezier(0.165, 0.84, 0.44, 1)]" },
		...enableHistory ? {} : { history: false }
	});
};

//#endregion
//#region src/core/extensions/text-align.ts
const CustomTextAlignExtension = TextAlign.configure({
	alignments: [
		"left",
		"center",
		"right"
	],
	types: ["heading", "paragraph"]
});

//#endregion
//#region src/core/extensions/core-without-props.ts
const CoreEditorExtensionsWithoutProps = [
	CustomStarterKitExtension({ enableHistory: true }),
	EmojiExtension,
	CustomQuoteExtension,
	CustomHorizontalRule,
	CustomLinkExtension,
	ImageExtensionConfig,
	CustomImageExtensionConfig,
	Underline$1,
	TextStyle,
	TaskList.configure({ HTMLAttributes: { class: "not-prose pl-2 space-y-2" } }),
	TaskItem.configure({
		HTMLAttributes: { class: "flex" },
		nested: true
	}),
	CustomCodeInlineExtension,
	CustomCodeBlockExtensionWithoutProps,
	Table$1,
	TableHeader,
	TableCell,
	TableRow,
	CustomMentionExtensionConfig,
	CustomTextAlignExtension,
	CustomCalloutExtensionConfig,
	CustomColorExtension,
	...CoreEditorAdditionalExtensionsWithoutProps
];
const DocumentEditorExtensionsWithoutProps = [WorkItemEmbedExtensionConfig];

//#endregion
//#region src/core/extensions/title-extension.ts
const TitleExtensions = [
	Document.extend({ content: "heading" }),
	Heading.configure({ levels: [1] }),
	Text
];

//#endregion
//#region src/core/helpers/yjs-utils.ts
const RICH_TEXT_EDITOR_EXTENSIONS = CoreEditorExtensionsWithoutProps;
const DOCUMENT_EDITOR_EXTENSIONS = [...CoreEditorExtensionsWithoutProps, ...DocumentEditorExtensionsWithoutProps];
const TITLE_EDITOR_EXTENSIONS = TitleExtensions;
const richTextEditorSchema = getSchema(RICH_TEXT_EDITOR_EXTENSIONS);
const documentEditorSchema = getSchema(DOCUMENT_EDITOR_EXTENSIONS);
/**
* @description apply updates to a doc and return the updated doc in binary format
* @param {Uint8Array} document
* @param {Uint8Array} updates
* @returns {Uint8Array}
*/
const applyUpdates = (document$1, updates) => {
	const yDoc = new Y.Doc();
	Y.applyUpdate(yDoc, document$1);
	if (updates) Y.applyUpdate(yDoc, updates);
	return Y.encodeStateAsUpdate(yDoc);
};
/**
* @description this function encodes binary data to base64 string
* @param {Uint8Array} document
* @returns {string}
*/
const convertBinaryDataToBase64String = (document$1) => Buffer.from(document$1).toString("base64");
/**
* @description this function decodes base64 string to binary data
* @param {string} document
* @returns {Buffer<ArrayBuffer>}
*/
const convertBase64StringToBinaryData = (document$1) => Buffer.from(document$1, "base64");
/**
* @description this function generates the binary equivalent of html content for the rich text editor
* @param {string} descriptionHTML
* @returns {Uint8Array}
*/
const getBinaryDataFromRichTextEditorHTMLString = (descriptionHTML) => {
	const transformedData = prosemirrorJSONToYDoc(richTextEditorSchema, generateJSON(descriptionHTML ?? "<p></p>", RICH_TEXT_EDITOR_EXTENSIONS), "default");
	return Y.encodeStateAsUpdate(transformedData);
};
/**
* @description this function generates the binary equivalent of html content for the document editor
* @param {string} descriptionHTML
* @returns {Uint8Array}
*/
const getBinaryDataFromDocumentEditorHTMLString = (descriptionHTML) => {
	const transformedData = prosemirrorJSONToYDoc(documentEditorSchema, generateJSON(descriptionHTML ?? "<p></p>", DOCUMENT_EDITOR_EXTENSIONS), "default");
	return Y.encodeStateAsUpdate(transformedData);
};
/**
* @description this function generates all document formats for the provided binary data for the rich text editor
* @param {Uint8Array} description
* @returns
*/
const getAllDocumentFormatsFromRichTextEditorBinaryData = (description) => {
	const base64Data = convertBinaryDataToBase64String(description);
	const yDoc = new Y.Doc();
	Y.applyUpdate(yDoc, description);
	const contentJSON = yXmlFragmentToProseMirrorRootNode(yDoc.getXmlFragment("default"), richTextEditorSchema).toJSON();
	return {
		contentBinaryEncoded: base64Data,
		contentJSON,
		contentHTML: generateHTML(contentJSON, RICH_TEXT_EDITOR_EXTENSIONS)
	};
};
/**
* @description this function generates all document formats for the provided binary data for the document editor
* @param {Uint8Array} description
* @returns
*/
const getAllDocumentFormatsFromDocumentEditorBinaryData = (description, updateTitle) => {
	const base64Data = convertBinaryDataToBase64String(description);
	const yDoc = new Y.Doc();
	Y.applyUpdate(yDoc, description);
	const contentJSON = yXmlFragmentToProseMirrorRootNode(yDoc.getXmlFragment("default"), documentEditorSchema).toJSON();
	const contentHTML = generateHTML(contentJSON, DOCUMENT_EDITOR_EXTENSIONS);
	if (updateTitle) return {
		contentBinaryEncoded: base64Data,
		contentJSON,
		contentHTML,
		titleHTML: extractTextFromHTML(generateHTML(yXmlFragmentToProseMirrorRootNode(yDoc.getXmlFragment("title"), documentEditorSchema).toJSON(), DOCUMENT_EDITOR_EXTENSIONS))
	};
	else return {
		contentBinaryEncoded: base64Data,
		contentJSON,
		contentHTML
	};
};
/**
* @description Converts HTML content to all supported document formats (JSON, HTML, and binary)
* @param {TConvertHTMLDocumentToAllFormatsArgs} args - Arguments containing HTML content and variant type
* @param {string} args.document_html - The HTML content to convert
* @param {"rich" | "document"} args.variant - The type of editor variant to use for conversion
* @returns {TDocumentPayload} Object containing the document in all supported formats
* @throws {Error} If an invalid variant is provided
*/
const convertHTMLDocumentToAllFormats = (args) => {
	const { document_html, variant } = args;
	let allFormats;
	if (variant === "rich") {
		const { contentBinaryEncoded, contentHTML, contentJSON } = getAllDocumentFormatsFromRichTextEditorBinaryData(getBinaryDataFromRichTextEditorHTMLString(document_html));
		allFormats = {
			description: contentJSON,
			description_html: contentHTML,
			description_binary: contentBinaryEncoded
		};
	} else if (variant === "document") {
		const { contentBinaryEncoded, contentHTML, contentJSON } = getAllDocumentFormatsFromDocumentEditorBinaryData(getBinaryDataFromDocumentEditorHTMLString(document_html), false);
		allFormats = {
			description: contentJSON,
			description_html: contentHTML,
			description_binary: contentBinaryEncoded
		};
	} else throw new Error(`Invalid variant provided: ${variant}`);
	return allFormats;
};
const extractTextFromHTML = (html) => {
	return sanitizeHTML(html) || "";
};

//#endregion
//#region src/core/types/document-collaborative-events.ts
function createRealtimeEvent(opts) {
	return {
		affectedPages: {
			currentPage: opts.page_id || "",
			parentPage: opts.parent_id || null,
			descendantPages: opts.descendants_ids || []
		},
		workspace_slug: opts.workspace_slug,
		project_id: opts.project_id || "",
		teamspace_id: opts.teamspace_id || "",
		user_id: opts.user_id,
		timestamp: (/* @__PURE__ */ new Date()).toISOString(),
		action: opts.action,
		data: opts.data
	};
}

//#endregion
export { TEXT_ALIGNMENT_ITEMS as $, updateFloatingUIFloaterPosition as A, ECustomImageStatus as B, TableHeader as C, isCellSelection as D, CORE_EDITOR_META as E, DropHandlerPlugin as F, DEFAULT_CALLOUT_BLOCK_ATTRIBUTES as G, CustomCodeInlineExtension as H, isFileValid as I, updateStoredBackgroundColor as J, getStoredBackgroundColor as K, getImageBlockId as L, EMentionComponentAttributeNames as M, ImageExtension as N, DROPDOWN_NAVIGATION_KEYS as O, CustomImageNodeView as P, COMPLEX_ITEMS as Q, getImageComponentImageFileMap as R, TableRow as S, Table$1 as T, CodeBlockLowlight as U, CustomLinkExtension as V, CustomCalloutExtensionConfig as W, ECalloutAttributeNames as X, updateStoredLogo as Y, COLORS_LIST as Z, CustomQuoteExtension as _, convertBinaryDataToBase64String as a, findTableAncestor as at, CustomImageExtensionConfig as b, getAllDocumentFormatsFromDocumentEditorBinaryData as c, getTrimmedHTML as ct, getBinaryDataFromRichTextEditorHTMLString as d, CORE_EXTENSIONS$1 as dt, TOOLBAR_ITEMS as et, TitleExtensions as f, ACCEPTED_IMAGE_MIME_TYPES as ft, CustomStarterKitExtension as g, CustomTextAlignExtension as h, convertBase64StringToBinaryData as i, findParentNodeOfType as it, CustomMentionExtensionConfig as j, getNextValidIndex as k, getAllDocumentFormatsFromRichTextEditorBinaryData as l, isValidHttpUrl as lt, DocumentEditorExtensionsWithoutProps as m, TITLE_EDITOR_EXTENSIONS as n, USER_ACTION_ITEMS as nt, convertHTMLDocumentToAllFormats as o, getEditorClassNames as ot, CoreEditorExtensionsWithoutProps as p, DEFAULT_DISPLAY_CONFIG as pt, getStoredLogo as q, applyUpdates as r, insertEmptyParagraphAtNodeBoundaries as rt, extractTextFromHTML as s, getParagraphCount as st, createRealtimeEvent as t, TYPOGRAPHY_ITEMS as tt, getBinaryDataFromDocumentEditorHTMLString as u, BLOCK_NODE_TYPES as ut, CustomHorizontalRule as v, TableCell as w, CustomColorExtension as x, EmojiExtension as y, ECustomImageAttributeNames as z };
//# sourceMappingURL=document-collaborative-events-DhUvi1fB.js.map