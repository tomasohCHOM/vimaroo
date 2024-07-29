import type * as Monaco from "monaco-editor/esm/vs/editor/editor.api";

export const theme: Monaco.editor.IStandaloneThemeData = {
	base: "vs-dark",
	inherit: true,
	rules: [],
	colors: {
		"editor.foreground": "#FFFFFF",
		"editor.background": "#20232C",
		"editor.selectionBackground": "#2E3A45",
		"editor.lineHighlightBackground": "#2E3A45",
		"editorCursor.foreground": "#D8DEE9",
		"editorWhitespace.foreground": "#434C5ECC"
	}
};
