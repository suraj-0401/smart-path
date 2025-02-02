import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { baseUrl } from "../url";

const ManageQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const userId = user ? user._id : null;

  useEffect(() => {
    if (!userId) {
      setError("User ID not found in local storage.");
      setLoading(false);
      return;
    }

    const fetchQuizzes = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/quizzes/${userId}`);
        setQuizzes(Array.isArray(response.data) ? response.data : [response.data]);
        setLoading(false);
      } catch (err) {
        setError("Failed to load quizzes.");
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, [userId]);

  const token = localStorage.getItem("authToken");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  // Delete Quiz function
  const handleDelete = async (quizId) => {
    if (window.confirm("Are you sure you want to delete this quiz?")) {
      try {
        await axios.delete(`${baseUrl}/api/quizzes/${quizId}`, config);
        setQuizzes(quizzes.filter((quiz) => quiz._id !== quizId));
      } catch (err) {
        setError("Failed to delete quiz.");
      }
    }
  };

  if (loading) return <p>Loading quizzes...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4">Manage Your Quizzes</h2>
      {quizzes.length === 0 ? (
        <p>No quizzes available.</p>
      ) : (
        <div className="space-y-4">
          {quizzes.map((quiz) => (
            <div key={quiz._id} className="p-4 border border-gray-300 rounded-lg">
              <div className="mt-2">
                <h4 className="font-semibold">Questions:</h4>
                {quiz.questions && quiz.questions.length === 0 ? (
                  <p>No questions added.</p>
                ) : (
                  <ul className="list-disc list-inside">
                    {quiz.questions?.map((q, index) => (
                      <li key={q?._id} className="mb-2 list-none">
                        <p className="font-medium">{index + 1}. {q?.question}</p>
                        {/* <p className="font-medium">Quiz ID: {q?.quiz?._id}</p> */}

                        <ul className="list-none ml-4">
                          {q?.options?.map((option, optIndex) => (
                            <li key={optIndex} className="text-gray-700">
                              {optIndex + 1}. {option}
                            </li>
                          ))}
                        </ul>
                        <p className="text-green-600"><strong>Correct Answer:</strong> {q?.correctAnswer}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="mt-4 flex space-x-4">
              <Link
  to={`/updateQuiz/${quiz._id}`}
  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
>
  Update
</Link>

                {/* Delete Button */}
                <button
                  onClick={() => handleDelete(quiz._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageQuizzes;
