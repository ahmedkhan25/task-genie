<p align="center">
  <img src="public/images/taskGenie.jpeg" width="500" alt="Task Genie Logo" />
</p>

# TaskGenie

## ⚠️ Important Note
This quickly created rough project is currently an in-progress Proof of Concept (POC) and is not intended for production use. It serves as an initial investigation into mixing TypeScript with LLM-generated code. 

Still need to add a bunch of stuff including: orchestration, dynamic api execuation and recursive task calling 

## Description

TaskGenie is an experimental project that explores the integration of TypeScript with code generated by Large Language Models (LLMs). It aims to create a flexible and extensible system for managing and executing various tasks or "skills" dynamically generated through AI assistance.

## Key Features

- Dynamic skill generation using LLM
- TypeScript-based skill execution
- RESTful API for skill management
- Swagger UI for API documentation and testing

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## API Documentation

After starting the application, you can access the Swagger UI documentation at:

```
http://localhost:3000/api
```

This provides an interactive interface to explore and test the API endpoints.

## Project Status

This project is in its early stages and is continuously evolving. As a POC, it may contain experimental features and is not yet optimized for performance or security in a production environment.

## Contributing

As this is a proof of concept, we're not currently accepting contributions. However, feedback and suggestions are always welcome!

## License

This project is [MIT licensed](LICENSE).