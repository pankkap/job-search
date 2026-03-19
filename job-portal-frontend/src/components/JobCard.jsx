function JobCard({ job, isFavorite, onFavorite, onEdit, onDelete }) {
  return (
    <div className="col-md-4 mb-4">
      <div className="card shadow-sm h-100">
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{job.title}</h5>

          <p className="card-text">
            <strong>Company:</strong> {job.company} <br />
            <strong>Location:</strong> {job.location}
          </p>

          <div className="mt-auto d-flex gap-2">

            {/* ⭐ Favorite */}
            <button
              className={`btn ${isFavorite ? "btn-success" : "btn-warning"} flex-fill`}
              onClick={() => onFavorite(job)}
            >
              {isFavorite ? "✅" : "⭐"}
            </button>

            {/* ✏️ Edit */}
            <button
              className="btn btn-info flex-fill"
              onClick={() => onEdit(job)}
            >
              ✏️ 
            </button>

            {/* 🗑️ Delete */}
            <button
              className="btn btn-danger flex-fill"
              onClick={() => onDelete(job._id)}
            >
              🗑️ 
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}

export default JobCard;