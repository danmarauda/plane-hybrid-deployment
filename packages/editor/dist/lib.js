import { a as convertBinaryDataToBase64String, c as getAllDocumentFormatsFromDocumentEditorBinaryData, d as getBinaryDataFromRichTextEditorHTMLString, i as convertBase64StringToBinaryData, l as getAllDocumentFormatsFromRichTextEditorBinaryData, m as DocumentEditorExtensionsWithoutProps, n as TITLE_EDITOR_EXTENSIONS, o as convertHTMLDocumentToAllFormats, p as CoreEditorExtensionsWithoutProps, r as applyUpdates, s as extractTextFromHTML, t as createRealtimeEvent, u as getBinaryDataFromDocumentEditorHTMLString } from "./document-collaborative-events-DhUvi1fB.js";

//#region src/core/constants/document-collaborative-events.ts
const DocumentCollaborativeEvents = {
	lock: {
		client: "locked",
		server: "lock",
		payloadType: {}
	},
	unlock: {
		client: "unlocked",
		server: "unlock",
		payloadType: {}
	},
	archive: {
		client: "archived",
		server: "archive",
		payloadType: {}
	},
	unarchive: {
		client: "unarchived",
		server: "unarchive",
		payloadType: {}
	},
	"make-public": {
		client: "made-public",
		server: "make-public",
		payloadType: {}
	},
	"make-private": {
		client: "made-private",
		server: "make-private",
		payloadType: {}
	},
	delete: {
		client: "deleted",
		server: "delete",
		payloadType: {}
	},
	move: {
		client: "moved",
		server: "move",
		payloadType: {}
	},
	duplicate: {
		client: "duplicated",
		server: "duplicate",
		payloadType: {}
	},
	property_update: {
		client: "property_updated",
		server: "property_update",
		payloadType: {}
	},
	restore: {
		client: "restored",
		server: "restore",
		payloadType: {}
	},
	error: {
		client: "error",
		server: "error",
		payloadType: {}
	}
};

//#endregion
//#region src/core/helpers/get-document-server-event.ts
const getServerEventName = (clientEvent) => {
	for (const key in DocumentCollaborativeEvents) if (DocumentCollaborativeEvents[key].client === clientEvent) return DocumentCollaborativeEvents[key].server;
};

//#endregion
export { CoreEditorExtensionsWithoutProps, DocumentCollaborativeEvents, DocumentEditorExtensionsWithoutProps, TITLE_EDITOR_EXTENSIONS, applyUpdates, convertBase64StringToBinaryData, convertBinaryDataToBase64String, convertHTMLDocumentToAllFormats, createRealtimeEvent, extractTextFromHTML, getAllDocumentFormatsFromDocumentEditorBinaryData, getAllDocumentFormatsFromRichTextEditorBinaryData, getBinaryDataFromDocumentEditorHTMLString, getBinaryDataFromRichTextEditorHTMLString, getServerEventName };
//# sourceMappingURL=lib.js.map