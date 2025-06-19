const sortIdeas = (ideas, sortBy) => {
  if (sortBy === "urgency-high") return [...ideas].sort((a, b) => urgencyOrder[b.urgency] - urgencyOrder[a.urgency]);
  if (sortBy === "urgency-low") return [...ideas].sort((a, b) => urgencyOrder[a.urgency] - urgencyOrder[b.urgency]);
  if (sortBy === "newest") return [...ideas].sort((a, b) => b.createdAt - a.createdAt);
  if (sortBy === "oldest") return [...ideas].sort((a, b) => a.createdAt - b.createdAt);
  return ideas;
};