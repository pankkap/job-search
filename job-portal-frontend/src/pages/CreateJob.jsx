import { useState } from "react";

function CreateJob() {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      console.log("Job Created:", data);

      alert("Job Created Successfully!");

      // Reset form
      setFormData({
        title: "",
        company: "",
        location: ""
      });
       navigate("/");
    } catch (error) {
      console.error(error);
      alert("Error creating job");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Create Job</h2>

        <div className="offset-4 col-4">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Job Title</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Company</label>
          <input
            type="text"
            className="form-control"
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Location</label>
          <input
            type="text"
            className="form-control"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
        </div>

        <button className="btn btn-primary">Create Job</button>
      </form>
      </div>
    </div>
  );
}

export default CreateJob;