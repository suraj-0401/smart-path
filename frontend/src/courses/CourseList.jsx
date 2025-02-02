import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../url";

function CourseList() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(`${baseUrl}/api/courses`);
        setCourses(res.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map((course) => (
          <Link
            key={course._id}
            to={`/courses/${course._id}`}
            className="bg-white p-4 rounded shadow hover:shadow-lg transition duration-300"
          >
            <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
            <p className="text-gray-600">{course.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CourseList;
