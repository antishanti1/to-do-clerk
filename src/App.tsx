import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Home from "./Home";
import Dashboard from "./Dashboard";
import SignUpForm from "./signUp";
import { SignedIn, SignedOut } from "@clerk/clerk-react";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route index element={<Home />} />
      <Route
        path="/dashboard"
        element={
          <>
            <SignedIn>
              <Dashboard />
            </SignedIn>

            <SignedOut>
              <Home />
            </SignedOut>
          </>
        }
      />
      <Route path="/signUpForm" element={<SignUpForm />} />
    </>
  )
);

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
