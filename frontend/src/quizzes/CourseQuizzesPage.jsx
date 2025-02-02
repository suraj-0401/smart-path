import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../url";

const CourseQuizzesPage = () => {
  const { courseId: paramCourseId } = useParams();
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/quizzes/course/${paramCourseId}`);
        setQuizzes(response.data);
        console.log(response.data);

        setLoading(false);
      } catch (err) {
        console.error("Error fetching quizzes:", err);
        setError("Failed to load quizzes.");
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, [paramCourseId]);

  if (loading) return <p>Loading quizzes...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Quizzes for Course {paramCourseId}</h2>
      {quizzes.length === 0 ? (
        <p>No quizzes available for this course.</p>
      ) : (
        <ul className="list-disc ml-6">
          {quizzes.map((quiz) => (
            <li key={quiz._id} className="mb-4 border-b pb-2">
              <p className="text-gray-600">Total Questions: {quiz.questions.length}</p>
              <ul className="list-disc pl-4">
                {quiz.questions.map((q, index) => (
                  <li key={q._id} className="text-sm mb-3">
                    <span className="font-medium">{index + 1}. {q.question}</span>
                    <ul className="list-inside mt-2 ml-4">
                      {q.options.map((option, optionIndex) => {
                        const optionLetter = String.fromCharCode(65 + optionIndex); // A, B, C, etc.
                        return (
                          <li key={optionIndex} className="text-gray-700">
                            
                              {optionLetter}. {option}
                          </li>
                        );
                      })}
                    </ul>
                    <p className="text-green-500 font-bold mt-2">Correct Answer: {q.correctAnswer}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CourseQuizzesPage;
