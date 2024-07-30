import * as monaco from "monaco-editor";
// @ts-ignore (No types support for monaco-vim yet)
import { initVimMode, VimMode } from "monaco-vim";

// Import the workers in a production-safe way.
// This is different than in Monaco's documentation for Vite,
// but avoids a weird error ("Unexpected usage") at runtime
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";

self.MonacoEnvironment = {
	getWorker: () => {
		return new editorWorker();
	}
};

export default { monaco, initVimMode, VimMode };
