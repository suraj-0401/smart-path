import mongoose from "mongoose"

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  options: [{
    type: String,
    required: true,
  }],
  correctAnswer: {
    type: String,
    required: true,
  },
});

const quizSchema = new mongoose.Schema({
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Add this
  questions: [questionSchema],
})

export default mongoose.model("Quiz", quizSchema)

