import inquirer from 'inquirer';
import ifts from "inquirer-file-tree-selection-prompt";
import { ChoiceOptions, choiceMap, ModulesType } from "./ChoiceGenerator.js";

inquirer.registerPrompt('file-tree-selection', ifts);

export class Program {

    private modules: ModulesType = {
        CALL_API: async () => {
            const answers = await inquirer
            .prompt([
                {
                    type: 'file-tree-selection',
                    name: 'file',
                    root: './schema',
                    hideRoot: true
                }
            ])
            const { file } = answers;
            if((file as string).endsWith(".ts")) {
                const requester = await import(file);
                requester.default();
            }
        },
        EXIT: async () => {
            process.exit();
        }
    };

    private menuChoice: ChoiceOptions = "EXIT";

    async promptMenu(): Promise<Program> {
        const { menu } = (await inquirer.prompt([{
            type: "list",
            name: "menu",
            message: "What do you want to do?",
            choices: choiceMap
        }]));
        this.menuChoice = menu;
        return this;
    }

    async processMenuChoice(): Promise<void> {
        try {
            await this.modules[this.menuChoice]();
        } catch (error) {
            console.log("========= Error =========");
            console.error(error);
            console.log("=========================");
        }
    }
}
