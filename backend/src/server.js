import express from 'express';
import { MongoClient } from 'mongodb';

const app = express();

app.use(express.json());

app.get('/api/posts/:postId', async (req, res) => {
  try {
    const postId = req.params.postId;
    const client = await MongoClient.connect('mongodb://localhost:27017', {
      useNewUrlParser: true,
    });
    const db = client.db('raddit');
    const post = await db.collection('posts').findOne({ postId: postId });
    res.status(200).json(post);
    client.close();
  } catch (error) {
    res.status(500).json({ message: 'Error connecting to db', error });
  }
});

app.post('/api/posts/:postId/upvote', async (req, res) => {
  const postId = req.params.postId;
  const client = await MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true });
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
});

app.listen(8000, () => console.log('Listening on port 8000'));
