import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Card from "./components/Card";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import { UserProvider } from "./contexts/UserContext";
import AddCard from "./components/AddCard";
import FavCards from "./components/FavCards";
import { CardsProvider } from "./contexts/CardsContext";
import MyCards from "./components/MyCards";
import About from "./components/About";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <CardsProvider>
          <AppContent />
          <ToastContainer />
        </CardsProvider>
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
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/add-card" element={<AddCard />} />
          <Route path="/fav-cards" element={<FavCards />} />
          <Route path="/my-cards" element={<MyCards />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
