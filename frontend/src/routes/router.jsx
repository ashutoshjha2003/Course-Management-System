import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../Pages/Home/Home";
import Instructors from "../Pages/Instructor/Instructors";
import Classes from "../Pages/Classes/Classes";
import Login from "../Pages/User/Login";
import Register from "../Pages/User/Register";
import EachClassDetails from "../Pages/Classes/EachClassDetails";
import DashboardLayout from "../layout/DashboardLayout";
import Dashboard from "../Pages/Dashboard/Dashboard";
import StudentCP from "../Pages/Dashboard/Student/StudentCP";
import EncrolledClasses from "../Pages/Dashboard/Student/Enroll/EncrolledClasses";
import SelectedClass from "../Pages/Dashboard/Student/SelectedClass";
import MyPaymentHistory from "../Pages/Dashboard/Student/Payment/History/MyPaymentHistory";
import AsInstructor from "../Pages/Dashboard/Student/Apply/AsInstructor";
import Payment from "../Pages/Dashboard/Student/Payment/Payment";
import CourseDetails from "../Pages/Dashboard/Student/Enroll/CourseDetails";
import InstructorCp from "../Pages/Dashboard/Instructor/InstructorCp";
import AddClass from "../Pages/Instructor/AddClass";
import MyClasses from "../Pages/Instructor/MyClasses";
import PendingCourse from "../Pages/Instructor/PendingCourse";
import ApprovedCourse from "../Pages/Instructor/ApprovedCourse";
import AdminHome from "../Pages/Dashboard/Admin/AdminHome";
import ManageClasses from "../Pages/Dashboard/Admin/ManageClasses";
import ManageUsers from "../Pages/Dashboard/Admin/ManageUsers";
import UpdateUser from "../Pages/Dashboard/Admin/UpdateUser";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children : [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/instructors",
        element: <Instructors />
      },
      {
        path: "classes",
        element: <Classes />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
        element: <Register />
      },
      {
        path: '/class/:id',
        element: <EachClassDetails />,
        loader: ({params}) => fetch(`http://localhost:5000/class/${params.id}`)
      }
    ]
  },

  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />
      },

      // Students routes
      {
        path: "student-cp",
        element: <StudentCP />
      },

      {
        path: "enrolled-classes",
        element: <EncrolledClasses />
      },

      {
        path: "my-selected",
        element: <SelectedClass />
      },

      {
        path: "my-payments",
        element: <MyPaymentHistory />
      },

      {
        path: "apply-instructor",
        element: <AsInstructor />
      },

      {
        path: "user/payment",
        element: <Payment/>
      },

      {
        path: "course-details",
        element: <CourseDetails />
      },

      // Instructor or Teacher routes
      {
        path: "instructor-cp",
        element: <InstructorCp />
      },

      {
        path: "add-class",
        element: <AddClass />
      },

      {
        path: "my-classes",
        element: <MyClasses />
      }, 
      
      {
        path: "my-pending",
        element: <PendingCourse />
      },

      {
        path: "my-approved",
        element: <ApprovedCourse />
      },

      // Admin Routes
      {
        path: "admin-home",
        element: <AdminHome />
      },

      {
        path: "manage-classes",
        element: <ManageClasses />
      },

      {
        path: "manage-users",
        element: <ManageUsers />
      },

      {
        path: "update-user/:id",
        element: <UpdateUser />,
        loader: ({params}) => fetch(`http://localhost:5000/users/${params.id}`)
      }
    ]
  }
]);