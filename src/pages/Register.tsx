import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import axios from "axios";
import { GearIcon } from "@livekit/components-react";

const Register = () => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const { register } = useUser();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);


  const validateUsername = (name: string): boolean => {
    const regex = /^[A-Za-z\s]{2,}$/;
    return regex.test(name);
  };
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    if (!validateUsername(username.trim())) {
      setError("Name must be at least 2 letters and contain only letters.");
      return;
    }

    try {
      setLoading(true);

      const userToken = await axios.post(
        `https://patient-grouper-infinite.ngrok-free.app/v1/sessions/create-session`,
        {
          name: username.trim(),
        }
      );

      localStorage.setItem("userToken", userToken.data.user_token);
      localStorage.setItem("livekitUrl", userToken.data.livekit_url);
      setError("");

      register(
        username.trim(),
        userToken.data.user_token,
        userToken.data.livekit_url
      );

      navigate("/");
    } catch (err) {
      setError("Failed to create session. Please try again.");
      setLoading(false);
    }
  };
  

  function LoadingAnimation() {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <GearIcon className="h-8 w-8 animate-spin text-green-600" />
          <p className="mt-4 text-lg text-gray-700">
            Loading your session, please wait...
          </p>
        </div>
      </div>
    );
  }

  return loading ? (
    <LoadingAnimation />
  ) : (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-green-100 via-green-200 to-green-300">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-sm"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center text-green-700">
          Register with your name
        </h2>

        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your name"
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          required
        />

        {error && <p className="text-sm text-red-600 mb-4">{error}</p>}

        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 rounded-md transition duration-200"
        >
          Register
        </button>
      </form>
    </div>
  );

};

export default Register;
