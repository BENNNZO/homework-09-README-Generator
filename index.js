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
        default: '1'
    }
];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
}

// TODO: Create a function to initialize app
async function init() {
    console.log('Initializing...')
    const InnitAnswers = await InquirerInnit()
    console.log(InnitAnswers)
    console.log('I Waited Forever Jeezus')
}

function InquirerInnit() {
    return new Promise(resolve => {
        let sections = []
        let sectionRecursionStart = 1
        inquirer
            .prompt(questions)
            .then((innitAnswers) => {
                function SectionSelection() {
                    inquirer
                        .prompt({
                            type: 'list',
                            name: 'section_type',
                            message: `What Is Section ${sectionRecursionStart}`,
                            default: 'Raw Text',
                            choices: ['Bullet Points', 'Raw Text']
                        })
                        .then((answer) => {
                            sections.push(answer)
                            if (sectionRecursionStart < innitAnswers.number_of_sections) {
                                sectionRecursionStart++
                                SectionSelection()
                            } else {
                                resolve(sections)
                            }
                        })
                }
                SectionSelection()
            })
    })
}

function CreateREADME(data) {
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
// const BulletCreation = (answer) => {
//     if (answer.section_type === 'Bullet Points') {
//         inquirer
//             .prompt({
//                 type: 'input',
//                 name: 'amount_of_bullets',
//                 message: `Amount Of Bullet Point(s) For Section ${sectionRecursion}`,
//                 default: '0'
//             })
//             .then((amount) => {
//                 let bulletPoints = []
//                 let bulletPointRecursion = 1
//                 const BulletPointGeneration = () => {
//                     inquirer
//                         .prompt({
//                             type: 'input',
//                             name: 'bullet',
//                             message: `Bullet ${bulletPointRecursion}`,
//                             default: 'NAN'
//                         })
//                         .then((bulletContent) => {
//                             bulletPoints.push(bulletContent.bullet)
//                         })
//                 }
//                 if (bulletPointRecursion < amount.amount_of_bullets) {
//                     bulletPointRecursion++
//                     BulletPointGeneration()
//                 }
//             })
//     }
// }