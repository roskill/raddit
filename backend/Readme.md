## Backend setup

#### Express

`npm install --save express`

`npm install --save-dev @babel/core @babel/node @babel/preset-env`

#### Babel (for ES6 bindings for Express)

3. create `.babelrc` in root dir with:

```
  {
   "presets": ["@babel/preset-env"]
   }
```

#### Nodemon

`npm install --save-dev nodemon`

add to `package.json`:

```
   "scripts": {
   "start": "nodemon --exec babel-node src/server.js",
   },
```
