# Automate Backend MVC for FullStack Projects

<p align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=mongodb,npm,nodejs,express,js" />
  </a>
</p>

- `automate-backend-fullstack` is an npm package that helps you quickly set up a MongoDB model in a Node.js MVC backend using the Mongoose ORM. This CLI tool allows you to specify model details, including field types, uniqueness, requirements, and default values, creating a ready-to-use Mongoose schema.

## Features

- <b>Interactive CLI:</b> Prompts for model name, number of fields, and details for each field.
- <b>Flexible Field Options:</b> Supports field configurations including type, unique, required, and default value.
- <b>Automatic Model Generation:</b>  Creates a Mongoose model file in a structured format. Avoids Redundant Model Creation:
- <b>Avoids Redundant Model Creation:</b>  Checks if a model with the specified name already exists and prompts to confirm overwriting, saving you from recreating existing models.

## Installation

- To use this package as a global CLI tool, install it using:

```bash

    npm install -g automate-backend-fullstack 

```

## Usage

- To create a new model, simply run:


```bash

    npx create-mvc-fullstack 

```

## Step-by-Step Process

- <b>Run the Command: </b> After running `npx create-mvc-fullstack`  you’ll be prompted for the model details.
- <b>Specify the Model Name:</b> Enter the name for your model (e.g., User, Product). If a model with this name already exists, you’ll be prompted to overwrite it or skip creation.
- <b>Define Field Count: </b> Specify the number of fields the model will have.
- <b>Enter Field Details:</b> For each field, you’ll be prompted for:
- - Field Name: Name of the field (e.g., email, username).
- - Field Type: Data type of the field (e.g., String, Number).
- - Unique: Whether the field should be unique (true or false).
- - Required: Whether the field is required (true or false).
- - Default Value: Optional default value for the field (leave blank if not required).

## Example

- If you specify a model name as `User` with two fields (email and username), the generated schema file will look like this:


```js

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    username: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("User", UserSchema);

```