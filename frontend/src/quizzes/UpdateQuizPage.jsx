import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { baseUrl } from "../url";

function UpdateQuizpage() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // State to store questions
  const [questions, setQuestions] = useState([
    { question: "", options: ["", "", "", ""], correctAnswer: "" },
  ]);
  
  const [error, setError] = useState("");
  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(newQuestions);
  };

  // Add a new question
  const addQuestion = () => {
    setQuestions([...questions, { question: "", options: ["", "", "", ""], correctAnswer: "" }]);
  };

  // Remove a question
  const removeQuestion = (index) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
  };

  // Handle form submission to update quiz
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");
    if (!token) {
      setError("Authentication token missing. Please log in again.");
      return;
    }

    try {
      await axios.put(
        `${baseUrl}/api/quizzes/${id}`,
        { questions },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Quiz updated successfully!");
      navigate(`/quizzes/${id}`);
    } catch (err) {
      setError("Failed to update quiz. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Update Quiz</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-6">
        {questions.map((question, questionIndex) => (
          <div key={questionIndex} className="border p-4 rounded">
            {/* Question input */}
            <input
              type="text"
              value={question?.question || ""}
              onChange={(e) => handleQuestionChange(questionIndex, "question", e.target.value)}
              placeholder="Question"
              className="w-full p-2 border rounded mb-2"
              required
            />
            {/* Options inputs */}
            {question.options.map((option, optionIndex) => (
              <input
                key={optionIndex}
                type="text"
                value={option || ""}
                onChange={(e) => handleOptionChange(questionIndex, optionIndex, e.target.value)}
                placeholder={`Option ${optionIndex + 1}`}
                className="w-full p-2 border rounded mb-2"
                required
              />
            ))}
            {/* Correct Answer input */}
            <input
              type="text"
              value={question?.correctAnswer || ""}
              onChange={(e) => handleQuestionChange(questionIndex, "correctAnswer", e.target.value)}
              placeholder="Correct Answer"
              className="w-full p-2 border rounded mb-2"
              required
            />
            {/* Remove question button */}
            <button
              type="button"
              onClick={() => removeQuestion(questionIndex)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Remove Question
            </button>
          </div>
        ))}
        {/* Add question button */}
        <button
          type="button"
          onClick={addQuestion}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add Question
        </button>
        {/* Submit button */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Update Quiz
        </button>
      </form>
    </div>
  );
}

export default UpdateQuizpage;
