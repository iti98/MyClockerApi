# MyClockerApi
This is the repository of the API of the project MyClocker.

The front-end of this project can be found [here](https://github.com/iti98/MyClockerFront) 

# Installation

To install this project, open your favorite command prompt and go where you want to open this project.
Once it's done, simply clone the project using:
```sh 
git clone git@github.com:iti98/MyClockerApi.git
```
Be sure you already have set your SSH key because GitHub don't support the use of the http way.

Once the project is successfully cloned, you can go inside with a simple ```cd MyClockerApi``` and install all dependecies using ```npm install```

Please follow the using of npm for this project, to ensure the maximum compatibility when adding new packages.

You will need to create a ```.env``` file, based on the ```.env.template``` file, where there will be all the variables that are needed for the server to run correctly.

## Running in developpement
To run the project in developpement mode, just use the following command. The server use nodemon to auto-reload when a modfication occur.
```sh
npm start
```

## Database 
This project use a MongoDb database, so you have to put your database access url in your local ```.env``` file.