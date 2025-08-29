import express from "express";
import cors from "cors";
import pollRoutes from "./routes/pollRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use(".api/polls",pollRoutes);

const PORT =  5000;
app.listen(PORT, () => 
console.log('Server running at http://localhost:${PORT}')
); 