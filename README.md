# Project Repository Summary

This repository contains the source code and test suites for a web application testing project using Playwright. Below, you will find information on the repository's structure, system requirements, installation steps, launching scripts, and instructions for generating and viewing reports.

## Repository Structure

The repository includes the following key directories and files:

- `.github`: Configuration files for GitHub actions.
- `data`: Directory for project data files.
- `helper`: Directory for helper classes for testing.
- `tests`: Directory for organizing test files.
  - `pages`: Test page objects.
  - `specs`: Test spec files.
- `.env.example`: Environment variables configuration file (for example).
- `.gitignore`: File specifying which files and directories to ignore in version control.
- `package.json`: Project's package file with dependencies and scripts.
- `playwright.config.js`: Configuration file for Playwright tests.

## Requirements

To run this project, you need to have the following software and system requirements installed:

- Node.js 16 or higher
- Windows 10 or a compatible operating system
- Java

## Installation

To install and set up this project from the GitHub repository, follow these steps:

1. Clone the repository to your local machine:
   ```shell
   git clone https://github.com/magidevv/playwright_web.git
   ```

2. Change to the project directory:
   ```shell
   cd your-repo
   ```

3. Install project dependencies using npm:
   ```shell
   npm install
   ```

4. Install Playwright browsers:
   ```shell
   npx playwright install
   ```

5. Set Environment Variables:
    Create a copy of .env.example as .env.
    Fill in the necessary environment variables required for the project.

## Launching Scripts

This project provides several scripts to run Playwright tests:

- To run tests in the headless browser mode, use:
  ```shell
  npx run test:all
  ```

- To run tests in headed mode (visible browser window), use:
  ```shell
  npx run test:all:headed
  ```

- To run a specific test, for example, `login.spec.js`, use:
  ```shell
  npx run test:login
  ```

- To run a different test, such as `registration.spec.js`, use:
  ```shell
  npx run test:registration
  ```

## Creating and Viewing Reports

To generate and view Allure test reports, use the following scripts:

- To create the report, run:
  ```shell
  npx run report:create
  ```

- To open the report in your default web browser, run:
  ```shell
  npx run report:open
  ```