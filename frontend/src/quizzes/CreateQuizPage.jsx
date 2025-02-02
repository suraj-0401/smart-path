import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { baseUrl } from "../url";

function DeleteQuizPage() {
  const [questions, setQuestions] = useState([
    { question: "", options: ["", "", "", ""], correctAnswer: "" },
  ]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { courseId: paramCourseId } = useParams();
  const [courseId, setCourseId] = useState(paramCourseId || localStorage.getItem("courseId"));

  
  useEffect(() => {
    if (!courseId) {
      navigate("/select-course"); // Redirect if courseId is missing
    }
  }, [courseId, navigate]);

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

  const addQuestion = () => {
    setQuestions([...questions, { question: "", options: ["", "", "", ""], correctAnswer: "" }]);
  };

  const removeQuestion = (index) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");
    if (!token) {
      setError("Authentication token missing. Please log in again.");
      return;
    }
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;
    const createdBy = user ? user._id : null; // Updated variable name
    
    try {
      await axios.post(
        `${baseUrl}/api/quizzes`,
        { courseId, createdBy, questions }, // Changed userId to createdBy
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Successfully created quiz");
      navigate(`/quizzes/:id`);
    } catch (err) {
      setError("Failed to create quiz. Please try again.");
    }
  };
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Create New Quiz</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-6">
        {questions.map((question, questionIndex) => (
          <div key={questionIndex} className="border p-4 rounded">
            <input
              type="text"
              value={question.question}
              onChange={(e) => handleQuestionChange(questionIndex, "question", e.target.value)}
              placeholder="Question"
              className="w-full p-2 border rounded mb-2"
              required
            />
            {question.options.map((option, optionIndex) => (
              <input
                key={optionIndex}
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(questionIndex, optionIndex, e.target.value)}
                placeholder={`Option ${optionIndex + 1}`}
                className="w-full p-2 border rounded mb-2"
                required
              />
            ))}
            <input
              type="text"
              value={question.correctAnswer}
              onChange={(e) => handleQuestionChange(questionIndex, "correctAnswer", e.target.value)}
              placeholder="Correct Answer"
              className="w-full p-2 border rounded mb-2"
              required
            />
            <button
              type="button"
              onClick={() => removeQuestion(questionIndex)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Remove Question
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addQuestion}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add Question
        </button>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Create Quiz
        </button>
      </form>
    </div>
  );
}

export default DeleteQuizPage;
