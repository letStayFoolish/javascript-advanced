# Steps to Migrate from JavaScript to TypeScript

### Install TypeScript**: Run the following command to add TypeScript to your project:

`npm install --save-dev typescript`

### Create a `tsconfig.json` file**: TypeScript requires a configuration file to define how the TypeScript compiler (`tsc`) behaves. You can create one with the following command:

`npx tsc --init`

This will generate a `tsconfig.json` file in your project. For simplicity, you can modify it as follows:

- Set `src` as the directory for source files.
- Set the `outDir` to `dist` for compiled JS files.

### Rename `.js` files to `.ts` files**: Rename your JavaScript files to `.ts` and fix any TypeScript errors. TypeScript will guide you through type-related issues, but you can start by adding a file-by-file `ts-ignore` comment where necessary.

### Install Type Definitions**: If you're using third-party libraries (e.g., Lodash or Express), install their type definitions:

`npm install --save-dev @types/library-name`

## Setting Up Essential Tools**

### **1. Prettier**

- Install Prettier:

`npm install --save-dev prettier`

- Create a `.prettierrc` file or `.prettier.config.js` with this configuration:

`     {
       "semi": true,
       "singleQuote": true,
       "tabWidth": 2,
       "trailingComma": "es5",
       "printWidth": 80
     }`

- Add a `.prettierignore` file to exclude files:
  node_modules/
  dist/


### **2. ESLint**

- Install ESLint:

`npm install --save-dev eslint`

- Initialize ESLint with:

`npx eslint --init`

- To configure ESLint for TypeScript, add additional packages:

`npm install --save-dev @typescript-eslint/parser @typescript-eslint/eslint-plugin`

- Update your `.eslintrc` file:

```json
     {
       "parser": "@typescript-eslint/parser",
       "plugins": ["@typescript-eslint"],
       "extends": [
         "eslint:recommended",
         "plugin:@typescript-eslint/recommended",
         "prettier"
       ],
       "rules": {
         // Custom rules can be added here
       }
     }
```
- Add an `.eslintignore` to exclude files:

`     node_modules/
     dist/`

### **3. Combine Prettier and ESLint**

`   npm install --save-dev eslint-config-prettier`

- Update `package.json`:

```json
     {
       "lint-staged": {
         "*.{ts,js,json,css,md}": [
           "eslint --fix",
           "prettier --write"
         ]
       }
     }
```

### **6. Other Useful Packages**

- **nodemon**: Automatically restarts the application on file changes.

`     npm install --save-dev nodemon`

- **dotenv**: Manage environment variables.

`     npm install dotenv`

- Add these scripts to your `package.json`:

```json
     {
       "scripts": {
         "start": "node dist/index.js",
         "dev": "nodemon src/index.ts",
         "lint": "eslint . --ext .ts",
         "build": "tsc"
       }
     }
```

- Create a `.gitignore` file for your project:

`     node_modules/
     dist/`

- (Optional) Install `npm-check-updates` to manage outdated dependencies:

```shell
     npm install --global npm-check-updates
     ncu -u
     npm install
```