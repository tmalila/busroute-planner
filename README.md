# Busroute planner

This application chooses the shortest route between two points in a predefined .json-dataset (/src/reittiopas.json) that mimicks a public transport system.

The shortest route between two points is calculated using Dijkstras algorithm. The calculation could easily be ran against a database on predefined intervalls and only the results would then be queried from the frontend. The current solution could also easily be refactored to use a state container such as Redux.

The application is made with React and uses UI-components from Material UI-framework. All packages are installed using yarn and development done using a Windows 64-bit OS.

## Available Scripts

To run the project go to the project directory and run:

### `yarn`

This installs all the node modules used in the application.
Then run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


