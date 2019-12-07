import express from 'express';
import { MongoClient } from 'mongodb';

const app = express();

app.use(express.json());

const withDB = async (operations, res) => {
  try {
    const client = await MongoClient.connect('mongodb://localhost:27017', {
      useNewUrlParser: true,
    });
    const db = client.db('raddit');
    await operations(db);
    client.close();
  } catch (error) {
    res.status(500).json({ message: 'Error connecting to db', error });
  }
};

app.get('/api/posts/:postId', async (req, res) => {
  withDB(async db => {
    const postId = req.params.postId;
    const post = await db.collection('posts').findOne({ postId: postId });
    res.status(200).json(post);
  }, res);
});

app.post('/api/posts/:postId/upvote', async (req, res) => {
  try {
    const postId = req.params.postId;
    const client = await MongoClient.connect('mongodb://localhost:27017', {
      useNewUrlParser: true,
    });
    const db = client.db('raddit');
    const post = await db.collection('posts').findOne({ postId: postId });
    await db.collection('posts').updateOne(
      { postId: postId },
      {
        $set: {
          upvotes: post.upvotes + 1,
        },
      },
    );
    const updatedPost = await db.collection('posts').findOne({ postId: postId });
    res.status(200).json(updatedPost);
    client.close();
  } catch (error) {
    res.status(500).json({ message: 'Error connecting to db', error });
  }
});

app.post('/api/posts/:postId/add-comment', async (req, res) => {
  try {
    const { userName, text } = req.body;
    const postId = req.params.postId;
    const client = await MongoClient.connect('mongodb://localhost:27017', {
      useNewUrlParser: true,
    });
    const db = client.db('raddit');
    const post = await db.collection('posts').findOne({ postId: postId });
    post.comments.push({ userName, text });
    await db.collection('posts').updateOne(
      { postId: postId },
      {
        $set: { comments: post.comments },
      },
    );
    const updatedPost = await db.collection('posts').findOne({ postId: postId });
    res.status(200).json(updatedPost);
    client.close();
  } catch (error) {
    res.status(500).json({ message: 'Error connecting to db', error });
  }
});

app.listen(8000, () => console.log('Listening on port 8000'));
