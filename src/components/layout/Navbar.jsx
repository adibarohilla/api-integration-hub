import { Code2 } from "lucide-react";

function Navbar() {
  return (
    <header className="navbar">
      <div className="container navbar-content">
        <div className="navbar-brand">
          <div className="navbar-icon">
            <Code2 size={22} />
          </div>

          <div>
            <h1>API Integration Hub</h1>
            <p>Explore multiple APIs in one dashboard</p>
          </div>
        </div>

        <div className="navbar-status">
          <span className="status-dot"></span>
          <span>6 APIs integrated</span>
        </div>
      </div>
    </header>
  );
}

export default Navbar;