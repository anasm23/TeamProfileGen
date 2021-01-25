/// Dependency declarations
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
///
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
///
const render = require("./lib/htmlRenderer");

///Output path and directory
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");


/// Array declaration
var defaultArr = [];
var dataArr = [];

// Prompt questions
const promptQ = [
    {
        type: "input",
        message: "Enter Managers Name",
        name: "Name",
    },
    {
        type: "input",
        message: "ID:",
        name: "Id",
    },
    {
        type: "input",
        message: "Email:",
        name: "Email",
    },
    {
        type: "input",
        message: "Office Number:",
        name: "officeNumber",
    },
];
const employeeQ = [
    {
        type: "input",
        message: "Please enter the Employees Name",
        name: "Name",
    },
    {
        type: "input",
        message: "ID:",
        name: "Id",
    },
    {
        type: "input",
        message: "Email:",
        name: "Email",
    },
    {
        type: "input",
        message:"Github:",
        name:"Github",
    },
    {
        type: "input",
        message:"School:",
        name:"School"
    }
];
const promptRender = [
    {
        type: "list",
        message: "Add next Team Member?",
        name: "nextMember",
        choices: [
            "Engineer",
            "Intern",
            "Generate Team Profile"
        ],
    },
];
//  initiate Prompt with async function 
async function initPrompt() {
    try {
        const response = await inquirer.prompt(promptQ);
        console.log(response);
        const managerInfo = new Manager(response.Name, response.Id, response.Email, response.officeNumber);
        console.clear();
        defaultArr.push(managerInfo);
        dataArr.push(response.Id);
        buildTeam();

    } catch (error) {
        throw new Error(error);
    }
};

async function buildTeam() {
    try {
        const resp = await inquirer.prompt(promptRender);
        
        if (resp.nextMember === "Engineer") {
            promptEngr();
        }
        else if (resp.nextMember === "Intern") {
            promptIntern();
        }
        else {
            renderHTML();
        }
    } catch (error) {
        throw new Error(error);
    }
};

async function promptEngr() {
    try {
        const res = await inquirer.prompt(employeeQ)
        var gitUrl = `https://github.com/${res.Github}`
        const engineerdata = new Engineer(res.Name, res.Id, res.Email, gitUrl);
        defaultArr.push(engineerdata);
        dataArr.push(res.Id);
        buildTeam();
    } catch (error) {
        throw new Error(error);
    }
}
async function promptIntern() {
    try {
        const res = await inquirer.prompt(employeeQ)
        const interndata = new Intern(res.Name, res.Id, res.Email, res.School);
        defaultArr.push(interndata);
        dataArr.push(res.Id);
        buildTeam();
    } catch (error) {
        throw new Error(error);
    }
}
function renderHTML() {
    fs.writeFileSync(outputPath, render(defaultArr));
    console.log("File generated👍");
}
// Initializing the application
initPrompt();