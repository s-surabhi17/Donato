import "./App.css";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Switch, Route, useLocation, useHistory } from "react-router-dom";

import HomePage from "./pages/HomePage";
import AllNGOS from "./pages/AllNGOS";
import NGOPage from "./pages/NGOPage";
import FoodDetails from "./pages/FoodDetails";
import CategorySelection from "./pages/CategorySelection";
import ChooseRole from "./pages/ChooseYourRole";
import DeliverSelection from "./pages/DeliverSelection";
import ConfirmFoodDetails from "./pages/ConfirmFoodDetails";
import DonationSelection from "./pages/DonationSelection";
import FirstPage from "./pages/FirstPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import AddNGO from "./pages/AddNGO/AddNGO";
import OAuthSuccess from "./pages/OAuthSuccess";
import NGOProfile from "./pages/NGOprofile/NGOProfile";
import DonationHistory from "./pages/DonationHistory/DonationHistory";
// import Admin from "./pages/Admin"; // Removed unused import
import { FoodDonationProvider } from "./Context/FoodDonationContext";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";

function App() {
  const [ngoData, setData] = useState([]);
  const [userData, setUser] = useState({ isFetched: false, user: null });
  const [isLoad, setLoad] = useState(true);
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:9900";

  const history = useHistory();
  const location = useLocation();

  // Configure axios defaults with auth token
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [userData.user]);

// Handle authentication failures
  const handleAuthFailure = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
    sessionStorage.clear();
    delete axios.defaults.headers.common['Authorization'];
    setUser({ isFetched: true, user: null });
  }, []);


  // Fetch NGO Data with proper error handling
  const getNgoData = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        withCredentials: true,
        ...(token && { headers: { Authorization: `Bearer ${token}` } })
      };
      
      const response = await axios.get(`${BACKEND_URL}/ngos`, config);
      if (response.data.success && Array.isArray(response.data.data)) {
        setData(response.data.data);
      } else {
        setData([]);
      }
    } catch (err) {
      console.error("Failed to fetch NGOs:", err);
      
      // Handle 401 errors - token might be invalid
      if (err.response?.status === 401) {
        console.log("Authentication failed, clearing user data");
        handleAuthFailure();
      }
      setData([]);
    }
  }, [BACKEND_URL, handleAuthFailure]);

  // Fetch User Info with proper token handling
  const getUser = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setUser({ isFetched: true, user: null });
        return;
      }

      const config = {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` }
      };
      
      const { data } = await axios.get(`${BACKEND_URL}/user`, config);
      
      // Verify the user data matches what we expect
      if (data.user && data.user.role && data.user.email) {
        setUser({ isFetched: true, user: data.user });
        
        // Update localStorage with correct user data
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('userRole', data.user.role);
        localStorage.setItem('userId', data.user._id || data.user.id);
        
        console.log("✅ User authenticated:", data.user);
      } else {
        console.error("❌ Invalid user data received:", data);
        handleAuthFailure();
      }
    } catch (err) {
      console.error("❌ Failed to fetch user:", err);
      
      if (err.response?.status === 401) {
        console.log("Token invalid, clearing auth data");
        handleAuthFailure();
      } else {
        setUser({ isFetched: true, user: null });
      }
    }
  }, [BACKEND_URL,handleAuthFailure]);

  // Initial Data Load
  useEffect(() => {
    getUser().then(() => {
      // Only fetch NGO data after user is authenticated
      if (localStorage.getItem('token')) {
        getNgoData();
      }
    });
  }, [getUser, getNgoData]);

  // Loading Animation Timeout
  useEffect(() => {
    const timer = setTimeout(() => setLoad(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Auto-Redirect NGOs to AddNGO Page
  useEffect(() => {
    if (
      userData.isFetched &&
      userData.user?.role === "ngo" &&
      !userData.user.hasNgoProfile &&
      location.pathname !== "/add-ngo"
    ) {
      history.push("/add-ngo");
    }
  }, [userData, location.pathname, history]);

  // Role-based redirect after login
  useEffect(() => {
    if (userData.isFetched && userData.user && location.pathname === "/") {
      const userRole = userData.user.role;
      
      // Redirect based on role if on root path
      switch (userRole) {
        case "admin":
          if (location.pathname === "/" || location.pathname === "/login") {
            history.push("/admin-dashboard");
          }
          break;
        case "ngo":
          if (!userData.user.hasNgoProfile) {
            history.push("/add-ngo");
          } else if (location.pathname === "/" || location.pathname === "/login") {
            history.push("/ngo-profile");
          }
          break;
        case "donor":
          if (location.pathname === "/login") {
            history.push("/home");
          }
          break;
        default:
          break;
      }
    }
  }, [userData, location.pathname, history]);

  // 🔐 Logout Function
  const logout = async () => {
    try {
      await axios.post(`${BACKEND_URL}/auth/logout`, {}, { 
        withCredentials: true,
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      console.log("✅ Backend logout successful");
    } catch (err) {
      console.error("❌ Logout error:", err);
    } finally {
      handleAuthFailure();
      history.push("/login");
    }
  };

  // Protected Route Component
  const ProtectedRoute = ({ children, allowedRoles = [], ...rest }) => {
    if (!userData.isFetched) {
      return <div>Loading...</div>;
    }

    if (!userData.user) {
      return <Login setUser={setUser} />;
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(userData.user.role)) {
      console.log(`❌ Access denied. User role: ${userData.user.role}, Required: ${allowedRoles}`);
      
      // Redirect to appropriate page based on user role
      switch (userData.user.role) {
        case "admin":
          history.push("/admin");
          break;
        case "ngo":
          history.push("/ngo-profile");
          break;
        case "donor":
          history.push("/home");
          break;
        default:
          history.push("/home");
      }
      return null;
    }

    return children;
  };

  // Show loading screen
  if (!userData.isFetched) {
    return (
      <div className="App">
        <p>Loading...</p>
      </div>
    );
  }

  // Unauthenticated Routes
  if (!userData.user) {
    return (
      <div className="App">
        {isLoad ? (
          <FirstPage />
        ) : (
          <Switch>
            <Route exact path="/login">
              <Login setUser={setUser} />
            </Route>
            <Route exact path="/signup">
              <Signup setUser={setUser} />
            </Route>
            <Route exact path="/oauth-success">
              <OAuthSuccess setUser={setUser} />
            </Route>
            <Route path="*">
              <Login setUser={setUser} />
            </Route>
          </Switch>
        )}
      </div>
    );
  }

  // Authenticated Routes with proper role-based access
  return (
    <FoodDonationProvider>
      <div className="App">
        <Switch>
          {/* Admin Routes */}
          <Route exact path="/admin-dashboard">
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          </Route>
 
          {/* NGO Routes */}
          <Route exact path="/ngo-profile">
            <ProtectedRoute allowedRoles={["ngo"]}>
              <NGOProfile />
            </ProtectedRoute>
          </Route>

          <Route exact path="/add-ngo">
            <ProtectedRoute allowedRoles={["ngo"]}>
              <AddNGO />
            </ProtectedRoute>
          </Route>

          {/* Common Routes */}
          <Route exact path="/">
            <ProtectedRoute>
              <HomePage data={ngoData} />
            </ProtectedRoute>
          </Route>

          <Route exact path="/home">
            <ProtectedRoute>
              <HomePage data={ngoData} />
            </ProtectedRoute>
          </Route>

          <Route exact path="/profile">
            <ProtectedRoute>
              <Profile user={userData.user} logout={logout} />
            </ProtectedRoute>
          </Route>

          <Route exact path="/all">
            <ProtectedRoute>
              <AllNGOS data={ngoData} />
            </ProtectedRoute>
          </Route>

          <Route exact path="/all/:id">
            <ProtectedRoute>
              <NGOPage data={ngoData} />
            </ProtectedRoute>
          </Route>

          {/* Donor/NGO Routes */}
          <Route exact path="/category">
            <ProtectedRoute allowedRoles={["donor", "ngo"]}>
              <CategorySelection />
            </ProtectedRoute>
          </Route>

          <Route exact path="/chooseRole">
            <ProtectedRoute allowedRoles={["donor", "ngo"]}>
              <ChooseRole />
            </ProtectedRoute>
          </Route>

          <Route exact path="/foodDetails">
            <ProtectedRoute allowedRoles={["donor", "ngo"]}>
              <FoodDetails />
            </ProtectedRoute>
          </Route>

          <Route exact path="/delivery">
            <ProtectedRoute allowedRoles={["donor", "ngo"]}>
              <DeliverSelection />
            </ProtectedRoute>
          </Route>

          <Route exact path="/donationType">
            <ProtectedRoute allowedRoles={["donor", "ngo"]}>
              <DonationSelection />
            </ProtectedRoute>
          </Route>

          <Route exact path="/ConfirmFoodDetails">
            <ProtectedRoute allowedRoles={["donor", "ngo"]}>
              <ConfirmFoodDetails />
            </ProtectedRoute>
          </Route>

          <Route exact path="/donation-history">
            <ProtectedRoute allowedRoles={["donor"]}>
              <DonationHistory user={userData.user} />
            </ProtectedRoute>
          </Route>

          <Route exact path="/oauth-success">
            <OAuthSuccess setUser={setUser} />
          </Route>

          {/* Fallback */}
          <Route path="*">
            <ProtectedRoute>
              <HomePage data={ngoData} />
            </ProtectedRoute>
          </Route>
        </Switch>
      </div>
    </FoodDonationProvider>
  );
}

export default App;