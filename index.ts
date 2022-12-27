import { Program } from "./src/Program.js"

(async function Main() {
    const program = new Program();
    await program.promptMenu();
    await program.processMenuChoice();
    Main();
})();

