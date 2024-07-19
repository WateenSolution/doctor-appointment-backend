# doctor-backend

Welcome to the **doctor-backend** repository! This project serves as the backend for the **doctor** web application. Below you will find information about the features, installation, usage, configuration, database setup, API endpoints, contributing guidelines, and license information.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Database Setup](#database-setup)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

List the key features of the project here.

- Feature 1
- Feature 2

## Installation

Provide step-by-step instructions on how to install and set up the project locally. Include any dependencies or requirements.

1. Clone the repository:
   ```
   git clone https://github.com/WateenSolution/doctor-backend.git
   ```
2. Change to the project directory:
   ```
   cd doctor-backend
   ```
3. Install dependencies:
   ```
   yarn install
   ```

## Usage

Explain how to use the project here. Provide examples and code snippets for typical use cases.

```javascript
// Add code examples here
```

## Configuration

1. **env** file required: **".env.example"** file exists in the project. Make a new file **.env** or rename it **.env** add variable values environment variables according to local/development/production. Add database, port, other variables according to enviroment.

## Database Setup

1. Download DBngin and a suitable database management tool such as TablePlus or MySQL Workbench.

2. Create a new database with a name like **"doctor-local"** or any name that aligns with the database name specified in the **.env** file. Ensuring the database name matches the one in the .env file is crucial for a successful database connection.

3. After setting up the database, you will need a sql dump file. Added in projects folder.

## API Endpoints

The project provides RESTful API endpoints to interact with the system. Here are some examples:

- `GET /api/auth/login`: Login API.

For detailed API documentation, refer to the `API_DOCS.md` file.

## Contributing

Contributions are welcome! If you find any issues or want to enhance the project, feel free to open a pull request or submit an issue.

1. Fork the project from the GitHub repository.
2. Create a new branch.

```
git checkout -b my-feature-branch
```

1. Make your changes and commit them:

```
git commit -m "Add new feature"
```

2. Push the changes to your branch:

```
git push origin my-feature-branch

```
