# Pikto UI

> A minimal & playful component library powered by Remix and Tailwind CSS.

Pikto UI is a lightweight and elegant UI component library designed for developers who love clean design and a smooth DX. Whether you’re building dashboards, landing pages, or internal tools — Pikto helps you move fast and look good doing it.

---

## ✨ Features

- 🎨 **Minimal Design** — Clean, modern, and typography-focused
- ⚛️ **Built with React** — Fully typed with TypeScript
- 💨 **Tailwind CSS-Ready** — Built on utility-first principles
- 🧩 **Composable & Headless** — Bring your own styles if needed
- 🛠️ **CLI-First Installation** — Add only what you need, when you need it

---

## 📦 Installation

You can install components individually using the CLI:
```bash
npx pikto-ui add button
```
- Running `npx pikto-ui add` (without a component name) will launch an interactive CLI that lets you choose a component from a list.
- If you provide a component name (e.g. button), the CLI will install it directly without prompting.



## 🚀 Usage

```
import { Button } from "pikto-ui";

export default function App() {
  return (
    <Button variant="primary">
      Click me
    </Button>
  );
}
```

## 📁 Project Structure (for CLI users)

```
your-app/
├── app/
│   └── components/
│       └── button.tsx ← Installed by Pikto CLI
└── ...
```
