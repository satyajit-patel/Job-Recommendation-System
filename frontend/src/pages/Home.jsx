import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar/Navbar";

export default function Home() {
  const [file, setFile] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [username, setUsername] = useState("Stranger");

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUsername(user);
    }
  }, []);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setError("Please select only a PDF file.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please login first.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    setLoading(true);
    setError("");

    try {
      const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
      const response = await axios.post(`${VITE_BACKEND_URL}/api/v1/data/resume`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      const { skills, jobs } = response.data;
      setSkills(skills);
      setJobs(jobs);
    } catch (err) {
      setError("Please upload PDF file only.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-gray-900 min-h-screen text-white p-6">
        <div className="max-w-2xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">
            Hello, <span className="text-blue-400 font-extrabold">{username}</span>! Upload Your Resume
          </h2>
          <form onSubmit={handleSubmit}>
            <input type="file" onChange={handleFileChange} className="w-full mb-4 text-black p-2 bg-gray-100 rounded" required />
            {error && <p className="text-red-500 mb-2">{error}</p>}
            <button
              type="submit"
              className="bg-blue-600 w-full p-2 rounded hover:bg-blue-700 transition"
              disabled={loading}
            >
              {loading ? "Uploading..." : "Submit"}
            </button>
          </form>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Recommended Jobs</h2>

          {skills.length > 0 && (
            <p className="text-gray-400 mb-4">
              <strong>Extracted Skills:</strong> {skills.join(", ")}
            </p>
          )}

          {jobs.length === 0 && !loading && (
            <p className="text-gray-400">No jobs found. Upload your resume to see recommendations.</p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {jobs.map((job, index) => (
              <div key={index} className="bg-gray-800 p-4 rounded-lg shadow-lg">
                <h3 className="text-lg font-bold">{job.title}</h3>
                <a href={job.link} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                  View Job
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
