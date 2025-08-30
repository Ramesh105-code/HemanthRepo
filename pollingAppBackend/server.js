
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

let polls = [
  {
    id: 1,
    question: "Which is your favorite JavaScript framework?",
    options: [
      { text: "React", votes: 0 },
      { text: "Vue", votes: 0 },
      { text: "Angular", votes: 0 },
    ],
  },
];


const protectRoute = (req, res, next) => {
  const auth = req.headers["authorization"];
  if (auth === "Bearer MY_SECRET_TOKEN") {
    next();
  } else {
    res.status(403).json({ message: "Forbidden - Invalid Token" });
  }
};




app.get("/api/polls", (req, res) => {
  res.json(polls);
});


app.get("/api/polls/:id", (req, res) => {
  const poll = polls.find((p) => p.id === parseInt(req.params.id));
  if (!poll) {
    return res.status(404).json({ message: "Poll not found" });
  }
  res.json(poll);
});

app.post("/api/polls/:id/vote", (req, res) => {
  const poll = polls.find((p) => p.id === parseInt(req.params.id));
  if (!poll) {
    return res.status(404).json({ message: "Poll not found" });
  }

  const { optionText } = req.body;
  const option = poll.options.find((o) => o.text === optionText);

  if (!option) {
    return res.status(400).json({ message: "Invalid option" });
  }

  option.votes++;
  res.json(poll);
});


app.post("/api/polls", protectRoute, (req, res) => {
  const { question, options } = req.body;

  if (!question || !options || options.length < 2) {
    return res.status(400).json({ message: "Invalid poll data" });
  }

  const newPoll = {
    id: polls.length + 1,
    question,
    options: options.map((opt) => ({ text: opt, votes: 0 })),
  };

  polls.push(newPoll);
  res.status(201).json(newPoll);
});


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});