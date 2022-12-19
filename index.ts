import inquirer from 'inquirer';
import ifts from "inquirer-file-tree-selection-prompt";

inquirer.registerPrompt('file-tree-selection', ifts)

const answers = await inquirer
  .prompt([
    {
      type: 'file-tree-selection',
      name: 'file',
      root: './schema'
    }
  ])
  // .then(async (answers) => {
  //   try {
  //     const { file } = answers;
  //     console.log(file);
  //     const requester = await import(file);
  //     requester();
  //   } catch(error) {
  //     console.error(error);
  //   }
    //
  // });

const { file } = answers;

const requester = await import(file);

requester.default();


