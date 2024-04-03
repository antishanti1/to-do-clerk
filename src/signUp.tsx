import React from "react";
import { useState } from "react";
import { useSignUp } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

export default function SignUpForm() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [verifying, setVerifying] = React.useState(false);
  const [code, setCode] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setVerifying(true);
    } catch (err: unknown) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const handleVerify = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status !== "complete") {
        console.log(JSON.stringify(completeSignUp, null, 2));
      }

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        navigate("/dashboard");
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <section className="bg-slate-100 h-screen flex flex-col items-center justify-center">
      <div className="bg-white p-5 rounded-3xl flex flex-col items-center w-1/2 py-[10%]">
        {!verifying && (
          <form className="flex flex-col gap-5 items-center">
            <div>
              <label htmlFor="email">Email</label>
              <input
                className="rounded-xl px-2 border-solid border-2 border-slate-10 ml-5 pl-5"
                onChange={(e) => setEmailAddress(e.target.value)}
                id="email"
                name="email"
                type="email"
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                className="rounded-xl px-2 border-solid border-2 border-slate-10 ml-5 pl-5"
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                name="password"
                type="password"
              />
            </div>
            <div className="flex justify-center w-full">
              <button
                className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-10 rounded-xl"
                onClick={handleSubmit}
              >
                Sign up
              </button>
            </div>
          </form>
        )}
        {verifying && (
          <div>
            <form>
              <input
                className="rounded-xl px-2 border-solid border-2 border-slate-10 mr-5 pl-5"
                value={code}
                placeholder="Code..."
                onChange={(e) => setCode(e.target.value)}
              />
              <button
                className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-10 rounded-xl"
                onClick={handleVerify}
              >
                Verify Email
              </button>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}
