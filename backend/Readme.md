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

### Prepare app for release

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

### Release to AWS

##### Create EC2 instance

1. In EC2, click Launch Instance.

2. Select top result (probably Linux), accept all defaults, Review and Launch and then Launch.

3. Create a new key pair eg, `raddit-key` and Download Key Pair.

4. Click Launch Instances.

##### SSH into EC2 instance

5. Move the pemfile eg, `raddit-key.pem` to .ssh directory in application root directory.

6. In AWS Console, click Services, then EC2 and the app should be available under Running Instances.

7. Click on the instance and copy the Public DNS address.

8. Change the permissions for the pemfile using `chmod 400`.

9. SSH into instance: `ssh -i <pemfile> ec2-user@<Public DNS address>` eg, `ssh i .ssh/raddit-key.pem ec2-user@ec2-3-105-229-145.ap-southeast-2.compute.amazonaws.com`

##### Install Git and NPM on EC2 instance

10. In EC2 instance, run `sudo yum install git`

11. Install NPM by using node version manager (nvm). From [Amazon docs](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-up-node-on-ec2-instance.html), type `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash`

12. Activate nvm: `. ~/.nvm/nvm.sh`

13. Then `nvm install <node version>` eg, `nvm install 12.9.1`

14. Then install npm: `npm install -g npm@latest`

##### Install MongoDB

15. From [MongoDB docs](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-amazon/), create a /etc/yum.repos.d/mongodb-org-4.2.repo file to install MongoDB using yum. In SSH, type `sudo nano /etc/yum.repos.d/mongodb-org-4.2.repo`, then copy and paste this inside the file:

```
[mongodb-org-4.2]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/amazon/2/mongodb-org/4.2/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-4.2.asc
```

Then press CTRL-o and CTRL-x to exit.

16. Then type: `sudo yum install -y mongodb-org`

17. Make sure MongoDB is running by typing `sudo service mongod start`

18. Open mongo shell by typing `mongo`.

19. Create some data: `use raddit`, then

```
db.posts.insert([{
  ... postId: '1',
  ... username: 'Jon Snow',
  ... title: 'I know nothing',
  ... text: 'My watch has ended',
  ... upvotes: 0,
  ... comments: [],
  ... }])
```
