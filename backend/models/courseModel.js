import mongoose from "mongoose"

const chapterSchema = new mongoose.Schema({
  title: String,
  content: String,
  description: String,
  videoLink: String,
  duration: Number,
})

const courseSchema = new mongoose.Schema({
  category: String,
  chapters: [chapterSchema],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  
  },
  description: String,
  duration: Number,
  instructorName: String,
  language: String,
  level: String,
  price: Number,
  status: String,
  visibility: String,
})

export default mongoose.model("Course", courseSchema)

