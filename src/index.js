#!/usr/bin/env node

const inquirer = require("inquirer");
const fs = require("fs-extra");

async function createModel() {
    const { modelName, fieldCount, timestamp } = await inquirer.prompt([
        { type: "input", name: "modelName", message: "Enter the model name:" },
        { type: "number", name: "fieldCount", message: "How many fields does it have?" },
        { type: "confirm", name: "timestamp", message: "Need to add Timestamp on Model?"}
    ]);

    CreateController(modelName)

    const fields = [];
    for (let i = 0; i < fieldCount; i++) {
        const field = await inquirer.prompt([
            { type: "input", name: "fieldName", message: `Enter the name for field ${i + 1}:` },
            { type: "confirm", name: "unique", message: "Is this field unique?" },
            { type: "confirm", name: "required", message: "Is this field required?" },
            { type: "list", name: "type", message: "Select Feild Type", choices: ['String', 'Number', 'Date', 'Boolean', 'Double'],},
            { type: "input", name: "default", message: "Enter a default value or leave blank for none:" }
        ]);
        
        const fieldConfig = {
            fieldName: field.fieldName,
            type: field.type,
            unique: field.unique,
            required: field.required,
            default: field.default !== "" ? field.default : null
        };
        
        fields.push(fieldConfig);
    }

    const fieldsContent = fields.map(field => {
        let fieldProps = `type: ${field.type}`;
        
        if (field.unique) fieldProps += `,\n        unique: true`;
        if (field.required) fieldProps += `,\n        required: true`;
        if (field.default !== null) fieldProps += `,\n        default: "${field.default}"`;
        
        return `${field.fieldName}: {\n        ${fieldProps}\n    }`;
    }).join(",\n    ");

    const modelContent = `
const mongoose = require("mongoose");

const ${modelName}Schema = new mongoose.Schema({
    ${fieldsContent}
}, ${timestamp ? '{timestamp:true}' : ''});

module.exports = mongoose.model("${modelName}", ${modelName}Schema);
`;

    const modelDir = `./models`;
    fs.ensureDirSync(modelDir);
    fs.writeFileSync(`${modelDir}/${modelName}.js`, modelContent);
    console.log(`Model ${modelName} created successfully!`);
}


async function CreateController(ControllerName) {
    
    const ControllerConect = `
const ${ControllerName} = require("../models/${ControllerName}");

const ${ControllerName}Controller = {
    // body of controller goese here
    // create methods in here that you need to create
};

module.exports = ${ControllerName}Controller;
`;
}


async function main() {
    
    createModel()

    try{
        const answers = await inquirer.prompt([
            {
                type: 'list',
                name: 'selection1',
                message: 'Need to create Controller according to Model ? :',
                choices: ['Yes', 'No'],
            },
            {
                type: 'list',
                name: 'selection2',
                message: 'Need to create Route according to Model ? :',
                choices: ['Using MySQL without MVC', 'Using MySQL with MVC', 'Using MongoDB with MVC (Recommended)'],
            }
        ]);
    }
    catch(error){
        console.error(`An error occurred: ${error.message}`);
    }
}


main()