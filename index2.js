/* -------------------------------- LIBRARIES ------------------------------- */
var inquirer = require('inquirer');
const fs = require('fs');

// Remaking because nothing works
async function innit() {
    const innitDataVar = await innitData() // initialize readme file with a title
    const sections = await sectionCreation() // asks how many sections the user wants
    for (let i = 0; i < sections.length; i++) {
        console.log(sections[i])
        await sectionDataCreation(sections[i])
        await sectionSubDataCreation(sections[i])
        if (sections[i].section_type === 'Bullets') {
            sections[i].content = []
            console.log(sections[i])
            for (let i2 = 0; i2 < sections[i].amount_of_bullets; i2++) {
                await sectionContentCreation(sections[i], i2)
            }
        } else {
            await sectionContentCreation(sections[i])
        }
    }
    await innitDataGeneration(innitDataVar)
    for (let i = 0; i < sections.length; i++) {
        await sectionGeneration(innitDataVar, sections[i])  
    }
    console.log(`File Generated! (${innitDataVar.file_name}.md)`)
}

function innitData() {
    return new Promise(resolve => {
        let questions = [
            {
                type: 'input',
                name: 'file_name',
                message: 'What do you want the file name to be? (auto adds .md to the end)',
                default: 'README'
            },
            {
                type: 'input',
                name: 'title',
                message: 'Title of your README:',
                default: 'Title'
            }
        ]
        inquirer
            .prompt(questions)
            .then(answers => {
                resolve(answers)
            })
    })
}

function sectionCreation() {
    return new Promise(resolve => {
        let questions = [
            {
                type: 'number',
                name: 'amount_of_sections',
                message: 'How Many Secions Do You Want?',
                default: 0
            }
        ]
        inquirer
            .prompt(questions)
            .then(answer => {
                let sections = []
                for (let i = 0; i < answer.amount_of_sections; i++) {
                    sections.push({
                        id: i
                    })
                }
                resolve(sections)
            })
    })
}

function sectionDataCreation(section) {
    return new Promise(resolve => {
        let questions = [
            {
                type: 'input',
                name: 'section_title',
                message: `Title of section ${section.id + 1}`,
                default: 'Sections Title'
            }
        ]
        inquirer
            .prompt(questions)
            .then(answer => {
                resolve(section.section_title = answer.section_title)
            })
    })
}

function sectionSubDataCreation(section) {
    return new Promise(resolve => {
        let question1 = {
            type: 'list',
            name: 'section_type',
            message: `What type is section ${section.id + 1}?`,
            choices: ['Bullets', 'Raw Text']
        }
        inquirer
            .prompt(question1)
            .then(answer1 => {
                section.section_type = answer1.section_type
                if (answer1.section_type === 'Bullets') {
                    let question2 = {
                        type: 'number',
                        name: 'amount_of_bullets',
                        message: 'How many bullet points do you need?',
                        default: 0
                    }
                    inquirer
                        .prompt(question2)
                        .then(answer2 => {
                            resolve(section.amount_of_bullets = answer2.amount_of_bullets)
                        })
                } else {
                    resolve()
                }
            })
    })
}

function sectionContentCreation(section, i) {
    return new Promise(resolve => {
        let questions = [
            {
                type: 'input',
                name: `bullet_content`,
                message: `Bullet No.${i + 1}`,
                default: 'NAN'
            },
            {
                type: 'input',
                name: 'raw_text_content',
                message: `What text do you want for section ${section.id + 1}`,
                default: 'NAN'
            }
        ]
        if (section.section_type === 'Bullets') {
            inquirer
                .prompt(questions[0])
                .then(answer => {
                    resolve(section.content.push(answer.bullet_content))
                })
        } else {
            inquirer
                .prompt(questions[1])
                .then(answer => {
                    resolve(section.content = answer.raw_text_content)
                })

        }
    })
}

function innitDataGeneration(innit) {
    return new Promise(resolve => {
        let fileContent = `# ${innit.title}\n`
        fs.writeFile(`./${innit.file_name}.md`, fileContent, err => {
            if (err) {
                console.error(err);
            }
        })
        resolve()
    })
}

function sectionGeneration(innit, section) {
    return new Promise(resolve => {
        if (section.section_type === 'Bullets') {
            let sectionContent = `## ${section.section_title}\n`
            fs.appendFile(`./${innit.file_name}.md`, sectionContent, err => {
                if (err) {
                    console.error(err);
                }
            })
            for (let i2 = 0; i2 < section.content.length; i2++) {
                let bulletContent = ` - ${section.content[i2]}\n`
                fs.appendFile(`./${innit.file_name}.md`, bulletContent, err => {
                    if (err) {
                        console.error(err);
                    }
                })
            }
            resolve()
        } else {
            let sectionContent = `## ${section.section_title}\n${section.content}\n`
            fs.appendFile(`./${innit.file_name}.md`, sectionContent, err => {
                if (err) {
                    console.error(err);
                }
            })
            resolve()
        }
    })
}

innit()