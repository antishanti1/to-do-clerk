import { SignInButton } from "@clerk/clerk-react";
import { SignUpButton } from "@clerk/clerk-react";

export default function Home() {
  return (
    <section className="bg-slate-100 h-screen flex flex-col items-center justify-center">
      <div className="bg-white p-5 rounded-3xl flex flex-col items-center w-1/2 py-[10%]">
        <div>
          <h1 className="font-semibold text-center text-4xl">
            Welcome to To-Do App
          </h1>
          <p className="font-thin decoration-slate-50 text-center pt-5">
            To continue, please:
          </p>
        </div>
        <div className="flex gap-10 pt-[5%]">
          <SignInButton mode="modal" redirectUrl="/dashboard">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-10 rounded-xl">
              Sign in
            </button>
          </SignInButton>
          <SignUpButton mode="modal" redirectUrl="/dashboard">
            <button className="bg-slate-500 hover:bg-blue-700 text-white font-bold py-2 px-10 rounded-xl">
              Sign Up
            </button>
          </SignUpButton>
        </div>
      </div>
    </section>
  );
}
