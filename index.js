// TODO: Include packages needed for this application
var inquirer = require('inquirer');
const fs = require('fs');
const { listenerCount } = require('process');

// TODO: Create an array of questions for user input
const questions = [
    {
        type: 'input',
        name: 'file_name',
        message: 'File Name (auto adds .md to the end)',
        default: 'README'
    },
    {
        type: 'input',
        name: 'title',
        message: 'Title Of The README',
        default: 'Title'
    },
    {
        type: 'input',
        name: 'number_of_sections',
        message: 'Number Of Sections',
        default: '0'
    }
];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
}

// TODO: Create a function to initialize app
function init() {
    InquirerInnit()
}

function InquirerInnit() {
    inquirer
        .prompt(questions)
        .then((answers) => {
            console.log(answers)
            CreateREADME(answers)
        })
}

function CreateREADME(data) {
    let sectionRecursion = 1
    const SectionSelection = () => {
        inquirer
            .prompt({
                type: 'list',
                name: 'section_type',
                message: `What Is Section ${sectionRecursion}`,
                default: 'text',
                choices: ['Bullet Points', 'Raw Text']
            })
            .then((answers) => {
                console.log(answers)
                if (sectionRecursion < data.number_of_sections) {
                    sectionRecursion++
                    SectionSelection()
                }
            })
    }
    SectionSelection()
    let fileContetnt = `
        # ${data.title}\n
    ` 
    fs.writeFile(`./${data.file_name}.md`, `# ${data.title}`, err => {
        if (err) {
            console.error(err)
        }
    })
}

// Function call to initialize app
init();