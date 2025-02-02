import React, { useEffect, useState } from "react";
import { baseUrl } from "../url";

const AllQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/quizzes`);
        if (!response.ok) {
          throw new Error("Failed to fetch quizzes");
        }
        const data = await response.json();
        setQuizzes(Array.isArray(data) ? data : []); // Ensure data is an array
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  if (loading)
    return <p className="text-center text-xl font-semibold text-gray-700">Loading quizzes...</p>;
  if (error)
    return <p className="text-center text-red-500 text-lg font-semibold">Error: {error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">All Quizzes</h2>
      {quizzes.length === 0 ? (
        <p className="text-center text-lg text-gray-700 font-semibold">
          No quizzes available.
        </p>
      ) : (
        quizzes.map((quiz) => (
          <div key={quiz._id} className="bg-white shadow-lg rounded-lg p-6 mb-6 border border-gray-200">
            <h4 className="text-lg font-semibold mt-4">Questions:</h4>
            <ul className="mt-2 space-y-4">
              {quiz.questions.map((q) => (
                <li key={q._id} className="bg-gray-100 p-4 rounded-lg">
                  <p className="font-semibold text-gray-800">{q.question}</p>
                  <ul className="mt-2 grid grid-cols-2 gap-2">
                    {q.options.map((option, index) => (
                      <li key={index} className="bg-gray-200 p-2 rounded-md text-gray-700">
                        {option}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-2 text-green-600 font-semibold">
                    Correct Answer: {q.correctAnswer}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default AllQuizzes;
