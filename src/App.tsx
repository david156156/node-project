import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Card from "./components/Card";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import { UserProvider } from "./contexts/UserContext";

function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <AppContent />
      </UserProvider>
    </ThemeProvider>
  );
}

function AppContent() {
  const { darkMode } = useTheme();

  return (
    <div className={`App ${darkMode ? "dark" : "light"}`}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Card />} />
          <Route path="/about" element={<h1>About Page</h1>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
