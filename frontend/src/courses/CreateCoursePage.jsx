import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../url";

function CreateCoursePage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [level, setLevel] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");
  const [instructorName, setInstructorName] = useState("");
  const [language, setLanguage] = useState("");
  const [status, setStatus] = useState("");
  const [visibility, setVisibility] = useState("");
  const [price, setPrice] = useState("");

  // State for chapters
  const [chapters, setChapters] = useState([]);
  const [chapterTitle, setChapterTitle] = useState("");
  const [chapterContent, setChapterContent] = useState("");
  const [chapterDescription, setChapterDescription] = useState("");
  const [chapterVideoLink, setChapterVideoLink] = useState("");
  const [chapterDuration, setChapterDuration] = useState("");

  const navigate = useNavigate();

  // Function to add a chapter
  const addChapter = () => {
    if (
      !chapterTitle ||
      !chapterDescription ||
      !chapterVideoLink ||
      !chapterDuration
    ) {
      setError("Please fill in all chapter details before adding.");
      return;
    }

    const newChapter = {
      id: chapters.length + 1,
      title: chapterTitle,
      content: chapterContent,
      description: chapterDescription,
      videoLink: chapterVideoLink,
      duration: Number(chapterDuration),
    };

    setChapters([...chapters, newChapter]);

    // Clear chapter input fields
    setChapterTitle("");
    setChapterContent("");
    setChapterDescription("");
    setChapterVideoLink("");
    setChapterDuration("");
    setError(""); // Clear error if any
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setError("Authentication token missing. Please log in again.");
        return;
      }
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.post(
        `${baseUrl}/api/courses`,
        {
          title,
          description,
          duration: Number(duration),
          category,
          instructorName,
          language,
          level,
          price,
          status,
          visibility,
          chapters, // Send chapters list
        },
        config
      );

      alert("Successfully created course");
      localStorage.setItem("courseId", data._id);
      navigate(`/courses/${data._id}`);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to create course. Please try again."
      );
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Create New Course</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="description" className="block mb-1">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          ></textarea>
        </div>
        <div>
          <label htmlFor="duration" className="block mb-1">
            Duration (hours)
          </label>
          <input
            type="number"
            id="duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="level" className="block mb-1">
            Level
          </label>
          <select
            id="level"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          >
            <option value="">Select Level</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
        <div>
          <label htmlFor="category" className="block mb-1">
            Category
          </label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="instructorName" className="block mb-1">
            Instructor Name
          </label>
          <input
            type="text"
            id="instructorName"
            value={instructorName}
            onChange={(e) => setInstructorName(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="language" className="block mb-1">
            Language
          </label>
          <input
            type="text"
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="price" className="block mb-1">
            Price
          </label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        

        <div>
          <label htmlFor="visibility" className="block mb-1">
            Visibility
          </label>
          <input
            type="text"
            id="visibility"
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div>
          <label htmlFor="status" className="block mb-1">
            Status
          </label>
          <input
            type="text"
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        {/* Chapter Form */}
        <h2 className="text-2xl font-bold mt-6">Add Chapters</h2>
        <div>
          <label htmlFor="chapterTitle" className="block mb-1">
            Chapter Title
          </label>
          <input
            type="text"
            id="chapterTitle"
            value={chapterTitle}
            onChange={(e) => setChapterTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="chapterDescription" className="block mb-1">
            Chapter Description
          </label>
          <input
            type="text"
            id="chapterDescription"
            value={chapterDescription}
            onChange={(e) => setChapterDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="chapterVideoLink" className="block mb-1">
            Video Link
          </label>
          <input
            type="text"
            id="chapterVideoLink"
            value={chapterVideoLink}
            onChange={(e) => setChapterVideoLink(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div>
          <label htmlFor="chapterDuration" className="block mb-1">
            Chapter Duration (minutes)
          </label>
          <input
            type="number"
            id="chapterDuration"
            value={chapterDuration}
            onChange={(e) => setChapterDuration(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <button
          type="button"
          onClick={addChapter}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add Chapter
        </button>

        {/* Display Chapters */}
        {chapters.length > 0 && (
          <ul className="mt-4">
            {chapters.map((chap) => (
              <li key={chap.id} className="border p-2 mb-2">
                {chap.title} - {chap.description}
              </li>
            ))}
          </ul>
        )}

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create Course
        </button>
      </form>
    </div>
  );
}

export default CreateCoursePage;
