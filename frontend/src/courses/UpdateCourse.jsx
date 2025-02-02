import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { baseUrl } from "../url";

function UpdateCourse() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [updatedCourse, setUpdatedCourse] = useState({
    title: "",
    description: "",
    category: "",
    duration: "",
    instructorName: "",
    language: "",
    level: "",
    price: "",
    status: "",
    visibility: "",
    chapters: [],
  });
  const [error, setError] = useState(null);

  const token = localStorage.getItem("authToken");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const { data } = await axios.get(`${baseUrl}/api/courses/${id}`, config);
        setCourse(data);
        setUpdatedCourse(data); // Set all fields from the fetched course
      } catch (error) {
        setError(error.response?.data?.message || error.message);
      }
    };

    fetchCourse();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedCourse((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleChapterChange = (index, e) => {
    const { name, value } = e.target;
    const updatedChapters = [...updatedCourse.chapters];
    updatedChapters[index] = { ...updatedChapters[index], [name]: value };
    setUpdatedCourse((prevState) => ({
      ...prevState,
      chapters: updatedChapters,
    }));
  };

  const updateCourse = async () => {
    try {
      await axios.put(`${baseUrl}/api/courses/${id}`, updatedCourse, config);
      navigate("/courses"); // Redirect after successful update
    } catch (error) {
      setError(error.response?.data?.message || error.message);
    }
  };

  if (error) return <div>{error}</div>;

  return (
    <div className="container">
      {course && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Update Course</h2>

          <input
            type="text"
            name="title"
            value={updatedCourse.title}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-2"
            placeholder="Title"
          />
          <textarea
            name="description"
            value={updatedCourse.description}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-2"
            placeholder="Description"
          />
          <input
            type="text"
            name="category"
            value={updatedCourse.category}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-2"
            placeholder="Category"
          />
          <input
            type="number"
            name="duration"
            value={updatedCourse.duration}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-2"
            placeholder="Duration (in hours)"
          />
          <input
            type="text"
            name="instructorName"
            value={updatedCourse.instructorName}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-2"
            placeholder="Instructor Name"
          />
          <input
            type="text"
            name="language"
            value={updatedCourse.language}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-2"
            placeholder="Language"
          />
          <input
            type="text"
            name="level"
            value={updatedCourse.level}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-2"
            placeholder="Level"
          />
          <input
            type="number"
            name="price"
            value={updatedCourse.price}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-2"
            placeholder="Price"
          />
          <input
            type="text"
            name="status"
            value={updatedCourse.status}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-2"
            placeholder="Status"
          />
          <input
            type="text"
            name="visibility"
            value={updatedCourse.visibility}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-2"
            placeholder="Visibility"
          />

          {/* CHAPTERS UPDATE SECTION */}
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Update Chapters</h3>
            {updatedCourse.chapters.map((chapter, index) => (
              <div key={chapter.id || index} className="p-4 border rounded bg-gray-100 mb-2">
                <input
                  type="text"
                  name="title"
                  value={chapter.title}
                  onChange={(e) => handleChapterChange(index, e)}
                  className="w-full p-2 border rounded mb-2"
                  placeholder="Chapter Title"
                />
                <textarea
                  name="description"
                  value={chapter.description}
                  onChange={(e) => handleChapterChange(index, e)}
                  className="w-full p-2 border rounded mb-2"
                  placeholder="Chapter Description"
                />
                <textarea
                  name="content"
                  value={chapter.content}
                  onChange={(e) => handleChapterChange(index, e)}
                  className="w-full p-2 border rounded mb-2"
                  placeholder="Chapter Content"
                />
                <input
                  type="text"
                  name="videoLink"
                  value={chapter.videoLink}
                  onChange={(e) => handleChapterChange(index, e)}
                  className="w-full p-2 border rounded mb-2"
                  placeholder="Video Link"
                />
                <input
                  type="number"
                  name="duration"
                  value={chapter.duration}
                  onChange={(e) => handleChapterChange(index, e)}
                  className="w-full p-2 border rounded mb-2"
                  placeholder="Duration (in hours)"
                />
              </div>
            ))}
          </div>

          <button onClick={updateCourse} className="bg-blue-500 text-white p-2 rounded">
            Save
          </button>
        </div>
      )}
    </div>
  );
}

export default UpdateCourse;
