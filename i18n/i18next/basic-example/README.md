# i18next + React Demo Example

This repository contains a demo example of using the i18next library for internationalization (i18n) in a React application. The example demonstrates how to easily integrate i18next into your React app to support multilingual functionality.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Examples](#examples)
- [License](#license)

## Installation

To get started with the project, clone the repository and install the dependencies. Run the following commands:

```bash
git clone https://github.com/your-username/i18next-react-demo.git
cd i18next-react-demo
npm install
```

## Usage

After installing the dependencies, you can start the application using the command:

```bash
npm start
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Project Structure

```
i18next-react-demo/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── components/
│   │   └── ...
│   ├── locales/
│   │   ├── en/
│   │   │   └── translation.json
│   │   └── ru/
│   │       └── translation.json
│   ├── App.js
│   ├── index.js
│   └── ...
├── package.json
└── README.md
```

- **public/**: Contains static files, including the HTML template.
- **src/**: The main folder with the source code of the application.
  - **components/**: React components.
  - **locales/**: Localization files for different languages.
  - **App.js**: The main component of the application.
  - **index.js**: The entry point of the application.

## Examples

In this project, you will find examples of using i18next to translate text in React components. For instance, in the `App.js` file, you can see how to use the `useTranslation` hook to get translated strings:

```javascript
import React from 'react';
import { useTranslation } from 'react-i18next';

const App = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('welcome_message')}</h1>
    </div>
  );
};

export default App;
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.
