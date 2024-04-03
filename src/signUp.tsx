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
    <div>
      {!verifying && (
        <form>
          <div>
            <label htmlFor="email">Email</label>
            <input
              onChange={(e) => setEmailAddress(e.target.value)}
              id="email"
              name="email"
              type="email"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              name="password"
              type="password"
            />
          </div>
          <button onClick={handleSubmit}>Sign up</button>
        </form>
      )}
      {verifying && (
        <div>
          <form>
            <input
              value={code}
              placeholder="Code..."
              onChange={(e) => setCode(e.target.value)}
            />
            <button onClick={handleVerify}>Verify Email</button>
          </form>
        </div>
      )}
    </div>
  );
}
