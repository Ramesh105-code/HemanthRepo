import polls from "../data/pollsData.js";

export const getPolls = (req, res) => {
  res.json(polls);
};

export const getPollById = (req, res) => {
  const poll = polls.find((p) => p.id === parseInt(req.params.id));
  poll ? res.json(poll) : res.status(404).json({ message: "Poll not found" });
};

export const votePoll = (req, res) => {
  const poll = polls.find((p) => p.id === parseInt(req.params.id));
  if (!poll) return res.status(404).json({ message: "Poll not found" });

  const { optionText } = req.body;
  const option = poll.options.find((o) => o.text === optionText);
  if (!option) return res.status(400).json({ message: "Invalid option" });

  option.votes++;
  res.json(poll);
};

export const createPoll = (req, res) => {
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
};