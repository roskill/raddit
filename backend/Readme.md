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
