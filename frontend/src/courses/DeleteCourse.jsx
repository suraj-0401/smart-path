import React from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { baseUrl } from "../url";

function DeleteCourse() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const deleteCourse = async () => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await axios.delete(`${baseUrl}/api/courses/${id}`, config);
        navigate("/courses/mycourses");
      } catch (error) {
        alert(error.response?.data?.message || error.message);
      }
    }
  };

  return (
    <div className="container">
      <h2 className="text-xl font-semibold mb-2">Delete Course</h2>
      <button
        onClick={deleteCourse}
        className="bg-red-500 text-white p-2 rounded"
      >
        Confirm
      </button>
    </div>
  );
}
export default DeleteCourse;
