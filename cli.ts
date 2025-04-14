#!/usr/bin/env node

import path from "path";
import fs from "fs";
import { Command } from "commander";
import { intro, outro, select, log, isCancel, cancel } from "@clack/prompts";
import color from "picocolors";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename);

const program = new Command();

program.name("my-ui").description("Add a UI component to your project");

program
  .command("add")
  .description("Which component would you like to add?")
  .argument("[component]", "the component to add or a url to the component.")
  .action(async (value) => {
    intro(color.inverse("my-ui CLI"));

    let comp = value as string;
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

    const templatesDir = path.resolve(__dirname, "app/templates");
    const targetDir = path.resolve(process.cwd(), "components/ui");

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
