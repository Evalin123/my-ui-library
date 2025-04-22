#!/usr/bin/env node

import path from "path";
import fs from "fs";
import { Command } from "commander";
import {
  intro,
  outro,
  select,
  log,
  isCancel,
  cancel,
  confirm,
  spinner,
} from "@clack/prompts";
import color from "picocolors";
import { fileURLToPath } from "url";
import { createRequire } from "module";
import { execSync } from "node:child_process";

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename);
const require = createRequire(import.meta.url); // create a require function that works with ES modules

const program = new Command();

program.name("my-ui").description("Add a UI component to your project");

program
  .command("add")
  .description("Which component would you like to add?")
  .argument("[component]", "the component to add or a url to the component.")
  .action(async (value) => {
    intro(color.bgCyan("pikto-ui CLI"));

    let comp = value.toLowerCase() as string;

    const dependenciesMap: Record<string, string[]> = {
      button: [
        "class-variance-authority",
        "tailwind-merge",
        "classnames",
        "tailwindcss",
      ],
    };
    const deps = dependenciesMap[comp] || [];
    const missingDeps = deps.filter((dep) => {
      try {
        require.resolve(dep);
        return false;
      } catch {
        return true;
      }
    });

    if (missingDeps.length > 0) {
      const shouldInstall = await confirm({
        message: `Do you want to install ${missingDeps.length} missing package(s)?`,
      });
      if (shouldInstall) {
        const s = spinner();
        s.start("Installing dependencies...");
        try {
          execSync(`pnpm add ${missingDeps.join(" ")}`, { stdio: "inherit" });
          s.stop("Dependencies installed.");
        } catch (error) {
          s.stop("Installation failed.");
          console.error(error);
          process.exit(1);
        }
      } else {
        log.error("Aborted because required dependencies are missing.");
        process.exit(1);
      }
    } else {
      log.info("All required dependencies are installed.");
    }

    if (!comp) {
      // check if the user passed a component name
      // if not, show a prompt to select a component
      comp = (await select({
        message: "Which component do you want to add?",
        options: [
          { value: "button", label: "Button" },
          { value: "dialog", label: "Dialog" },
          { value: "form", label: "Form" },
        ],
      })) as string;

      if (!comp) {
        log.error(color.red("No component selected."));
        process.exit(1);
      }
    }
    if (isCancel(comp)) {
      // check if the user cancelled the prompt
      cancel("Operation cancelled");
      return process.exit(0);
    }

    const templatesDir = path.resolve(__dirname, "../app/templates");

    const hasAppDir = fs.existsSync(path.resolve(process.cwd(), "app"));
    const targetDir = hasAppDir
      ? path.resolve(process.cwd(), "app/components/ui")
      : path.resolve(process.cwd(), "components/ui");

    const fileName = `${comp}.tsx`;
    const sourcePath = path.join(templatesDir, fileName);
    const targetPath = path.join(targetDir, fileName);

    if (!fs.existsSync(sourcePath)) {
      log.error(color.red(`${comp} not found.`));
      process.exit(1);
    }

    log.info(`Installing ${comp}...`);

    fs.mkdirSync(targetDir, { recursive: true });
    fs.copyFileSync(sourcePath, targetPath);
    outro(`${color.green("Success!")} Installed ${comp} component.`);
  });

program.parse();
