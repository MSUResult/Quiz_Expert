"use client";
import { useState } from "react";
import { z } from "zod";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState({
    password: "",
    confirmPassword: "",
  });
  const [userFound, setUserFound] = useState(false);

  const emailSchema = z.string().email("Enter a valid email");

  const handleSubmit = async () => {
    const result = emailSchema.safeParse(email);
    if (!result.success) {
      setError(result.error.errors[0].message);
      return;
    }
    setError("");

    const res = await fetch("/api/forgetpassword", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password: password.password,
        confirmPassword: password.confirmPassword,
      }),
    });

    const data = await res.json();
    console.log("📩 Response:", data);

    // ✅ Step 1: If user not found
    if (!data.success && data.message.includes("User not found")) {
      alert("User not found!");
      setUserFound(false);
      return;
    }

    // ✅ Step 2: If email found but password not sent yet
    if (data.success && data.message.includes("Email found")) {
      alert("Email found! Please enter a new password.");
      setUserFound(true);
      return;
    }

    // ✅ Step 3: If password updated successfully
    if (data.success && data.message.includes("Password updated")) {
      alert("Password updated successfully!");
      setUserFound(false);
      setEmail("");
      setPassword({ password: "", confirmPassword: "" });
      return;
    }

    // ✅ Step 4: Any other message
    alert(data.message);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-black">
      <h1>Password Recovery</h1>

      <input
        type="text"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {error && <p>{error}</p>}

      {/* Show password fields only after email verified */}
      {userFound && (
        <>
          <input
            type="password"
            placeholder="Enter New Password"
            value={password.password}
            onChange={(e) =>
              setPassword({ ...password, password: e.target.value })
            }
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={password.confirmPassword}
            onChange={(e) =>
              setPassword({ ...password, confirmPassword: e.target.value })
            }
          />
        </>
      )}

      <button onClick={handleSubmit}>Continue</button>
    </main>
  );
}
