import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Home from "./components/Home";
import CreateCoursePage from "./courses/CreateCoursePage";
import CourseList from "./courses/CourseList";
import CourseDetail from "./courses/CourseDetail";
import MyCourse from "./courses/MyCourse";
import UpdateCourse from "./courses/UpdateCourse";
import DeleteCourse from "./courses/DeleteCourse";
import AdminRoute from "./adminRoutes/AdminRoute";
import CreateQuizPage from "./quizzes/CreateQuizPage";
import UpdateQuizPage from "./quizzes/UpdateQuizPage";
import CourseQuizzesPage from "./quizzes/CourseQuizzesPage";
import ManageQuizzes from "./quizzes/ManageQuizzes";
import AllQuizzes from "./quizzes/AllQuizzes";

function App() {
  
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/courses" element={<CourseList />} />
            <Route path="/courses/:id" element={<CourseDetail />} />
            
            {/* Admin protected routes */}
            <Route element={<AdminRoute />}>
              <Route path="/courses/mycourses" element={<MyCourse />} />
              <Route path="/courses/create" element={<CreateCoursePage />} />
              <Route path="/courses/update/:id" element={<UpdateCourse />} />
              <Route path="/courses/delete/:id" element={<DeleteCourse />} />
              
              {/* Quiz routes */}
              <Route path="/courses/:courseId/quizzes" element={<CourseQuizzesPage />} />
              <Route path="/quizzes/:id" element={<ManageQuizzes />} />
              <Route path="/updateQuiz/:id" element={<UpdateQuizPage />} />
              </Route>
              <Route path="/quizzes" element={<AllQuizzes />} />

            {/* Quiz creation route */}
            <Route path="/quizzes/create/:courseId" element={<CreateQuizPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
