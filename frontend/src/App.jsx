import Dashboard from "./pages/Dashboard";
import Billing_Section from "./pages/Billing_Section";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import ManageItems from "./pages/ManageItems";
import Database_Page from "./pages/Database_Page";

const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/billing" element={<Billing_Section />} />
          <Route path="/manage_items" element={<ManageItems />} />
          <Route path="/database" element={<Database_Page />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
