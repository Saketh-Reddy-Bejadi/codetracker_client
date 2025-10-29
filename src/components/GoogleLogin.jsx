import { FcGoogle } from "react-icons/fc";
import { useState } from "react";

const GoogleLogin = () => {
  const [batch, setBatch] = useState("");
  const [error, setError] = useState("");

  const handleGoogleLogin = async () => {
    if (!batch) {
      setError("⚠️ Please select a batch before proceeding.");
      return;
    }
    setError("");
    const apiUrl =
      import.meta.env.VITE_API_BASE_URL;
    window.location.href = `${apiUrl}/api/auth/${batch}/google-login?frontendOrigin=${window.location.origin}&prompt=select_account`;
  };

  const handleSelectChange = (e) => {
    setBatch(e.target.value);
    if (e.target.value) setError("");
  };

  return (
    <div className="w-full max-w-md mx-auto flex justify-center items-center h-screen">
      <div className="bg-black rounded-lg shadow-lg p-6 space-y-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-zinc-200 mb-2">
            Welcome to CMRIT Tracker
          </h2>
          <p className="text-zinc-200 mb-6">
            Sign in with your CMRIT Hyderabad email to continue
          </p>
        </div>

        <div className="mb-4">
          <label
            htmlFor="batch-select"
            className="block text-zinc-200 text-sm font-medium mb-2"
          >
            Select your batch:
          </label>
          <select
            id="batch-select"
            value={batch}
            onChange={handleSelectChange}
            className="
    w-full p-3 px-5 rounded-xl bg-black/95 border border-zinc-800 text-white
    placeholder-zinc-400
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
    shadow-[0_2px_6px_rgba(0,0,0,0.5)]
    hover:border-zinc-600 transition-all duration-300
    appearance-none
  "
          >
            <option value="">Select Batch</option>
            <option value="2026">2026</option>
            <option value="2027">2027</option>
          </select>
          {error && (<div className="text-red-500 text-sm mt-2">{error}</div>)}
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center space-x-3 bg-zinc-300 border border-gray-300 rounded-lg px-6 py-3 text-gray-900 font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
        >
          <FcGoogle className="w-5 h-5" />
          <span>Sign in with Google</span>
        </button>

        <div className="text-center text-sm text-gray-500">
          <p>Only @cmrithyderabad.edu.in emails are allowed</p>
        </div>
      </div>
    </div>
  );
};

export default GoogleLogin;
