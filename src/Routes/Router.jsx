import { createBrowserRouter } from "react-router-dom";
import Error from "../Pages/Error";
import Home from "../Pages/Home/Home";
import Main from "../Layout/Main";
import SignIn from "../Pages/SignIn";
import SignUp from "../Pages/SignUp";


const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      errorElement: <Error></Error>,
      children: [
        {
          path: '/',
          element: <Home></Home>
        },
        {
          path: '/signIn',
          element: <SignIn></SignIn>
        },
        {
          path: '/signUp',
          element: <SignUp></SignUp>
        }
      ]
    },
  ]);

  export default router;