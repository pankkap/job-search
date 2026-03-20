import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EditJob() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState({
    title: "",
    company: "",
    location: "",
    salary: ""
  });

  // Fetch existing job
  useEffect(() => {
    // axios.get(`http://localhost:5000/api/jobs/${id}`)
    axios.get(`${import.meta.env.VITE_API_URL}/api/jobs/${id}`)
      .then(res => setJob(res.data))
      .catch(err => console.error(err));
  }, [id]);

  // Handle change
  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  // Update job
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // await axios.put(`http://localhost:5000/api/jobs/${id}`, job);
      await axios.put(`${import.meta.env.VITE_API_URL}/api/jobs/${id}`, job);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Edit Job</h2>

        <div className="container offset-4 col-4">
      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-2"
          name="title"
          value={job.title}
          onChange={handleChange}
          placeholder="Title"
        />

        <input
          className="form-control mb-2"
          name="company"
          value={job.company}
          onChange={handleChange}
          placeholder="Company"
        />

        <input
          className="form-control mb-2"
          name="location"
          value={job.location}
          onChange={handleChange}
          placeholder="Location"
        />

        <input
          className="form-control mb-2"
          name="salary"
          value={job.salary}
          onChange={handleChange}
          placeholder="Salary"
        />

        <button className="btn btn-success">Update Job</button>
      </form>
      </div>
    </div>
  );
}

export default EditJob;