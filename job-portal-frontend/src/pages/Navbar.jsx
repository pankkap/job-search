import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching:", search); // ✅ debug

    // navigate with query param
    navigate(`/?search=${search}`);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Job Portal
        </Link>

        {/* 🔍 Search Form */}
        <form className="d-flex mx-auto" onSubmit={handleSearch}>
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search jobs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="btn btn-outline-light" type="submit">
            Search
          </button>
        </form>

        <div className="navbar-nav">
          <Link className="nav-link" to="/">
            All Jobs
          </Link>

          <Link className="nav-link" to="/favorites">
            Favorite Jobs
          </Link>

          <Link className="nav-link" to="/create">
            Create Job
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;