import { useEffect, useState } from "react";
import axios from "axios";
import JobCard from "../components/JobCard";
// import { useNavigate } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";

function AllJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const location = useLocation();
  // 🔍 Get search query from URL
  const queryParams = new URLSearchParams(location.search);
  const search = queryParams.get("search") || "";

  // ✅ Fetch Jobs
  // useEffect(() => {
  //   fetchJobs();
  // }, []);

  // 🔄 Fetch jobs whenever search changes
  useEffect(() => {
    fetchJobs();
  }, [search]);

  // const fetchJobs = async () => {
  //   try {
  //     const res = await axios.get("http://localhost:5000/api/jobs");
  //     setJobs(res.data);
  //     setLoading(false);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  const fetchJobs = async () => {
    try {
      setLoading(true);

      // const res = await axios.get(
      //   `http://localhost:5000/api/jobs?search=${search}`
      // );
      const url = search
        ? `${import.meta.env.VITE_API_URL}/api/jobs?search=${search}`
        : `${import.meta.env.VITE_API_URL}/api/jobs`;

      const res = await axios.get(url);

      console.log("API Response:", res.data); // 🔍 debug
      setJobs(res.data || []);
      setLoading(false);
    } catch (err) {
      console.error("API Error:", err);
      setJobs([]); // prevent crash
    } finally {
      setLoading(false);
    }
  };

  // ⭐ Favorite (local toggle for now)
  // const handleFavorite = (job) => {
  //   if (favorites.includes(job._id)) {
  //     setFavorites(favorites.filter((id) => id !== job._id));
  //   } else {
  //     setFavorites([...favorites, job._id]);
  //   }
  // };

  const handleFavorite = async (job) => {
    try {
      // const res = await axios.put(
      //   `http://localhost:5000/api/jobs/favorite/${job._id}`
      // );

      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/jobs/favorite/${job._id}`,
      );

      // ✅ Replace whole object (clean & safe)
      setJobs((prevJobs) =>
        prevJobs.map((j) => (j._id === job._id ? res.data : j)),
      );
    } catch (error) {
      console.error(error);
    }
  };

  // 🗑️ Delete Job
  const handleDelete = async (id) => {
    try {
      // await axios.delete(`http://localhost:5000/api/jobs/${id}`);

      axios.delete(`${import.meta.env.VITE_API_URL}/api/jobs/${id}`);
      // update UI
      setJobs(jobs.filter((job) => job._id !== id));

      alert("Job deleted successfully 🗑️");
    } catch (error) {
      console.error(error);
    }
  };

  // ✏️ Edit Job
  const handleEdit = (job) => {
    navigate(`/edit/${job._id}`);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-danger text-center mb-4">All Jobs</h2>

      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary"></div>
          <p>Loading Jobs...</p>
        </div>
      ) : (
        <div className="row">
          {Array.isArray(jobs) &&
            jobs.map((job) => (
              <JobCard
                key={job._id}
                job={job}
                isFavorite={job.isFavorite} // 🔥 from DB now
                onFavorite={handleFavorite}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
        </div>
      )}
    </div>
  );
}

export default AllJobs;
