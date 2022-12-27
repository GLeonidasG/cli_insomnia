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

export { choiceMap, ModulesType, ChoiceOptions };
