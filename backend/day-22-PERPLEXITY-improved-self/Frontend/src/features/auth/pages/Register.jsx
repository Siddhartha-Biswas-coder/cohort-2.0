import React from "react";
import { useState } from "react";
import { Link } from "react-router";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitForm = (event) => {
    event.preventDefault();

    const payload = {
      username,
      email,
      password,
    };

    console.log("Register payload: ", payload);
  };

  return (
    <section className="min-h-screen bg-zinc-50 dark:bg-[#030303] px-4 py-10 text-zinc-850 dark:text-zinc-100 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="mx-auto flex min-h-[85vh] w-full max-w-5xl items-center justify-center">
        <div className="w-full max-w-md rounded-2xl border border-zinc-200 dark:border-indigo-500/10 bg-white dark:bg-[#09090b]/80 p-8 shadow-xl dark:shadow-[0_0_50px_rgba(99,102,241,0.06)] backdrop-blur">
          <h1 className="text-3xl font-bold bg-linear-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-450 bg-clip-text text-transparent">Create Account</h1>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            Register with your username, email, and password.
          </p>

          <form onSubmit={submitForm} className="mt-8 space-y-5">
            <div>
              <label
                htmlFor="username"
                className="mb-2 block text-sm font-medium text-zinc-650 dark:text-zinc-200"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                placeholder="Choose a username"
                required
                className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950/80 px-4 py-3 text-zinc-900 dark:text-zinc-100 outline-none ring-0 transition focus:border-indigo-500 dark:focus:border-indigo-500/50 focus:shadow-[0_0_0_3px_rgba(99,102,241,0.15)]"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-zinc-650 dark:text-zinc-200"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                required
                className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950/80 px-4 py-3 text-zinc-900 dark:text-zinc-100 outline-none ring-0 transition focus:border-indigo-500 dark:focus:border-indigo-500/50 focus:shadow-[0_0_0_3px_rgba(99,102,241,0.15)]"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-zinc-650 dark:text-zinc-200"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Create a password"
                required
                className="w-full rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950/80 px-4 py-3 text-zinc-900 dark:text-zinc-100 outline-none ring-0 transition focus:border-indigo-500 dark:focus:border-indigo-500/50 focus:shadow-[0_0_0_3px_rgba(99,102,241,0.15)]"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-linear-to-r from-indigo-600 to-violet-600 dark:from-indigo-500 dark:to-violet-500 px-4 py-3 font-semibold text-white transition hover:opacity-95 shadow-[0_4px_12px_rgba(99,102,241,0.15)] hover:shadow-[0_4px_20px_rgba(99,102,241,0.3)] focus:outline-none cursor-pointer"
            >
              Register
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 transition"
            >Login</Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Register;
