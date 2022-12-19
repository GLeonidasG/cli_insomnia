// import inquirer from 'inquirer'
// import inquirerFileTreeSelection from 'inquirer-file-tree-selection-prompt'

// inquirer.registerPrompt('file-tree-selection', inquirerFileTreeSelection)

// inquirer
//   .prompt([
//     {
//       type: 'file-tree-selection',
//       name: 'file'
//     }
//   ])
//   .then(answers => {
//     console.log(JSON.stringify(answers))
//   });
import { RequestBuilder } from "./src/RequestBuilder";

const headers = {
  "dwc-stage-configuration": "feature 1",
  "header": "value"
}

new RequestBuilder("URL")
  .headers(headers)
  .query({ "$expand": "crops($expand=crop)", "$search": "asc" })
  .body({ message: "OKAY", status: 200 })
  .request();
