import { $ as TEXT_ALIGNMENT_ITEMS, A as updateFloatingUIFloaterPosition, B as ECustomImageStatus, C as TableHeader, D as isCellSelection, E as CORE_EDITOR_META, F as DropHandlerPlugin, G as DEFAULT_CALLOUT_BLOCK_ATTRIBUTES, H as CustomCodeInlineExtension, I as isFileValid, J as updateStoredBackgroundColor, K as getStoredBackgroundColor, L as getImageBlockId, M as EMentionComponentAttributeNames, N as ImageExtension, O as DROPDOWN_NAVIGATION_KEYS, P as CustomImageNodeView, Q as COMPLEX_ITEMS, R as getImageComponentImageFileMap, S as TableRow, T as Table$1, U as CodeBlockLowlight, V as CustomLinkExtension, W as CustomCalloutExtensionConfig, X as ECalloutAttributeNames, Y as updateStoredLogo, Z as COLORS_LIST, _ as CustomQuoteExtension, a as convertBinaryDataToBase64String, at as findTableAncestor, b as CustomImageExtensionConfig, c as getAllDocumentFormatsFromDocumentEditorBinaryData, ct as getTrimmedHTML, d as getBinaryDataFromRichTextEditorHTMLString, dt as CORE_EXTENSIONS, et as TOOLBAR_ITEMS, f as TitleExtensions, ft as ACCEPTED_IMAGE_MIME_TYPES, g as CustomStarterKitExtension, h as CustomTextAlignExtension, i as convertBase64StringToBinaryData, it as findParentNodeOfType, j as CustomMentionExtensionConfig, k as getNextValidIndex, l as getAllDocumentFormatsFromRichTextEditorBinaryData, lt as isValidHttpUrl, n as TITLE_EDITOR_EXTENSIONS, nt as USER_ACTION_ITEMS, o as convertHTMLDocumentToAllFormats, ot as getEditorClassNames, pt as DEFAULT_DISPLAY_CONFIG, q as getStoredLogo, r as applyUpdates, rt as insertEmptyParagraphAtNodeBoundaries, s as extractTextFromHTML, st as getParagraphCount, t as createRealtimeEvent, tt as TYPOGRAPHY_ITEMS, u as getBinaryDataFromDocumentEditorHTMLString, ut as BLOCK_NODE_TYPES, v as CustomHorizontalRule, w as TableCell, x as CustomColorExtension, y as EmojiExtension, z as ECustomImageAttributeNames } from "./document-collaborative-events-DhUvi1fB.js";
import React, { createContext, forwardRef, useCallback, useContext, useEffect, useImperativeHandle, useLayoutEffect, useMemo, useRef, useState } from "react";
import { CORE_EXTENSIONS as CORE_EXTENSIONS$1, cn, convertHTMLToMarkdown } from "@plane/utils";
import { HocuspocusProvider } from "@hocuspocus/provider";
import { IndexeddbPersistence } from "y-indexeddb";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import Collaboration from "@tiptap/extension-collaboration";
import { BubbleMenu, EditorContent, NodeViewContent, NodeViewWrapper, ReactNodeViewRenderer, ReactRenderer, findParentNodeClosestToPos, useEditor, useEditorState } from "@tiptap/react";
import { ALargeSmall, AlignCenter, AlignLeft, AlignRight, Ban, BoldIcon, CaseSensitive, Check, CheckIcon, CheckSquare, Code2, CodeIcon, Copy, CopyIcon, GlobeIcon, Heading1, Heading2, Heading3, Heading4, Heading5, Heading6, ImageIcon, ItalicIcon, Link, Link2Off, LinkIcon, List, ListIcon, ListOrdered, ListOrderedIcon, ListTodo, MessageSquareText, MinusSquare, MoveHorizontal, Palette, PencilIcon, Smile, StrikethroughIcon, Table, TableIcon, TextQuote, Trash2, UnderlineIcon } from "lucide-react";
import { ChevronDownIcon } from "@plane/propel/icons";
import { EmojiIconPickerTypes, EmojiPicker, Logo } from "@plane/propel/emoji-icon-picker";
import { Extension, combineTransactionSteps, findChildren, findChildrenInRange, findDuplicates, findParentNode, getChangedRanges, getNodeAtPosition, getNodeType, isAtEndOfNode, isAtStartOfNode, isNodeActive, isNodeSelection, textInputRule } from "@tiptap/core";
import { NodeSelection, Plugin, PluginKey, Selection } from "@tiptap/pm/state";
import ts from "highlight.js/lib/languages/typescript";
import { common, createLowlight } from "lowlight";
import { Decoration, DecorationSet } from "@tiptap/pm/view";
import { Loader, Tooltip } from "@plane/ui";
import { useOutsideClickDetector } from "@plane/hooks";
import { FloatingOverlay, FloatingPortal, autoUpdate, flip, hide, offset, shift, useClick, useDismiss, useFloating, useInteractions, useRole } from "@floating-ui/react";
import { v4 } from "uuid";
import Suggestion from "@tiptap/suggestion";
import { TableMap } from "@tiptap/pm/tables";
import { DOMSerializer, Fragment as Fragment$1, Slice } from "@tiptap/pm/model";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import { TextStyle } from "@tiptap/extension-text-style";
import { Underline as Underline$1 } from "@tiptap/extension-underline";
import { CharacterCount } from "@tiptap/extension-character-count";
import { Markdown } from "tiptap-markdown";
import { Placeholder } from "@tiptap/extension-placeholder";
import { canJoin } from "@tiptap/pm/transform";
import codemark from "prosemirror-codemark";
import * as Y from "yjs";
import "tippy.js";

//#region src/core/hooks/use-yjs-setup.ts
const isForcedCloseCode = (code) => {
	if (!code) return false;
	return code >= 4e3 && code <= 4003;
};
const DEFAULT_MAX_RETRIES = 3;
const useYjsSetup = ({ docId, serverUrl, authToken, onStateChange }) => {
	const [stage, setStage] = useState({ kind: "initial" });
	const [hasCachedContent, setHasCachedContent] = useState(false);
	const [isCacheReady, setIsCacheReady] = useState(false);
	const [yjsSession, setYjsSession] = useState(null);
	const retryCountRef = useRef(0);
	const forcedCloseSignalRef = useRef(false);
	const isDisposedRef = useRef(false);
	const stageRef = useRef({ kind: "initial" });
	const lastReconnectTimeRef = useRef(0);
	useEffect(() => {
		retryCountRef.current = 0;
		isDisposedRef.current = false;
		forcedCloseSignalRef.current = false;
		stageRef.current = { kind: "initial" };
		const provider = new HocuspocusProvider({
			name: docId,
			token: authToken,
			url: serverUrl,
			onAuthenticationFailed: () => {
				if (isDisposedRef.current) return;
				const newStage = {
					kind: "disconnected",
					error: {
						type: "auth-failed",
						message: "Authentication failed"
					}
				};
				stageRef.current = newStage;
				setStage(newStage);
			},
			onConnect: () => {
				if (isDisposedRef.current) {
					provider?.disconnect();
					return;
				}
				retryCountRef.current = 0;
				const newStage = { kind: "awaiting-sync" };
				stageRef.current = newStage;
				setStage(newStage);
			},
			onStatus: ({ status: providerStatus }) => {
				if (isDisposedRef.current) return;
				if (providerStatus === "connecting") setStage(retryCountRef.current > 0 ? {
					kind: "reconnecting",
					attempt: retryCountRef.current
				} : { kind: "connecting" });
				else if (providerStatus === "disconnected") {} else if (providerStatus === "connected") {
					const newStage = { kind: "awaiting-sync" };
					stageRef.current = newStage;
					setStage(newStage);
				}
			},
			onSynced: () => {
				if (isDisposedRef.current) return;
				retryCountRef.current = 0;
				const newStage = { kind: "synced" };
				stageRef.current = newStage;
				setStage(newStage);
			}
		});
		const pauseProvider = () => {
			const wsProvider = provider.configuration.websocketProvider;
			if (wsProvider) try {
				wsProvider.shouldConnect = false;
				wsProvider.disconnect();
			} catch (error) {
				console.error(`Error pausing websocketProvider:`, error);
			}
		};
		const permanentlyStopProvider = () => {
			isDisposedRef.current = true;
			const wsProvider = provider.configuration.websocketProvider;
			if (wsProvider) try {
				wsProvider.shouldConnect = false;
				wsProvider.disconnect();
				wsProvider.destroy();
			} catch (error) {
				console.error(`Error tearing down websocketProvider:`, error);
			}
			try {
				provider.destroy();
			} catch (error) {
				console.error(`Error destroying provider:`, error);
			}
		};
		const handleClose = (closeEvent) => {
			if (isDisposedRef.current) return;
			const closeCode = closeEvent.event?.code;
			const shouldConnect = provider.configuration.websocketProvider.shouldConnect;
			if (isForcedCloseCode(closeCode) || forcedCloseSignalRef.current || shouldConnect === false) {
				const isManualDisconnect = shouldConnect === false;
				const newStage = {
					kind: "disconnected",
					error: {
						type: "forced-close",
						code: closeCode || 0,
						message: isManualDisconnect ? "Manually disconnected" : "Server forced connection close"
					}
				};
				stageRef.current = newStage;
				setStage(newStage);
				retryCountRef.current = 0;
				forcedCloseSignalRef.current = false;
				if (!isManualDisconnect) pauseProvider();
			} else {
				retryCountRef.current++;
				if (retryCountRef.current >= DEFAULT_MAX_RETRIES) {
					const newStage = {
						kind: "disconnected",
						error: {
							type: "max-retries",
							message: `Failed to connect after ${DEFAULT_MAX_RETRIES} attempts`
						}
					};
					stageRef.current = newStage;
					setStage(newStage);
					pauseProvider();
				} else {
					const newStage = {
						kind: "reconnecting",
						attempt: retryCountRef.current
					};
					stageRef.current = newStage;
					setStage(newStage);
				}
			}
		};
		provider.on("close", handleClose);
		setYjsSession({
			provider,
			ydoc: provider.document
		});
		const handleVisibilityChange = (event) => {
			if (isDisposedRef.current) return;
			const isVisible = document.visibilityState === "visible";
			const isFocus = event?.type === "focus";
			if (isVisible || isFocus) {
				const now = Date.now();
				if (now - lastReconnectTimeRef.current < 1e3) return;
				const wsProvider = provider.configuration.websocketProvider;
				if (!wsProvider) return;
				const ws = wsProvider.webSocket;
				if (ws?.readyState === WebSocket.CLOSED || ws?.readyState === WebSocket.CLOSING || stageRef.current.kind === "disconnected") {
					lastReconnectTimeRef.current = now;
					wsProvider.shouldConnect = true;
					retryCountRef.current = 0;
					const newStage = { kind: "connecting" };
					stageRef.current = newStage;
					setStage(newStage);
					wsProvider.disconnect();
					wsProvider.connect();
				}
			}
		};
		const handleOnline = () => {
			if (isDisposedRef.current) return;
			const wsProvider = provider.configuration.websocketProvider;
			if (wsProvider) {
				wsProvider.shouldConnect = true;
				wsProvider.disconnect();
				wsProvider.connect();
			}
		};
		document.addEventListener("visibilitychange", handleVisibilityChange);
		window.addEventListener("focus", handleVisibilityChange);
		window.addEventListener("online", handleOnline);
		return () => {
			try {
				provider.off("close", handleClose);
			} catch (error) {
				console.error(`Error unregistering close handler:`, error);
			}
			document.removeEventListener("visibilitychange", handleVisibilityChange);
			window.removeEventListener("focus", handleVisibilityChange);
			window.removeEventListener("online", handleOnline);
			permanentlyStopProvider();
		};
	}, [
		docId,
		serverUrl,
		authToken
	]);
	useEffect(() => {
		if (!yjsSession) return;
		const idbPersistence = new IndexeddbPersistence(docId, yjsSession.provider.document);
		const onIdbSynced = () => {
			const docLength = idbPersistence.doc.getXmlFragment("default")?.length ?? 0;
			setIsCacheReady(true);
			setHasCachedContent(docLength > 0);
		};
		idbPersistence.on("synced", onIdbSynced);
		return () => {
			idbPersistence.off("synced", onIdbSynced);
			try {
				idbPersistence.destroy();
			} catch (error) {
				console.error(`Error destroying local provider:`, error);
			}
		};
	}, [docId, yjsSession]);
	useEffect(() => {
		if (!yjsSession || !isCacheReady) return;
		const fragment = yjsSession.ydoc.getXmlFragment("default");
		let lastHasContent = false;
		const updateCachedContentFlag = () => {
			const hasContent = (fragment?.length ?? 0) > 0;
			if (hasContent !== lastHasContent) {
				lastHasContent = hasContent;
				setHasCachedContent(hasContent);
			}
		};
		updateCachedContentFlag();
		fragment.observeDeep(updateCachedContentFlag);
		return () => {
			try {
				fragment.unobserveDeep(updateCachedContentFlag);
			} catch (error) {
				console.error("Error unobserving fragment:", error);
			}
		};
	}, [yjsSession, isCacheReady]);
	const stateChangeCallbackRef = useRef(onStateChange);
	stateChangeCallbackRef.current = onStateChange;
	useEffect(() => {
		if (!stateChangeCallbackRef.current) return;
		const state = {
			stage,
			isServerSynced: stage.kind === "synced",
			isServerDisconnected: stage.kind === "disconnected"
		};
		stateChangeCallbackRef.current(state);
	}, [stage]);
	const isServerSynced = stage.kind === "synced";
	const isServerDisconnected = stage.kind === "disconnected";
	const isDocReady = isServerSynced || isServerDisconnected || isCacheReady && hasCachedContent;
	const signalForcedClose = useCallback((value) => {
		forcedCloseSignalRef.current = value;
	}, []);
	if (!yjsSession) return null;
	return {
		provider: yjsSession.provider,
		ydoc: yjsSession.ydoc,
		state: {
			stage,
			hasCachedContent,
			isCacheReady,
			isServerSynced,
			isServerDisconnected,
			isDocReady
		},
		actions: { signalForcedClose }
	};
};

//#endregion
//#region src/core/contexts/collaboration-context.tsx
const CollabContext = createContext(null);
function CollaborationProvider({ fallback = null, children,...args }) {
	const setup = useYjsSetup(args);
	if (!setup) return /* @__PURE__ */ jsx(Fragment, { children: fallback });
	return /* @__PURE__ */ jsx(CollabContext.Provider, {
		value: setup,
		children
	});
}
function useCollaboration() {
	const ctx = useContext(CollabContext);
	if (!ctx) throw new Error("useCollaboration must be used inside <CollaborationProvider>");
	return ctx;
}

//#endregion
//#region src/core/extensions/callout/color-selector.tsx
function CalloutBlockColorSelector(props) {
	const { disabled, isOpen, onSelect, toggleDropdown } = props;
	const handleColorSelect = (val) => {
		onSelect(val);
		toggleDropdown();
	};
	return /* @__PURE__ */ jsx("div", {
		className: cn("opacity-0 pointer-events-none absolute top-2 right-2 z-10 transition-opacity", {
			"group-hover/callout-node:opacity-100 group-hover/callout-node:pointer-events-auto": !disabled,
			"opacity-100 pointer-events-auto": isOpen
		}),
		contentEditable: false,
		children: /* @__PURE__ */ jsxs("div", {
			className: "relative",
			children: [/* @__PURE__ */ jsxs("button", {
				type: "button",
				onClick: (e) => {
					toggleDropdown();
					e.stopPropagation();
				},
				className: cn("flex items-center gap-1 h-full whitespace-nowrap py-1 px-2.5 text-sm font-medium text-custom-text-300 hover:bg-white/10 active:bg-custom-background-80 rounded transition-colors", { "bg-white/10": isOpen }),
				disabled,
				children: [/* @__PURE__ */ jsx("span", { children: "Color" }), /* @__PURE__ */ jsx(ChevronDownIcon, { className: "flex-shrink-0 size-3" })]
			}), isOpen && /* @__PURE__ */ jsx("section", {
				className: "absolute top-full right-0 z-10 mt-1 rounded-md border-[0.5px] border-custom-border-300 bg-custom-background-100 p-2 shadow-custom-shadow-rg animate-in fade-in slide-in-from-top-1",
				children: /* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-2",
					children: [COLORS_LIST.map((color) => /* @__PURE__ */ jsx("button", {
						type: "button",
						className: "flex-shrink-0 size-6 rounded border-[0.5px] border-custom-border-400 hover:opacity-60 transition-opacity",
						style: { backgroundColor: color.backgroundColor },
						onClick: () => handleColorSelect(color.key)
					}, color.key)), /* @__PURE__ */ jsx("button", {
						type: "button",
						className: "flex-shrink-0 size-6 grid place-items-center rounded text-custom-text-300 border-[0.5px] border-custom-border-400 hover:bg-custom-background-80 transition-colors",
						onClick: () => handleColorSelect(null),
						children: /* @__PURE__ */ jsx(Ban, { className: "size-4" })
					})]
				})
			})]
		})
	});
}

//#endregion
//#region src/core/extensions/callout/logo-selector.tsx
function CalloutBlockLogoSelector(props) {
	const { blockAttributes, disabled, handleOpen, isOpen, updateAttributes } = props;
	const logoValue = {
		in_use: blockAttributes["data-logo-in-use"],
		icon: {
			color: blockAttributes["data-icon-color"],
			name: blockAttributes["data-icon-name"]
		},
		emoji: {
			value: blockAttributes["data-emoji-unicode"]?.toString(),
			url: blockAttributes["data-emoji-url"]
		}
	};
	return /* @__PURE__ */ jsx("div", {
		contentEditable: false,
		children: /* @__PURE__ */ jsx(EmojiPicker, {
			closeOnSelect: false,
			isOpen,
			handleToggle: handleOpen,
			className: "flex-shrink-0 grid place-items-center",
			buttonClassName: cn("flex-shrink-0 size-8 grid place-items-center rounded-lg", { "hover:bg-white/10": !disabled }),
			label: /* @__PURE__ */ jsx(Logo, {
				logo: logoValue,
				size: 18,
				type: "lucide"
			}),
			onChange: (val) => {
				let newLogoValue = {};
				let newLogoValueToStoreInLocalStorage = {
					in_use: "emoji",
					emoji: {
						value: DEFAULT_CALLOUT_BLOCK_ATTRIBUTES["data-emoji-unicode"],
						url: DEFAULT_CALLOUT_BLOCK_ATTRIBUTES["data-emoji-url"]
					}
				};
				if (val.type === "emoji") {
					const emojiValue = val.value;
					newLogoValue = {
						"data-emoji-unicode": emojiValue,
						"data-emoji-url": void 0
					};
					newLogoValueToStoreInLocalStorage = {
						in_use: "emoji",
						emoji: {
							value: emojiValue,
							url: void 0
						}
					};
				} else if (val.type === "icon") {
					const iconValue = val.value;
					newLogoValue = {
						"data-icon-name": iconValue.name,
						"data-icon-color": iconValue.color
					};
					newLogoValueToStoreInLocalStorage = {
						in_use: "icon",
						icon: {
							name: iconValue.name,
							color: iconValue.color
						}
					};
				}
				updateAttributes({
					"data-logo-in-use": val.type,
					...newLogoValue
				});
				updateStoredLogo(newLogoValueToStoreInLocalStorage);
				handleOpen(false);
			},
			defaultIconColor: logoValue?.in_use && logoValue.in_use === "icon" ? logoValue?.icon?.color : void 0,
			defaultOpen: logoValue.in_use === "emoji" ? EmojiIconPickerTypes.EMOJI : EmojiIconPickerTypes.ICON,
			disabled,
			searchDisabled: true
		})
	});
}

//#endregion
//#region src/core/extensions/callout/block.tsx
function CustomCalloutBlock(props) {
	const { editor, node, updateAttributes } = props;
	const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
	const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
	const activeBackgroundColor = COLORS_LIST.find((c) => node.attrs["data-background"] === c.key)?.backgroundColor;
	return /* @__PURE__ */ jsxs(NodeViewWrapper, {
		className: "editor-callout-component group/callout-node relative bg-custom-background-90 rounded-lg text-custom-text-100 p-4 my-2 flex items-start gap-4 transition-colors duration-500 break-words",
		style: { backgroundColor: activeBackgroundColor },
		children: [
			/* @__PURE__ */ jsx(CalloutBlockLogoSelector, {
				blockAttributes: node.attrs,
				disabled: !editor.isEditable,
				isOpen: isEmojiPickerOpen,
				handleOpen: (val) => setIsEmojiPickerOpen(val),
				updateAttributes
			}),
			/* @__PURE__ */ jsx(CalloutBlockColorSelector, {
				disabled: !editor.isEditable,
				isOpen: isColorPickerOpen,
				toggleDropdown: () => setIsColorPickerOpen((prev) => !prev),
				onSelect: (val) => {
					updateAttributes({ [ECalloutAttributeNames.BACKGROUND]: val });
					updateStoredBackgroundColor(val);
				}
			}),
			/* @__PURE__ */ jsx(NodeViewContent, {
				as: "div",
				className: "w-full break-words"
			})
		]
	});
}

//#endregion
//#region src/core/extensions/callout/extension.tsx
const CustomCalloutExtension = CustomCalloutExtensionConfig.extend({
	selectable: true,
	draggable: true,
	addCommands() {
		return { insertCallout: () => ({ commands }) => {
			const storedLogoValues = getStoredLogo();
			const storedBackgroundValue = getStoredBackgroundColor();
			return commands.insertContent({
				type: this.name,
				content: [{ type: CORE_EXTENSIONS.PARAGRAPH }],
				attrs: {
					...storedLogoValues,
					"data-background": storedBackgroundValue
				}
			});
		} };
	},
	addKeyboardShortcuts() {
		return {
			Backspace: ({ editor }) => {
				const { $from, empty } = editor.state.selection;
				try {
					const isParentNodeCallout = (node) => node.type === this.type;
					const parentNodeDetails = findParentNodeClosestToPos($from, isParentNodeCallout);
					if (empty && parentNodeDetails) {
						const isCursorAtCalloutBeginning = $from.pos === parentNodeDetails.start + 1;
						if (parentNodeDetails.node.content.size > 2 && isCursorAtCalloutBeginning) {
							editor.commands.setTextSelection(parentNodeDetails.pos - 1);
							return true;
						}
					}
				} catch (error) {
					console.error("Error in performing backspace action on callout", error);
				}
				return false;
			},
			ArrowDown: insertEmptyParagraphAtNodeBoundaries("down", this.name),
			ArrowUp: insertEmptyParagraphAtNodeBoundaries("up", this.name)
		};
	},
	addNodeView() {
		return ReactNodeViewRenderer((props) => /* @__PURE__ */ jsx(CustomCalloutBlock, {
			...props,
			node: props.node
		}));
	}
});

//#endregion
//#region src/core/extensions/code/code-block-node-view.tsx
createLowlight(common).register("ts", ts);
function CodeBlockComponent({ node }) {
	const [copied, setCopied] = useState(false);
	const copyToClipboard = async (e) => {
		try {
			await navigator.clipboard.writeText(node.textContent);
			setCopied(true);
			setTimeout(() => setCopied(false), 1e3);
		} catch {
			setCopied(false);
		}
		e.preventDefault();
		e.stopPropagation();
	};
	return /* @__PURE__ */ jsxs(NodeViewWrapper, {
		className: "code-block relative group/code",
		children: [/* @__PURE__ */ jsx(Tooltip, {
			tooltipContent: "Copy code",
			children: /* @__PURE__ */ jsx("button", {
				type: "button",
				className: cn("group/button hidden group-hover/code:flex items-center justify-center absolute top-2 right-2 z-10 size-8 rounded-md bg-custom-background-80 border border-custom-border-200 transition duration-150 ease-in-out backdrop-blur-sm", { "bg-green-500/30 hover:bg-green-500/30 active:bg-green-500/30": copied }),
				onClick: copyToClipboard,
				children: copied ? /* @__PURE__ */ jsx(CheckIcon, {
					className: "h-3 w-3 text-green-500",
					strokeWidth: 3
				}) : /* @__PURE__ */ jsx(CopyIcon, { className: "h-3 w-3 text-custom-text-300 group-hover/button:text-custom-text-100" })
			})
		}), /* @__PURE__ */ jsx("pre", {
			className: "bg-custom-background-90 text-custom-text-100 rounded-lg p-4 my-2",
			children: /* @__PURE__ */ jsx(NodeViewContent, {
				as: "code",
				className: "whitespace-pre-wrap"
			})
		})]
	});
}

//#endregion
//#region src/core/extensions/code/index.tsx
const lowlight = createLowlight(common);
lowlight.register("ts", ts);
const CustomCodeBlockExtension = CodeBlockLowlight.extend({
	addNodeView() {
		return ReactNodeViewRenderer(CodeBlockComponent);
	},
	addKeyboardShortcuts() {
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
	}
}).configure({
	lowlight,
	defaultLanguage: "plaintext",
	exitOnTripleEnter: false,
	HTMLAttributes: { class: "" }
});

//#endregion
//#region src/core/extensions/custom-list-keymap/list-helpers.ts
const findListItemPos = (typeOrName, state) => {
	const { $from } = state.selection;
	const nodeType = getNodeType(typeOrName, state.schema);
	let currentNode = null;
	let currentDepth = $from.depth;
	let currentPos = $from.pos;
	let targetDepth = null;
	while (currentDepth > 0 && targetDepth === null) {
		currentNode = $from.node(currentDepth);
		if (currentNode.type === nodeType) targetDepth = currentDepth;
		else {
			currentDepth -= 1;
			currentPos -= 1;
		}
	}
	if (targetDepth === null) return null;
	return {
		$pos: state.doc.resolve(currentPos),
		depth: targetDepth
	};
};
const nextListIsDeeper = (typeOrName, state) => {
	const listDepth = getNextListDepth(typeOrName, state);
	const listItemPos = findListItemPos(typeOrName, state);
	if (!listItemPos || !listDepth) return false;
	if (listDepth > listItemPos.depth) return true;
	return false;
};
const getNextListDepth = (typeOrName, state) => {
	const listItemPos = findListItemPos(typeOrName, state);
	if (!listItemPos) return false;
	const [, depth] = getNodeAtPosition(state, typeOrName, listItemPos.$pos.pos + 4);
	return depth;
};
const getPrevListDepth = (typeOrName, state) => {
	const listItemPos = findListItemPos(typeOrName, state);
	if (!listItemPos) return false;
	let depth = 0;
	const pos = listItemPos.$pos;
	const resolvedPos = state.doc.resolve(Math.max(pos.pos - 1, 0));
	for (let d = resolvedPos.depth; d > 0; d--) {
		const node = resolvedPos.node(d);
		if ([
			CORE_EXTENSIONS.BULLET_LIST,
			CORE_EXTENSIONS.ORDERED_LIST,
			CORE_EXTENSIONS.TASK_LIST
		].includes(node.type.name)) depth++;
	}
	depth = depth > 0 ? depth - 1 : 0;
	depth = depth * 2;
	return depth;
};
const handleBackspace = (editor, name, parentListTypes) => {
	if (editor.commands.undoInputRule()) return true;
	const { from, to } = editor.state.selection;
	if (from !== to) return false;
	if (!isNodeActive(editor.state, name) && hasListBefore(editor.state, name, parentListTypes)) {
		const { $anchor } = editor.state.selection;
		const $listPos = editor.state.doc.resolve($anchor.before() - 1);
		const listDescendants = [];
		$listPos.node().descendants((node, pos) => {
			if (node.type.name === name) listDescendants.push({
				node,
				pos
			});
		});
		const lastItem = listDescendants.at(-1);
		if (!lastItem) return false;
		const $lastItemPos = editor.state.doc.resolve($listPos.start() + lastItem.pos + 1);
		const startPos = $anchor.start() - 1;
		const endPos = $anchor.end() + 1;
		if (startPos < 0 || endPos > editor.state.doc.content.size) return false;
		return editor.chain().cut({
			from: startPos,
			to: endPos
		}, $lastItemPos.end()).joinForward().run();
	}
	if (!isNodeActive(editor.state, name)) return false;
	if (!isAtStartOfNode(editor.state)) return false;
	const isParaSibling = isCurrentParagraphASibling(editor.state);
	const isCurrentListItemSublist = prevListIsHigher(name, editor.state);
	const listItemPos = findListItemPos(name, editor.state);
	const nextListItemIsSibling = nextListIsSibling(name, editor.state);
	if (!listItemPos) return false;
	const currentNode = listItemPos.$pos.node(listItemPos.depth);
	const currentListItemHasSubList = listItemHasSubList(name, editor.state, currentNode);
	if (currentListItemHasSubList && isCurrentListItemSublist && isParaSibling) return false;
	if (currentListItemHasSubList && isCurrentListItemSublist) {
		editor.chain().liftListItem(name).run();
		return editor.commands.joinItemBackward();
	}
	if (isCurrentListItemSublist && nextListItemIsSibling) return false;
	if (isCurrentListItemSublist) return false;
	if (currentListItemHasSubList) return false;
	if (hasListItemBefore(name, editor.state)) return editor.chain().liftListItem(name).run();
	if (!currentListItemHasSubList) return false;
	return editor.chain().liftListItem(name).run();
};
const handleDelete = (editor, name) => {
	if (!isNodeActive(editor.state, name)) return false;
	if (!isAtEndOfNode(editor.state, name)) return false;
	if (nextListIsDeeper(name, editor.state)) return editor.chain().focus(editor.state.selection.from + 4).lift(name).joinBackward().run();
	if (nextListIsHigher(name, editor.state)) return editor.chain().joinForward().joinBackward().run();
	return editor.commands.joinItemForward();
};
const hasListBefore = (editorState, name, parentListTypes) => {
	const { $anchor } = editorState.selection;
	const previousNodePos = Math.max(0, $anchor.pos - 2);
	const previousNode = editorState.doc.resolve(previousNodePos).node();
	if (!previousNode || !parentListTypes.includes(previousNode.type.name)) return false;
	return true;
};
const prevListIsHigher = (typeOrName, state) => {
	const listDepth = getPrevListDepth(typeOrName, state);
	const listItemPos = findListItemPos(typeOrName, state);
	if (!listItemPos || !listDepth) return false;
	if (listDepth < listItemPos.depth) return true;
	return false;
};
const nextListIsSibling = (typeOrName, state) => {
	const listDepth = getNextListDepth(typeOrName, state);
	const listItemPos = findListItemPos(typeOrName, state);
	if (!listItemPos || !listDepth) return false;
	if (listDepth === listItemPos.depth) return true;
	return false;
};
const nextListIsHigher = (typeOrName, state) => {
	const listDepth = getNextListDepth(typeOrName, state);
	const listItemPos = findListItemPos(typeOrName, state);
	if (!listItemPos || !listDepth) return false;
	if (listDepth < listItemPos.depth) return true;
	return false;
};
const listItemHasSubList = (typeOrName, state, node) => {
	if (!node) return false;
	const nodeType = getNodeType(typeOrName, state.schema);
	let hasSubList = false;
	node.descendants((child) => {
		if (child.type === nodeType) hasSubList = true;
	});
	return hasSubList;
};
const isCurrentParagraphASibling = (state) => {
	const { $from } = state.selection;
	const listItemNode = $from.node(-1);
	if ($from.parent.type.name === CORE_EXTENSIONS.PARAGRAPH && [CORE_EXTENSIONS.LIST_ITEM, CORE_EXTENSIONS.TASK_ITEM].includes(listItemNode.type.name)) {
		let paragraphNodesCount = 0;
		listItemNode.forEach((child) => {
			if (child.type.name === CORE_EXTENSIONS.PARAGRAPH) paragraphNodesCount++;
		});
		return paragraphNodesCount > 1;
	}
	return false;
};
const hasListItemBefore = (typeOrName, state) => {
	const { $anchor } = state.selection;
	const $targetPos = state.doc.resolve($anchor.pos - 2);
	if ($targetPos.index() === 0) return false;
	if ($targetPos.nodeBefore?.type.name !== typeOrName) return false;
	return true;
};

//#endregion
//#region src/core/extensions/custom-list-keymap/list-keymap.ts
const ListKeymap = ({ tabIndex }) => Extension.create({
	name: "listKeymap",
	addOptions() {
		return { listTypes: [{
			itemName: "listItem",
			wrapperNames: ["bulletList", "orderedList"]
		}, {
			itemName: "taskItem",
			wrapperNames: ["taskList"]
		}] };
	},
	addKeyboardShortcuts() {
		return {
			Tab: () => {
				if (this.editor.isActive(CORE_EXTENSIONS.LIST_ITEM) || this.editor.isActive(CORE_EXTENSIONS.TASK_ITEM)) {
					if (this.editor.commands.sinkListItem(CORE_EXTENSIONS.LIST_ITEM)) return true;
					else if (this.editor.commands.sinkListItem(CORE_EXTENSIONS.TASK_ITEM)) return true;
					return true;
				}
				if (tabIndex !== void 0 && tabIndex !== null) return false;
				return true;
			},
			"Shift-Tab": () => {
				if (this.editor.commands.liftListItem(CORE_EXTENSIONS.LIST_ITEM)) return true;
				else if (this.editor.commands.liftListItem(CORE_EXTENSIONS.TASK_ITEM)) return true;
				if (tabIndex !== void 0 && tabIndex !== null) return false;
				return true;
			},
			Delete: ({ editor }) => {
				try {
					let handled = false;
					this.options.listTypes.forEach(({ itemName }) => {
						if (editor.state.schema.nodes[itemName] === void 0) return;
						if (handleDelete(editor, itemName)) handled = true;
					});
					return handled;
				} catch (e) {
					console.log("Error in handling Delete:", e);
					return false;
				}
			},
			"Mod-Delete": ({ editor }) => {
				let handled = false;
				this.options.listTypes.forEach(({ itemName }) => {
					if (editor.state.schema.nodes[itemName] === void 0) return;
					if (handleDelete(editor, itemName)) handled = true;
				});
				return handled;
			},
			Backspace: ({ editor }) => {
				try {
					let handled = false;
					this.options.listTypes.forEach(({ itemName, wrapperNames }) => {
						if (editor.state.schema.nodes[itemName] === void 0) return;
						if (handleBackspace(editor, itemName, wrapperNames)) handled = true;
					});
					return handled;
				} catch (e) {
					console.log("Error in handling Backspace:", e);
					return false;
				}
			},
			"Mod-Backspace": ({ editor }) => {
				let handled = false;
				this.options.listTypes.forEach(({ itemName, wrapperNames }) => {
					if (editor.state.schema.nodes[itemName] === void 0) return;
					if (handleBackspace(editor, itemName, wrapperNames)) handled = true;
				});
				return handled;
			}
		};
	}
});

//#endregion
//#region src/core/extensions/mentions/mention-node-view.tsx
function MentionNodeView(props) {
	const { extension, node: { attrs } } = props;
	return /* @__PURE__ */ jsx(NodeViewWrapper, {
		className: "mention-component inline w-fit",
		children: extension.options.renderComponent({
			entity_identifier: attrs[EMentionComponentAttributeNames.ENTITY_IDENTIFIER] ?? "",
			entity_name: attrs[EMentionComponentAttributeNames.ENTITY_NAME] ?? "user_mention"
		})
	});
}

//#endregion
//#region src/core/extensions/mentions/mentions-list-dropdown.tsx
const MentionsListDropdown = forwardRef(function MentionsListDropdown$1(props, ref) {
	const { command, query, searchCallback, onClose } = props;
	const [sections, setSections] = useState([]);
	const [selectedIndex, setSelectedIndex] = useState({
		section: 0,
		item: 0
	});
	const [isLoading, setIsLoading] = useState(false);
	const dropdownContainer = useRef(null);
	const selectItem = useCallback((sectionIndex, itemIndex) => {
		try {
			const item = sections?.[sectionIndex]?.items?.[itemIndex];
			const transactionId = v4();
			if (item) command({
				...item,
				id: transactionId
			});
		} catch (error) {
			console.error("Error selecting mention item:", error);
		}
	}, [command, sections]);
	useImperativeHandle(ref, () => ({ onKeyDown: ({ event }) => {
		if (!DROPDOWN_NAVIGATION_KEYS.includes(event.key)) return false;
		if (event.key === "Enter") {
			selectItem(selectedIndex.section, selectedIndex.item);
			return true;
		}
		const newIndex = getNextValidIndex({
			event,
			sections,
			selectedIndex
		});
		if (newIndex) setSelectedIndex(newIndex);
		return true;
	} }));
	useEffect(() => {
		setSelectedIndex({
			section: 0,
			item: 0
		});
	}, [sections]);
	useEffect(() => {
		const fetchSuggestions = async () => {
			setIsLoading(true);
			try {
				const sectionsResponse = await searchCallback?.(query);
				if (sectionsResponse) setSections(sectionsResponse);
			} catch (error) {
				console.error("Failed to fetch suggestions:", error);
			} finally {
				setIsLoading(false);
			}
		};
		fetchSuggestions();
	}, [query, searchCallback]);
	useLayoutEffect(() => {
		const container = dropdownContainer?.current;
		if (!container) return;
		const item = container.querySelector(`#mention-item-${selectedIndex.section}-${selectedIndex.item}`);
		if (item) {
			const containerRect = container.getBoundingClientRect();
			const itemRect = item.getBoundingClientRect();
			if (!(itemRect.top >= containerRect.top && itemRect.bottom <= containerRect.bottom)) item.scrollIntoView({ block: "nearest" });
		}
	}, [selectedIndex]);
	useOutsideClickDetector(dropdownContainer, onClose);
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(FloatingOverlay, {
		style: { zIndex: 99 },
		lockScroll: true
	}), /* @__PURE__ */ jsx("div", {
		ref: dropdownContainer,
		className: "relative max-h-80 w-[14rem] overflow-y-auto rounded-md border-[0.5px] border-custom-border-300 bg-custom-background-100 px-2 py-2.5 shadow-custom-shadow-rg space-y-2",
		style: { zIndex: 100 },
		onClick: (e) => {
			e.stopPropagation();
		},
		onMouseDown: (e) => {
			e.stopPropagation();
		},
		children: isLoading ? /* @__PURE__ */ jsx("div", {
			className: "text-center text-sm text-custom-text-400",
			children: "Loading..."
		}) : sections.length ? sections.map((section, sectionIndex) => /* @__PURE__ */ jsxs("div", {
			className: "space-y-2",
			children: [section.title && /* @__PURE__ */ jsx("h6", {
				className: "text-xs font-semibold text-custom-text-300",
				children: section.title
			}), section.items.map((item, itemIndex) => {
				const isSelected = sectionIndex === selectedIndex.section && itemIndex === selectedIndex.item;
				return /* @__PURE__ */ jsxs("button", {
					id: `mention-item-${sectionIndex}-${itemIndex}`,
					type: "button",
					className: cn("flex items-center gap-2 w-full rounded px-1 py-1.5 text-xs text-left truncate text-custom-text-200", { "bg-custom-background-80": isSelected }),
					onClick: (e) => {
						e.preventDefault();
						e.stopPropagation();
						selectItem(sectionIndex, itemIndex);
					},
					onMouseEnter: () => setSelectedIndex({
						section: sectionIndex,
						item: itemIndex
					}),
					children: [
						/* @__PURE__ */ jsx("span", {
							className: "size-5 grid place-items-center flex-shrink-0",
							children: item.icon
						}),
						item.subTitle && /* @__PURE__ */ jsx("h5", {
							className: "whitespace-nowrap text-xs text-custom-text-300 flex-shrink-0",
							children: item.subTitle
						}),
						/* @__PURE__ */ jsx("p", {
							className: "flex-grow truncate",
							children: item.title
						})
					]
				}, item.id);
			})]
		}, section.key)) : /* @__PURE__ */ jsx("div", {
			className: "text-center text-sm text-custom-text-400",
			children: "No results"
		})
	})] });
});
MentionsListDropdown.displayName = "MentionsListDropdown";

//#endregion
//#region src/core/extensions/mentions/utils.ts
const renderMentionsDropdown = (args) => () => {
	const { searchCallback } = args;
	let component = null;
	let cleanup = () => {};
	let editorRef = null;
	const handleClose = (editor) => {
		component?.destroy();
		component = null;
		(editor || editorRef)?.commands.removeActiveDropbarExtension(CORE_EXTENSIONS.MENTION);
		cleanup();
	};
	return {
		onStart: (props) => {
			if (!searchCallback) return;
			editorRef = props.editor;
			component = new ReactRenderer(MentionsListDropdown, {
				props: {
					...props,
					searchCallback,
					onClose: () => handleClose(props.editor)
				},
				editor: props.editor,
				className: "fixed z-[100]"
			});
			if (!props.clientRect) return;
			props.editor.commands.addActiveDropbarExtension(CORE_EXTENSIONS.MENTION);
			const element = component.element;
			cleanup = updateFloatingUIFloaterPosition(props.editor, element).cleanup;
		},
		onUpdate: (props) => {
			if (!component || !component.element) return;
			component.updateProps(props);
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
};

//#endregion
//#region src/core/extensions/mentions/extension.tsx
function CustomMentionExtension(props) {
	const { searchCallback, renderComponent, getMentionedEntityDetails } = props;
	return CustomMentionExtensionConfig.extend({
		addOptions() {
			return {
				...this.parent?.(),
				renderComponent,
				getMentionedEntityDetails
			};
		},
		addNodeView() {
			return ReactNodeViewRenderer((props$1) => /* @__PURE__ */ jsx(MentionNodeView, {
				...props$1,
				node: props$1.node
			}));
		}
	}).configure({ suggestion: {
		render: renderMentionsDropdown({ searchCallback }),
		allowSpaces: true
	} });
}

//#endregion
//#region src/core/extensions/code/utils/replace-code-block-with-text.ts
function replaceCodeWithText(editor) {
	try {
		const { from, to } = editor.state.selection;
		const cursorPosInsideCodeblock = from;
		let replaced = false;
		editor.state.doc.nodesBetween(from, to, (node, pos) => {
			if (node.type === editor.state.schema.nodes.codeBlock) {
				const startPos = pos;
				const endPos = pos + node.nodeSize;
				const textContent = node.textContent;
				if (textContent.length === 0) editor.chain().focus().toggleCodeBlock().run();
				else transformCodeBlockToParagraphs({
					editor,
					from: startPos,
					to: endPos,
					textContent,
					cursorPosInsideCodeblock
				});
				replaced = true;
				return false;
			}
		});
		if (!replaced) console.log("No code block to replace.");
	} catch (error) {
		console.error("An error occurred while replacing code block content:", error);
	}
}
function transformCodeBlockToParagraphs({ editor, from, to, textContent, cursorPosInsideCodeblock }) {
	const { schema } = editor.state;
	const { paragraph } = schema.nodes;
	const docSize = editor.state.doc.content.size;
	if (from < 0 || to > docSize || from > to) {
		console.error("Invalid range for replacement: ", from, to, "in a document of size", docSize);
		return;
	}
	const lines = textContent.split(/\r?\n/);
	const tr = editor.state.tr;
	let insertPos = from;
	tr.delete(from, to);
	lines.forEach((line) => {
		const paragraphNode = line.length === 0 ? paragraph.create({}) : paragraph.create({}, schema.text(line));
		tr.insert(insertPos, paragraphNode);
		insertPos += paragraphNode.nodeSize;
	});
	const parentNodeOffset = findParentNode((node) => node.type === schema.nodes.codeBlock)(editor.state.selection)?.pos;
	if (parentNodeOffset === void 0) throw new Error("Invalid code block offset");
	const cursorPosOutsideCodeblock = cursorPosInsideCodeblock + (getLineNumber(textContent, cursorPosInsideCodeblock, parentNodeOffset) - 1);
	editor.view.dispatch(tr);
	editor.chain().focus(cursorPosOutsideCodeblock).run();
}
/**
* Calculates the line number where the cursor is located inside the code block.
* Assumes the indexing of the content inside the code block is like ProseMirror's indexing.
*
* @param {string} textContent - The content of the code block.
* @param {number} cursorPosition - The absolute cursor position in the document.
* @param {number} codeBlockNodePos - The starting position of the code block node in the document.
* @returns {number} The 1-based line number where the cursor is located.
*/
function getLineNumber(textContent, cursorPosition, codeBlockNodePos) {
	const lines = textContent.split(/\r?\n/);
	const cursorPosInsideCodeblockRelative = cursorPosition - codeBlockNodePos;
	let startPosition = 0;
	let lineNumber = 0;
	for (let i = 0; i < lines.length; i++) {
		const endPosition = startPosition + lines[i].length + 1;
		if (cursorPosInsideCodeblockRelative >= startPosition && cursorPosInsideCodeblockRelative <= endPosition) {
			lineNumber = i + 1;
			break;
		}
		startPosition = endPosition;
	}
	return lineNumber;
}

//#endregion
//#region src/core/helpers/editor-commands.ts
const setText = (editor, range) => {
	if (range) editor.chain().focus().deleteRange(range).setNode(CORE_EXTENSIONS.PARAGRAPH).run();
	else editor.chain().focus().setNode(CORE_EXTENSIONS.PARAGRAPH).run();
};
const toggleHeading = (editor, level, range) => {
	if (range) editor.chain().focus().deleteRange(range).setNode(CORE_EXTENSIONS.HEADING, { level }).run();
	else editor.chain().focus().toggleHeading({ level }).run();
};
const toggleBold = (editor, range) => {
	if (range) editor.chain().focus().deleteRange(range).toggleBold().run();
	else editor.chain().focus().toggleBold().run();
};
const toggleItalic = (editor, range) => {
	if (range) editor.chain().focus().deleteRange(range).toggleItalic().run();
	else editor.chain().focus().toggleItalic().run();
};
const toggleUnderline = (editor, range) => {
	if (range) editor.chain().focus().deleteRange(range).toggleUnderline().run();
	else editor.chain().focus().toggleUnderline().run();
};
const toggleCodeBlock = (editor, range) => {
	try {
		if (editor.isActive(CORE_EXTENSIONS.CODE_BLOCK)) {
			replaceCodeWithText(editor);
			return;
		}
		const { from, to } = range || editor.state.selection;
		const text = editor.state.doc.textBetween(from, to, "\n");
		const isMultiline = text.includes("\n");
		if (editor.state.selection.empty) editor.chain().focus().toggleCodeBlock().run();
		else if (isMultiline) editor.chain().focus().deleteRange({
			from,
			to
		}).insertContentAt(from, `\`\`\`\n${text}\n\`\`\``).run();
		else editor.chain().focus().toggleCode().run();
	} catch (error) {
		console.error("An error occurred while toggling code block:", error);
	}
};
const toggleOrderedList = (editor, range) => {
	if (range) editor.chain().focus().deleteRange(range).toggleOrderedList().run();
	else editor.chain().focus().toggleOrderedList().run();
};
const toggleBulletList = (editor, range) => {
	if (range) editor.chain().focus().deleteRange(range).toggleBulletList().run();
	else editor.chain().focus().toggleBulletList().run();
};
const toggleTaskList = (editor, range) => {
	if (range) editor.chain().focus().deleteRange(range).toggleTaskList().run();
	else editor.chain().focus().toggleTaskList().run();
};
const toggleStrike = (editor, range) => {
	if (range) editor.chain().focus().deleteRange(range).toggleStrike().run();
	else editor.chain().focus().toggleStrike().run();
};
const toggleBlockquote = (editor, range) => {
	if (range) editor.chain().focus().deleteRange(range).toggleBlockquote().run();
	else editor.chain().focus().toggleBlockquote().run();
};
const insertTableCommand = (editor, range) => {
	if (typeof window !== "undefined") {
		const selection = window.getSelection();
		if (selection) {
			if (selection.rangeCount !== 0) {
				if (findTableAncestor(selection.getRangeAt(0).startContainer)) return;
			}
		}
	}
	if (range) editor.chain().focus().deleteRange(range).clearNodes().insertTable({
		rows: 3,
		cols: 3
	}).run();
	else editor.chain().focus().clearNodes().insertTable({
		rows: 3,
		cols: 3
	}).run();
};
const insertImage = ({ editor, event, pos, file, range }) => {
	if (range) editor.chain().focus().deleteRange(range).run();
	const imageOptions = { event };
	if (pos) imageOptions.pos = pos;
	if (file) imageOptions.file = file;
	return editor?.chain().focus().insertImageComponent(imageOptions).run();
};
const unsetLinkEditor = (editor) => {
	editor.chain().focus().unsetLink().run();
};
const setLinkEditor = (editor, url, text) => {
	const { selection } = editor.state;
	const previousSelection = {
		from: selection.from,
		to: selection.to
	};
	if (text) {
		editor.chain().focus().deleteRange({
			from: selection.from,
			to: selection.to
		}).insertContentAt(previousSelection.from, text).run();
		const previousFrom = previousSelection.from;
		editor.commands.setTextSelection({
			from: previousFrom,
			to: previousFrom + text.length
		});
	}
	editor.chain().focus().setLink({ href: url }).run();
};
const toggleTextColor = (color, editor, range) => {
	if (color) if (range) editor.chain().focus().deleteRange(range).setTextColor(color).run();
	else editor.chain().focus().setTextColor(color).run();
	else if (range) editor.chain().focus().deleteRange(range).unsetTextColor().run();
	else editor.chain().focus().unsetTextColor().run();
};
const toggleBackgroundColor = (color, editor, range) => {
	if (color) if (range) editor.chain().focus().deleteRange(range).setBackgroundColor(color).run();
	else editor.chain().focus().setBackgroundColor(color).run();
	else if (range) editor.chain().focus().deleteRange(range).unsetBackgroundColor().run();
	else editor.chain().focus().unsetBackgroundColor().run();
};
const setTextAlign = (alignment, editor) => {
	editor.chain().focus().setTextAlign(alignment).run();
};
const insertHorizontalRule = (editor, range) => {
	if (range) editor.chain().focus().deleteRange(range).setHorizontalRule().run();
	else editor.chain().focus().setHorizontalRule().run();
};
const insertCallout = (editor, range) => {
	if (range) editor.chain().focus().deleteRange(range).insertCallout().run();
	else editor.chain().focus().insertCallout().run();
};
const openEmojiPicker = (editor, range) => {
	if (range) editor.chain().focus().deleteRange(range).run();
	const emojiStorage = editor.storage.emoji;
	emojiStorage.forceOpen = true;
	editor.chain().focus().insertContent(":").run();
};

//#endregion
//#region src/ce/extensions/core/extensions.ts
const CoreEditorAdditionalExtensions = (props) => {
	const {} = props;
	return [];
};

//#endregion
//#region src/ce/extensions/document-extensions.tsx
const extensionRegistry$1 = [{
	isEnabled: (disabledExtensions) => !disabledExtensions.includes("slash-commands"),
	getExtension: ({ disabledExtensions, flaggedExtensions }) => SlashCommands({
		disabledExtensions,
		flaggedExtensions
	})
}];
function DocumentEditorAdditionalExtensions(props) {
	const { disabledExtensions, flaggedExtensions } = props;
	return extensionRegistry$1.filter((config) => config.isEnabled(disabledExtensions, flaggedExtensions)).map((config) => config.getExtension(props));
}

//#endregion
//#region src/ce/extensions/slash-commands.tsx
const coreEditorAdditionalSlashCommandOptions = (props) => {
	const {} = props;
	return [];
};

//#endregion
//#region src/core/extensions/slash-commands/command-items-list.tsx
const getSlashCommandFilteredSections = (args) => ({ query }) => {
	const { additionalOptions: externalAdditionalOptions, disabledExtensions, flaggedExtensions } = args;
	const SLASH_COMMAND_SECTIONS = [
		{
			key: "general",
			items: [
				{
					commandKey: "text",
					key: "text",
					title: "Text",
					description: "Just start typing with plain text.",
					searchTerms: ["p", "paragraph"],
					icon: /* @__PURE__ */ jsx(CaseSensitive, { className: "size-3.5" }),
					command: ({ editor, range }) => setText(editor, range)
				},
				{
					commandKey: "h1",
					key: "h1",
					title: "Heading 1",
					description: "Big section heading.",
					searchTerms: [
						"title",
						"big",
						"large"
					],
					icon: /* @__PURE__ */ jsx(Heading1, { className: "size-3.5" }),
					command: ({ editor, range }) => toggleHeading(editor, 1, range)
				},
				{
					commandKey: "h2",
					key: "h2",
					title: "Heading 2",
					description: "Medium section heading.",
					searchTerms: ["subtitle", "medium"],
					icon: /* @__PURE__ */ jsx(Heading2, { className: "size-3.5" }),
					command: ({ editor, range }) => toggleHeading(editor, 2, range)
				},
				{
					commandKey: "h3",
					key: "h3",
					title: "Heading 3",
					description: "Small section heading.",
					searchTerms: ["subtitle", "small"],
					icon: /* @__PURE__ */ jsx(Heading3, { className: "size-3.5" }),
					command: ({ editor, range }) => toggleHeading(editor, 3, range)
				},
				{
					commandKey: "h4",
					key: "h4",
					title: "Heading 4",
					description: "Small section heading.",
					searchTerms: ["subtitle", "small"],
					icon: /* @__PURE__ */ jsx(Heading4, { className: "size-3.5" }),
					command: ({ editor, range }) => toggleHeading(editor, 4, range)
				},
				{
					commandKey: "h5",
					key: "h5",
					title: "Heading 5",
					description: "Small section heading.",
					searchTerms: ["subtitle", "small"],
					icon: /* @__PURE__ */ jsx(Heading5, { className: "size-3.5" }),
					command: ({ editor, range }) => toggleHeading(editor, 5, range)
				},
				{
					commandKey: "h6",
					key: "h6",
					title: "Heading 6",
					description: "Small section heading.",
					searchTerms: ["subtitle", "small"],
					icon: /* @__PURE__ */ jsx(Heading6, { className: "size-3.5" }),
					command: ({ editor, range }) => toggleHeading(editor, 6, range)
				},
				{
					commandKey: "numbered-list",
					key: "numbered-list",
					title: "Numbered list",
					description: "Create a numbered list.",
					searchTerms: ["ordered"],
					icon: /* @__PURE__ */ jsx(ListOrdered, { className: "size-3.5" }),
					command: ({ editor, range }) => toggleOrderedList(editor, range)
				},
				{
					commandKey: "bulleted-list",
					key: "bulleted-list",
					title: "Bulleted list",
					description: "Create a bulleted list.",
					searchTerms: ["unordered", "point"],
					icon: /* @__PURE__ */ jsx(List, { className: "size-3.5" }),
					command: ({ editor, range }) => toggleBulletList(editor, range)
				},
				{
					commandKey: "to-do-list",
					key: "to-do-list",
					title: "To-do list",
					description: "Create a to-do list.",
					searchTerms: [
						"todo",
						"task",
						"list",
						"check",
						"checkbox"
					],
					icon: /* @__PURE__ */ jsx(ListTodo, { className: "size-3.5" }),
					command: ({ editor, range }) => toggleTaskList(editor, range)
				},
				{
					commandKey: "table",
					key: "table",
					title: "Table",
					description: "Create a table",
					searchTerms: [
						"table",
						"cell",
						"db",
						"data",
						"tabular"
					],
					icon: /* @__PURE__ */ jsx(Table, { className: "size-3.5" }),
					command: ({ editor, range }) => insertTableCommand(editor, range)
				},
				{
					commandKey: "quote",
					key: "quote",
					title: "Quote",
					description: "Capture a quote.",
					searchTerms: ["blockquote"],
					icon: /* @__PURE__ */ jsx(TextQuote, { className: "size-3.5" }),
					command: ({ editor, range }) => toggleBlockquote(editor, range)
				},
				{
					commandKey: "code",
					key: "code",
					title: "Code",
					description: "Capture a code snippet.",
					searchTerms: ["codeblock"],
					icon: /* @__PURE__ */ jsx(Code2, { className: "size-3.5" }),
					command: ({ editor, range }) => editor.chain().focus().deleteRange(range).toggleCodeBlock().run()
				},
				{
					commandKey: "callout",
					key: "callout",
					title: "Callout",
					icon: /* @__PURE__ */ jsx(MessageSquareText, { className: "size-3.5" }),
					description: "Insert callout",
					searchTerms: [
						"callout",
						"comment",
						"message",
						"info",
						"alert"
					],
					command: ({ editor, range }) => insertCallout(editor, range)
				},
				{
					commandKey: "divider",
					key: "divider",
					title: "Divider",
					description: "Visually divide blocks.",
					searchTerms: [
						"line",
						"divider",
						"horizontal",
						"rule",
						"separate"
					],
					icon: /* @__PURE__ */ jsx(MinusSquare, { className: "size-3.5" }),
					command: ({ editor, range }) => editor.chain().focus().deleteRange(range).setHorizontalRule().run()
				},
				{
					commandKey: "emoji",
					key: "emoji",
					title: "Emoji",
					description: "Insert an emoji",
					searchTerms: [
						"emoji",
						"icons",
						"reaction",
						"emoticon",
						"emotags"
					],
					icon: /* @__PURE__ */ jsx(Smile, { className: "size-3.5" }),
					command: ({ editor, range }) => {
						openEmojiPicker(editor, range);
					}
				}
			]
		},
		{
			key: "text-colors",
			title: "Colors",
			items: [{
				commandKey: "text-color",
				key: "text-color-default",
				title: "Default",
				description: "Change text color",
				searchTerms: [
					"color",
					"text",
					"default"
				],
				icon: /* @__PURE__ */ jsx(ALargeSmall, {
					className: "size-3.5",
					style: { color: "rgba(var(--color-text-100))" }
				}),
				command: ({ editor, range }) => toggleTextColor(void 0, editor, range)
			}, ...COLORS_LIST.map((color) => ({
				commandKey: "text-color",
				key: `text-color-${color.key}`,
				title: color.label,
				description: "Change text color",
				searchTerms: [
					"color",
					"text",
					color.label
				],
				icon: /* @__PURE__ */ jsx(ALargeSmall, {
					className: "size-3.5",
					style: { color: color.textColor }
				}),
				command: ({ editor, range }) => toggleTextColor(color.key, editor, range)
			}))]
		},
		{
			key: "background-colors",
			title: "Background colors",
			items: [{
				commandKey: "background-color",
				key: "background-color-default",
				title: "Default background",
				description: "Change background color",
				searchTerms: [
					"color",
					"bg",
					"background",
					"default"
				],
				icon: /* @__PURE__ */ jsx(ALargeSmall, { className: "size-3.5" }),
				iconContainerStyle: {
					borderRadius: "4px",
					backgroundColor: "rgba(var(--color-background-100))",
					border: "1px solid rgba(var(--color-border-300))"
				},
				command: ({ editor, range }) => toggleTextColor(void 0, editor, range)
			}, ...COLORS_LIST.map((color) => ({
				commandKey: "background-color",
				key: `background-color-${color.key}`,
				title: color.label,
				description: "Change background color",
				searchTerms: [
					"color",
					"bg",
					"background",
					color.label
				],
				icon: /* @__PURE__ */ jsx(ALargeSmall, { className: "size-3.5" }),
				iconContainerStyle: {
					borderRadius: "4px",
					backgroundColor: color.backgroundColor
				},
				command: ({ editor, range }) => toggleBackgroundColor(color.key, editor, range)
			}))]
		}
	];
	const internalAdditionalOptions = [];
	if (!disabledExtensions?.includes("image")) internalAdditionalOptions.push({
		commandKey: "image",
		key: "image",
		title: "Image",
		icon: /* @__PURE__ */ jsx(ImageIcon, { className: "size-3.5" }),
		description: "Insert an image",
		searchTerms: [
			"img",
			"photo",
			"picture",
			"media",
			"upload"
		],
		command: ({ editor, range }) => insertImage({
			editor,
			event: "insert",
			range
		}),
		section: "general",
		pushAfter: "code"
	});
	[
		...internalAdditionalOptions,
		...externalAdditionalOptions ?? [],
		...coreEditorAdditionalSlashCommandOptions({
			disabledExtensions,
			flaggedExtensions
		})
	]?.forEach((item) => {
		const sectionToPushTo = SLASH_COMMAND_SECTIONS.find((s) => s.key === item.section) ?? SLASH_COMMAND_SECTIONS[0];
		const itemIndexToPushAfter = sectionToPushTo.items.findIndex((i) => i.commandKey === item.pushAfter);
		if (itemIndexToPushAfter !== -1) sectionToPushTo.items.splice(itemIndexToPushAfter + 1, 0, item);
		else sectionToPushTo.items.push(item);
	});
	return SLASH_COMMAND_SECTIONS.map((section) => ({
		...section,
		items: section.items.filter((item) => {
			if (typeof query !== "string") return;
			const lowercaseQuery = query.toLowerCase();
			return item.title.toLowerCase().includes(lowercaseQuery) || item.description.toLowerCase().includes(lowercaseQuery) || item.searchTerms.some((t) => t.includes(lowercaseQuery));
		})
	})).filter((s) => s.items.length !== 0);
};

//#endregion
//#region src/core/extensions/slash-commands/command-menu-item.tsx
const highlightMatch = (text, query) => {
	if (!query || query.trim() === "") return text;
	const queryLower = query.toLowerCase().trim();
	const index = text.toLowerCase().indexOf(queryLower);
	if (index >= 0) {
		const before = text.substring(0, index);
		const match = text.substring(index, index + queryLower.length);
		const after = text.substring(index + queryLower.length);
		return /* @__PURE__ */ jsxs(Fragment, { children: [
			before,
			/* @__PURE__ */ jsx("span", {
				className: "font-medium text-custom-text-100",
				children: match
			}),
			after
		] });
	}
	return text;
};
function CommandMenuItem(props) {
	const { isSelected, item, itemIndex, onClick, onMouseEnter, sectionIndex, query } = props;
	return /* @__PURE__ */ jsxs("button", {
		type: "button",
		id: `item-${sectionIndex}-${itemIndex}`,
		className: cn("flex items-center gap-2 w-full rounded px-1 py-1.5 text-sm text-left truncate text-custom-text-200", { "bg-custom-background-80": isSelected }),
		onClick,
		onMouseEnter,
		children: [
			/* @__PURE__ */ jsx("span", {
				className: "size-5 grid place-items-center flex-shrink-0",
				style: item.iconContainerStyle,
				children: item.icon
			}),
			/* @__PURE__ */ jsx("p", {
				className: "flex-grow truncate",
				children: query ? highlightMatch(item.title, query) : item.title
			}),
			item.badge
		]
	});
}

//#endregion
//#region src/core/extensions/slash-commands/command-menu.tsx
const SlashCommandsMenu = forwardRef(function SlashCommandsMenu$1(props, ref) {
	const { items: sections, command, query, onClose } = props;
	const [selectedIndex, setSelectedIndex] = useState({
		section: 0,
		item: 0
	});
	const commandListContainer = useRef(null);
	const selectItem = useCallback((sectionIndex, itemIndex) => {
		const item = sections[sectionIndex]?.items?.[itemIndex];
		if (item) command(item);
	}, [command, sections]);
	useEffect(() => {
		const onKeyDown = (e) => {
			if (DROPDOWN_NAVIGATION_KEYS.includes(e.key)) {
				e.preventDefault();
				const currentSection = selectedIndex.section;
				const currentItem = selectedIndex.item;
				let nextSection = currentSection;
				let nextItem = currentItem;
				if (e.key === "ArrowUp") {
					nextItem = currentItem - 1;
					if (nextItem < 0) {
						nextSection = currentSection - 1;
						if (nextSection < 0) nextSection = sections.length - 1;
						nextItem = sections[nextSection]?.items?.length - 1;
					}
				}
				if (e.key === "ArrowDown") {
					nextItem = currentItem + 1;
					if (nextItem >= sections[currentSection]?.items?.length) {
						nextSection = currentSection + 1;
						if (nextSection >= sections.length) nextSection = 0;
						nextItem = 0;
					}
				}
				if (e.key === "Enter") selectItem(currentSection, currentItem);
				setSelectedIndex({
					section: nextSection,
					item: nextItem
				});
			}
		};
		document.addEventListener("keydown", onKeyDown);
		return () => {
			document.removeEventListener("keydown", onKeyDown);
		};
	}, [
		sections,
		selectedIndex,
		setSelectedIndex,
		selectItem
	]);
	useEffect(() => {
		setSelectedIndex({
			section: 0,
			item: 0
		});
	}, [sections]);
	useLayoutEffect(() => {
		const container = commandListContainer?.current;
		if (!container) return;
		container.querySelector(`#item-${selectedIndex.section}-${selectedIndex.item}`)?.scrollIntoView({ block: "nearest" });
	}, [sections, selectedIndex]);
	useImperativeHandle(ref, () => ({ onKeyDown: ({ event }) => {
		if (!DROPDOWN_NAVIGATION_KEYS.includes(event.key)) return false;
		if (event.key === "Enter") {
			selectItem(selectedIndex.section, selectedIndex.item);
			return true;
		}
		const newIndex = getNextValidIndex({
			event,
			sections,
			selectedIndex
		});
		if (newIndex) setSelectedIndex(newIndex);
		return true;
	} }));
	useOutsideClickDetector(commandListContainer, onClose);
	if (sections.map((s) => s.items?.length).reduce((acc, curr) => acc + curr, 0) === 0) return null;
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(FloatingOverlay, {
		style: { zIndex: 99 },
		lockScroll: true
	}), /* @__PURE__ */ jsx("div", {
		id: "slash-command",
		ref: commandListContainer,
		className: "relative max-h-80 min-w-[12rem] overflow-y-auto rounded-md border-[0.5px] border-custom-border-300 bg-custom-background-100 px-2 py-2.5 shadow-custom-shadow-rg space-y-2",
		style: { zIndex: 100 },
		onClick: (e) => {
			e.stopPropagation();
		},
		onMouseDown: (e) => {
			e.stopPropagation();
		},
		children: sections.map((section, sectionIndex) => /* @__PURE__ */ jsxs("div", {
			className: "space-y-2",
			children: [section.title && /* @__PURE__ */ jsx("h6", {
				className: "text-xs font-semibold text-custom-text-300",
				children: section.title
			}), /* @__PURE__ */ jsx("div", { children: section.items?.map((item, itemIndex) => /* @__PURE__ */ jsx(CommandMenuItem, {
				isSelected: sectionIndex === selectedIndex.section && itemIndex === selectedIndex.item,
				item,
				itemIndex,
				onClick: (e) => {
					e.stopPropagation();
					selectItem(sectionIndex, itemIndex);
				},
				onMouseEnter: () => setSelectedIndex({
					section: sectionIndex,
					item: itemIndex
				}),
				sectionIndex,
				query
			}, item.key)) })]
		}, section.key))
	})] });
});
SlashCommandsMenu.displayName = "SlashCommandsMenu";

//#endregion
//#region src/core/extensions/slash-commands/root.tsx
const Command = Extension.create({
	name: CORE_EXTENSIONS.SLASH_COMMANDS,
	addOptions() {
		return { suggestion: {
			char: "/",
			command: ({ editor, range, props }) => {
				props.command({
					editor,
					range
				});
			},
			allow({ editor }) {
				const { selection } = editor.state;
				if (selection.$from.node(selection.$from.depth).type.name === CORE_EXTENSIONS.CODE_BLOCK) return false;
				return true;
			}
		} };
	},
	addProseMirrorPlugins() {
		return [Suggestion({
			editor: this.editor,
			render: () => {
				let component = null;
				let cleanup = () => {};
				let editorRef = null;
				const handleClose = (editor) => {
					component?.destroy();
					component = null;
					(editor || editorRef)?.commands.removeActiveDropbarExtension(CORE_EXTENSIONS.SLASH_COMMANDS);
					cleanup();
				};
				return {
					onStart: (props) => {
						editorRef = props.editor;
						component = new ReactRenderer(SlashCommandsMenu, {
							props: {
								...props,
								onClose: () => handleClose(props.editor)
							},
							editor: props.editor,
							className: "fixed z-[100]"
						});
						if (!props.clientRect) return;
						props.editor.commands.addActiveDropbarExtension(CORE_EXTENSIONS.SLASH_COMMANDS);
						const element = component.element;
						cleanup = updateFloatingUIFloaterPosition(props.editor, element).cleanup;
					},
					onUpdate: (props) => {
						if (!component || !component.element) return;
						component.updateProps(props);
						if (!props.clientRect) return;
						const element = component.element;
						cleanup();
						cleanup = updateFloatingUIFloaterPosition(props.editor, element).cleanup;
					},
					onKeyDown: ({ event }) => {
						if ([...DROPDOWN_NAVIGATION_KEYS, "Escape"].includes(event.key)) {
							event.preventDefault();
							event.stopPropagation();
						}
						if (event.key === "Escape") {
							handleClose(this.editor);
							return true;
						}
						return component?.ref?.onKeyDown({ event }) ?? false;
					},
					onExit: ({ editor }) => {
						component?.element.remove();
						handleClose(editor);
					}
				};
			},
			...this.options.suggestion
		})];
	}
});
function SlashCommands(props) {
	return Command.configure({ suggestion: { items: getSlashCommandFilteredSections(props) } });
}

//#endregion
//#region src/core/extensions/typography/inputRules.ts
const emDash = (override) => textInputRule({
	find: /--$/,
	replace: override ?? "—"
});
const impliesArrowRight = (override) => textInputRule({
	find: /=>$/,
	replace: override ?? "⇒"
});
const leftArrow = (override) => textInputRule({
	find: /<-$/,
	replace: override ?? "←"
});
const rightArrow = (override) => textInputRule({
	find: /->$/,
	replace: override ?? "→"
});
const ellipsis = (override) => textInputRule({
	find: /\.\.\.$/,
	replace: override ?? "…"
});
const copyright = (override) => textInputRule({
	find: /\(c\)$/,
	replace: override ?? "©"
});
const trademark = (override) => textInputRule({
	find: /\(tm\)$/,
	replace: override ?? "™"
});
const servicemark = (override) => textInputRule({
	find: /\(sm\)$/,
	replace: override ?? "℠"
});
const registeredTrademark = (override) => textInputRule({
	find: /\(r\)$/,
	replace: override ?? "®"
});
const oneHalf = (override) => textInputRule({
	find: /(?:^|\s)(1\/2)\s$/,
	replace: override ?? "½"
});
const plusMinus = (override) => textInputRule({
	find: /\+\/-$/,
	replace: override ?? "±"
});
const notEqual = (override) => textInputRule({
	find: /!=$/,
	replace: override ?? "≠"
});
const laquo = (override) => textInputRule({
	find: /<<$/,
	replace: override ?? "«"
});
const raquo = (override) => textInputRule({
	find: />>$/,
	replace: override ?? "»"
});
const multiplication = (override) => textInputRule({
	find: /\d+\s?([*x])\s?\d+$/,
	replace: override ?? "×"
});
const superscriptTwo = (override) => textInputRule({
	find: /\^2$/,
	replace: override ?? "²"
});
const superscriptThree = (override) => textInputRule({
	find: /\^3$/,
	replace: override ?? "³"
});
const oneQuarter = (override) => textInputRule({
	find: /(?:^|\s)(1\/4)\s$/,
	replace: override ?? "¼"
});
const threeQuarters = (override) => textInputRule({
	find: /(?:^|\s)(3\/4)\s$/,
	replace: override ?? "¾"
});

//#endregion
//#region src/core/extensions/typography/index.ts
const CustomTypographyExtension = Extension.create({
	name: CORE_EXTENSIONS.TYPOGRAPHY,
	addInputRules() {
		const rules = [];
		if (this.options.emDash !== false) rules.push(emDash(this.options.emDash));
		if (this.options.impliesArrowRight !== false) rules.push(impliesArrowRight(this.options.impliesArrowRight));
		if (this.options.ellipsis !== false) rules.push(ellipsis(this.options.ellipsis));
		if (this.options.leftArrow !== false) rules.push(leftArrow(this.options.leftArrow));
		if (this.options.rightArrow !== false) rules.push(rightArrow(this.options.rightArrow));
		if (this.options.copyright !== false) rules.push(copyright(this.options.copyright));
		if (this.options.trademark !== false) rules.push(trademark(this.options.trademark));
		if (this.options.servicemark !== false) rules.push(servicemark(this.options.servicemark));
		if (this.options.registeredTrademark !== false) rules.push(registeredTrademark(this.options.registeredTrademark));
		if (this.options.oneHalf !== false) rules.push(oneHalf(this.options.oneHalf));
		if (this.options.plusMinus !== false) rules.push(plusMinus(this.options.plusMinus));
		if (this.options.notEqual !== false) rules.push(notEqual(this.options.notEqual));
		if (this.options.laquo !== false) rules.push(laquo(this.options.laquo));
		if (this.options.raquo !== false) rules.push(raquo(this.options.raquo));
		if (this.options.multiplication !== false) rules.push(multiplication(this.options.multiplication));
		if (this.options.superscriptTwo !== false) rules.push(superscriptTwo(this.options.superscriptTwo));
		if (this.options.superscriptThree !== false) rules.push(superscriptThree(this.options.superscriptThree));
		if (this.options.oneQuarter !== false) rules.push(oneQuarter(this.options.oneQuarter));
		if (this.options.threeQuarters !== false) rules.push(threeQuarters(this.options.threeQuarters));
		return rules;
	}
});

//#endregion
//#region src/core/extensions/enter-key.ts
const EnterKeyExtension = (onEnterKeyPress) => Extension.create({
	name: CORE_EXTENSIONS.ENTER_KEY,
	addKeyboardShortcuts() {
		return {
			Enter: () => {
				const { activeDropbarExtensions } = this.editor.storage.utility;
				if (activeDropbarExtensions.length === 0) {
					onEnterKeyPress?.();
					return true;
				}
				return false;
			},
			"Shift-Enter": ({ editor }) => editor.commands.first(({ commands }) => [
				() => commands.newlineInCode(),
				() => commands.splitListItem(CORE_EXTENSIONS.LIST_ITEM),
				() => commands.splitListItem(CORE_EXTENSIONS.TASK_ITEM),
				() => commands.createParagraphNear(),
				() => commands.liftEmptyBlock(),
				() => commands.splitBlock()
			])
		};
	}
});

//#endregion
//#region src/core/extensions/custom-image/extension.tsx
function CustomImageExtension(props) {
	const { fileHandler, isEditable } = props;
	const { getAssetSrc, getAssetDownloadSrc, restore: restoreImageFn } = fileHandler;
	return CustomImageExtensionConfig.extend({
		selectable: isEditable,
		draggable: isEditable,
		addOptions() {
			const upload = "upload" in fileHandler ? fileHandler.upload : void 0;
			const duplicate = "duplicate" in fileHandler ? fileHandler.duplicate : void 0;
			return {
				...this.parent?.(),
				getImageDownloadSource: getAssetDownloadSrc,
				getImageSource: getAssetSrc,
				restoreImage: restoreImageFn,
				uploadImage: upload,
				duplicateImage: duplicate
			};
		},
		addStorage() {
			const maxFileSize = "validation" in fileHandler ? fileHandler.validation?.maxFileSize : 0;
			return {
				fileMap: /* @__PURE__ */ new Map(),
				deletedImageSet: /* @__PURE__ */ new Map(),
				maxFileSize,
				markdown: { serialize() {} }
			};
		},
		addCommands() {
			return { insertImageComponent: (props$1) => ({ commands }) => {
				if (props$1?.file && !isFileValid({
					acceptedMimeTypes: ACCEPTED_IMAGE_MIME_TYPES,
					file: props$1.file,
					maxFileSize: this.storage.maxFileSize,
					onError: (_error, message) => alert(message)
				})) return false;
				const fileId = v4();
				const imageComponentImageFileMap = getImageComponentImageFileMap(this.editor);
				if (imageComponentImageFileMap) {
					if (props$1?.event === "drop" && props$1.file) imageComponentImageFileMap.set(fileId, {
						file: props$1.file,
						event: props$1.event
					});
					else if (props$1.event === "insert") imageComponentImageFileMap.set(fileId, {
						event: props$1.event,
						hasOpenedFileInputOnce: false
					});
				}
				const attributes = {
					[ECustomImageAttributeNames.ID]: fileId,
					[ECustomImageAttributeNames.STATUS]: ECustomImageStatus.PENDING
				};
				if (props$1.pos) return commands.insertContentAt(props$1.pos, {
					type: this.name,
					attrs: attributes
				});
				return commands.insertContent({
					type: this.name,
					attrs: attributes
				});
			} };
		},
		addKeyboardShortcuts() {
			return {
				ArrowDown: insertEmptyParagraphAtNodeBoundaries("down", this.name),
				ArrowUp: insertEmptyParagraphAtNodeBoundaries("up", this.name)
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
//#region src/core/extensions/placeholder.ts
const CustomPlaceholderExtension = (args) => {
	const { placeholder, showPlaceholderOnEmpty = false } = args;
	return Placeholder.configure({
		placeholder: ({ editor, node }) => {
			if (!editor.isEditable) return "";
			if (node.type.name === CORE_EXTENSIONS.HEADING) return `Heading ${node.attrs.level}`;
			if (editor.storage.utility?.uploadInProgress) return "";
			if (editor.isActive(CORE_EXTENSIONS.TABLE) || editor.isActive(CORE_EXTENSIONS.CODE_BLOCK) || editor.isActive(CORE_EXTENSIONS.IMAGE) || editor.isActive(CORE_EXTENSIONS.CUSTOM_IMAGE)) return "";
			if (showPlaceholderOnEmpty) {
				if (!(editor.state.doc.textContent.length === 0)) return "";
			}
			if (placeholder) if (typeof placeholder === "string") return placeholder;
			else return placeholder(editor.isFocused, editor.getHTML());
			return "Press '/' for commands...";
		},
		includeChildren: true
	});
};

//#endregion
//#region src/ce/constants/extensions.ts
let ADDITIONAL_EXTENSIONS = /* @__PURE__ */ function(ADDITIONAL_EXTENSIONS$1) {
	return ADDITIONAL_EXTENSIONS$1;
}({});
const ADDITIONAL_BLOCK_NODE_TYPES = [];

//#endregion
//#region src/core/extensions/unique-id/utils.ts
/**
* Utility function to create IDs for nodes that don't have them
*/
const createIdsForView = (view, options) => {
	const { state } = view;
	const { tr, doc } = state;
	const { types, attributeName, generateUniqueID } = options;
	if (!(doc.content.size > 2)) return;
	findChildren(doc, (node) => types.includes(node.type.name) && node.attrs[attributeName] === null).forEach(({ node, pos }) => {
		tr.setNodeMarkup(pos, void 0, {
			...node.attrs,
			[attributeName]: generateUniqueID({
				node,
				pos
			})
		});
	});
	tr.setMeta("addToHistory", false);
	tr.setMeta("uniqueIdOnlyChange", true);
	view.dispatch(tr);
};

//#endregion
//#region src/core/extensions/unique-id/plugin.ts
const createUniqueIDPlugin = (options) => {
	let dragSourceElement = null;
	let transformPasted = false;
	let syncHandler = null;
	return new Plugin({
		key: new PluginKey("uniqueID"),
		appendTransaction: (transactions, oldState, newState) => {
			const hasDocChanges = transactions.some((transaction) => transaction.docChanged) && !oldState.doc.eq(newState.doc);
			const filterTransactions = options.filterTransaction && transactions.some((tr$1) => !options.filterTransaction?.(tr$1));
			if (transactions.find((tr$1) => tr$1.getMeta("y-sync$"))) return;
			if (!hasDocChanges || filterTransactions) return;
			const { tr } = newState;
			const { types, attributeName, generateUniqueID } = options;
			const transform = combineTransactionSteps(oldState.doc, transactions);
			const { mapping } = transform;
			const changes = getChangedRanges(transform);
			const allNodesInDoc = [];
			newState.doc.descendants((node, pos) => {
				if (types.includes(node.type.name)) allNodesInDoc.push({
					node,
					pos
				});
			});
			const duplicatedIds = findDuplicates(allNodesInDoc.map(({ node }) => node.attrs[attributeName]).filter((id) => id !== null));
			changes.forEach(({ newRange }) => {
				findChildrenInRange(newState.doc, newRange, (node) => types.includes(node.type.name)).forEach(({ node, pos }) => {
					const id = tr.doc.nodeAt(pos)?.attrs[attributeName];
					if (id === null) {
						tr.setNodeMarkup(pos, void 0, {
							...node.attrs,
							[attributeName]: generateUniqueID({
								node,
								pos
							})
						});
						return;
					}
					const { deleted } = mapping.invert().mapResult(pos);
					if (deleted && duplicatedIds.includes(id)) tr.setNodeMarkup(pos, void 0, {
						...node.attrs,
						[attributeName]: generateUniqueID({
							node,
							pos
						})
					});
				});
			});
			if (!tr.steps.length) return;
			tr.setStoredMarks(newState.tr.storedMarks);
			return tr;
		},
		view(view) {
			const handleDragstart = (event) => {
				dragSourceElement = view.dom.parentElement?.contains(event.target) ? view.dom.parentElement : null;
			};
			window.addEventListener("dragstart", handleDragstart);
			const provider = options.provider;
			if (provider && !provider.isSynced) {
				syncHandler = () => {
					createIdsForView(view, options);
					if (provider && syncHandler) {
						provider.off("synced", syncHandler);
						syncHandler = null;
					}
				};
				provider.on("synced", syncHandler);
			}
			return { destroy() {
				window.removeEventListener("dragstart", handleDragstart);
				if (provider && syncHandler) {
					provider.off("synced", syncHandler);
					syncHandler = null;
				}
			} };
		},
		props: {
			handleDOMEvents: {
				drop: (view, event) => {
					if (dragSourceElement !== view.dom.parentElement || event.dataTransfer?.effectAllowed === "copy") {
						dragSourceElement = null;
						transformPasted = true;
					}
					return false;
				},
				paste: () => {
					transformPasted = true;
					return false;
				}
			},
			transformPasted: (slice) => {
				if (!transformPasted) return slice;
				const { types, attributeName } = options;
				const removeId = (fragment) => {
					const list = [];
					fragment.forEach((node) => {
						if (node.isText) {
							list.push(node);
							return;
						}
						if (!types.includes(node.type.name)) {
							list.push(node.copy(removeId(node.content)));
							return;
						}
						const nodeWithoutId = node.type.create({
							...node.attrs,
							[attributeName]: null
						}, removeId(node.content), node.marks);
						list.push(nodeWithoutId);
					});
					return Fragment$1.from(list);
				};
				transformPasted = false;
				return new Slice(removeId(slice.content), slice.openStart, slice.openEnd);
			}
		}
	});
};

//#endregion
//#region src/core/extensions/unique-id/extension.ts
const COMBINED_BLOCK_NODE_TYPES = [...BLOCK_NODE_TYPES, ...ADDITIONAL_BLOCK_NODE_TYPES];
const UniqueID = Extension.create({
	name: CORE_EXTENSIONS.UNIQUE_ID,
	priority: 1e4,
	addOptions() {
		return {
			attributeName: "id",
			types: COMBINED_BLOCK_NODE_TYPES,
			generateUniqueID: () => v4(),
			filterTransaction: null,
			updateDocument: true,
			provider: void 0
		};
	},
	addGlobalAttributes() {
		return [{
			types: this.options.types,
			attributes: { [this.options.attributeName]: {
				default: null,
				parseHTML: (element) => element.getAttribute(`data-${this.options.attributeName}`),
				renderHTML: (attributes) => {
					if (!attributes[this.options.attributeName]) return {};
					return { [`data-${this.options.attributeName}`]: attributes[this.options.attributeName] };
				}
			} }
		}];
	},
	onCreate() {
		if (!this.editor.isEditable) this.options.updateDocument = false;
		if (!this.options.updateDocument) return;
		const provider = this.options.provider;
		/**
		* We need to handle collaboration a bit different here
		* because we can't automatically add IDs when the provider is not yet synced
		* otherwise we end up with empty paragraphs
		*/
		if (provider) {
			if (provider.isSynced) createIdsForView(this.editor.view, this.options);
		} else createIdsForView(this.editor.view, this.options);
	},
	addProseMirrorPlugins() {
		if (!this.options.updateDocument) return [];
		return [createUniqueIDPlugin(this.options)];
	}
});

//#endregion
//#region src/core/extensions/extensions.ts
const CoreEditorExtensions = (args) => {
	const { disabledExtensions, enableHistory, fileHandler, flaggedExtensions, getEditorMetaData, isTouchDevice = false, mentionHandler, placeholder, showPlaceholderOnEmpty, tabIndex, editable, extendedEditorProps, provider } = args;
	const extensions = [
		CustomStarterKitExtension({ enableHistory }),
		EmojiExtension,
		CustomQuoteExtension,
		CustomHorizontalRule,
		CustomKeymap,
		ListKeymap({ tabIndex }),
		CustomLinkExtension,
		CustomTypographyExtension,
		Underline$1,
		TextStyle,
		TaskList.configure({ HTMLAttributes: { class: "not-prose pl-2 space-y-2" } }),
		TaskItem.configure({
			HTMLAttributes: { class: "relative" },
			nested: true
		}),
		CustomCodeBlockExtension,
		CustomCodeInlineExtension,
		Markdown.configure({
			html: true,
			transformCopiedText: false,
			transformPastedText: true,
			breaks: true
		}),
		Table$1,
		TableHeader,
		TableCell,
		TableRow,
		CustomMentionExtension(mentionHandler),
		CustomPlaceholderExtension({
			placeholder,
			showPlaceholderOnEmpty
		}),
		CharacterCount,
		CustomColorExtension,
		CustomTextAlignExtension,
		CustomCalloutExtension,
		UtilityExtension({
			disabledExtensions,
			flaggedExtensions,
			fileHandler,
			getEditorMetaData,
			isEditable: editable,
			isTouchDevice
		}),
		...CoreEditorAdditionalExtensions({
			disabledExtensions,
			flaggedExtensions,
			fileHandler,
			extendedEditorProps
		}),
		UniqueID.configure({ provider })
	];
	if (!disabledExtensions.includes("image")) extensions.push(ImageExtension({ fileHandler }), CustomImageExtension({
		fileHandler,
		isEditable: editable
	}));
	return extensions;
};

//#endregion
//#region src/core/extensions/headings-list.ts
const HeadingListExtension = Extension.create({
	name: CORE_EXTENSIONS.HEADINGS_LIST,
	addStorage() {
		return { headings: [] };
	},
	addProseMirrorPlugins() {
		return [new Plugin({
			key: new PluginKey("heading-list"),
			appendTransaction: (_, __, newState) => {
				const headings = [];
				let h1Sequence = 0;
				let h2Sequence = 0;
				let h3Sequence = 0;
				newState.doc.descendants((node) => {
					if (node.type.name === "heading") {
						const level = node.attrs.level;
						const text = node.textContent;
						headings.push({
							type: "heading",
							level,
							text,
							sequence: level === 1 ? ++h1Sequence : level === 2 ? ++h2Sequence : ++h3Sequence
						});
					}
				});
				this.storage.headings = headings;
				this.editor.emit("update", {
					editor: this.editor,
					transaction: newState.tr
				});
				return null;
			}
		})];
	},
	getHeadings() {
		return this.storage.headings;
	}
});

//#endregion
//#region src/core/extensions/keymap.ts
function autoJoin(tr, newTr, nodeTypes) {
	const ranges = [];
	for (let i = 0; i < tr.mapping.maps.length; i++) {
		const map = tr.mapping.maps[i];
		for (let j = 0; j < ranges.length; j++) ranges[j] = map.map(ranges[j]);
		map.forEach((_s, _e, from, to) => ranges.push(from, to));
	}
	const joinable = [];
	for (let i = 0; i < ranges.length; i += 2) {
		const from = ranges[i], to = ranges[i + 1];
		const $from = tr.doc.resolve(from), depth = $from.sharedDepth(to), parent = $from.node(depth);
		for (let index = $from.indexAfter(depth), pos = $from.after(depth + 1); pos <= to; ++index) {
			const after = parent.maybeChild(index);
			if (!after) break;
			if (index && joinable.indexOf(pos) == -1) {
				const before = parent.child(index - 1);
				if (before.type == after.type && nodeTypes.includes(before.type)) joinable.push(pos);
			}
			pos += after.nodeSize;
		}
	}
	let joined = false;
	joinable.sort((a, b) => a - b);
	for (let i = joinable.length - 1; i >= 0; i--) if (canJoin(tr.doc, joinable[i])) {
		newTr.join(joinable[i]);
		joined = true;
	}
	return joined;
}
const CustomKeymap = Extension.create({
	name: "customKeymap",
	addCommands() {
		return { selectTextWithinNodeBoundaries: () => ({ editor, commands }) => {
			const { state } = editor;
			const { tr } = state;
			const startNodePos = tr.selection.$from.start();
			const endNodePos = tr.selection.$to.end();
			return commands.setTextSelection({
				from: startNodePos,
				to: endNodePos
			});
		} };
	},
	addProseMirrorPlugins() {
		return [new Plugin({
			key: new PluginKey("ordered-list-merging"),
			appendTransaction(transactions, oldState, newState) {
				const newTr = newState.tr;
				const joinableNodes = [
					newState.schema.nodes[CORE_EXTENSIONS.ORDERED_LIST],
					newState.schema.nodes[CORE_EXTENSIONS.TASK_LIST],
					newState.schema.nodes[CORE_EXTENSIONS.BULLET_LIST]
				];
				let joined = false;
				for (const transaction of transactions) joined = autoJoin(transaction, newTr, joinableNodes) || joined;
				if (joined) return newTr;
			}
		})];
	},
	addKeyboardShortcuts() {
		return { "Mod-a": ({ editor }) => {
			const { state } = editor;
			const { tr } = state;
			const startSelectionPos = tr.selection.from;
			const endSelectionPos = tr.selection.to;
			const startNodePos = tr.selection.$from.start();
			const endNodePos = tr.selection.$to.end();
			if (startSelectionPos > startNodePos || endSelectionPos < endNodePos) {
				editor.chain().selectTextWithinNodeBoundaries().run();
				return true;
			} else {
				editor.commands.selectAll();
				return true;
			}
		} };
	}
});

//#endregion
//#region src/core/plugins/drag-handle.ts
const verticalEllipsisIcon = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-ellipsis-vertical\"><circle cx=\"12\" cy=\"12\" r=\"1\"/><circle cx=\"12\" cy=\"5\" r=\"1\"/><circle cx=\"12\" cy=\"19\" r=\"1\"/></svg>";
const generalSelectors = [
	"li",
	"p.editor-paragraph-block:not(:first-child)",
	".code-block",
	"blockquote",
	"h1.editor-heading-block, h2.editor-heading-block, h3.editor-heading-block, h4.editor-heading-block, h5.editor-heading-block, h6.editor-heading-block",
	"[data-type=horizontalRule]",
	"table:not(.table-drag-preview)",
	".issue-embed",
	".image-component",
	".image-upload-component",
	".editor-callout-component",
	".editor-embed-component",
	".editor-drawio-component"
].join(", ");
const maxScrollSpeed = 20;
const acceleration = .5;
const scrollParentCache = /* @__PURE__ */ new WeakMap();
function easeOutQuadAnimation(t) {
	return t * (2 - t);
}
const createDragHandleElement = () => {
	const dragHandleElement = document.createElement("button");
	dragHandleElement.type = "button";
	dragHandleElement.id = "drag-handle";
	dragHandleElement.draggable = true;
	dragHandleElement.dataset.dragHandle = "";
	dragHandleElement.classList.value = "hidden sm:flex items-center size-5 aspect-square rounded-sm cursor-grab outline-none hover:bg-custom-background-80 active:bg-custom-background-80 active:cursor-grabbing transition-[background-color,_opacity] duration-200 ease-linear";
	const iconElement1 = document.createElement("span");
	iconElement1.classList.value = "pointer-events-none text-custom-text-300";
	iconElement1.innerHTML = verticalEllipsisIcon;
	const iconElement2 = document.createElement("span");
	iconElement2.classList.value = "pointer-events-none text-custom-text-300 -ml-2.5";
	iconElement2.innerHTML = verticalEllipsisIcon;
	dragHandleElement.appendChild(iconElement1);
	dragHandleElement.appendChild(iconElement2);
	return dragHandleElement;
};
const isScrollable = (node) => {
	if (!(node instanceof HTMLElement || node instanceof SVGElement)) return false;
	const style = getComputedStyle(node);
	return ["overflow", "overflow-y"].some((propertyName) => {
		const value = style.getPropertyValue(propertyName);
		return value === "auto" || value === "scroll";
	});
};
const getScrollParent = (node) => {
	if (scrollParentCache.has(node)) return scrollParentCache.get(node);
	let currentParent = node.parentElement;
	while (currentParent) {
		if (isScrollable(currentParent)) {
			scrollParentCache.set(node, currentParent);
			return currentParent;
		}
		currentParent = currentParent.parentElement;
	}
	const result = document.scrollingElement || document.documentElement;
	scrollParentCache.set(node, result);
	return result;
};
const nodeDOMAtCoords = (coords) => {
	const elements = document.elementsFromPoint(coords.x, coords.y);
	for (const elem of elements) {
		if (elem.matches("table:not(.table-drag-preview)")) return elem;
		if (elem.matches("p:first-child") && elem.parentElement?.matches(".ProseMirror")) return elem;
		if (elem.closest("table")) continue;
		if (elem.closest(".editor-embed-component") && !elem.matches(".editor-embed-component")) continue;
		if (elem.matches(generalSelectors)) return elem;
	}
	return null;
};
const nodePosAtDOM$1 = (node, view, options) => {
	const boundingRect = node.getBoundingClientRect();
	return view.posAtCoords({
		left: boundingRect.left + 50 + options.dragHandleWidth,
		top: boundingRect.top + 1
	})?.inside;
};
const nodePosAtDOMForBlockQuotes$1 = (node, view) => {
	const boundingRect = node.getBoundingClientRect();
	return view.posAtCoords({
		left: boundingRect.left + 1,
		top: boundingRect.top + 1
	})?.inside;
};
const DragHandlePlugin = (options) => {
	let listType = "";
	let isDragging = false;
	let lastClientY = 0;
	let scrollAnimationFrame = null;
	let isDraggedOutsideWindow = false;
	let isMouseInsideWhileDragging = false;
	let currentScrollSpeed = 0;
	let dragHandleElement = null;
	function scroll() {
		if (!isDragging) {
			currentScrollSpeed = 0;
			return;
		}
		const scrollableParent = getScrollParent(dragHandleElement);
		if (!scrollableParent) return;
		const scrollRegionUp = options.scrollThreshold.up;
		const scrollRegionDown = window.innerHeight - options.scrollThreshold.down;
		let targetScrollAmount = 0;
		if (isDraggedOutsideWindow === "top") targetScrollAmount = -maxScrollSpeed * 5;
		else if (isDraggedOutsideWindow === "bottom") targetScrollAmount = maxScrollSpeed * 5;
		else if (lastClientY < scrollRegionUp) {
			const ratio = easeOutQuadAnimation((scrollRegionUp - lastClientY) / options.scrollThreshold.up);
			targetScrollAmount = -maxScrollSpeed * ratio;
		} else if (lastClientY > scrollRegionDown) targetScrollAmount = maxScrollSpeed * easeOutQuadAnimation((lastClientY - scrollRegionDown) / options.scrollThreshold.down);
		currentScrollSpeed += (targetScrollAmount - currentScrollSpeed) * acceleration;
		if (Math.abs(currentScrollSpeed) > .1) scrollableParent.scrollBy({ top: currentScrollSpeed });
		scrollAnimationFrame = requestAnimationFrame(scroll);
	}
	const handleClick = (event, view$1) => {
		handleNodeSelection(event, view$1, false, options);
	};
	const handleDragStart = (event, view$1) => {
		const { listType: listTypeFromDragStart } = handleNodeSelection(event, view$1, true, options) ?? {};
		if (listTypeFromDragStart) listType = listTypeFromDragStart;
		isDragging = true;
		lastClientY = event.clientY;
		scroll();
	};
	const handleDragEnd = (event, view$1) => {
		event.preventDefault();
		isDragging = false;
		isMouseInsideWhileDragging = false;
		if (scrollAnimationFrame) {
			cancelAnimationFrame(scrollAnimationFrame);
			scrollAnimationFrame = null;
		}
		view$1?.dom.classList.remove("dragging");
	};
	const showDragHandle = () => dragHandleElement?.classList.remove("drag-handle-hidden");
	const hideDragHandle = () => {
		if (!dragHandleElement?.classList.contains("drag-handle-hidden")) dragHandleElement?.classList.add("drag-handle-hidden");
	};
	const view = (view$1, sideMenu) => {
		dragHandleElement = createDragHandleElement();
		dragHandleElement.addEventListener("dragstart", (e) => handleDragStart(e, view$1));
		dragHandleElement.addEventListener("dragend", (e) => handleDragEnd(e, view$1));
		dragHandleElement.addEventListener("click", (e) => handleClick(e, view$1));
		dragHandleElement.addEventListener("contextmenu", (e) => handleClick(e, view$1));
		const dragOverHandler = (e) => {
			e.preventDefault();
			if (isDragging) lastClientY = e.clientY;
		};
		const mouseMoveHandler = (e) => {
			if (isMouseInsideWhileDragging) handleDragEnd(e, view$1);
		};
		const dragLeaveHandler = (e) => {
			if (e.clientY <= 0 || e.clientX <= 0 || e.clientX >= window.innerWidth || e.clientY >= window.innerHeight) {
				isMouseInsideWhileDragging = true;
				const windowMiddleY = window.innerHeight / 2;
				if (lastClientY < windowMiddleY) isDraggedOutsideWindow = "top";
				else isDraggedOutsideWindow = "bottom";
			}
		};
		const dragEnterHandler = () => {
			isDraggedOutsideWindow = false;
		};
		window.addEventListener("dragleave", dragLeaveHandler);
		window.addEventListener("dragenter", dragEnterHandler);
		document.addEventListener("dragover", dragOverHandler);
		document.addEventListener("mousemove", mouseMoveHandler);
		hideDragHandle();
		sideMenu?.appendChild(dragHandleElement);
		return { destroy: () => {
			dragHandleElement?.remove?.();
			dragHandleElement = null;
			isDragging = false;
			if (scrollAnimationFrame) {
				cancelAnimationFrame(scrollAnimationFrame);
				scrollAnimationFrame = null;
			}
			window.removeEventListener("dragleave", dragLeaveHandler);
			window.removeEventListener("dragenter", dragEnterHandler);
			document.removeEventListener("dragover", dragOverHandler);
			document.removeEventListener("mousemove", mouseMoveHandler);
		} };
	};
	return {
		view,
		domEvents: {
			mousemove: () => showDragHandle(),
			dragenter: (view$1) => {
				view$1.dom.classList.add("dragging");
				hideDragHandle();
			},
			drop: (view$1, event) => {
				view$1.dom.classList.remove("dragging");
				hideDragHandle();
				let droppedNode = null;
				const dropPos = view$1.posAtCoords({
					left: event.clientX,
					top: event.clientY
				});
				if (!dropPos) return;
				if (view$1.state.selection instanceof NodeSelection) droppedNode = view$1.state.selection.node;
				if (!droppedNode) return;
				const resolvedPos = view$1.state.doc.resolve(dropPos.pos);
				let isDroppedInsideList = false;
				let dropDepth = 0;
				for (let i = resolvedPos.depth; i > 0; i--) if (resolvedPos.node(i).type.name === CORE_EXTENSIONS.LIST_ITEM) {
					isDroppedInsideList = true;
					dropDepth = i;
					break;
				}
				if (droppedNode.type.name === CORE_EXTENSIONS.LIST_ITEM) {
					let slice = view$1.state.selection.content();
					let newFragment = slice.content;
					if (!isDroppedInsideList || dropDepth !== resolvedPos.depth) newFragment = flattenListStructure(newFragment, view$1.state.schema);
					if (!isDroppedInsideList) {
						const listNodeType = listType === "OL" ? view$1.state.schema.nodes.orderedList : view$1.state.schema.nodes.bulletList;
						newFragment = Fragment$1.from(listNodeType.create(null, newFragment));
					}
					slice = new Slice(newFragment, slice.openStart, slice.openEnd);
					view$1.dragging = {
						slice,
						move: event.ctrlKey
					};
				}
			},
			dragend: (view$1) => {
				view$1.dom.classList.remove("dragging");
			}
		}
	};
};
function flattenListStructure(fragment, schema) {
	const result = [];
	fragment.forEach((node) => {
		if (node.type === schema.nodes.listItem || node.type === schema.nodes.taskItem) {
			result.push(node);
			if (node.content.firstChild && (node.content.firstChild.type === schema.nodes.bulletList || node.content.firstChild.type === schema.nodes.orderedList)) {
				const subList = node.content.firstChild;
				flattenListStructure(subList.content, schema).forEach((subNode) => result.push(subNode));
			}
		}
	});
	return Fragment$1.from(result);
}
const handleNodeSelection = (event, view, isDragStart, options) => {
	let listType = "";
	view.focus();
	const node = nodeDOMAtCoords({
		x: event.clientX + 50 + options.dragHandleWidth,
		y: event.clientY
	});
	if (!(node instanceof Element)) return;
	let draggedNodePos = nodePosAtDOM$1(node, view, options);
	if (draggedNodePos == null || draggedNodePos < 0) return;
	if (node.matches("table")) draggedNodePos = draggedNodePos - 2;
	else if (node.matches("blockquote")) {
		draggedNodePos = nodePosAtDOMForBlockQuotes$1(node, view);
		if (draggedNodePos === null || draggedNodePos === void 0) return;
	} else {
		const $pos = view.state.doc.resolve(draggedNodePos);
		if ([CORE_EXTENSIONS.LIST_ITEM, CORE_EXTENSIONS.TASK_ITEM].includes($pos.parent.type.name) && $pos.depth > 1) draggedNodePos = $pos.before($pos.depth);
	}
	const docSize = view.state.doc.content.size;
	draggedNodePos = Math.max(0, Math.min(draggedNodePos, docSize));
	const nodeSelection = NodeSelection.create(view.state.doc, draggedNodePos);
	view.dispatch(view.state.tr.setSelection(nodeSelection));
	if (isDragStart) {
		if (event instanceof DragEvent && !event.dataTransfer) return;
		if ([CORE_EXTENSIONS.LIST_ITEM, CORE_EXTENSIONS.TASK_ITEM].includes(nodeSelection.node.type.name)) listType = node.closest("ol, ul")?.tagName || "";
		const slice = view.state.selection.content();
		const { dom, text } = view.serializeForClipboard(slice);
		if (event instanceof DragEvent && event.dataTransfer) {
			event.dataTransfer.clearData();
			event.dataTransfer.setData("text/html", dom.innerHTML);
			event.dataTransfer.setData("text/plain", text);
			event.dataTransfer.effectAllowed = "copyMove";
			event.dataTransfer.setDragImage(node, 0, 0);
		}
		view.dragging = {
			slice,
			move: event.ctrlKey
		};
	}
	return { listType };
};

//#endregion
//#region src/core/plugins/ai-handle.ts
const sparklesIcon = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-sparkles\"><path d=\"M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z\"/><path d=\"M20 3v4\"/><path d=\"M22 5h-4\"/><path d=\"M4 17v2\"/><path d=\"M5 18H3\"/></svg>";
const nodePosAtDOM = (node, view, options) => {
	const boundingRect = node.getBoundingClientRect();
	return view.posAtCoords({
		left: boundingRect.left + 50 + options.dragHandleWidth,
		top: boundingRect.top + 1
	})?.inside;
};
const nodePosAtDOMForBlockQuotes = (node, view) => {
	const boundingRect = node.getBoundingClientRect();
	return view.posAtCoords({
		left: boundingRect.left + 1,
		top: boundingRect.top + 1
	})?.inside;
};
const calcNodePos = (pos, view, node) => {
	const maxPos = view.state.doc.content.size;
	const safePos = Math.max(0, Math.min(pos, maxPos));
	const $pos = view.state.doc.resolve(safePos);
	if ($pos.depth > 1) {
		if (node.matches("ul li, ol li")) {
			const newPos = $pos.before($pos.depth);
			return Math.max(0, Math.min(newPos, maxPos));
		}
	}
	return safePos;
};
const AIHandlePlugin = (options) => {
	let aiHandleElement = null;
	const handleClick = (event, view$1) => {
		view$1.focus();
		const node = nodeDOMAtCoords({
			x: event.clientX + 50 + options.dragHandleWidth,
			y: event.clientY
		});
		if (!(node instanceof Element)) return;
		if (node.matches("blockquote")) {
			let nodePosForBlockQuotes = nodePosAtDOMForBlockQuotes(node, view$1);
			if (nodePosForBlockQuotes === null || nodePosForBlockQuotes === void 0) return;
			const docSize = view$1.state.doc.content.size;
			nodePosForBlockQuotes = Math.max(0, Math.min(nodePosForBlockQuotes, docSize));
			if (nodePosForBlockQuotes >= 0 && nodePosForBlockQuotes <= docSize) {
				const nodeSelection$1 = NodeSelection.create(view$1.state.doc, nodePosForBlockQuotes);
				view$1.dispatch(view$1.state.tr.setSelection(nodeSelection$1));
			}
			return;
		}
		let nodePos = nodePosAtDOM(node, view$1, options);
		if (nodePos === null || nodePos === void 0) return;
		nodePos = calcNodePos(nodePos, view$1, node);
		const nodeSelection = NodeSelection.create(view$1.state.doc, nodePos);
		view$1.dispatch(view$1.state.tr.setSelection(nodeSelection));
	};
	const view = (view$1, sideMenu) => {
		const className = "grid place-items-center font-medium size-5 aspect-square text-xs text-custom-text-300 hover:bg-custom-background-80 rounded-sm opacity-100 !outline-none z-[5] transition-[background-color,_opacity] duration-200 ease-linear";
		aiHandleElement = document.createElement("button");
		aiHandleElement.type = "button";
		aiHandleElement.id = "ai-handle";
		aiHandleElement.classList.value = className;
		const iconElement = document.createElement("span");
		iconElement.classList.value = "pointer-events-none";
		iconElement.innerHTML = sparklesIcon;
		aiHandleElement.appendChild(iconElement);
		aiHandleElement.addEventListener("click", (e) => handleClick(e, view$1));
		sideMenu?.appendChild(aiHandleElement);
		return { destroy: () => {
			aiHandleElement?.remove();
			aiHandleElement = null;
		} };
	};
	return {
		view,
		domEvents: {}
	};
};

//#endregion
//#region src/core/extensions/side-menu.ts
const SideMenuExtension = (props) => {
	const { aiEnabled, dragDropEnabled } = props;
	return Extension.create({
		name: CORE_EXTENSIONS.SIDE_MENU,
		addProseMirrorPlugins() {
			return [SideMenu({
				dragHandleWidth: 24,
				handlesConfig: {
					ai: aiEnabled,
					dragDrop: dragDropEnabled
				},
				scrollThreshold: {
					up: 200,
					down: 150
				}
			})];
		}
	});
};
const absoluteRect = (node) => {
	const data = node.getBoundingClientRect();
	return {
		top: data.top,
		left: data.left,
		width: data.width
	};
};
const SideMenu = (options) => {
	const { handlesConfig } = options;
	const editorSideMenu = document.createElement("div");
	editorSideMenu.id = "editor-side-menu";
	const hideSideMenu = () => {
		if (!editorSideMenu?.classList.contains("side-menu-hidden")) editorSideMenu?.classList.add("side-menu-hidden");
	};
	const showSideMenu = () => editorSideMenu?.classList.remove("side-menu-hidden");
	const { view: dragHandleView, domEvents: dragHandleDOMEvents } = DragHandlePlugin(options);
	const { view: aiHandleView, domEvents: aiHandleDOMEvents } = AIHandlePlugin(options);
	return new Plugin({
		key: new PluginKey("sideMenu"),
		view: (view) => {
			hideSideMenu();
			view?.dom.parentElement?.appendChild(editorSideMenu);
			if (handlesConfig.ai && !editorSideMenu.querySelector("#ai-handle")) aiHandleView(view, editorSideMenu);
			if (handlesConfig.dragDrop && !editorSideMenu.querySelector("#drag-handle")) dragHandleView(view, editorSideMenu);
			return { destroy: () => hideSideMenu() };
		},
		props: { handleDOMEvents: {
			mousemove: (view, event) => {
				if (!view.editable) return;
				const node = nodeDOMAtCoords({
					x: event.clientX + 50 + options.dragHandleWidth,
					y: event.clientY
				});
				if (!(node instanceof Element) || node.matches("ul, ol")) {
					hideSideMenu();
					return;
				}
				const compStyle = window.getComputedStyle(node);
				const lineHeight = parseInt(compStyle.lineHeight, 10);
				const paddingTop = parseInt(compStyle.paddingTop, 10);
				const rect = absoluteRect(node);
				rect.top += (lineHeight - 20) / 2;
				rect.top += paddingTop;
				if (handlesConfig.ai) rect.left -= 20;
				if (node.parentElement?.parentElement?.matches("td") || node.parentElement?.parentElement?.matches("th")) {
					if (node.matches("ul:not([data-type=taskList]) li, ol li")) rect.left -= 5;
				} else if (node.matches("ul:not([data-type=taskList]) li, ol li")) rect.left -= 18;
				if (node.matches("table")) {
					rect.top += 8;
					rect.left -= 8;
				}
				rect.width = options.dragHandleWidth;
				if (!editorSideMenu) return;
				editorSideMenu.style.left = `${rect.left - rect.width}px`;
				editorSideMenu.style.top = `${rect.top}px`;
				showSideMenu();
				if (handlesConfig.dragDrop) dragHandleDOMEvents?.mousemove();
				if (handlesConfig.ai) aiHandleDOMEvents?.mousemove?.();
			},
			mousewheel: () => hideSideMenu(),
			dragenter: (view) => {
				if (handlesConfig.dragDrop) dragHandleDOMEvents?.dragenter?.(view);
			},
			drop: (view, event) => {
				if (handlesConfig.dragDrop) dragHandleDOMEvents?.drop?.(view, event);
			},
			dragend: (view) => {
				if (handlesConfig.dragDrop) dragHandleDOMEvents?.dragend?.(view);
			}
		} }
	});
};

//#endregion
//#region src/core/helpers/image-helpers.ts
/**
* Finds all public image nodes in the document and restores them using the provided restore function
*
* Never remove this onCreate hook, it's a hack to restore old public
* images, since they don't give error if they've been deleted as they are
* rendered directly from image source instead of going through the
* apiserver
*/
const restorePublicImages = (editor, restoreImageFn) => {
	const imageSources = /* @__PURE__ */ new Set();
	editor.state.doc.descendants((node) => {
		if ([CORE_EXTENSIONS.IMAGE, CORE_EXTENSIONS.CUSTOM_IMAGE].includes(node.type.name)) {
			if (!node.attrs.src?.startsWith("http")) return;
			imageSources.add(node.attrs.src);
		}
	});
	imageSources.forEach(async (src) => {
		try {
			await restoreImageFn(src);
		} catch (error) {
			console.error("Error restoring image: ", error);
		}
	});
};

//#endregion
//#region src/ce/constants/utility.ts
const NODE_FILE_MAP = {
	[CORE_EXTENSIONS$1.IMAGE]: { fileSetName: "deletedImageSet" },
	[CORE_EXTENSIONS$1.CUSTOM_IMAGE]: { fileSetName: "deletedImageSet" }
};

//#endregion
//#region src/core/plugins/file/delete.ts
const DELETE_PLUGIN_KEY = new PluginKey("delete-utility");
const TrackFileDeletionPlugin = (editor, deleteHandler) => new Plugin({
	key: DELETE_PLUGIN_KEY,
	appendTransaction: (transactions, oldState, newState) => {
		const newFileSources = {};
		if (!transactions.some((tr) => tr.docChanged)) return null;
		if (transactions.some((tr) => tr.getMeta(CORE_EDITOR_META.SKIP_FILE_DELETION))) return null;
		newState.doc.descendants((node) => {
			const nodeType = node.type.name;
			if (NODE_FILE_MAP[nodeType]) if (newFileSources[nodeType]) newFileSources[nodeType].add(node.attrs.src);
			else newFileSources[nodeType] = new Set([node.attrs.src]);
		});
		const removedFiles = [];
		oldState.doc.descendants((node) => {
			const nodeType = node.type.name;
			if (!NODE_FILE_MAP[nodeType]) return;
			if (!newFileSources[nodeType]?.has(node.attrs.src)) removedFiles.push(node);
		});
		removedFiles.forEach(async (node) => {
			const nodeType = node.type.name;
			const src = node.attrs.src;
			const nodeFileSetDetails = NODE_FILE_MAP[nodeType];
			if (!nodeFileSetDetails || !src) return;
			try {
				editor.storage[nodeType]?.[nodeFileSetDetails.fileSetName]?.set(src, true);
				editor.commands.updateAssetsList?.({ idToRemove: node.attrs.id });
				await deleteHandler(src);
			} catch (error) {
				console.error("Error deleting file via delete utility plugin:", error);
			}
		});
		return null;
	}
});

//#endregion
//#region src/ce/constants/assets.ts
const ADDITIONAL_ASSETS_META_DATA_RECORD = {};

//#endregion
//#region src/core/helpers/assets.ts
const CORE_ASSETS_META_DATA_RECORD = {
	[CORE_EXTENSIONS$1.IMAGE]: (attrs) => {
		if (!attrs?.src) return;
		return {
			href: `#${getImageBlockId(attrs?.id ?? "")}`,
			id: attrs?.id,
			name: `image-${attrs?.id}`,
			size: 0,
			src: attrs?.src,
			type: CORE_EXTENSIONS$1.IMAGE
		};
	},
	[CORE_EXTENSIONS$1.CUSTOM_IMAGE]: (attrs) => {
		if (!attrs?.src) return;
		return {
			href: `#${getImageBlockId(attrs?.id ?? "")}`,
			id: attrs?.id,
			name: `image-${attrs?.id}`,
			size: 0,
			src: attrs?.src,
			type: CORE_EXTENSIONS$1.CUSTOM_IMAGE
		};
	},
	...ADDITIONAL_ASSETS_META_DATA_RECORD
};

//#endregion
//#region src/core/plugins/file/restore.ts
const RESTORE_PLUGIN_KEY = new PluginKey("restore-utility");
const TrackFileRestorationPlugin = (editor, restoreHandler) => new Plugin({
	key: RESTORE_PLUGIN_KEY,
	appendTransaction: (transactions, oldState, newState) => {
		if (!transactions.some((tr) => tr.docChanged)) return null;
		const oldFileSources = {};
		oldState.doc.descendants((node) => {
			const nodeType = node.type.name;
			if (NODE_FILE_MAP[nodeType]) if (oldFileSources[nodeType]) oldFileSources[nodeType].add(node.attrs.src);
			else oldFileSources[nodeType] = new Set([node.attrs.src]);
		});
		transactions.forEach(() => {
			const addedFiles = [];
			newState.doc.descendants((node, pos) => {
				const nodeType = node.type.name;
				if (!NODE_FILE_MAP[nodeType]) return;
				if (pos < 0 || pos > newState.doc.content.size) return;
				if (oldFileSources[nodeType]?.has(node.attrs.src)) return;
				const assetMetaData = CORE_ASSETS_META_DATA_RECORD[nodeType]?.(node.attrs);
				if (assetMetaData) editor.commands.updateAssetsList?.({ asset: assetMetaData });
				if (nodeType === CORE_EXTENSIONS$1.CUSTOM_IMAGE && !node.attrs.src?.startsWith("http")) return;
				addedFiles.push(node);
			});
			addedFiles.forEach(async (node) => {
				const nodeType = node.type.name;
				const src = node.attrs.src;
				const nodeFileSetDetails = NODE_FILE_MAP[nodeType];
				if (!nodeFileSetDetails) return;
				const extensionFileSetStorage = editor.storage[nodeType]?.[nodeFileSetDetails.fileSetName];
				const wasDeleted = extensionFileSetStorage?.get(src);
				if (!nodeFileSetDetails || !src) return;
				if (wasDeleted === void 0) extensionFileSetStorage?.set(src, false);
				else if (wasDeleted === true) try {
					await restoreHandler(src);
					extensionFileSetStorage?.set(src, false);
				} catch (error) {
					console.error("Error restoring file via restore utility plugin:", error);
				}
			});
		});
		return null;
	}
});

//#endregion
//#region src/core/plugins/file/root.ts
const FilePlugins = (args) => {
	const { editor, fileHandler, isEditable } = args;
	return [...isEditable && "delete" in fileHandler ? [TrackFileDeletionPlugin(editor, fileHandler.delete)] : [], TrackFileRestorationPlugin(editor, fileHandler.restore)];
};

//#endregion
//#region src/core/plugins/markdown-clipboard.ts
const MarkdownClipboardPlugin = (args) => {
	const { editor, getEditorMetaData } = args;
	return new Plugin({
		key: new PluginKey("markdownClipboard"),
		props: { handleDOMEvents: { copy: (view, event) => {
			try {
				event.preventDefault();
				event.clipboardData?.clearData();
				const metaData = getEditorMetaData(editor.getHTML());
				const clipboardHTML = view.serializeForClipboard(view.state.selection.content()).dom.innerHTML;
				const markdown = convertHTMLToMarkdown({
					description_html: clipboardHTML,
					metaData
				});
				event.clipboardData?.setData("text/plain", markdown);
				event.clipboardData?.setData("text/html", clipboardHTML);
				event.clipboardData?.setData("text/plane-editor-html", clipboardHTML);
				return true;
			} catch (error) {
				console.error("Failed to copy markdown content to clipboard:", error);
				return false;
			}
		} } }
	});
};

//#endregion
//#region src/core/extensions/utility.ts
const UtilityExtension = (props) => {
	const { disabledExtensions, flaggedExtensions, fileHandler, getEditorMetaData, isEditable, isTouchDevice } = props;
	const { restore } = fileHandler;
	return Extension.create({
		name: CORE_EXTENSIONS.UTILITY,
		priority: 1e3,
		addProseMirrorPlugins() {
			return [
				...FilePlugins({
					editor: this.editor,
					isEditable,
					fileHandler
				}),
				...codemark({ markType: this.editor.schema.marks.code }),
				MarkdownClipboardPlugin({
					editor: this.editor,
					getEditorMetaData
				}),
				DropHandlerPlugin({
					disabledExtensions,
					flaggedExtensions,
					editor: this.editor
				})
			];
		},
		onCreate() {
			restorePublicImages(this.editor, restore);
		},
		addStorage() {
			return {
				assetsList: [],
				assetsUploadStatus: isEditable && "assetsUploadStatus" in fileHandler ? fileHandler.assetsUploadStatus : {},
				uploadInProgress: false,
				activeDropbarExtensions: [],
				isTouchDevice
			};
		},
		addCommands() {
			return {
				updateAssetsUploadStatus: (updatedStatus) => () => {
					this.storage.assetsUploadStatus = updatedStatus;
				},
				updateAssetsList: (args) => () => {
					const uniqueAssets = new Set(this.storage.assetsList);
					if ("asset" in args) {
						if (!this.storage.assetsList.find((asset) => asset.id === args.asset.id)) uniqueAssets.add(args.asset);
					} else if ("idToRemove" in args) {
						const asset = this.storage.assetsList.find((asset$1) => asset$1.id === args.idToRemove);
						if (asset) uniqueAssets.delete(asset);
					}
					this.storage.assetsList = Array.from(uniqueAssets);
				},
				addActiveDropbarExtension: (extension) => () => {
					if (this.storage.activeDropbarExtensions.indexOf(extension) === -1) this.storage.activeDropbarExtensions.push(extension);
				},
				removeActiveDropbarExtension: (extension) => () => {
					const index = this.storage.activeDropbarExtensions.indexOf(extension);
					if (index !== -1) this.storage.activeDropbarExtensions.splice(index, 1);
				}
			};
		}
	});
};

//#endregion
//#region src/core/components/menus/floating-menu/root.tsx
function FloatingMenuRoot(props) {
	const { children, classNames, getFloatingProps, getReferenceProps, menuButton, onClick, options } = props;
	const { refs, floatingStyles, context } = options;
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("div", {
		className: classNames?.buttonContainer,
		children: /* @__PURE__ */ jsx("button", {
			ref: refs.setReference,
			...getReferenceProps(),
			type: "button",
			className: classNames?.button,
			onClick: (e) => {
				context.onOpenChange(!context.open);
				onClick?.(e);
			},
			children: menuButton
		})
	}), context.open && /* @__PURE__ */ jsxs(FloatingPortal, { children: [/* @__PURE__ */ jsx(FloatingOverlay, {
		style: { zIndex: 99 },
		lockScroll: true
	}), /* @__PURE__ */ jsx("div", {
		ref: refs.setFloating,
		...getFloatingProps(),
		style: {
			...floatingStyles,
			zIndex: 100
		},
		children
	})] })] });
}

//#endregion
//#region src/core/components/menus/floating-menu/use-floating-menu.ts
const useFloatingMenu = (args) => {
	const { handleOpenChange } = args;
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const options = useFloating({
		placement: "bottom-start",
		middleware: [flip({ fallbackPlacements: [
			"top-start",
			"bottom-start",
			"top-end",
			"bottom-end"
		] }), shift({ padding: 8 })],
		open: isDropdownOpen,
		onOpenChange: (open) => {
			setIsDropdownOpen(open);
			handleOpenChange?.(open);
		},
		whileElementsMounted: autoUpdate
	});
	const { context } = options;
	const click = useClick(context);
	const { getReferenceProps, getFloatingProps } = useInteractions([
		useDismiss(context),
		click,
		useRole(context)
	]);
	return {
		options,
		getReferenceProps,
		getFloatingProps
	};
};

//#endregion
//#region src/core/components/menus/menu-items.ts
const TextItem = (editor) => ({
	key: "text",
	name: "Text",
	isActive: () => editor.isActive(CORE_EXTENSIONS.PARAGRAPH),
	command: () => setText(editor),
	icon: CaseSensitive
});
const HeadingItem = (editor, level, key, name, icon) => ({
	key,
	name,
	isActive: () => editor.isActive(CORE_EXTENSIONS.HEADING, { level }),
	command: () => toggleHeading(editor, level),
	icon
});
const HeadingOneItem = (editor) => HeadingItem(editor, 1, "h1", "Heading 1", Heading1);
const HeadingTwoItem = (editor) => HeadingItem(editor, 2, "h2", "Heading 2", Heading2);
const HeadingThreeItem = (editor) => HeadingItem(editor, 3, "h3", "Heading 3", Heading3);
const HeadingFourItem = (editor) => HeadingItem(editor, 4, "h4", "Heading 4", Heading4);
const HeadingFiveItem = (editor) => HeadingItem(editor, 5, "h5", "Heading 5", Heading5);
const HeadingSixItem = (editor) => HeadingItem(editor, 6, "h6", "Heading 6", Heading6);
const BoldItem = (editor) => ({
	key: "bold",
	name: "Bold",
	isActive: () => editor?.isActive(CORE_EXTENSIONS.BOLD),
	command: () => toggleBold(editor),
	icon: BoldIcon
});
const ItalicItem = (editor) => ({
	key: "italic",
	name: "Italic",
	isActive: () => editor?.isActive(CORE_EXTENSIONS.ITALIC),
	command: () => toggleItalic(editor),
	icon: ItalicIcon
});
const UnderLineItem = (editor) => ({
	key: "underline",
	name: "Underline",
	isActive: () => editor?.isActive(CORE_EXTENSIONS.UNDERLINE),
	command: () => toggleUnderline(editor),
	icon: UnderlineIcon
});
const StrikeThroughItem = (editor) => ({
	key: "strikethrough",
	name: "Strikethrough",
	isActive: () => editor?.isActive(CORE_EXTENSIONS.STRIKETHROUGH),
	command: () => toggleStrike(editor),
	icon: StrikethroughIcon
});
const BulletListItem = (editor) => ({
	key: "bulleted-list",
	name: "Bulleted list",
	isActive: () => editor?.isActive(CORE_EXTENSIONS.BULLET_LIST),
	command: () => toggleBulletList(editor),
	icon: ListIcon
});
const NumberedListItem = (editor) => ({
	key: "numbered-list",
	name: "Numbered list",
	isActive: () => editor?.isActive(CORE_EXTENSIONS.ORDERED_LIST),
	command: () => toggleOrderedList(editor),
	icon: ListOrderedIcon
});
const TodoListItem = (editor) => ({
	key: "to-do-list",
	name: "To-do list",
	isActive: () => editor.isActive(CORE_EXTENSIONS.TASK_ITEM),
	command: () => toggleTaskList(editor),
	icon: CheckSquare
});
const QuoteItem = (editor) => ({
	key: "quote",
	name: "Quote",
	isActive: () => editor?.isActive(CORE_EXTENSIONS.BLOCKQUOTE),
	command: () => toggleBlockquote(editor),
	icon: TextQuote
});
const CodeItem = (editor) => ({
	key: "code",
	name: "Code",
	isActive: () => editor?.isActive(CORE_EXTENSIONS.CODE_INLINE) || editor?.isActive(CORE_EXTENSIONS.CODE_BLOCK),
	command: () => toggleCodeBlock(editor),
	icon: CodeIcon
});
const TableItem = (editor) => ({
	key: "table",
	name: "Table",
	isActive: () => editor?.isActive(CORE_EXTENSIONS.TABLE),
	command: () => insertTableCommand(editor),
	icon: TableIcon
});
const ImageItem = (editor) => ({
	key: "image",
	name: "Image",
	isActive: () => editor?.isActive(CORE_EXTENSIONS.IMAGE) || editor?.isActive(CORE_EXTENSIONS.CUSTOM_IMAGE),
	command: () => insertImage({
		editor,
		event: "insert",
		pos: editor.state.selection.from
	}),
	icon: ImageIcon
});
const HorizontalRuleItem = (editor) => ({
	key: "divider",
	name: "Divider",
	isActive: () => editor?.isActive(CORE_EXTENSIONS.HORIZONTAL_RULE),
	command: () => insertHorizontalRule(editor),
	icon: MinusSquare
});
const LinkItem = (editor) => ({
	key: "link",
	name: "Link",
	isActive: () => editor?.isActive("link"),
	command: (props) => {
		if (!props) return;
		if (props.url) setLinkEditor(editor, props.url, props.text);
		else unsetLinkEditor(editor);
	},
	icon: LinkIcon
});
const TextColorItem = (editor) => ({
	key: "text-color",
	name: "Color",
	isActive: (props) => editor.isActive(CORE_EXTENSIONS.CUSTOM_COLOR, { color: props?.color }),
	command: (props) => {
		if (!props) return;
		toggleTextColor(props.color, editor);
	},
	icon: Palette
});
const BackgroundColorItem = (editor) => ({
	key: "background-color",
	name: "Background color",
	isActive: (props) => editor.isActive(CORE_EXTENSIONS.CUSTOM_COLOR, { backgroundColor: props?.color }),
	command: (props) => {
		if (!props) return;
		toggleBackgroundColor(props.color, editor);
	},
	icon: Palette
});
const TextAlignItem = (editor) => ({
	key: "text-align",
	name: "Text align",
	isActive: (props) => editor.isActive({ textAlign: props?.alignment }),
	command: (props) => {
		if (!props) return;
		setTextAlign(props.alignment, editor);
	},
	icon: AlignCenter
});
const getEditorMenuItems = (editor) => {
	if (!editor) return [];
	return [
		TextItem(editor),
		HeadingOneItem(editor),
		HeadingTwoItem(editor),
		HeadingThreeItem(editor),
		HeadingFourItem(editor),
		HeadingFiveItem(editor),
		HeadingSixItem(editor),
		BoldItem(editor),
		ItalicItem(editor),
		UnderLineItem(editor),
		StrikeThroughItem(editor),
		BulletListItem(editor),
		TodoListItem(editor),
		CodeItem(editor),
		NumberedListItem(editor),
		QuoteItem(editor),
		TableItem(editor),
		ImageItem(editor),
		HorizontalRuleItem(editor),
		LinkItem(editor),
		TextColorItem(editor),
		BackgroundColorItem(editor),
		TextAlignItem(editor)
	];
};

//#endregion
//#region src/core/components/menus/bubble-menu/color-selector.tsx
function BubbleMenuColorSelector(props) {
	const { editor, editorState } = props;
	const { options, getReferenceProps, getFloatingProps } = useFloatingMenu({});
	const activeTextColor = useMemo(() => editorState.color, [editorState.color]);
	const activeBackgroundColor = useMemo(() => editorState.backgroundColor, [editorState.backgroundColor]);
	return /* @__PURE__ */ jsx(FloatingMenuRoot, {
		classNames: {
			buttonContainer: "h-full",
			button: "flex items-center gap-1 h-full whitespace-nowrap px-3 text-sm font-medium text-custom-text-300 hover:bg-custom-background-80 active:bg-custom-background-80 rounded transition-colors"
		},
		menuButton: /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("span", { children: "Color" }), /* @__PURE__ */ jsx("span", {
			className: cn("flex-shrink-0 size-6 grid place-items-center rounded border-[0.5px] border-custom-border-300", { "bg-custom-background-100": !activeBackgroundColor }),
			style: { backgroundColor: activeBackgroundColor ? activeBackgroundColor.backgroundColor : "transparent" },
			children: /* @__PURE__ */ jsx(ALargeSmall, {
				className: cn("size-3.5", { "text-custom-text-100": !activeTextColor }),
				style: { color: activeTextColor ? activeTextColor.textColor : "inherit" }
			})
		})] }),
		options,
		getFloatingProps,
		getReferenceProps,
		children: /* @__PURE__ */ jsxs("section", {
			className: "mt-1 rounded-md border-[0.5px] border-custom-border-300 bg-custom-background-100 p-2 space-y-2 shadow-custom-shadow-rg",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "space-y-1.5",
				children: [/* @__PURE__ */ jsx("p", {
					className: "text-xs text-custom-text-300 font-semibold",
					children: "Text colors"
				}), /* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-2",
					children: [COLORS_LIST.map((color) => /* @__PURE__ */ jsx("button", {
						type: "button",
						className: "flex-shrink-0 size-6 rounded border-[0.5px] border-custom-border-400 hover:opacity-60 transition-opacity",
						style: { backgroundColor: color.textColor },
						onClick: () => TextColorItem(editor).command({ color: color.key })
					}, color.key)), /* @__PURE__ */ jsx("button", {
						type: "button",
						className: "flex-shrink-0 size-6 grid place-items-center rounded text-custom-text-300 border-[0.5px] border-custom-border-400 hover:bg-custom-background-80 transition-colors",
						onClick: () => TextColorItem(editor).command({ color: void 0 }),
						children: /* @__PURE__ */ jsx(Ban, { className: "size-4" })
					})]
				})]
			}), /* @__PURE__ */ jsxs("div", {
				className: "space-y-1.5",
				children: [/* @__PURE__ */ jsx("p", {
					className: "text-xs text-custom-text-300 font-semibold",
					children: "Background colors"
				}), /* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-2",
					children: [COLORS_LIST.map((color) => /* @__PURE__ */ jsx("button", {
						type: "button",
						className: "flex-shrink-0 size-6 rounded border-[0.5px] border-custom-border-400 hover:opacity-60 transition-opacity",
						style: { backgroundColor: color.backgroundColor },
						onClick: () => BackgroundColorItem(editor).command({ color: color.key })
					}, color.key)), /* @__PURE__ */ jsx("button", {
						type: "button",
						className: "flex-shrink-0 size-6 grid place-items-center rounded text-custom-text-300 border-[0.5px] border-custom-border-400 hover:bg-custom-background-80 transition-colors",
						onClick: () => BackgroundColorItem(editor).command({ color: void 0 }),
						children: /* @__PURE__ */ jsx(Ban, { className: "size-4" })
					})]
				})]
			})]
		})
	});
}

//#endregion
//#region src/core/components/menus/bubble-menu/node-selector.tsx
function BubbleMenuNodeSelector(props) {
	const { editor } = props;
	const { options, getReferenceProps, getFloatingProps } = useFloatingMenu({});
	const { context } = options;
	const items = [
		TextItem(editor),
		HeadingOneItem(editor),
		HeadingTwoItem(editor),
		HeadingThreeItem(editor),
		HeadingFourItem(editor),
		HeadingFiveItem(editor),
		HeadingSixItem(editor),
		BulletListItem(editor),
		NumberedListItem(editor),
		TodoListItem(editor),
		QuoteItem(editor),
		CodeItem(editor)
	];
	const activeItem = items.filter((item) => item.isActive()).pop() ?? { name: "Multiple" };
	return /* @__PURE__ */ jsx(FloatingMenuRoot, {
		classNames: {
			buttonContainer: "h-full",
			button: cn("h-full flex items-center gap-1 px-3 text-sm font-medium text-custom-text-300 hover:bg-custom-background-80 active:bg-custom-background-80 rounded whitespace-nowrap transition-colors", { "bg-custom-background-80": context.open })
		},
		menuButton: /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("span", { children: activeItem?.name }), /* @__PURE__ */ jsx(ChevronDownIcon, { className: "shrink-0 size-3" })] }),
		options,
		getFloatingProps,
		getReferenceProps,
		children: /* @__PURE__ */ jsx("section", {
			className: "w-48 max-h-[90vh] mt-1 flex flex-col overflow-y-scroll rounded-md border-[0.5px] border-custom-border-300 bg-custom-background-100 px-2 py-2.5 shadow-custom-shadow-rg",
			children: items.map((item) => /* @__PURE__ */ jsxs("button", {
				type: "button",
				onClick: (e) => {
					item.command();
					context.onOpenChange(false);
					e.stopPropagation();
				},
				className: cn("flex items-center justify-between rounded px-1 py-1.5 text-sm text-custom-text-200 hover:bg-custom-background-80", { "bg-custom-background-80": activeItem.name === item.name }),
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex items-center space-x-2",
					children: [/* @__PURE__ */ jsx(item.icon, { className: "size-3 flex-shrink-0" }), /* @__PURE__ */ jsx("span", { children: item.name })]
				}), activeItem.name === item.name && /* @__PURE__ */ jsx(Check, { className: "size-3 text-custom-text-300 flex-shrink-0" })]
			}, item.name))
		})
	});
}

//#endregion
//#region src/core/components/menus/bubble-menu/alignment-selector.tsx
function TextAlignmentSelector(props) {
	const { editor, editorState } = props;
	const menuItem = TextAlignItem(editor);
	const textAlignmentOptions = [
		{
			itemKey: "text-align",
			renderKey: "text-align-left",
			icon: AlignLeft,
			command: () => menuItem.command({ alignment: "left" }),
			isActive: () => editorState.left
		},
		{
			itemKey: "text-align",
			renderKey: "text-align-center",
			icon: AlignCenter,
			command: () => menuItem.command({ alignment: "center" }),
			isActive: () => editorState.center
		},
		{
			itemKey: "text-align",
			renderKey: "text-align-right",
			icon: AlignRight,
			command: () => menuItem.command({ alignment: "right" }),
			isActive: () => editorState.right
		}
	];
	if (editorState.code) return null;
	return /* @__PURE__ */ jsx("div", {
		className: "flex gap-0.5 px-2",
		children: textAlignmentOptions.map((item) => /* @__PURE__ */ jsx("button", {
			type: "button",
			onClick: (e) => {
				e.stopPropagation();
				item.command();
			},
			className: cn("size-7 grid place-items-center rounded text-custom-text-300 hover:bg-custom-background-80 active:bg-custom-background-80 transition-colors", { "bg-custom-background-80 text-custom-text-100": item.isActive() }),
			children: /* @__PURE__ */ jsx(item.icon, { className: "size-4" })
		}, item.renderKey))
	});
}

//#endregion
//#region src/core/components/menus/bubble-menu/link-selector.tsx
function BubbleMenuLinkSelector(props) {
	const { editor } = props;
	const [error, setError] = useState(false);
	const { options, getReferenceProps, getFloatingProps } = useFloatingMenu({});
	const { context } = options;
	const inputRef = useRef(null);
	const handleLinkSubmit = useCallback(() => {
		const input = inputRef.current;
		if (!input) return;
		const url = input.value;
		if (!url) return;
		const { isValid, url: validatedUrl } = isValidHttpUrl(url);
		if (isValid) {
			setLinkEditor(editor, validatedUrl);
			context.onOpenChange(false);
			setError(false);
		} else setError(true);
	}, [
		editor,
		inputRef,
		context
	]);
	return /* @__PURE__ */ jsx(FloatingMenuRoot, {
		classNames: {
			buttonContainer: "h-full",
			button: cn("h-full flex items-center gap-1 px-3 text-sm font-medium text-custom-text-300 hover:bg-custom-background-80 active:bg-custom-background-80 rounded whitespace-nowrap transition-colors", {
				"bg-custom-background-80": context.open,
				"text-custom-text-100": editor.isActive(CORE_EXTENSIONS.CUSTOM_LINK)
			})
		},
		getFloatingProps,
		getReferenceProps,
		menuButton: /* @__PURE__ */ jsxs(Fragment, { children: ["Link", /* @__PURE__ */ jsx(Link, { className: "shrink-0 size-3" })] }),
		options,
		children: /* @__PURE__ */ jsxs("div", {
			className: "w-60 mt-1 rounded-md bg-custom-background-100 shadow-custom-shadow-rg",
			children: [/* @__PURE__ */ jsxs("div", {
				className: cn("flex rounded  border-[0.5px] border-custom-border-300 transition-colors", { "border-red-500": error }),
				children: [/* @__PURE__ */ jsx("input", {
					ref: inputRef,
					type: "url",
					placeholder: "Enter or paste a link",
					onClick: (e) => e.stopPropagation(),
					className: "flex-1 border-r-[0.5px] border-custom-border-300 bg-custom-background-100 py-2 px-1.5 text-xs outline-none placeholder:text-custom-text-400 rounded",
					defaultValue: editor.getAttributes("link").href || "",
					onKeyDown: (e) => {
						setError(false);
						if (e.key === "Enter") {
							e.preventDefault();
							handleLinkSubmit();
						}
					},
					onFocus: () => setError(false),
					autoFocus: true
				}), editor.getAttributes("link").href ? /* @__PURE__ */ jsx("button", {
					type: "button",
					className: "grid place-items-center rounded-sm p-1 text-red-500 hover:bg-red-500/20 transition-all",
					onClick: (e) => {
						unsetLinkEditor(editor);
						e.stopPropagation();
						context.onOpenChange(false);
					},
					children: /* @__PURE__ */ jsx(Trash2, { className: "size-4" })
				}) : /* @__PURE__ */ jsx("button", {
					type: "button",
					className: "h-full aspect-square grid place-items-center p-1 rounded-sm text-custom-text-300 hover:bg-custom-background-80 transition-all",
					onClick: (e) => {
						e.stopPropagation();
						handleLinkSubmit();
					},
					children: /* @__PURE__ */ jsx(Check, { className: "size-4" })
				})]
			}), error && /* @__PURE__ */ jsx("p", {
				className: "text-xs text-red-500 my-1 px-2 pointer-events-none animate-in fade-in slide-in-from-top-0",
				children: "Please enter a valid URL"
			})]
		})
	});
}

//#endregion
//#region src/core/components/menus/bubble-menu/root.tsx
function EditorBubbleMenu(props) {
	const { editor } = props;
	const [isSelecting, setIsSelecting] = useState(false);
	const menuRef = useRef(null);
	const formattingItems = {
		code: CodeItem(editor),
		bold: BoldItem(editor),
		italic: ItalicItem(editor),
		underline: UnderLineItem(editor),
		strikethrough: StrikeThroughItem(editor),
		"text-align": TextAlignItem(editor)
	};
	const editorState = useEditorState({
		editor,
		selector: ({ editor: editor$1 }) => ({
			code: formattingItems.code.isActive(),
			bold: formattingItems.bold.isActive(),
			italic: formattingItems.italic.isActive(),
			underline: formattingItems.underline.isActive(),
			strikethrough: formattingItems.strikethrough.isActive(),
			left: formattingItems["text-align"].isActive({ alignment: "left" }),
			right: formattingItems["text-align"].isActive({ alignment: "right" }),
			center: formattingItems["text-align"].isActive({ alignment: "center" }),
			color: COLORS_LIST.find((c) => TextColorItem(editor$1).isActive({ color: c.key })),
			backgroundColor: COLORS_LIST.find((c) => BackgroundColorItem(editor$1).isActive({ color: c.key }))
		})
	});
	const basicFormattingOptions = editorState.code ? [formattingItems.code] : [
		formattingItems.bold,
		formattingItems.italic,
		formattingItems.underline,
		formattingItems.strikethrough
	];
	const bubbleMenuProps = {
		editor,
		shouldShow: ({ state, editor: editor$1 }) => {
			const { selection } = state;
			const { empty } = selection;
			if (empty || !editor$1.isEditable || editor$1.isActive(CORE_EXTENSIONS.IMAGE) || editor$1.isActive(CORE_EXTENSIONS.CUSTOM_IMAGE) || isNodeSelection(selection) || isCellSelection(selection) || isSelecting) return false;
			return true;
		},
		tippyOptions: {
			moveTransition: "transform 0.15s ease-out",
			duration: [300, 0],
			zIndex: 9,
			onShow: () => {
				if (editor.storage.link) editor.storage.link.isBubbleMenuOpen = true;
				editor.commands.addActiveDropbarExtension("bubble-menu");
			},
			onHide: () => {
				if (editor.storage.link) editor.storage.link.isBubbleMenuOpen = false;
				setTimeout(() => {
					editor.commands.removeActiveDropbarExtension("bubble-menu");
				}, 0);
			},
			onHidden: () => {
				if (editor.storage.link) editor.storage.link.isBubbleMenuOpen = false;
				setTimeout(() => {
					editor.commands.removeActiveDropbarExtension("bubble-menu");
				}, 0);
			}
		}
	};
	useEffect(() => {
		function handleMouseDown(e) {
			if (menuRef.current?.contains(e.target)) return;
			function handleMouseMove() {
				if (!editor.state.selection.empty) {
					setIsSelecting(true);
					document.removeEventListener("mousemove", handleMouseMove);
				}
			}
			function handleMouseUp() {
				setIsSelecting(false);
				document.removeEventListener("mousemove", handleMouseMove);
				document.removeEventListener("mouseup", handleMouseUp);
			}
			document.addEventListener("mousemove", handleMouseMove);
			document.addEventListener("mouseup", handleMouseUp);
		}
		document.addEventListener("mousedown", handleMouseDown);
		return () => {
			document.removeEventListener("mousedown", handleMouseDown);
		};
	}, [editor]);
	return /* @__PURE__ */ jsx(BubbleMenu, {
		...bubbleMenuProps,
		children: !isSelecting && /* @__PURE__ */ jsxs("div", {
			ref: menuRef,
			className: "flex py-2 divide-x divide-custom-border-200 rounded-lg border border-custom-border-200 bg-custom-background-100 shadow-custom-shadow-rg overflow-x-scroll horizontal-scrollbar scrollbar-xs",
			children: [
				/* @__PURE__ */ jsx("div", {
					className: "px-2",
					children: /* @__PURE__ */ jsx(BubbleMenuNodeSelector, { editor })
				}),
				!editorState.code && /* @__PURE__ */ jsx("div", {
					className: "px-2",
					children: /* @__PURE__ */ jsx(BubbleMenuLinkSelector, { editor })
				}),
				!editorState.code && /* @__PURE__ */ jsx("div", {
					className: "px-2",
					children: /* @__PURE__ */ jsx(BubbleMenuColorSelector, {
						editor,
						editorState
					})
				}),
				/* @__PURE__ */ jsx("div", {
					className: "flex gap-0.5 px-2",
					children: basicFormattingOptions.map((item) => /* @__PURE__ */ jsx("button", {
						type: "button",
						onClick: (e) => {
							item.command();
							e.stopPropagation();
						},
						className: cn("size-7 grid place-items-center rounded text-custom-text-300 hover:bg-custom-background-80 active:bg-custom-background-80 transition-colors", { "bg-custom-background-80 text-custom-text-100": editorState[item.key] }),
						children: /* @__PURE__ */ jsx(item.icon, { className: "size-4" })
					}, item.key))
				}),
				/* @__PURE__ */ jsx(TextAlignmentSelector, {
					editor,
					editorState
				})
			]
		})
	});
}

//#endregion
//#region src/core/components/menus/block-menu-options.tsx
const findSelectedTable = (editor) => {
	const { state } = editor;
	const selectedNode = state.selection.content().content.firstChild;
	if (selectedNode?.type.name === CORE_EXTENSIONS.TABLE) return {
		tableNode: selectedNode,
		tablePos: state.selection.from
	};
	return {
		tableNode: null,
		tablePos: -1
	};
};
const setTableToFullWidth = (editor) => {
	try {
		const { state, view } = editor;
		const { tableNode, tablePos } = findSelectedTable(editor);
		if (!tableNode) return;
		const editorContainer = view.dom.closest(".editor-container");
		if (!editorContainer) return;
		const contentWidthVar = getComputedStyle(editorContainer).getPropertyValue("--editor-content-width").trim();
		if (!contentWidthVar) return;
		const contentWidth = parseInt(contentWidthVar);
		if (isNaN(contentWidth) || contentWidth <= 0) return;
		const map = TableMap.get(tableNode);
		const equalWidth = Math.floor(contentWidth / map.width);
		const tr = state.tr;
		const tableStart = tablePos + 1;
		const updatedCells = /* @__PURE__ */ new Set();
		for (let row = 0; row < map.height; row++) for (let col = 0; col < map.width; col++) {
			const cellIndex = row * map.width + col;
			const cellPos = map.map[cellIndex];
			if (updatedCells.has(cellPos)) continue;
			const cell = state.doc.nodeAt(tableStart + cellPos);
			if (!cell) continue;
			const colspan = cell.attrs.colspan || 1;
			tr.setNodeMarkup(tableStart + cellPos, null, {
				...cell.attrs,
				colwidth: Array(colspan).fill(equalWidth)
			});
			updatedCells.add(cellPos);
		}
		view.dispatch(tr);
	} catch (error) {
		console.error("Error setting table to full width:", error);
	}
};
const getNodeOptions = (editor) => [{
	icon: MoveHorizontal,
	key: "table-full-width",
	label: "Fit to width",
	isDisabled: !editor.isActive(CORE_EXTENSIONS.TABLE),
	onClick: () => setTableToFullWidth(editor)
}];

//#endregion
//#region src/core/components/menus/block-menu.tsx
function BlockMenu(props) {
	const { editor, workItemIdentifier } = props;
	const [isOpen, setIsOpen] = useState(false);
	const [isAnimatedIn, setIsAnimatedIn] = useState(false);
	const menuRef = useRef(null);
	const virtualReferenceRef = useRef({ getBoundingClientRect: () => new DOMRect() });
	const { refs, floatingStyles, context } = useFloating({
		open: isOpen,
		onOpenChange: setIsOpen,
		middleware: [
			offset({ crossAxis: -10 }),
			flip(),
			shift()
		],
		whileElementsMounted: autoUpdate,
		placement: "left-start"
	});
	const { getFloatingProps } = useInteractions([useDismiss(context)]);
	const openBlockMenu = useCallback(() => {
		if (!isOpen) {
			setIsOpen(true);
			editor.commands.addActiveDropbarExtension(CORE_EXTENSIONS.SIDE_MENU);
		}
	}, [editor, isOpen]);
	const closeBlockMenu = useCallback(() => {
		if (isOpen) {
			setIsOpen(false);
			editor.commands.removeActiveDropbarExtension(CORE_EXTENSIONS.SIDE_MENU);
		}
	}, [editor, isOpen]);
	const handleClickDragHandle = useCallback((event) => {
		const target = event.target;
		const dragHandle = target.closest("#drag-handle");
		if (dragHandle) {
			event.preventDefault();
			virtualReferenceRef.current = { getBoundingClientRect: () => dragHandle.getBoundingClientRect() };
			refs.setReference(virtualReferenceRef.current);
			openBlockMenu();
			return;
		}
		if (menuRef.current && !menuRef.current.contains(target)) closeBlockMenu();
	}, [
		refs,
		openBlockMenu,
		closeBlockMenu
	]);
	useEffect(() => {
		const handleKeyDown = (event) => {
			if (event.key === "Escape") closeBlockMenu();
		};
		const handleScroll = () => {
			closeBlockMenu();
		};
		document.addEventListener("click", handleClickDragHandle);
		document.addEventListener("contextmenu", handleClickDragHandle);
		document.addEventListener("keydown", handleKeyDown);
		document.addEventListener("scroll", handleScroll, true);
		return () => {
			document.removeEventListener("click", handleClickDragHandle);
			document.removeEventListener("contextmenu", handleClickDragHandle);
			document.removeEventListener("keydown", handleKeyDown);
			document.removeEventListener("scroll", handleScroll, true);
		};
	}, [
		editor.commands,
		handleClickDragHandle,
		closeBlockMenu
	]);
	useEffect(() => {
		if (isOpen) {
			setIsAnimatedIn(false);
			const timeout = setTimeout(() => {
				requestAnimationFrame(() => {
					setIsAnimatedIn(true);
				});
			}, 50);
			return () => clearTimeout(timeout);
		} else setIsAnimatedIn(false);
	}, [isOpen]);
	const MENU_ITEMS = [
		{
			icon: Trash2,
			key: "delete",
			label: "Delete",
			onClick: (_e) => {
				editor.chain().deleteSelection().focus().run();
			}
		},
		{
			icon: Copy,
			key: "duplicate",
			label: "Duplicate",
			isDisabled: editor.state.selection.content().content.firstChild?.type.name === CORE_EXTENSIONS.IMAGE || editor.isActive(CORE_EXTENSIONS.CUSTOM_IMAGE),
			onClick: (_e) => {
				try {
					const { state } = editor;
					const { selection } = state;
					const firstChild = selection.content().content.firstChild;
					const docSize = state.doc.content.size;
					if (!firstChild) throw new Error("No content selected or content is not duplicable.");
					const insertPos = selection.to;
					if (insertPos < 0 || insertPos > docSize) throw new Error("The insertion position is invalid or outside the document.");
					const contentToInsert = firstChild.toJSON();
					editor.chain().insertContentAt(insertPos, contentToInsert, { updateSelection: true }).focus(Math.min(insertPos + 1, docSize), { scrollIntoView: false }).run();
				} catch (error) {
					if (error instanceof Error) console.error(error.message);
				}
			}
		},
		...getNodeOptions(editor)
	];
	if (!isOpen) return null;
	return /* @__PURE__ */ jsx(FloatingPortal, { children: /* @__PURE__ */ jsx("div", {
		ref: (node) => {
			refs.setFloating(node);
			menuRef.current = node;
		},
		style: {
			...floatingStyles,
			animationFillMode: "forwards",
			transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
			zIndex: 100
		},
		className: cn("max-h-60 min-w-[7rem] overflow-y-scroll rounded-lg border border-custom-border-200 bg-custom-background-100 p-1.5 shadow-custom-shadow-rg", "transition-all duration-300 transform origin-top-right", isAnimatedIn ? "opacity-100 scale-100" : "opacity-0 scale-75"),
		...getFloatingProps(),
		children: MENU_ITEMS.map((item) => {
			if (item.isDisabled) return null;
			return /* @__PURE__ */ jsxs("button", {
				type: "button",
				className: "flex w-full items-center gap-1.5 truncate rounded px-1 py-1.5 text-xs text-custom-text-200 hover:bg-custom-background-90",
				onClick: (e) => {
					item.onClick(e);
					e.preventDefault();
					e.stopPropagation();
					closeBlockMenu();
				},
				disabled: item.isDisabled,
				children: [/* @__PURE__ */ jsx(item.icon, { className: "h-3 w-3" }), item.label]
			}, item.key);
		})
	}) });
}

//#endregion
//#region src/core/helpers/insert-content-at-cursor-position.ts
const insertContentAtSavedSelection = (editor, content) => {
	if (!editor || editor.isDestroyed) {
		console.error("Editor reference is not available or has been destroyed.");
		return;
	}
	if (!editor.state.selection) {
		console.error("Saved selection is invalid.");
		return;
	}
	const docSize = editor.state.doc.content.size;
	const safePosition = Math.max(0, Math.min(editor.state.selection.anchor, docSize));
	try {
		editor.chain().focus().insertContentAt(safePosition, content).run();
	} catch (error) {
		console.error("An error occurred while inserting content at saved selection:", error);
	}
};

//#endregion
//#region src/core/helpers/scroll-to-node.ts
function findNthH1(editor, n, level) {
	let count = 0;
	let pos = 0;
	editor.state.doc.descendants((node, position) => {
		if (node.type.name === "heading" && node.attrs.level === level) {
			count++;
			if (count === n) {
				pos = position;
				return false;
			}
		}
	});
	return pos;
}
function scrollToNode(editor, pos) {
	if (editor.state.doc.nodeAt(pos)) {
		const headingDOM = editor.view.nodeDOM(pos);
		if (headingDOM instanceof HTMLElement) headingDOM.scrollIntoView({ behavior: "smooth" });
	}
}
function scrollToNodeViaDOMCoordinates(editor, pos, behavior) {
	const view = editor.view;
	const coords = view.coordsAtPos(pos);
	if (coords) {
		window.scrollTo({
			top: coords.top + window.scrollY - window.innerHeight / 2,
			behavior
		});
		view.focus();
	} else console.warn("Unable to find coordinates for the given position");
}
function scrollSummary(editor, marking) {
	if (editor) scrollToNode(editor, findNthH1(editor, marking.sequence, marking.level));
}

//#endregion
//#region src/core/helpers/editor-ref.ts
const getEditorRefHelpers = (args) => {
	const { editor, getEditorMetaData, provider } = args;
	return {
		blur: () => editor?.commands.blur(),
		clearEditor: (emitUpdate = false) => {
			editor?.chain().setMeta(CORE_EDITOR_META.SKIP_FILE_DELETION, true).clearContent(emitUpdate).run();
		},
		createSelectionAtCursorPosition: () => {
			if (!editor) return;
			const { empty } = editor.state.selection;
			if (empty) {
				const { $from } = editor.state.selection;
				const textContent = $from.parent.textContent;
				const posInNode = $from.parentOffset;
				let start = posInNode;
				let end = posInNode;
				while (start > 0 && /\w/.test(textContent[start - 1])) start--;
				while (end < textContent.length && /\w/.test(textContent[end])) end++;
				if (start !== end) {
					const from = $from.start() + start;
					const to = $from.start() + end;
					editor.commands.setTextSelection({
						from,
						to
					});
				}
			}
		},
		getDocument: () => {
			return {
				binary: provider?.document ? Y.encodeStateAsUpdate(provider?.document) : null,
				html: editor?.getHTML() ?? "<p></p>",
				json: editor?.getJSON() ?? null
			};
		},
		getDocumentInfo: () => ({
			characters: editor?.storage.characterCount?.characters?.() ?? 0,
			paragraphs: getParagraphCount(editor?.state),
			words: editor?.storage.characterCount?.words?.() ?? 0
		}),
		getHeadings: () => editor ? editor.storage.headingsList?.headings : [],
		getMarkDown: () => {
			if (!editor) return "";
			const editorHTML = editor.getHTML();
			return convertHTMLToMarkdown({
				description_html: editorHTML,
				metaData: getEditorMetaData(editorHTML)
			});
		},
		copyMarkdownToClipboard: () => {
			if (!editor) return;
			const html = editor.getHTML();
			const markdown = convertHTMLToMarkdown({
				description_html: html,
				metaData: getEditorMetaData(html)
			});
			const copyHandler = (event) => {
				event.preventDefault();
				event.clipboardData?.setData("text/plain", markdown);
				event.clipboardData?.setData("text/html", html);
				event.clipboardData?.setData("text/plane-editor-html", html);
				document.removeEventListener("copy", copyHandler);
			};
			document.addEventListener("copy", copyHandler);
			document.execCommand("copy");
		},
		isAnyDropbarOpen: () => {
			if (!editor) return false;
			return editor.storage.utility.activeDropbarExtensions.length > 0;
		},
		scrollSummary: (marking) => {
			if (!editor) return;
			scrollSummary(editor, marking);
		},
		setEditorValue: (content, emitUpdate = false) => {
			editor?.chain().setMeta(CORE_EDITOR_META.SKIP_FILE_DELETION, true).setMeta(CORE_EDITOR_META.INTENTIONAL_DELETION, true).setContent(content, emitUpdate, { preserveWhitespace: true }).run();
		},
		emitRealTimeUpdate: (message) => provider?.sendStateless(message),
		executeMenuItemCommand: (props) => {
			const { itemKey } = props;
			const editorItems = getEditorMenuItems(editor);
			const getEditorMenuItem = (itemKey$1) => editorItems.find((item$1) => item$1.key === itemKey$1);
			const item = getEditorMenuItem(itemKey);
			if (item) item.command(props);
			else console.warn(`No command found for item: ${itemKey}`);
		},
		focus: (args$1) => editor?.commands.focus(args$1),
		getCoordsFromPos: (pos) => editor?.view.coordsAtPos(pos ?? editor.state.selection.from),
		getCurrentCursorPosition: () => editor?.state.selection.from,
		getAttributesWithExtendedMark: (mark, attribute) => {
			if (!editor) return;
			editor.commands.extendMarkRange(mark);
			return editor.getAttributes(attribute);
		},
		getSelectedText: () => {
			if (!editor) return null;
			const { state } = editor;
			const { from, to, empty } = state.selection;
			if (empty) return null;
			const nodesArray = [];
			state.doc.nodesBetween(from, to, (node, _pos, parent) => {
				if (parent === state.doc && editor) {
					const dom = DOMSerializer.fromSchema(editor.schema).serializeNode(node);
					const tempDiv = document.createElement("div");
					tempDiv.appendChild(dom);
					nodesArray.push(tempDiv.innerHTML);
				}
			});
			return nodesArray.join("");
		},
		insertText: (contentHTML, insertOnNextLine) => {
			if (!editor) return;
			const { from, to, empty } = editor.state.selection;
			if (empty) return;
			if (insertOnNextLine) editor.chain().focus().setTextSelection(to).insertContent("<br />").insertContent(contentHTML).run();
			else editor.chain().focus().deleteRange({
				from,
				to
			}).insertContent(contentHTML).run();
		},
		isEditorReadyToDiscard: () => editor?.storage?.utility?.uploadInProgress === false,
		isMenuItemActive: (props) => {
			const { itemKey } = props;
			const editorItems = getEditorMenuItems(editor);
			const getEditorMenuItem = (itemKey$1) => editorItems.find((item$1) => item$1.key === itemKey$1);
			const item = getEditorMenuItem(itemKey);
			if (!item) return false;
			return item.isActive(props);
		},
		listenToRealTimeUpdate: () => provider && {
			on: provider.on.bind(provider),
			off: provider.off.bind(provider)
		},
		onDocumentInfoChange: (callback) => {
			const handleDocumentInfoChange = () => {
				if (!editor?.storage) return;
				callback({
					characters: editor.storage.characterCount?.characters?.() ?? 0,
					paragraphs: getParagraphCount(editor?.state),
					words: editor.storage.characterCount?.words?.() ?? 0
				});
			};
			editor?.on("update", handleDocumentInfoChange);
			return () => {
				editor?.off("update", handleDocumentInfoChange);
			};
		},
		onHeadingChange: (callback) => {
			const handleHeadingChange = () => {
				if (!editor) return;
				const headings = editor.storage.headingsList?.headings;
				if (headings) callback(headings);
			};
			editor?.on("update", handleHeadingChange);
			return () => {
				editor?.off("update", handleHeadingChange);
			};
		},
		onStateChange: (callback) => {
			editor?.on("transaction", callback);
			return () => {
				editor?.off("transaction", callback);
			};
		},
		redo: () => editor?.commands.redo(),
		scrollToNodeViaDOMCoordinates({ pos, behavior = "smooth" }) {
			const resolvedPos = pos ?? editor?.state.selection.from;
			if (!editor || !resolvedPos) return;
			scrollToNodeViaDOMCoordinates(editor, resolvedPos, behavior);
		},
		setEditorValueAtCursorPosition: (content) => {
			if (editor?.state.selection) insertContentAtSavedSelection(editor, content);
		},
		setFocusAtPosition: (position) => {
			if (!editor || editor.isDestroyed) {
				console.error("Editor reference is not available or has been destroyed.");
				return;
			}
			try {
				const docSize = editor.state.doc.content.size;
				const safePosition = Math.max(0, Math.min(position, docSize));
				editor.chain().insertContentAt(safePosition, [{ type: CORE_EXTENSIONS.PARAGRAPH }]).focus().run();
			} catch (error) {
				console.error("An error occurred while setting focus at position:", error);
			}
		},
		setProviderDocument: (value) => {
			const document$1 = provider?.document;
			if (!document$1) return;
			Y.applyUpdate(document$1, value);
		},
		undo: () => editor?.commands.undo()
	};
};

//#endregion
//#region src/ce/helpers/asset-duplication.ts
const imageComponentHandler = ({ element, originalHtml }) => {
	const src = element.getAttribute("src");
	if (!src || src.startsWith("http")) return {
		modifiedHtml: originalHtml,
		shouldProcess: false
	};
	const originalTag = element.outerHTML;
	const newId = v4();
	element.setAttribute(ECustomImageAttributeNames.STATUS, ECustomImageStatus.DUPLICATING);
	element.setAttribute(ECustomImageAttributeNames.ID, newId);
	const modifiedTag = element.outerHTML;
	return {
		modifiedHtml: originalHtml.replaceAll(originalTag, modifiedTag),
		shouldProcess: true
	};
};
const assetDuplicationHandlers = { "image-component": imageComponentHandler };

//#endregion
//#region src/core/helpers/paste-asset.ts
const processAssetDuplication = (htmlContent) => {
	const tempDiv = document.createElement("div");
	tempDiv.innerHTML = htmlContent;
	let processedHtml = htmlContent;
	for (const [componentName, handler] of Object.entries(assetDuplicationHandlers)) {
		const elements = tempDiv.querySelectorAll(componentName);
		if (elements.length > 0) {
			elements.forEach((element) => {
				const result = handler({
					element,
					originalHtml: processedHtml
				});
				if (result.shouldProcess) processedHtml = result.modifiedHtml;
			});
			tempDiv.innerHTML = processedHtml;
		}
	}
	return { processedHtml };
};

//#endregion
//#region src/core/props.ts
const CoreEditorProps = (props) => {
	const { editorClassName } = props;
	return {
		attributes: { class: cn("prose prose-brand max-w-full prose-headings:font-display font-default focus:outline-none", editorClassName) },
		handleDOMEvents: { keydown: (_view, event) => {
			if ([
				"ArrowUp",
				"ArrowDown",
				"Enter"
			].includes(event.key)) {
				if (document.querySelector("#slash-command")) return true;
			}
		} },
		handlePaste: (view, event) => {
			if (!event.clipboardData) return false;
			const htmlContent = event.clipboardData.getData("text/plane-editor-html");
			if (!htmlContent) return false;
			const { processedHtml } = processAssetDuplication(htmlContent);
			view.pasteHTML(processedHtml);
			return true;
		}
	};
};

//#endregion
//#region src/core/hooks/use-editor.ts
const useEditor$1 = (props) => {
	const { autofocus = false, disabledExtensions, editable = true, editorClassName = "", editorProps = {}, enableHistory, extendedEditorProps, extensions = [], fileHandler, flaggedExtensions, forwardedRef, getEditorMetaData, handleEditorReady, id = "", initialValue, isTouchDevice, mentionHandler, onAssetChange, onChange, onEditorFocus, onTransaction, placeholder, showPlaceholderOnEmpty, tabIndex, provider, value } = props;
	const editor = useEditor({
		editable,
		immediatelyRender: false,
		shouldRerenderOnTransaction: false,
		autofocus,
		parseOptions: { preserveWhitespace: true },
		editorProps: {
			...CoreEditorProps({ editorClassName }),
			...editorProps
		},
		extensions: [...CoreEditorExtensions({
			disabledExtensions,
			editable,
			enableHistory,
			extendedEditorProps,
			fileHandler,
			flaggedExtensions,
			getEditorMetaData,
			isTouchDevice,
			mentionHandler,
			placeholder,
			showPlaceholderOnEmpty,
			tabIndex,
			provider
		}), ...extensions],
		content: initialValue,
		onCreate: () => handleEditorReady?.(true),
		onTransaction: () => {
			onTransaction?.();
		},
		onUpdate: ({ editor: editor$1, transaction }) => {
			const isMigrationUpdate = transaction?.getMeta("uniqueIdOnlyChange") === true;
			onChange?.(editor$1.getJSON(), editor$1.getHTML(), { isMigrationUpdate });
		},
		onDestroy: () => handleEditorReady?.(false),
		onFocus: onEditorFocus
	}, [editable]);
	useEffect(() => {
		if (value == null) return;
		if (editor) {
			const { uploadInProgress: isUploadInProgress } = editor.storage.utility;
			if (!editor.isDestroyed && !isUploadInProgress) try {
				editor.commands.setContent(value, false, { preserveWhitespace: true });
				if (editor.state.selection) {
					const docLength = editor.state.doc.content.size;
					const relativePosition = Math.min(editor.state.selection.from, docLength - 1);
					editor.commands.setTextSelection(relativePosition);
				}
			} catch (error) {
				console.error("Error syncing editor content with external value:", error);
			}
		}
	}, [
		editor,
		value,
		id
	]);
	useEffect(() => {
		if (!editor) return;
		const assetsUploadStatus = fileHandler.assetsUploadStatus;
		editor.commands.updateAssetsUploadStatus?.(assetsUploadStatus);
	}, [editor, fileHandler.assetsUploadStatus]);
	const assetsList = useEditorState({
		editor,
		selector: ({ editor: editor$1 }) => ({ assets: editor$1?.storage.utility?.assetsList ?? [] })
	});
	useEffect(() => {
		const assets = assetsList?.assets;
		if (!assets || !onAssetChange) return;
		onAssetChange(assets);
	}, [assetsList?.assets, onAssetChange]);
	useImperativeHandle(forwardedRef, () => getEditorRefHelpers({
		editor,
		getEditorMetaData,
		provider
	}), [
		editor,
		getEditorMetaData,
		provider
	]);
	if (!editor) return null;
	return editor;
};

//#endregion
//#region src/core/hooks/use-editor-navigation.ts
/**
* Creates a title editor extension that enables keyboard navigation to the main editor
*
* @param getMainEditor Function to get the main editor instance
* @returns A Tiptap extension with keyboard shortcuts
*/
const createTitleNavigationExtension = (getMainEditor) => Extension.create({
	name: "titleEditorNavigation",
	priority: 10,
	addKeyboardShortcuts() {
		return {
			ArrowDown: () => {
				const mainEditor = getMainEditor();
				if (!mainEditor) return false;
				mainEditor.commands.focus("start");
				return true;
			},
			ArrowRight: ({ editor: titleEditor }) => {
				const mainEditor = getMainEditor();
				if (!mainEditor) return false;
				const { from, to } = titleEditor.state.selection;
				const documentLength = titleEditor.state.doc.content.size;
				if (from === to && to === documentLength - 1) {
					mainEditor.commands.focus("start");
					return true;
				}
				return false;
			},
			Enter: () => {
				const mainEditor = getMainEditor();
				if (!mainEditor) return false;
				mainEditor.chain().focus().insertContentAt(0, { type: "paragraph" }).run();
				return true;
			}
		};
	}
});
/**
* Creates a main editor extension that enables keyboard navigation to the title editor
*
* @param getTitleEditor Function to get the title editor instance
* @returns A Tiptap extension with keyboard shortcuts
*/
const createMainNavigationExtension = (getTitleEditor) => Extension.create({
	name: "mainEditorNavigation",
	priority: 10,
	addKeyboardShortcuts() {
		return {
			ArrowUp: ({ editor: mainEditor }) => {
				const titleEditor = getTitleEditor();
				if (!titleEditor) return false;
				const { from, to } = mainEditor.state.selection;
				if (from === 1 && to === 1) {
					titleEditor.commands.focus("end");
					return true;
				}
				return false;
			},
			ArrowLeft: ({ editor: mainEditor }) => {
				const titleEditor = getTitleEditor();
				if (!titleEditor) return false;
				const { from, to } = mainEditor.state.selection;
				if (from === 1 && to === 1) {
					titleEditor.commands.focus("end");
					return true;
				}
				return false;
			},
			Backspace: ({ editor }) => {
				const titleEditor = getTitleEditor();
				if (!titleEditor) return false;
				const { from, to, empty } = editor.state.selection;
				if (from === 1 && to === 1 && empty) {
					const firstNode = editor.state.doc.firstChild;
					if (firstNode && firstNode.type.name === "paragraph") if (firstNode.content.size === 0) {
						editor.commands.deleteNode("paragraph");
						setTimeout(() => titleEditor.commands.focus("end"), 0);
						return true;
					} else {
						titleEditor.commands.focus("end");
						return true;
					}
				}
				return false;
			}
		};
	}
});
/**
* Hook to manage navigation between title and main editors
*
* Creates extension factories for keyboard navigation between editors
* and maintains references to both editors
*
* @returns Object with editor setters and extensions
*/
const useEditorNavigation = () => {
	const titleEditorRef = useRef(null);
	const mainEditorRef = useRef(null);
	const getTitleEditor = useCallback(() => titleEditorRef.current, []);
	const getMainEditor = useCallback(() => mainEditorRef.current, []);
	return {
		setTitleEditor: useCallback((editor) => {
			titleEditorRef.current = editor;
		}, []),
		setMainEditor: useCallback((editor) => {
			mainEditorRef.current = editor;
		}, []),
		titleNavigationExtension: createTitleNavigationExtension(getMainEditor),
		mainNavigationExtension: createMainNavigationExtension(getTitleEditor)
	};
};

//#endregion
//#region src/core/hooks/use-title-editor.ts
/**
* A hook that creates a title editor with collaboration features
* Uses the same Y.Doc as the main editor but a different field
*/
const useTitleEditor = (props) => {
	const { editable = true, id, initialValue = "", extensions, provider, updatePageProperties, titleRef, getEditorMetaData } = props;
	const docKey = provider?.document?.guid ?? id;
	const editor = useEditor({
		onUpdate: ({ editor: editor$1 }) => {
			updatePageProperties?.(id, "property_updated", { name: editor$1?.getText() });
		},
		editable,
		immediatelyRender: false,
		shouldRerenderOnTransaction: false,
		extensions: [
			...TitleExtensions,
			...extensions ?? [],
			Placeholder.configure({
				placeholder: () => "Untitled",
				includeChildren: true,
				showOnlyWhenEditable: false
			})
		],
		content: typeof initialValue === "string" && initialValue.trim() !== "" ? initialValue : "<h1></h1>"
	}, [
		editable,
		initialValue,
		docKey
	]);
	useImperativeHandle(titleRef, () => ({
		...getEditorRefHelpers({
			editor,
			provider,
			getEditorMetaData: getEditorMetaData ?? (() => ({
				file_assets: [],
				user_mentions: []
			}))
		}),
		clearEditor: (emitUpdate = false) => {
			editor?.chain().setMeta(CORE_EDITOR_META.SKIP_FILE_DELETION, true).setMeta(CORE_EDITOR_META.INTENTIONAL_DELETION, true).clearContent(emitUpdate).run();
		},
		setEditorValue: (content) => {
			editor?.commands.setContent(content, false);
		}
	}));
	return editor;
};

//#endregion
//#region src/core/hooks/use-collaborative-editor.ts
const useCollaborativeEditor = (props) => {
	const { provider, onAssetChange, onChange, onTransaction, disabledExtensions, editable, editorClassName = "", editorProps = {}, extendedEditorProps, extensions = [], fileHandler, flaggedExtensions, forwardedRef, getEditorMetaData, handleEditorReady, id, mentionHandler, dragDropEnabled = true, isTouchDevice, onEditorFocus, placeholder, showPlaceholderOnEmpty, tabIndex, titleRef, updatePageProperties, user, actions } = props;
	const { mainNavigationExtension, titleNavigationExtension, setMainEditor, setTitleEditor } = useEditorNavigation();
	const editorExtensions = useMemo(() => [
		SideMenuExtension({
			aiEnabled: !disabledExtensions?.includes("ai"),
			dragDropEnabled
		}),
		HeadingListExtension,
		Collaboration.configure({
			document: provider.document,
			field: "default"
		}),
		...extensions,
		...DocumentEditorAdditionalExtensions({
			disabledExtensions,
			extendedEditorProps,
			fileHandler,
			flaggedExtensions,
			isEditable: editable,
			provider,
			userDetails: user
		}),
		mainNavigationExtension
	], [
		provider,
		disabledExtensions,
		dragDropEnabled,
		extensions,
		extendedEditorProps,
		fileHandler,
		flaggedExtensions,
		editable,
		user,
		mainNavigationExtension
	]);
	const editor = useEditor$1(useMemo(() => ({
		disabledExtensions,
		extendedEditorProps,
		id,
		editable,
		editorProps,
		editorClassName,
		enableHistory: false,
		extensions: editorExtensions,
		fileHandler,
		flaggedExtensions,
		forwardedRef,
		getEditorMetaData,
		handleEditorReady,
		isTouchDevice,
		mentionHandler,
		onAssetChange,
		onChange,
		onEditorFocus,
		onTransaction,
		placeholder,
		showPlaceholderOnEmpty,
		provider,
		tabIndex
	}), [
		provider,
		disabledExtensions,
		extendedEditorProps,
		id,
		editable,
		editorProps,
		editorClassName,
		editorExtensions,
		fileHandler,
		flaggedExtensions,
		forwardedRef,
		getEditorMetaData,
		handleEditorReady,
		isTouchDevice,
		mentionHandler,
		onAssetChange,
		onChange,
		onEditorFocus,
		onTransaction,
		placeholder,
		showPlaceholderOnEmpty,
		tabIndex
	]));
	const titleExtensions = useMemo(() => [Collaboration.configure({
		document: provider.document,
		field: "title"
	}), titleNavigationExtension], [provider, titleNavigationExtension]);
	const titleEditor = useTitleEditor(useMemo(() => ({
		id,
		editable,
		provider,
		titleRef,
		updatePageProperties,
		extensions: titleExtensions,
		extendedEditorProps,
		getEditorMetaData
	}), [
		provider,
		id,
		editable,
		titleRef,
		updatePageProperties,
		titleExtensions,
		extendedEditorProps,
		getEditorMetaData
	]));
	useEffect(() => {
		if (editor && titleEditor) {
			setMainEditor(editor);
			setTitleEditor(titleEditor);
		}
	}, [
		editor,
		titleEditor,
		setMainEditor,
		setTitleEditor
	]);
	return {
		editor,
		titleEditor
	};
};

//#endregion
//#region src/core/components/editors/document/collaborative-editor.tsx
const CollaborativeDocumentEditorInner = (props) => {
	const { aiHandler, bubbleMenuEnabled = true, containerClassName, documentLoaderClassName, extensions = [], disabledExtensions, displayConfig = DEFAULT_DISPLAY_CONFIG, editable, editorClassName = "", editorProps, extendedEditorProps, fileHandler, flaggedExtensions, forwardedRef, getEditorMetaData, handleEditorReady, id, dragDropEnabled = true, isTouchDevice, mentionHandler, onAssetChange, onChange, onEditorFocus, onTransaction, placeholder, tabIndex, user, extendedDocumentEditorProps, titleRef, updatePageProperties, isFetchingFallbackBinary } = props;
	const { provider, state, actions } = useCollaboration();
	const { editor, titleEditor } = useCollaborativeEditor({
		provider,
		disabledExtensions,
		editable,
		editorClassName,
		editorProps,
		extendedEditorProps,
		extensions,
		fileHandler,
		flaggedExtensions,
		getEditorMetaData,
		forwardedRef,
		handleEditorReady,
		id,
		dragDropEnabled,
		isTouchDevice,
		mentionHandler,
		onAssetChange,
		onChange,
		onEditorFocus,
		onTransaction,
		placeholder,
		tabIndex,
		titleRef,
		updatePageProperties,
		user,
		actions
	});
	const editorContainerClassNames = getEditorClassNames({
		noBorder: true,
		borderOnFocus: false,
		containerClassName
	});
	const shouldShowSyncLoader = state.isCacheReady && !state.hasCachedContent && !state.isServerSynced;
	const shouldWaitForFallbackBinary = isFetchingFallbackBinary && !state.hasCachedContent && state.isServerDisconnected;
	const isLoading = shouldShowSyncLoader || shouldWaitForFallbackBinary;
	const showContentSkeleton = !state.isDocReady;
	if (!editor || !titleEditor) return null;
	return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", {
		className: cn("transition-opacity duration-200", showContentSkeleton && !isLoading && "opacity-0 pointer-events-none"),
		children: /* @__PURE__ */ jsx(PageRenderer, {
			aiHandler,
			bubbleMenuEnabled,
			displayConfig,
			documentLoaderClassName,
			disabledExtensions,
			extendedDocumentEditorProps,
			editor,
			flaggedExtensions,
			titleEditor,
			editorContainerClassName: cn(editorContainerClassNames, "document-editor"),
			extendedEditorProps,
			id,
			isLoading,
			isTouchDevice: !!isTouchDevice,
			tabIndex,
			provider,
			state
		})
	}) });
};
const CollaborativeDocumentEditor = (props) => {
	const { id, realtimeConfig, serverHandler, user } = props;
	const token = useMemo(() => JSON.stringify(user), [user]);
	return /* @__PURE__ */ jsx(CollaborationProvider, {
		docId: id,
		serverUrl: realtimeConfig.url,
		authToken: token,
		onStateChange: serverHandler?.onStateChange,
		children: /* @__PURE__ */ jsx(CollaborativeDocumentEditorInner, { ...props })
	});
};
const CollaborativeDocumentEditorWithRef = React.forwardRef((props, ref) => /* @__PURE__ */ jsx(CollaborativeDocumentEditor, {
	...props,
	forwardedRef: ref
}, props.id));
CollaborativeDocumentEditorWithRef.displayName = "CollaborativeDocumentEditorWithRef";

//#endregion
//#region src/core/components/editors/document/editor.tsx
function DocumentEditor(props) {
	const { bubbleMenuEnabled = false, containerClassName, disabledExtensions, displayConfig = DEFAULT_DISPLAY_CONFIG, editable, editorClassName = "", extendedEditorProps, fileHandler, flaggedExtensions, forwardedRef, getEditorMetaData, handleEditorReady, id, isTouchDevice, mentionHandler, onChange, user, value } = props;
	const editor = useEditor$1({
		disabledExtensions,
		editable,
		editorClassName,
		enableHistory: true,
		extendedEditorProps,
		extensions: useMemo(() => {
			const additionalExtensions = [];
			additionalExtensions.push(SideMenuExtension({
				aiEnabled: !disabledExtensions?.includes("ai"),
				dragDropEnabled: true
			}), HeadingListExtension, ...DocumentEditorAdditionalExtensions({
				disabledExtensions,
				extendedEditorProps,
				flaggedExtensions,
				isEditable: editable,
				fileHandler,
				userDetails: user ?? {
					id: "",
					name: "",
					color: ""
				}
			}));
			return additionalExtensions;
		}, [
			disabledExtensions,
			editable,
			extendedEditorProps,
			fileHandler,
			flaggedExtensions,
			user
		]),
		fileHandler,
		flaggedExtensions,
		forwardedRef,
		getEditorMetaData,
		handleEditorReady,
		id,
		initialValue: value,
		mentionHandler,
		onChange
	});
	const editorContainerClassName = getEditorClassNames({ containerClassName });
	if (!editor) return null;
	return /* @__PURE__ */ jsx(PageRenderer, {
		bubbleMenuEnabled,
		displayConfig,
		editor,
		editorContainerClassName: cn(editorContainerClassName, "document-editor"),
		extendedEditorProps,
		id,
		flaggedExtensions,
		disabledExtensions,
		isTouchDevice: !!isTouchDevice
	});
}
const DocumentEditorWithRef = forwardRef(function DocumentEditorWithRef$1(props, ref) {
	return /* @__PURE__ */ jsx(DocumentEditor, {
		...props,
		forwardedRef: ref
	});
});
DocumentEditorWithRef.displayName = "DocumentEditorWithRef";

//#endregion
//#region src/core/components/editors/document/loader.tsx
function DocumentContentLoader(props) {
	const { className } = props;
	return /* @__PURE__ */ jsx("div", {
		className: cn("document-editor-loader", className),
		children: /* @__PURE__ */ jsx(Loader, {
			className: "relative space-y-4",
			children: /* @__PURE__ */ jsxs("div", {
				className: "space-y-2",
				children: [
					/* @__PURE__ */ jsx("div", {
						className: "py-2",
						children: /* @__PURE__ */ jsx(Loader.Item, {
							width: "100%",
							height: "36px"
						})
					}),
					/* @__PURE__ */ jsx(Loader.Item, {
						width: "80%",
						height: "22px"
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "relative flex items-center gap-2",
						children: [/* @__PURE__ */ jsx(Loader.Item, {
							width: "30px",
							height: "30px"
						}), /* @__PURE__ */ jsx(Loader.Item, {
							width: "30%",
							height: "22px"
						})]
					}),
					/* @__PURE__ */ jsx("div", {
						className: "py-2",
						children: /* @__PURE__ */ jsx(Loader.Item, {
							width: "60%",
							height: "36px"
						})
					}),
					/* @__PURE__ */ jsx(Loader.Item, {
						width: "70%",
						height: "22px"
					}),
					/* @__PURE__ */ jsx(Loader.Item, {
						width: "30%",
						height: "22px"
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "relative flex items-center gap-2",
						children: [/* @__PURE__ */ jsx(Loader.Item, {
							width: "30px",
							height: "30px"
						}), /* @__PURE__ */ jsx(Loader.Item, {
							width: "30%",
							height: "22px"
						})]
					}),
					/* @__PURE__ */ jsx("div", {
						className: "py-2",
						children: /* @__PURE__ */ jsx(Loader.Item, {
							width: "50%",
							height: "30px"
						})
					}),
					/* @__PURE__ */ jsx(Loader.Item, {
						width: "100%",
						height: "22px"
					}),
					/* @__PURE__ */ jsx("div", {
						className: "py-2",
						children: /* @__PURE__ */ jsx(Loader.Item, {
							width: "30%",
							height: "30px"
						})
					}),
					/* @__PURE__ */ jsx(Loader.Item, {
						width: "30%",
						height: "22px"
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "relative flex items-center gap-2",
						children: [/* @__PURE__ */ jsx("div", {
							className: "py-2",
							children: /* @__PURE__ */ jsx(Loader.Item, {
								width: "30px",
								height: "30px"
							})
						}), /* @__PURE__ */ jsx(Loader.Item, {
							width: "30%",
							height: "22px"
						})]
					})
				]
			})
		})
	});
}

//#endregion
//#region src/core/components/editors/document/page-renderer.tsx
function PageRenderer(props) {
	const { bubbleMenuEnabled, disabledExtensions, displayConfig, documentLoaderClassName, editor, editorContainerClassName, extendedEditorProps, flaggedExtensions, id, isLoading, isTouchDevice, tabIndex, titleEditor, provider, state } = props;
	return /* @__PURE__ */ jsx("div", {
		className: cn("frame-renderer flex-grow w-full", { "wide-layout": displayConfig.wideLayout }),
		children: isLoading ? /* @__PURE__ */ jsx(DocumentContentLoader, { className: documentLoaderClassName }) : /* @__PURE__ */ jsxs(Fragment, { children: [titleEditor && /* @__PURE__ */ jsx("div", {
			className: "relative w-full py-3",
			children: /* @__PURE__ */ jsx(EditorContainer, {
				editor: titleEditor,
				id: id + "-title",
				isTouchDevice,
				editorContainerClassName: "page-title-editor bg-transparent py-3 border-none",
				displayConfig,
				children: /* @__PURE__ */ jsx(EditorContentWrapper, {
					editor: titleEditor,
					id: id + "-title",
					tabIndex,
					className: "no-scrollbar placeholder-custom-text-400 bg-transparent tracking-[-2%] font-bold text-[2rem] leading-[2.375rem] w-full outline-none p-0 border-none resize-none rounded-none"
				})
			})
		}), /* @__PURE__ */ jsxs(EditorContainer, {
			displayConfig,
			editor,
			editorContainerClassName,
			id,
			isTouchDevice,
			provider,
			state,
			children: [/* @__PURE__ */ jsx(EditorContentWrapper, {
				editor,
				id,
				tabIndex
			}), editor.isEditable && !isTouchDevice && /* @__PURE__ */ jsxs("div", { children: [bubbleMenuEnabled && /* @__PURE__ */ jsx(EditorBubbleMenu, {
				editor,
				disabledExtensions,
				extendedEditorProps,
				flaggedExtensions
			}), /* @__PURE__ */ jsx(BlockMenu, {
				editor,
				flaggedExtensions,
				disabledExtensions
			})] })]
		})] })
	});
}

//#endregion
//#region src/core/components/editors/editor-content.tsx
const EditorContentWrapper = (props) => {
	const { editor, className, children, tabIndex, id } = props;
	return /* @__PURE__ */ jsxs("div", {
		tabIndex,
		onFocus: () => editor?.chain().focus(void 0, { scrollIntoView: false }).run(),
		className,
		children: [/* @__PURE__ */ jsx(EditorContent, {
			editor,
			id
		}), children]
	});
};

//#endregion
//#region src/core/components/editors/editor-wrapper.tsx
function EditorWrapper(props) {
	const { children, containerClassName, disabledExtensions, displayConfig = DEFAULT_DISPLAY_CONFIG, editable, editorClassName = "", editorProps, extendedEditorProps, extensions, getEditorMetaData, id, initialValue, isTouchDevice, fileHandler, flaggedExtensions, forwardedRef, mentionHandler, onChange, onEditorFocus, onTransaction, handleEditorReady, autofocus, placeholder, showPlaceholderOnEmpty, tabIndex, value } = props;
	const editor = useEditor$1({
		editable,
		disabledExtensions,
		editorClassName,
		editorProps,
		enableHistory: true,
		extendedEditorProps,
		extensions,
		fileHandler,
		flaggedExtensions,
		forwardedRef,
		getEditorMetaData,
		id,
		isTouchDevice,
		initialValue,
		mentionHandler,
		onChange,
		onEditorFocus,
		onTransaction,
		handleEditorReady,
		autofocus,
		placeholder,
		showPlaceholderOnEmpty,
		tabIndex,
		value
	});
	const editorContainerClassName = getEditorClassNames({
		noBorder: true,
		borderOnFocus: false,
		containerClassName
	});
	if (!editor) return null;
	return /* @__PURE__ */ jsxs(EditorContainer, {
		displayConfig,
		editor,
		editorContainerClassName,
		id,
		isTouchDevice: !!isTouchDevice,
		children: [children?.(editor), /* @__PURE__ */ jsx("div", {
			className: "flex flex-col",
			children: /* @__PURE__ */ jsx(EditorContentWrapper, {
				editor,
				id,
				tabIndex
			})
		})]
	});
}

//#endregion
//#region src/core/components/editors/lite-text/editor.tsx
function LiteTextEditor(props) {
	const { onEnterKeyPress, disabledExtensions, extensions: externalExtensions = [] } = props;
	const extensions = useMemo(() => {
		const resolvedExtensions = [...externalExtensions];
		if (!disabledExtensions?.includes("enter-key")) resolvedExtensions.push(EnterKeyExtension(onEnterKeyPress));
		return resolvedExtensions;
	}, [
		externalExtensions,
		disabledExtensions,
		onEnterKeyPress
	]);
	return /* @__PURE__ */ jsx(EditorWrapper, {
		...props,
		extensions
	});
}
const LiteTextEditorWithRef = forwardRef(function LiteTextEditorWithRef$1(props, ref) {
	return /* @__PURE__ */ jsx(LiteTextEditor, {
		...props,
		forwardedRef: ref
	});
});
LiteTextEditorWithRef.displayName = "LiteTextEditorWithRef";

//#endregion
//#region src/ce/extensions/rich-text-extensions.tsx
const extensionRegistry = [{
	isEnabled: (disabledExtensions) => !disabledExtensions.includes("slash-commands"),
	getExtension: ({ disabledExtensions, flaggedExtensions }) => SlashCommands({
		disabledExtensions,
		flaggedExtensions
	})
}];
function RichTextEditorAdditionalExtensions(props) {
	const { disabledExtensions, flaggedExtensions } = props;
	return extensionRegistry.filter((config) => config.isEnabled(disabledExtensions, flaggedExtensions)).map((config) => config.getExtension(props)).filter((extension) => extension !== void 0);
}

//#endregion
//#region src/core/components/editors/rich-text/editor.tsx
function RichTextEditor(props) {
	const { bubbleMenuEnabled = true, disabledExtensions, dragDropEnabled, extensions: externalExtensions = [], fileHandler, flaggedExtensions, extendedEditorProps, workItemIdentifier } = props;
	const getExtensions = useCallback(() => {
		return [
			...externalExtensions,
			SideMenuExtension({
				aiEnabled: false,
				dragDropEnabled: !!dragDropEnabled
			}),
			...RichTextEditorAdditionalExtensions({
				disabledExtensions,
				fileHandler,
				flaggedExtensions,
				extendedEditorProps
			})
		];
	}, [
		dragDropEnabled,
		disabledExtensions,
		externalExtensions,
		fileHandler,
		flaggedExtensions,
		extendedEditorProps
	]);
	return /* @__PURE__ */ jsx(EditorWrapper, {
		...props,
		extensions: getExtensions(),
		children: (editor) => /* @__PURE__ */ jsxs(Fragment, { children: [editor && bubbleMenuEnabled && /* @__PURE__ */ jsx(EditorBubbleMenu, {
			disabledExtensions,
			editor,
			extendedEditorProps,
			flaggedExtensions
		}), /* @__PURE__ */ jsx(BlockMenu, {
			editor,
			flaggedExtensions,
			disabledExtensions,
			workItemIdentifier
		})] })
	});
}
const RichTextEditorWithRef = forwardRef(function RichTextEditorWithRef$1(props, ref) {
	return /* @__PURE__ */ jsx(RichTextEditor, {
		...props,
		forwardedRef: ref
	});
});
RichTextEditorWithRef.displayName = "RichTextEditorWithRef";

//#endregion
//#region src/core/components/links/link-edit-view.tsx
function InputView({ label, value, placeholder, onChange, autoFocus }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "flex flex-col gap-1",
		children: [/* @__PURE__ */ jsx("label", {
			className: "inline-block font-semibold text-xs text-custom-text-400",
			children: label
		}), /* @__PURE__ */ jsx("input", {
			placeholder,
			onClick: (e) => e.stopPropagation(),
			className: "w-[280px] outline-none bg-custom-background-90 text-custom-text-900 text-sm border border-custom-border-300 rounded-md p-2",
			value,
			onChange: (e) => onChange(e.target.value),
			autoFocus
		})]
	});
}
function LinkEditView({ viewProps }) {
	const { editor, from, to, url: initialUrl, text: initialText, closeLinkView } = viewProps;
	const [positionRef] = useState({
		from,
		to
	});
	const [localUrl, setLocalUrl] = useState(initialUrl);
	const [localText, setLocalText] = useState(initialText ?? "");
	const [linkRemoved, setLinkRemoved] = useState(false);
	const hasSubmitted = useRef(false);
	const removeLink = useCallback(() => {
		editor.view.dispatch(editor.state.tr.removeMark(from, to, editor.schema.marks.link));
		setLinkRemoved(true);
		closeLinkView();
	}, [
		editor,
		from,
		to,
		closeLinkView
	]);
	useEffect(() => () => {
		if (!hasSubmitted.current && !linkRemoved && initialUrl === "") try {
			removeLink();
		} catch (e) {
			console.error("Error removing link", e);
		}
	}, [
		removeLink,
		linkRemoved,
		initialUrl
	]);
	useEffect(() => {
		setLocalUrl(initialUrl);
	}, [initialUrl]);
	useEffect(() => {
		if (initialText) setLocalText(initialText);
	}, [initialText]);
	const handleTextChange = useCallback((value) => {
		if (value.trim() !== "") setLocalText(value);
	}, []);
	const applyChanges = useCallback(() => {
		if (linkRemoved) return false;
		hasSubmitted.current = true;
		const { url, isValid } = isValidHttpUrl(localUrl);
		if (to >= editor.state.doc.content.size || !isValid) return false;
		const tr = editor.state.tr;
		tr.removeMark(from, to, editor.schema.marks.link).addMark(from, to, editor.schema.marks.link.create({ href: url }));
		editor.view.dispatch(tr);
		if (localText !== initialText) {
			const node = editor.view.state.doc.nodeAt(from);
			if (!node || !node.marks) return false;
			editor.chain().setTextSelection(from).deleteRange({
				from: positionRef.from,
				to: positionRef.to
			}).insertContent(localText).setTextSelection({
				from,
				to: from + localText.length
			}).run();
			node.marks.forEach((mark) => {
				editor.chain().setMark(mark.type.name, mark.attrs).run();
			});
		}
		return true;
	}, [
		linkRemoved,
		positionRef,
		editor,
		from,
		to,
		initialText,
		localText,
		localUrl
	]);
	return /* @__PURE__ */ jsxs("div", {
		onKeyDown: useCallback((e) => {
			if (e.key === "Enter") {
				e.stopPropagation();
				if (applyChanges()) {
					closeLinkView();
					setLocalUrl("");
					setLocalText("");
				}
			}
		}, [applyChanges, closeLinkView]),
		className: "shadow-md rounded p-2 flex flex-col gap-3 bg-custom-background-90 border-custom-border-100 border-2 animate-in fade-in translate-y-1",
		style: { transition: "all 0.1s cubic-bezier(.55, .085, .68, .53)" },
		tabIndex: 0,
		children: [
			/* @__PURE__ */ jsx(InputView, {
				label: "URL",
				placeholder: "Enter or paste URL",
				value: localUrl,
				onChange: setLocalUrl,
				autoFocus: true
			}),
			/* @__PURE__ */ jsx(InputView, {
				label: "Text",
				placeholder: "Enter Text to display",
				value: localText,
				onChange: handleTextChange
			}),
			/* @__PURE__ */ jsx("div", { className: "mb-1 bg-custom-border-300 h-[1px] w-full gap-2" }),
			/* @__PURE__ */ jsxs("div", {
				className: "flex text-sm text-custom-text-800 gap-2 items-center",
				children: [/* @__PURE__ */ jsx(Link2Off, {
					size: 14,
					className: "inline-block"
				}), /* @__PURE__ */ jsx("button", {
					onClick: removeLink,
					className: "cursor-pointer hover:text-custom-text-400 transition-colors",
					children: "Remove Link"
				})]
			})
		]
	});
}

//#endregion
//#region src/core/components/links/link-preview.tsx
function LinkPreview({ viewProps, switchView }) {
	const { editor, from, to, url } = viewProps;
	const removeLink = () => {
		editor.view.dispatch(editor.state.tr.removeMark(from, to, editor.schema.marks.link));
		viewProps.closeLinkView();
	};
	const copyLinkToClipboard = () => {
		navigator.clipboard.writeText(url);
		viewProps.closeLinkView();
	};
	return /* @__PURE__ */ jsx("div", {
		className: "absolute left-0 top-0 max-w-max animate-in fade-in translate-y-1",
		style: { transition: "all 0.2s cubic-bezier(.55, .085, .68, .53)" },
		children: /* @__PURE__ */ jsxs("div", {
			className: "shadow-md items-center rounded p-2 flex gap-3 bg-custom-background-90 border-custom-border-100 border-2 text-custom-text-300 text-xs",
			children: [
				/* @__PURE__ */ jsx(GlobeIcon, {
					size: 14,
					className: "inline-block"
				}),
				/* @__PURE__ */ jsx("p", { children: url?.length > 40 ? url.slice(0, 40) + "..." : url }),
				/* @__PURE__ */ jsxs("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ jsx("button", {
						onClick: copyLinkToClipboard,
						className: "cursor-pointer hover:text-custom-text-100 transition-colors",
						children: /* @__PURE__ */ jsx(Copy, {
							size: 14,
							className: "inline-block"
						})
					}), editor.isEditable && /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("button", {
						onClick: () => switchView("LinkEditView"),
						className: "cursor-pointer hover:text-custom-text-100 transition-colors",
						children: /* @__PURE__ */ jsx(PencilIcon, {
							size: 14,
							className: "inline-block"
						})
					}), /* @__PURE__ */ jsx("button", {
						onClick: removeLink,
						className: "cursor-pointer hover:text-custom-text-100 transition-colors",
						children: /* @__PURE__ */ jsx(Link2Off, {
							size: 14,
							className: "inline-block"
						})
					})] })]
				})
			]
		})
	});
}

//#endregion
//#region src/core/components/links/link-view.tsx
function LinkView(props) {
	const [currentView, setCurrentView] = useState(props.view ?? "LinkPreview");
	const [prevFrom, setPrevFrom] = useState(props.from);
	const switchView = (view) => {
		setCurrentView(view);
	};
	useEffect(() => {
		if (props.from !== prevFrom) {
			setCurrentView("LinkPreview");
			setPrevFrom(props.from);
		}
	}, [prevFrom, props.from]);
	return /* @__PURE__ */ jsxs(Fragment, { children: [currentView === "LinkPreview" && /* @__PURE__ */ jsx(LinkPreview, {
		viewProps: props,
		switchView
	}), currentView === "LinkEditView" && /* @__PURE__ */ jsx(LinkEditView, {
		viewProps: props,
		switchView
	})] });
}

//#endregion
//#region src/core/components/editors/link-view-container.tsx
function LinkViewContainer({ editor, containerRef }) {
	const [linkViewProps, setLinkViewProps] = useState();
	const [isOpen, setIsOpen] = useState(false);
	const [virtualElement, setVirtualElement] = useState(null);
	const hoverTimeoutRef = useRef(null);
	const editorState = useEditorState({
		editor,
		selector: ({ editor: editor$1 }) => ({ linkExtensionStorage: editor$1.storage.link })
	});
	const { refs, floatingStyles, context } = useFloating({
		open: isOpen,
		onOpenChange: setIsOpen,
		elements: { reference: virtualElement },
		middleware: [
			flip({ fallbackPlacements: ["top", "bottom"] }),
			shift({ padding: 5 }),
			hide()
		],
		whileElementsMounted: autoUpdate,
		placement: "bottom-start"
	});
	const { getReferenceProps, getFloatingProps } = useInteractions([useDismiss(context)]);
	const clearHoverTimeout = useCallback(() => {
		if (hoverTimeoutRef.current) {
			window.clearTimeout(hoverTimeoutRef.current);
			hoverTimeoutRef.current = null;
		}
	}, []);
	const setCloseTimeout = useCallback(() => {
		clearHoverTimeout();
		hoverTimeoutRef.current = window.setTimeout(() => {
			setIsOpen(false);
			editorState.linkExtensionStorage.isPreviewOpen = false;
		}, 400);
	}, [clearHoverTimeout, editorState.linkExtensionStorage]);
	const handleLinkHover = useCallback((event) => {
		if (!editor || editorState.linkExtensionStorage?.isBubbleMenuOpen) return;
		const target = event.target?.closest("a");
		if (!target) return;
		const referenceProps = getReferenceProps();
		Object.entries(referenceProps).forEach(([key, value]) => {
			target.setAttribute(key, value);
		});
		const view = editor.view;
		if (!view) return;
		try {
			const pos = view.posAtDOM(target, 0);
			if (pos === void 0 || pos < 0) return;
			const node = view.state.doc.nodeAt(pos);
			if (!node) return;
			const linkMark = node.marks?.find((mark) => mark.type.name === "link");
			if (!linkMark) return;
			setVirtualElement(target);
			clearHoverTimeout();
			if (!isOpen || linkViewProps && (linkViewProps.from !== pos || linkViewProps.to !== pos + node.nodeSize)) {
				setLinkViewProps({
					view: "LinkPreview",
					url: linkMark.attrs.href,
					text: node.text || "",
					editor,
					from: pos,
					to: pos + node.nodeSize,
					closeLinkView: () => {
						setIsOpen(false);
						editorState.linkExtensionStorage.isPreviewOpen = false;
					}
				});
				setIsOpen(true);
			}
		} catch (error) {
			console.error("Error handling link hover:", error);
		}
	}, [
		editor,
		editorState.linkExtensionStorage,
		getReferenceProps,
		isOpen,
		linkViewProps,
		clearHoverTimeout
	]);
	const handleFloatingMouseEnter = useCallback(() => {
		clearHoverTimeout();
	}, [clearHoverTimeout]);
	const handleFloatingMouseLeave = useCallback(() => {
		setCloseTimeout();
	}, [setCloseTimeout]);
	const handleContainerMouseEnter = useCallback(() => {
		clearHoverTimeout();
	}, [clearHoverTimeout]);
	const handleContainerMouseLeave = useCallback((event) => {
		if (!editor || !isOpen) return;
		const relatedTarget = event.relatedTarget;
		const container = containerRef.current;
		const floatingElement = refs.floating;
		if (container && relatedTarget && !container.contains(relatedTarget) && (!floatingElement || !floatingElement.current?.contains(relatedTarget))) setCloseTimeout();
	}, [
		editor,
		isOpen,
		setCloseTimeout,
		refs.floating
	]);
	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;
		container.addEventListener("mouseover", handleLinkHover);
		container.addEventListener("mouseenter", handleContainerMouseEnter);
		container.addEventListener("mouseleave", handleContainerMouseLeave);
		return () => {
			container.removeEventListener("mouseover", handleLinkHover);
			container.removeEventListener("mouseenter", handleContainerMouseEnter);
			container.removeEventListener("mouseleave", handleContainerMouseLeave);
		};
	}, [
		handleLinkHover,
		handleContainerMouseEnter,
		handleContainerMouseLeave
	]);
	useEffect(() => () => clearHoverTimeout(), [clearHoverTimeout]);
	useEffect(() => {
		if (editorState.linkExtensionStorage?.isBubbleMenuOpen && isOpen) setIsOpen(false);
	}, [editorState.linkExtensionStorage, isOpen]);
	return /* @__PURE__ */ jsx(Fragment, { children: isOpen && linkViewProps && virtualElement && /* @__PURE__ */ jsx("div", {
		ref: refs.setFloating,
		style: {
			...floatingStyles,
			zIndex: 100
		},
		...getFloatingProps(),
		onMouseEnter: handleFloatingMouseEnter,
		onMouseLeave: handleFloatingMouseLeave,
		children: /* @__PURE__ */ jsx(LinkView, {
			...linkViewProps,
			style: floatingStyles
		})
	}) });
}

//#endregion
//#region src/ce/components/link-container.tsx
function LinkContainer({ editor, containerRef }) {
	return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(LinkViewContainer, {
		editor,
		containerRef
	}) });
}

//#endregion
//#region src/core/plugins/highlight.ts
const nodeHighlightPluginKey = new PluginKey("nodeHighlight");

//#endregion
//#region src/core/components/editors/editor-container.tsx
const EditorContainer = (props) => {
	const { children, displayConfig, editor, editorContainerClassName, id, isTouchDevice, provider, state } = props;
	const containerRef = useRef(null);
	const hasScrolledOnce = useRef(false);
	const scrollToNode$1 = useCallback((nodeId) => {
		if (!editor) return false;
		const doc = editor.state.doc;
		let pos = null;
		doc.descendants((node, position) => {
			if (node.attrs && node.attrs.id === nodeId) {
				pos = position;
				return false;
			}
		});
		if (pos === null) return false;
		const nodePosition = pos;
		const tr = editor.state.tr.setMeta(nodeHighlightPluginKey, { nodeId });
		editor.view.dispatch(tr);
		requestAnimationFrame(() => {
			const domNode = editor.view.nodeDOM(nodePosition);
			if (domNode instanceof HTMLElement) domNode.scrollIntoView({
				behavior: "instant",
				block: "center"
			});
		});
		editor.once("focus", () => {
			const clearTr = editor.state.tr.setMeta(nodeHighlightPluginKey, { nodeId: null });
			editor.view.dispatch(clearTr);
		});
		hasScrolledOnce.current = true;
		return true;
	}, [editor]);
	useEffect(() => {
		const nodeId = window.location.href.split("#")[1];
		const handleSynced = () => scrollToNode$1(nodeId);
		if (nodeId && !hasScrolledOnce.current) {
			if (provider && state) {
				const { hasCachedContent } = state;
				if (hasCachedContent) {
					if (!handleSynced()) provider.on("synced", handleSynced);
				} else if (provider.isSynced) handleSynced();
				else provider.on("synced", handleSynced);
			} else handleSynced();
			return () => {
				if (provider) provider.off("synced", handleSynced);
			};
		}
	}, [
		scrollToNode$1,
		provider,
		state
	]);
	const handleContainerClick = (event) => {
		if (event.target !== event.currentTarget) return;
		if (!editor) return;
		if (!editor.isEditable) return;
		try {
			if (editor.isFocused) return;
			const { selection } = editor.state;
			const currentNode = selection.$from.node();
			editor?.chain().focus("end", { scrollIntoView: false }).run();
			if (currentNode.content.size === 0 && !(editor.isActive(CORE_EXTENSIONS.ORDERED_LIST) || editor.isActive(CORE_EXTENSIONS.BULLET_LIST) || editor.isActive(CORE_EXTENSIONS.TASK_ITEM) || editor.isActive(CORE_EXTENSIONS.TABLE) || editor.isActive(CORE_EXTENSIONS.BLOCKQUOTE) || editor.isActive(CORE_EXTENSIONS.CODE_BLOCK))) return;
			const lastNode = editor.state.doc.lastChild;
			if (lastNode) {
				if (!(lastNode.type.name === CORE_EXTENSIONS.PARAGRAPH) && lastNode.type.name !== CORE_EXTENSIONS.DOCUMENT) {
					const endPosition = editor?.state.doc.content.size;
					editor?.chain().insertContentAt(endPosition, { type: "paragraph" }).focus("end").run();
				}
			}
		} catch (error) {
			console.error("An error occurred while handling container click to insert new empty node at bottom:", error);
		}
	};
	const handleContainerMouseLeave = () => {
		const dragHandleElement = document.querySelector("#editor-side-menu");
		if (!dragHandleElement?.classList.contains("side-menu-hidden")) dragHandleElement?.classList.add("side-menu-hidden");
	};
	return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", {
		ref: containerRef,
		id: `editor-container-${id}`,
		onClick: handleContainerClick,
		onMouseLeave: handleContainerMouseLeave,
		className: cn(`editor-container cursor-text relative line-spacing-${displayConfig.lineSpacing ?? DEFAULT_DISPLAY_CONFIG.lineSpacing}`, { "active-editor": editor?.isFocused && editor?.isEditable }, displayConfig.fontSize ?? DEFAULT_DISPLAY_CONFIG.fontSize, displayConfig.fontStyle ?? DEFAULT_DISPLAY_CONFIG.fontStyle, editorContainerClassName),
		children: [children, !isTouchDevice && /* @__PURE__ */ jsx(LinkContainer, {
			editor,
			containerRef
		})]
	}) });
};

//#endregion
//#region src/core/extensions/trailing-node.ts
function nodeEqualsType({ types, node }) {
	return Array.isArray(types) && types.includes(node?.type) || node?.type === types;
}
const TrailingNode = Extension.create({
	name: "trailingNode",
	addOptions() {
		return {
			node: CORE_EXTENSIONS.PARAGRAPH,
			notAfter: [CORE_EXTENSIONS.PARAGRAPH]
		};
	},
	addProseMirrorPlugins() {
		const plugin = new PluginKey(this.name);
		const disabledNodes = Object.entries(this.editor.schema.nodes).map(([, value]) => value).filter((node) => this.options.notAfter.includes(node.name));
		return [new Plugin({
			key: plugin,
			appendTransaction: (_, __, state) => {
				const { doc, tr, schema } = state;
				const shouldInsertNodeAtEnd = plugin.getState(state);
				const endPosition = doc.content.size;
				const type = schema.nodes[this.options.node];
				if (!shouldInsertNodeAtEnd) return;
				return tr.insert(endPosition, type.create());
			},
			state: {
				init: (_, state) => {
					const lastNode = state.tr.doc.lastChild;
					return !nodeEqualsType({
						node: lastNode,
						types: disabledNodes
					});
				},
				apply: (tr, value) => {
					if (!tr.docChanged) return value;
					const lastNode = tr.doc.lastChild;
					return !nodeEqualsType({
						node: lastNode,
						types: disabledNodes
					});
				}
			}
		})];
	}
});

//#endregion
export { ADDITIONAL_EXTENSIONS, COLORS_LIST, COMPLEX_ITEMS, CORE_EXTENSIONS, CollaborativeDocumentEditorWithRef, DocumentEditorWithRef, LiteTextEditorWithRef, RichTextEditorWithRef, TEXT_ALIGNMENT_ITEMS, TITLE_EDITOR_EXTENSIONS, TOOLBAR_ITEMS, TYPOGRAPHY_ITEMS, TrailingNode, USER_ACTION_ITEMS, applyUpdates, convertBase64StringToBinaryData, convertBinaryDataToBase64String, convertHTMLDocumentToAllFormats, createRealtimeEvent, extractTextFromHTML, findParentNodeOfType, findTableAncestor, getAllDocumentFormatsFromDocumentEditorBinaryData, getAllDocumentFormatsFromRichTextEditorBinaryData, getBinaryDataFromDocumentEditorHTMLString, getBinaryDataFromRichTextEditorHTMLString, getEditorClassNames, getParagraphCount, getTrimmedHTML, isValidHttpUrl };
//# sourceMappingURL=index.js.map