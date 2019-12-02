import express from "express";

const app = express();

app.use(express.json());

app.get("/hello", (req, res) => res.send("Hello"));
app.get("/hello/:name", (req, res) => res.send(`Hello ${req.params.name}`));
app.post("/hello", (req, res) => res.send(`Hello ${req.body.name}`));
app.get("/posts/:postId", (req, res) =>
  res.send(`Fetching post ${req.params.postId}`)
);

app.listen(8000, () => console.log("Listening on port 8000"));
