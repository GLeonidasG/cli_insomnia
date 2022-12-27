import inquirer from 'inquirer';
import ifts from "inquirer-file-tree-selection-prompt";

inquirer.registerPrompt('file-tree-selection', ifts)

const Choices = {
    CALL_API: "Call API",
    EXIT: "Exit"
} as const;

type ChoiceMapType = {
    name: typeof Choices[keyof typeof Choices],
    value: keyof typeof Choices
}

type ChoiceOptions = keyof typeof Choices;

const choiceMap = (): ChoiceMapType[] => {
    const mappedChoices: ChoiceMapType[] = []
    for(let choice in Choices) {
        mappedChoices.push({ name: Choices[choice as ChoiceOptions], value: choice as ChoiceOptions })
        
    }
    return mappedChoices;
}

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

async function promptMenu () {
    const { menu } = (await inquirer.prompt([{
        type: "list",
        name: "menu",
        message: "What do you want to do?",
        choices: choiceMap
    }]));
    return menu;
}

async function processMenuChoice (mainResponse: ChoiceOptions) {
    try {
        await Modules[mainResponse as ChoiceOptions]();
    } catch (error) {
        console.log("========= Error =========");
        console.error(error);
        console.log("=========================");
    }
}


(async function Main() {
    const mainResponse = await promptMenu();
    await processMenuChoice(mainResponse);
    Main();
})();

