# Education Platform

 Description
 
This is an Education Platform built using the MERN stack (MongoDB, Express, React, Node.js). The platform allows students and teachers to interact, access courses and engage with various learning resources.

Live 👉 : https://smart-path-six.vercel.app/

 Features
- User Authentication: Allows users to sign up, log in, and manage their profiles.
- Course Management: Teachers can create, update, and manage courses, while students can enroll and view the course content.
- Quizzes : Teachers can create,update,delete and manage while Students can take quizzes 

 Technologies Used
- Frontend: React, Redux, Tailwind CSS
- Backend: Node.js, Express
- Database: MongoDB
- Authentication: JWT (JSON Web Tokens)
- Deployment: Render (for backend), Vercel (for frontend)


[Architecture Diagram]

https://github.com/user-attachments/assets/5962188a-f8dc-4427-9950-98b74dc5144f


 Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/en/)
- [MongoDB](https://www.mongodb.com/try/download/community)

#Installation:

     Navigate to the project directory:
 
     cd Education Platfrom

#Install dependencies:

    go to the folder where package.json file placed and write below command npm install

#Set up environment variables:

    Create a .env file in the backend directory and add your configuration variables (e.g., database connection string, JWT secret).

       DB_URL = Enter your cluster

       PORT = Enter your port number

     JWT_SECRET =Enter your JWT secret

#For Frontend 
 
      cd frontend     run : npm start 
 
#For Backend 
 
     cd backend     run :  nodemon server.js
