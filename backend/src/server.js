import express from "express";
import { MongoClient } from "mongodb";

const app = express();

app.use(express.json());

app.get("/api/posts/:postId", async (req, res) => {
  try {
    const postId = req.params.postId;
    const client = await MongoClient.connect("mongodb://localhost:27017", {
      useNewUrlParser: true
    });
    const db = client.db("raddit");
    const postInfo = await db.collection("posts").findOne({ postId: postId });
    res.status(200).json(postInfo);
    client.close();
  } catch (error) {
    res.status(500).json({ message: "Error connecting to db", error });
  }
});

app.listen(8000, () => console.log("Listening on port 8000"));
