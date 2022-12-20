import inquirer from 'inquirer';
import ifts from "inquirer-file-tree-selection-prompt";

inquirer.registerPrompt('file-tree-selection', ifts)

const Choices = {
    CALL_API: "Call API",
    EXIT: "Exit"
} as const;

type ChoiceOptions = keyof typeof Choices;

type ModulesType = { 
    [K in ChoiceOptions]: Function;
};

const Modules: ModulesType = {
    CALL_API: async () => {
        const answers = await inquirer
        .prompt([
            {
                type: 'file-tree-selection',
                name: 'file',
                root: './schema'
            }
        ])
        const { file } = answers;
        const requester = await import(file);
        requester.default();
    },
    EXIT: () => {}
};


(async function Main() {
    const { Menu: mainResponse } = (await inquirer.prompt([{
        type: "list",
        name: "Menu",
        message: "What do you want to do?",
        choices: [Choices.CALL_API, Choices.EXIT]
    }]));

    switch (mainResponse) {
        case Choices.CALL_API:
            await Modules.CALL_API()
            Main();
            break;

        case Choices.EXIT:
            break;
        default:
            break;
    }
})()
