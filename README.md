# vimaroo <img src="static/favicon.svg" width="24" />

[![vimaroo website](static/vimaroo-demo.gif)](https://vimaroo.vercel.app)

![Svelte](https://img.shields.io/badge/svelte-%23f1413d.svg?style=for-the-badge&logo=svelte&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Vim](https://img.shields.io/badge/VIM-%2311AB00.svg?style=for-the-badge&logo=vim&logoColor=white)

## About

This website was created with the intent of making it easy to practice Vim keybinds with a set of motion-focused test. Inspired by ThePrimeagen's [vim-be-good](https://github.com/ThePrimeagen/vim-be-good) Neovim plugin and [Monkeytype](https://monkeytype.com/).

## Starting tests

Select a test to begin. Locate and delete the specified line using `dd` to start the test. If you need to exit early, use `:q`. Follow the instructions and complete each test using Vim motions!

## Setup / Development

Create a [Supabase](https://supabase.com/) project. To store profiles and user stats, you will need to create those corresponding tables in Supabase (check [supabase.ts](https://github.com/tomasohCHOM/vimaroo/blob/main/src/lib/types/supabase.ts) to get an idea of how the Postgres schemas look).

Clone the repository and install all the dependencies:

```bash
git clone https://github.com/tomasohCHOM/vimaroo.git
cd vimaroo
npm install
```

Create a new `.env`, following the `.env.example` template for the keys needed to connect to Supabase:

```env
PUBLIC_SUPABASE_URL=""
PUBLIC_SUPABASE_ANON_KEY=""
```

Then start the development process:

```bash
npm run dev
```

To build and start in production mode:

```bash
npm run build
npm run preview
```

---

Developed with 🔥 by [Chom.](https://github.com/tomasohCHOM)
