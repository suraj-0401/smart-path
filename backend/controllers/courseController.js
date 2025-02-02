import asyncHandler from "express-async-handler"
import Course from "../models/courseModel.js"

// @desc    Create a new course
// @route   POST /api/courses
// @access  Private/Admin
const createCourse = asyncHandler(async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Not authorized" });
  }

  const course = new Course({
    ...req.body,  
    user: req.user._id,  
  });

  const createdCourse = await course.save();
  res.status(201).json(createdCourse);
});

// @desc    Get all courses
// @route   GET /api/courses
// @access  Public
const getCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find({})
  res.json(courses)
})

const getMyCourses = asyncHandler(async (req, res) => {
  if (!req.user || !req.user._id) {
    return res.status(401).json({ message: "User not authenticated" });
  }
  const userId=req.user._id;
  try {
    const courses = await Course.find({ user: userId }).populate("user", "name email");

    if (!courses.length) {
      return res.status(404).json({ message: "No courses found for this user" });
    }

    res.json(courses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ message: "Error fetching courses" });
  }
});


// @desc    Get a course by ID
// @route   GET /api/courses/:id
// @access  Public
const getCourseById = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id)
  if (course) {
    res.json(course)
  } else {
    res.status(404)
    throw new Error("Course not found")
  }
})

// @desc    Update a course
// @route   PUT /api/courses/:id
// @access  Private/Admin
const updateCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (course) {
    course.title = req.body.title || course.title;
    course.description = req.body.description || course.description;
    course.category = req.body.category || course.category;
    course.duration = req.body.duration || course.duration;
    course.instructorName = req.body.instructorName || course.instructorName;
    course.language = req.body.language || course.language;
    course.level = req.body.level || course.level;
    course.price = req.body.price || course.price;
    course.status = req.body.status || course.status;
    course.visibility = req.body.visibility || course.visibility;

    // Ensure chapters are updated properly
    if (req.body.chapters && Array.isArray(req.body.chapters)) {
      course.chapters = req.body.chapters;
    }

    const updatedCourse = await course.save();
    res.json(updatedCourse);
  } else {
    res.status(404);
    throw new Error("Course not found");
  }
});


// @desc    Delete a course
// @route   DELETE /api/courses/:id
// @access  Private/Admin
const deleteCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course) {
    res.status(404);
    throw new Error("Course not found");
  }
  if (course.user.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("You can only delete your own courses");
  }

  await Course.deleteOne({ _id: req.params.id });

  res.json({ message: "Course removed" });
});


export { createCourse, getCourses, getCourseById, getMyCourses,updateCourse, deleteCourse }

