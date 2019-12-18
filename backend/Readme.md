## Backend setup

#### Express

`npm install --save express`

#### Babel (for ES6 bindings for Express)

`npm install --save-dev @babel/core @babel/node @babel/preset-env`

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

#### MongoDB

`brew install mongodb`

`sudo mkdir -p /data/db`

` sudo chown -R ``id -un`` /data/db `

#### Create MongoDB database

`mongodb`
`mongo` // start mongo shell
`use raddit`

```
db.posts.insert([{
  ... postId: '1',
  ... upvotes: 0,
  ... comments: [],
  ... }])
```

`db.posts.find({}) // see all documents in posts collection`

`db.posts.find({}).pretty() // prettify output`

`db.posts.find({ postId: '1' }).pretty()`

`db.posts.findOne({ postId: '1' })`

### Connect MongoDB to Express

`npm install --save mongodb`

### Release to AWS

1. In frontend, type `npm run build`

2. This creates a `build` directory. Copy and paste this directory into the `src` directory in the backend. This will allow the backend to serve the frontend client of the website.

3. To tell the backend where to serve static files, go to `server.js`, and add: `import path from 'path'`

then add:

`app.use(express.static(path.join(__dirname, '/build')))`

then add:

```
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/build/index.html'));
});
```
