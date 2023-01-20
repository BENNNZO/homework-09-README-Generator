// TODO: Include packages needed for this application
var inquirer = require('inquirer');
const fs = require('fs');
const { listenerCount } = require('process');
const { resolve } = require('path');

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
    }
];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
}

// TODO: Create a function to initialize app
async function init() {
    console.log('Initializing...')
    const InnitData = await InnitInquire()
    const Sections = await InnitSections()
    const SectionContents = await sectionContentPrompt(Sections)
    console.log([InnitData, Sections])
    console.log('innit function')
}

function InnitInquire() {
    return new Promise(resolve => {
        inquirer
            .prompt(questions)
            .then((answers) => {
                resolve(answers)
                // fs.writeFile(`./${answers.file_name}.md`, `# ${answers.title}`, err => {
                //     if (err) {
                //         console.error(err)
                //     }
                // })
            })
    })
}

function InnitSections() {
    return new Promise(resolve => {
        let sections = []
        let sectionRecursionStart = 1
        inquirer
            .prompt({
                type: 'input',
                name: 'number_of_sections',
                message: 'Number Of Sections',
                default: '1'
            })
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
                            sections.push({section_number: sectionRecursionStart, ...answer})
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

function sectionContentPrompt(sectionData) {
    return new Promise(resolve => {
        let sectionDataRecursion = 0
        console.log(sectionData[sectionDataRecursion])
        const sectionDataForEach = async (e) => {
            if (e[sectionDataRecursion].section_type === 'Bullet Points') {
                function BulletPoints() {
                    return new Promise((resolve) => {
                        console.log(e[sectionDataRecursion].section_type)
                        console.log('asdasdasdasdasd')
                        inquirer
                            .prompt({
                                type: 'input',
                                name: 'amount_of_bullets',
                                message: `How Many Bullet Points For Section ${sectionDataRecursion + 1}`,
                                default: '1'
                            })
                            .then((response) => {
                                let bullets = []
                                let bulletPointsRecursion = 1
                                const BulletPointContents = async () => {
                                    function bulletPointsAsync() {
                                        return new Promise((resolve) => {
                                            inquirer
                                                .prompt({
                                                    type: 'input',
                                                    name: 'section_content',
                                                    message: `Bullet ${bulletPointsRecursion}`,
                                                    default: ''
                                                })
                                                .then((content) => {
                                                    bullets.push(content.section_content)
                                                    sectionData[sectionDataRecursion] = Object.assign(sectionData[sectionDataRecursion], {bullets: bullets})
                                                    console.log(sectionData)
                                                    if (bulletPointsRecursion < response.amount_of_bullets) {
                                                        bulletPointsRecursion++
                                                        BulletPointContents()
                                                    } else {
                                                        resolve()
                                                    }
                                                })
                                        })
                                    }
                                    await bulletPointsAsync()
                                }
                                BulletPointContents()
                                if (sectionDataRecursion + 1 < e.length) {
                                    sectionDataRecursion++
                                    sectionDataForEach(sectionData)
                                } else {
                                    resolvePromise(sectionData)
                                }
                            })
                    })
                }
                await BulletPoints()
            } else {
                function RawText() {
                    return new Promise((resolve) => {
                        inquirer
                            .prompt({
                                type: 'input',
                                name: 'section_content',
                                message: 'Type Out Section Content',
                                default: ''
                            })
                            .then((content) => {
                                sectionData[sectionDataRecursion] = Object.assign(sectionData[sectionDataRecursion], content)
                                if (sectionDataRecursion + 1 < e.length) {
                                    console.log('if true')
                                    console.log(e.length)
                                    sectionDataRecursion++
                                    sectionDataForEach(sectionData)
                                } else {
                                    console.log(sectionDataRecursion)
                                    console.log(sectionData.length)
                                    console.log('else')
                                    resolvePromise(sectionData)
                                }
                            })
                    })
                }
                await RawText()
            }
        }
        sectionDataForEach(sectionData)
        function resolvePromise() {
            resolve(sectionData)
        }
    })
}

// Function call to initialize app
init();