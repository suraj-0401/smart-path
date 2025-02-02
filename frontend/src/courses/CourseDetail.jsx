import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../url";

function CourseDetail() {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();                   

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(`${baseUrl}/api/courses/${id}`);
        setCourse(res.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load course details.");
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);  

  if (loading) return <div>Loading...</div>; 
  if (error) return <div>{error}</div>;

  if (!course) return <div>Course not found!</div>;

  return (
    <div className="bg-white p-6 rounded shadow">
    <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
    <p className="text-gray-600 mb-4">{course.description}</p>
    <div className="mb-4">
      <strong>Instructor:</strong> {course.instructorName}
    </div>
    <div className="mb-4">
      <strong>Duration:</strong> {course.duration} hours
    </div>
    <div className="mb-4">
      <strong>Level:</strong> {course.level}
    </div>
    <div className="mb-4">
      <strong>Category:</strong> {course.category}
    </div>
    <div className="mb-4">
      <strong>Price:</strong> {course.price}
    </div>
    <div className="mb-4">
      <strong>Status:</strong> {course.status}
    </div>
    <div className="mb-4">
      <strong>Visibility:</strong> {course.visibility}
    </div>
  
    <div className="mb-4">
      <strong>Chapters:</strong>
      {course.chapters.length > 0 ? (
        <ul className="mt-2 space-y-2">
          {course.chapters.map((chapter, index) => (
            <li key={chapter.id} className="p-4 border rounded bg-gray-100">
              <h3 className="text-lg font-semibold">{chapter.title}</h3>
              <p className="text-gray-600">{chapter.description}</p>
              <p className="text-gray-500"><strong>Content:</strong> {chapter.content}</p>
              <p className="text-blue-500">
                <strong>Video:</strong> <a href={chapter.videoLink} target="_blank" rel="noopener noreferrer">{chapter.videoLink}</a>
              </p>
              <p className="text-gray-500"><strong>Duration:</strong> {chapter.duration} hour(s)</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No chapters available.</p>
      )}
    </div>
  
    <Link to={`/courses/${id}/quizzes`} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
      View Quizzes
    </Link>
  </div>
  
  );
}

export default CourseDetail;
