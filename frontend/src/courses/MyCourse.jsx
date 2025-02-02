import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { baseUrl } from "../url";

function MyCourse() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("authToken");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // Fetch user courses
  const fetchCourses = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/api/courses/mycourses`, config);
      setCourses(data);
      setLoading(false);
    } catch (error) {
      setError(error.response?.data?.message || error.message);
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {courses.length !== 0 ? (
        courses.map((course) => (
          <Link
            key={course._id}
            to={`/courses/${course._id}`}  // Ensuring the course id is passed to the URL
            className="bg-white p-4 rounded shadow hover:shadow-lg transition duration-300"
          >
          <div key={course._id} className="bg-white p-4 rounded shadow hover:shadow-lg transition duration-300">
            <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
            <p className="text-gray-600">{course.description}</p>
            <div className="mt-4">
              <Link to={`/courses/update/${course._id}`} className="bg-blue-500 text-white px-3 py-1 rounded mr-2">
                Update
              </Link>
              <Link to={`/courses/delete/${course._id}`} className="bg-red-500 text-white px-3 py-1 rounded">
                Delete
              </Link>
            </div>
          </div>
          </Link>
        ))
      ) : (
        <div className="text-center text-gray-500 text-lg col-span-3">No courses found. Add a course.</div>
      )}
    </div>
  );
}

export default MyCourse;
