import { Link } from "react-router-dom";
import calLottieImg from "../assets/images/62051510.png";

export default function Dashboard() {
  return (
    <>
      <div className="dashboard">
        {/* Header Section */}
        {/* <header className="dashboard-header">
          <div className="header-left">
            <h1>Dashboard</h1>
          </div>
          <div className="header-right">
            <div className="shop-info">
              <h2>SHOPNAME</h2>
              <p>9876543210</p>
            </div>
            <div className="avatar">
              <span>AVT</span>
            </div>
          </div>
        </header> */}

        {/* Main Content Section */}
        <div className="dashboard-content">
          <div className="dashboard-image">
            <img src={calLottieImg} alt="Dashboard Illustration" />
          </div>

          <div className="dashboard-buttons">
            <Link to="/manage_items">
              <button> Manage Items</button>
            </Link>
            <Link to="/add_items">
              <button>Saved Bills</button>
            </Link>
            <Link to="/database">
              <button>Database</button>
            </Link>
            <Link to="/add_items">
              <button>Edit Shop Info</button>
            </Link>
            <Link to="/add_items">
              <button>Manage A/C</button>
            </Link>
          </div>
        </div>
        {/* Footer Section */}
        <footer className="dashboard-footer">
          <p>Time: 01:00 PM</p>
          <p>Date: 01/10/2024</p>
        </footer>
      </div>
    </>
  );
}
