import express from "express"
import {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  getMyCourses,
} from "../controllers/courseController.js"
import { protect, admin } from "../middleware/authMiddleware.js"

const router = express.Router()

router.route("/")
  .get(getCourses)
  .post(protect, admin, createCourse) 

router.route("/mycourses")
  .get(protect, getMyCourses) 
  
router.route("/:id")
  .get(getCourseById)
  .put(protect, admin, updateCourse)
  .delete(protect, admin, deleteCourse) 

export default router
