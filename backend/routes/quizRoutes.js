import express from "express"
import { createQuiz, getQuizzesByCourse, getQuizById, updateQuiz, deleteQuiz, getAllQuizzes } from "../controllers/quizController.js"
import { protect, admin } from "../middleware/authMiddleware.js"

const router = express.Router()

router.route("/")
.post(protect, admin, createQuiz)

router.route("/course/:courseId")
.get(getQuizzesByCourse)
router.route("/:id")
.get(getQuizById)
.put(protect, admin, updateQuiz)
.delete(protect, admin, deleteQuiz)

router.route("/")
  .get(getAllQuizzes);

export default router

