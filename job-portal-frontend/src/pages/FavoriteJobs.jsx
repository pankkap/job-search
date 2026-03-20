import { useEffect, useState } from "react";
import axios from "axios";
import JobCard from "../components/JobCard";
import { useNavigate } from "react-router-dom";

function FavoriteJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 🔄 Fetch only favorite jobs
  useEffect(() => {
    fetchFavoriteJobs();
  }, []);

  const fetchFavoriteJobs = async () => {
    try {
      // const res = await axios.get("http://localhost:5000/api/jobs");
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/jobs`);

      // ✅ Filter only favorites
      const favoriteJobs = res.data.filter((job) => job.isFavorite);

      setJobs(favoriteJobs);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  // ⭐ Remove from favorites (toggle)
  const handleFavorite = async (job) => {
  try {
    const res = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/jobs/favorite/${job._id}`
    );

    // ✅ remove from UI if unfavorited
    if (!res.data.isFavorite) {
      setJobs((prevJobs) =>
        prevJobs.filter((j) => j._id !== job._id)
      );
    }

  } catch (error) {
    console.error(error);
  }
};

  // 🗑️ Delete job
  const handleDelete = async (id) => {
    try {
      // await axios.delete(`http://localhost:5000/api/jobs/${id}`);
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/jobs/${id}`);

      setJobs(jobs.filter((job) => job._id !== id));
      alert("Job deleted 🗑️");
    } catch (error) {
      console.error(error);
    }
  };

  // ✏️ Edit job
  const handleEdit = (job) => {
    navigate(`/edit/${job._id}`);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-danger text-center mb-4">Favorite Jobs</h2>

      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary"></div>
          <p>Loading Jobs...</p>
        </div>
      ) : jobs.length === 0 ? (
        <p className="text-center">No favorite jobs yet.</p>
      ) : (
        <div className="row">
          {jobs.map((job) => (
            <JobCard
              key={job._id}
              job={job}
              isFavorite={true} // always true here
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

export default FavoriteJobs;