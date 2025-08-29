import express from "express";
import {
    getPolls,
    getPollById,
    votePoll,
    createPoll,
}from "../controllers/pollController.js";
import {protectRoute}from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/",getPolls);

router.get("/:id",getPollById);

router.post("/:id/vote",votePoll);

router.post("/",protectRoute,createPoll);

export default router;