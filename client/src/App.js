import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "./features/auth/authSlice";
import API_URL from "./config/api.js";
import "./styles/App.css";
import "./styles/components/Sidebar.css";
import "./styles/components/ProfileModal.css";

// Importing pages and components
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import Social from "./pages/Social";
import Battle from "./pages/Battle";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";

// Importing images
import homeIcon from "./Assets/UI/homenotselected.png";
import homeSelectedIcon from "./Assets/UI/homeselected.png";
import collectionIcon from "./Assets/UI/collectionnotselected.png";
import collectionSelectedIcon from "./Assets/UI/collectionselected.png";
import socialIcon from "./Assets/UI/socialoff.png";
import socialSelectedIcon from "./Assets/UI/socialon.png";
import profilepic from "./Assets/ProfilePictures/PROFILE_ICON_100020_SIRNIGHT.png";
import battleIcon from "./Assets/UI/battleoff.png";
import battleSelectedIcon from "./Assets/UI/battleon.png";
import menuIcon from "./Assets/UI/menuoff.png";
import menuSelectedIcon from "./Assets/UI/menuon.png";
import lock from "./Assets/UI/lock.png";

function importAll(r) {
  let images = {};
  r.keys().forEach((item) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
}

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const MainLayout = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("home");
  const [showModal, setShowModal] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(
    user && user.profileIcon
      ? user.profileIcon
      : "PROFILE_ICON_100020_SIRNIGHT.png"
  );
  const [isSlidingWindowOpen, setIsSlidingWindowOpen] = useState(false);
  const [hasChangedProfile, setHasChangedProfile] = useState(false);

  const profileImages = importAll(
    require.context("./Assets/ProfilePictures", false, /\.(png|jpe?g|svg)$/)
  );
  const dispatch = useDispatch();

  // Navigate to admin console on Insert key press
  useEffect(() => {
    const handleInsertKey = (e) => {
      if (e.key === "Insert") {
        navigate("/admin");
      }
    };
    window.addEventListener("keydown", handleInsertKey);
    return () => window.removeEventListener("keydown", handleInsertKey);
  }, [navigate]);

  // Always sync selectedProfile with Redux user.profileIcon
  useEffect(() => {
    if (user && user.profileIcon) {
      setSelectedProfile(user.profileIcon);
      setHasChangedProfile(false);
    }
  }, [user]);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    if (tabName !== "menu") {
      setIsSlidingWindowOpen(false);
    }
  };

  const handleProfileSelect = (filename) => {
    if (filename !== selectedProfile) {
      setSelectedProfile(filename);
      setHasChangedProfile(true);
    }
  };
  const handleProfileSave = async () => {
    if (!hasChangedProfile || !user) return;
    try {
      const response = await fetch(`${API_URL}/api/auth/profile-icon`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          profileIcon: selectedProfile,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        dispatch(
          loginSuccess({
            user: data.user,
            token: localStorage.getItem("token"),
          })
        );
      } else {
        alert(data.error || "Failed to update profile icon");
      }
    } catch (err) {
      alert("Failed to update profile icon");
    }
    setShowModal(false);
    setHasChangedProfile(false);
  };

  return (
    <div className="app-container">
      {/* Sidebar */}
      <nav className="sidebar">
        {user && (
          <div style={{ textAlign: "center", marginTop: 12, marginBottom: 4 }}>
            <div style={{ fontWeight: 600, fontSize: 18 }}>{user.username}</div>
            {user.level !== undefined && user.xp !== undefined && (
              <div
                style={{
                  fontSize: 15,
                  color: "#42c28d",
                  fontWeight: 500,
                  marginTop: 2,
                }}
              >
                Level {user.level}{" "}
                <span style={{ color: "#888", fontSize: 13 }}>
                  (XP: {user.xp})
                </span>
              </div>
            )}
          </div>
        )}
        <img
          id="profilepic"
          src={profileImages[selectedProfile] || profilepic}
          alt="profilepic"
          onClick={() => {
            setShowModal(true);
            setIsSlidingWindowOpen(false);
          }}
          style={{ cursor: "pointer" }}
        />
        <ul>
          <li
            className={activeTab === "home" ? "active" : ""}
            onClick={() => handleTabClick("home")}
          >
            <img
              src={activeTab === "home" ? homeSelectedIcon : homeIcon}
              alt="Home"
            />
          </li>
          <li
            className={activeTab === "collection" ? "active" : ""}
            onClick={() => handleTabClick("collection")}
          >
            <img
              src={
                activeTab === "collection"
                  ? collectionSelectedIcon
                  : collectionIcon
              }
              alt="Collection"
            />
          </li>{" "}
          <li
            className={activeTab === "social" ? "active" : ""}
            onClick={() => handleTabClick("social")}
          >
            <img
              src={activeTab === "social" ? socialSelectedIcon : socialIcon}
              alt="Social"
            />
            <img src={lock} alt="Lock" className="lock-2" />
          </li>
          <li
            className={activeTab === "battle" ? "active" : ""}
            onClick={() => handleTabClick("battle")}
          >
            <img
              src={activeTab === "battle" ? battleSelectedIcon : battleIcon}
              alt="Battle"
            />
            <img src={lock} alt="Lock" className="lock-1" />
          </li>
          <li
            className={activeTab === "menu" ? "active" : ""}
            onClick={() => {
              handleTabClick("menu");
              setIsSlidingWindowOpen(!isSlidingWindowOpen);
            }}
          >
            <img
              src={activeTab === "menu" ? menuSelectedIcon : menuIcon}
              alt="Menu"
            />
          </li>
        </ul>
        {/* Move logout button higher by reducing margin and removing spacer */}
        {user && (
          <button
            style={{
              width: "90%",
              padding: "10px 0",
              background: "#dc2626",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              fontWeight: 600,
              fontSize: 16,
              cursor: "pointer",
              alignSelf: "center",
            }}
            onClick={() => {
              dispatch({ type: "auth/logout" });
              window.location.href = "/login";
            }}
          >
            Logout
          </button>
        )}
      </nav>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Select Icon</h2>
            <div className="profile-grid">
              {Object.keys(profileImages).map((filename, index) => (
                <img
                  key={index}
                  src={profileImages[filename]}
                  alt={`Profile ${index}`}
                  onClick={() => handleProfileSelect(filename)}
                  className={`profile-option ${
                    selectedProfile === filename ? "selected" : ""
                  }`}
                />
              ))}
            </div>
            <button
              className={`confirm-button ${
                !hasChangedProfile ? "disabled" : ""
              }`}
              onClick={handleProfileSave}
              disabled={!hasChangedProfile}
            >
              OK
            </button>
          </div>
        </div>
      )}

      <main className="content">
        {activeTab === "home" && <Home />}
        {activeTab === "collection" && <Collection />}
        {activeTab === "social" && <Social />}
        {activeTab === "battle" && <Battle />}
      </main>
    </div>
  );
};

const AppContent = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/register"
          element={isAuthenticated ? <Navigate to="/" /> : <Register />}
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
};

export default App;
