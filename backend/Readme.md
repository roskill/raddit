## Backend setup

#### Express

`npm install --save express`

`npm install --save-dev @babel/core @babel/node @babel/preset-env`

#### Babel (for ES6 bindings for Express)

Create `.babelrc` in root dir:

```
  {
   "presets": ["@babel/preset-env"]
   }
```

#### Nodemon

`npm install --save-dev nodemon`

Add start script for Nodemon to `package.json`:

```
   "scripts": {
   "start": "nodemon --exec babel-node src/server.js",
   },
```
