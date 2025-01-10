import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NavBar from "./pages/NavBar";
import Treatments from "./pages/Treatments";
import Staff from "./pages/Staff";
import Calendar from "./pages/Calendar";
import Auth from "./pages/Auth";

function App() {
  return (
    <Routes>
      <Route path="/" element={<NavBar />}>
        <Route index element={<Home />} />
        <Route path="auth" element={<Auth />} />
        <Route path="treatments" element={<Treatments />} />
        <Route path="staff" element={<Staff />} />
        <Route path="calendar" element={<Calendar />} />
      </Route>
    </Routes>
  );
}

export default App;
