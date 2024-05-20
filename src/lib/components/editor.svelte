<script lang="ts">
  import type * as Monaco from "monaco-editor/esm/vs/editor/editor.api";
  import { onDestroy, onMount } from "svelte";

  export let language: string = "typescript";
  export let theme: string = "Nord";

  let editor: Monaco.editor.IStandaloneCodeEditor;
  let monaco: typeof Monaco;
  let editorContainer: HTMLElement;
  let vimMode: any;

  const text = `interface User {
    id: number;
    name: string;
    email: string;
    age?: number;
  }

  const users: User[] = [
      { id: 1, name: 'Alice', email: 'alice@example.com', age: 28 },
      { id: 2, name: 'Bob', email: 'bob@example.com' },
      { id: 3, name: 'Charlie', email: 'charlie@example.com', age: 32 }
  ];

  function getUserById(id: number): User | undefined {
      return users.find(user => user.id === id);
  }

  function createUser(name: string, email: string, age?: number): User {
      const newUser: User = {
          id: users.length + 1,
          name,
          email,
          age
      };
      users.push(newUser);
      return newUser;
  }

  function updateUser(id: number, updatedInfo: Partial<User>): User | undefined {
      const user = getUserById(id);
      if (user) {
          Object.assign(user, updatedInfo);
      }
      return user;
  }

  function deleteUser(id: number): boolean {
      const index = users.findIndex(user => user.id === id);
      if (index !== -1) {
          users.splice(index, 1);
          return true;
      }
      return false;
  }

  console.log('All users:', users);
  console.log('Get user by ID 2:', getUserById(2));

  const newUser = createUser('Dave', 'dave@example.com', 25);
  console.log('New user created:', newUser);

  const updatedUser = updateUser(1, { age: 29, email: 'alice.new@example.com' });
  console.log('User 1 updated:', updatedUser);

  const userDeleted = deleteUser(3);
  console.log('User 3 deleted:', userDeleted);

  console.log('All users after operations:', users);`;

  onMount(async () => {
    // Import monaco code editor
    const imports = (await import("$lib/monaco")).default;
    monaco = imports.monaco;

    // Import editor theme
    const res = await fetch(`src/lib/${theme}.json`);
    const data = await res.json();
    monaco.editor.defineTheme(theme, data);

    // Set editor creation event to set theme
    monaco.editor.onDidCreateEditor((_) => {
      monaco.editor.setTheme(theme);
    });

    // Create editor & model to be displayed
    const editor = monaco.editor.create(editorContainer, {
      value: text,
      language: language,
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      automaticLayout: true,
    });
    // Initialize vim mode
    vimMode = imports.initVimMode(
      editor,
      document.getElementById("status-bar")
    );
    editor.focus();
  });

  onDestroy(() => {
    monaco?.editor.getModels().forEach((model) => model.dispose());
    if (vimMode) vimMode.dispose();
    editor?.dispose();
  });
</script>

<div class="w-full h-full" bind:this={editorContainer} />
<p class="mt-1 mb-4" id="status-bar" />
