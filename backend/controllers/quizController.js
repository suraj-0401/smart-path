import asyncHandler from "express-async-handler"
import Quiz from "../models/quizModel.js"

// @desc    Create a new quiz
// @route   POST /api/quizzes
// @access  Private/Admin
const createQuiz = asyncHandler(async (req, res) => {
  const { courseId, questions,createdBy } = req.body

  const quiz = new Quiz({
    courseId,
    questions,
    createdBy
  })

  const createdQuiz = await quiz.save()
  res.status(201).json(createdQuiz)
})

// @desc    Get all quizzes for a course
// @route   GET /api/quizzes/course/:courseId
// @access  Public
const getQuizzesByCourse = async (req, res) => {
  try {
    const { courseId } = req.params.courseId;
    const quizzes = await Quiz.find({ course: courseId }); // Assuming Mongoose model
    res.status(200).json(quizzes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching quizzes" });
  }
};

// @desc    Get a quiz by ID
// @route   GET /api/quizzes/:id
// @access  Public
const getQuizById = asyncHandler(async (req, res) => {
  try {
    const { id: userId } = req.params; // Extract user ID from URL params

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const quizzes = await Quiz.find({ createdBy: userId });
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch quizzes" });
  }
});

// @desc    Get all quizzes
// @route   GET /api/quizzes/allQuizzes
// @access  Public
const getAllQuizzes = asyncHandler(async (req, res) => {
  try {
    const quizzes = await Quiz.find({});

    if (quizzes.length === 0) {
      return res.status(404).json({ message: "No quizzes found" });
    }

    res.status(200).json(quizzes);
  } catch (error) {
    console.error("Error fetching quizzes:", error.message);
    res.status(500).json({ message: "Failed to fetch quizzes", error: error.message });
  }
});


// @desc    Update a quiz
// @route   PUT /api/quizzes/:id
// @access  Private/Admin
const updateQuiz = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const quiz = await Quiz.findByIdAndUpdate(id, req.body, { new: true });

    if (!quiz) {
      return res.status(404).json({ msg: "Quiz not found" });
    }

    res.status(200).json({ msg: "Quiz updated successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});


// @desc    Delete a quiz
// @route   DELETE /api/quizzes/:id
// @access  Private/Admin
const deleteQuiz = asyncHandler(async (req, res) => {
  const quiz = await Quiz.findById(req.params.id)
  if (quiz) {
    await quiz.deleteOne()
    res.json({ message: "Quiz removed" })
  } else {
    res.status(404)
    throw new Error("Quiz not found")
  }
})

export { createQuiz, getQuizzesByCourse, getAllQuizzes,getQuizById, updateQuiz, deleteQuiz }

