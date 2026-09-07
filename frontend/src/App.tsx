import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import JobSearch from "./pages/JobSearch";
import Header from "./components/Layout/Header";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/jobs" element={<JobSearch />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;