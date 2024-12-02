import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Card from "./components/Card";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

function AppContent() {
  const { darkMode } = useTheme();
  console.log(darkMode);

  return (
    <div className={`App ${darkMode ? "dark" : "light"}`}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Card />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
