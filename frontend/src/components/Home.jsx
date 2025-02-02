import { Link } from "react-router-dom"

function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6 text-center">Welcome to Our Educational Platform</h1>

      <div className="max-w-3xl mx-auto text-center mb-8">
        <p className="text-xl mb-4">
          Discover a world of knowledge with our diverse range of courses. Whether you're looking to enhance your skills
          or explore new subjects, we have something for everyone.
        </p>
        <Link
          to="/courses"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300"
        >
          Explore Courses
        </Link>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">For Students</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Access to high-quality courses</li>
            <li>Learn at your own pace</li>
            <li>Interactive quizzes to test your knowledge</li>
            <li>Earn certificates upon completion</li>
          </ul>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">For Instructors</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Share your expertise with a global audience</li>
            <li>Create engaging course content</li>
            <li>Design challenging quizzes</li>
            <li>Build your online teaching portfolio</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Home

