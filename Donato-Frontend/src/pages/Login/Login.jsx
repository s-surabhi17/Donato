
// new 

// import styles from "./login.module.css";
// import { BsFacebook } from "react-icons/bs";
// import { FcGoogle } from "react-icons/fc";
// import { useState } from "react";
// import { useHistory } from "react-router-dom";

// // Add setUser prop here
// const Login = ({ setUser }) => {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: ""
//   });

//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
  
//   const history = useHistory();

//   const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:9900";

//   const handleInputChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//     if (error) setError("");
//   };

//   const validateForm = () => {
//     if (!formData.email.trim()) {
//       setError("Email is required");
//       return false;
//     }

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(formData.email)) {
//       setError("Please enter a valid email address");
//       return false;
//     }

//     if (!formData.password) {
//       setError("Password is required");
//       return false;
//     }

//     return true;
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
    
//     if (!validateForm()) {
//       return;
//     }

//     setLoading(true);
//     setError("");

//     try {
//       console.log("Attempting login to:", `${BACKEND_URL}/auth/login`);
      
//       const response = await fetch(`${BACKEND_URL}/auth/login`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         credentials: 'include', // Important for session cookies
//         body: JSON.stringify({
//           email: formData.email.trim(),
//           password: formData.password
//         }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || "Login failed. Please try again.");
//       }

//       console.log("Login successful:", data);
//       console.log("About to redirect to:", data.redirectTo || "/home");
      
//       // Store user data in localStorage
//       if (data.user) {
//         localStorage.setItem('user', JSON.stringify(data.user));
//         localStorage.setItem('isAuthenticated', 'true');
        
//         // THIS IS THE KEY CHANGE - Update App.js state immediately
//         if (setUser) {
//           setUser({ isFetched: true, user: data.user });
//         }
//       }
      
//       // The redirect will now happen automatically because App.js
//       // will re-render with authenticated state
//       // But we can keep this as backup
//       if (data.redirectTo) {
//         history.push(data.redirectTo);
//       } else {
//         history.push("/home");
//       }
      
//     } catch (err) {
//       console.error("Login error:", err);
//       setError(err.message || "Login failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loginWithGoogle = () => {
//     // Store intended redirect for after Google auth
//     localStorage.setItem('intendedRedirect', '/home');
//     window.location.href = `${BACKEND_URL}/auth/google`;
//   };

//   const loginWithFacebook = () => {
//     try {
//       window.location.href = `${BACKEND_URL}/auth/facebook`;
//     } catch (err) {
//       setError("Cannot connect to authentication service");
//     }
//   };

//   const goToSignup = () => {
//     history.push("/signup");
//   };

//   return (
//     <div className={styles.main}>
//       <h1>Log in</h1>
//       <form className={styles.form} onSubmit={handleLogin}>
//         {error && <div className={styles.error}>{error}</div>}
        
//         <input
//           type="email" 
//           name="email" 
//           placeholder="Email Address"
//           value={formData.email}
//           onChange={handleInputChange}
//           disabled={loading}
//           required
//           autoComplete="email"
//         />
        
//         <input
//           type="password" 
//           name="password" 
//           placeholder="Password"
//           value={formData.password}
//           onChange={handleInputChange}
//           disabled={loading}
//           required
//           autoComplete="current-password"
//         />
        
//         <button 
//           type="submit" 
//           className={styles.login_btn}
//           disabled={loading}
//         >
//           {loading ? "Logging in..." : "Log in"}
//         </button>
//       </form>

//       <div className={styles.or}>
//         <div className={styles.number}>
//           <p>or</p>
//         </div>
//       </div>

//       <div className={styles.lower}>
//         <p className={styles.signUpWith}>Log in with</p>
//         <div 
//           onClick={loginWithGoogle} 
//           className={styles.google}
//         >
//           <FcGoogle className={styles.iconGoogle} />
//           <p>Login with Google</p>
//         </div>
//         <div 
//           onClick={loginWithFacebook} 
//           className={styles.google}
//         >
//           <BsFacebook className={styles.iconFb} />
//           <p>Login with Facebook</p>
//         </div>
//       </div>

//       <div className={styles.switchForm}>
//         <p>
//           Don't have an account?{' '}
//           <span 
//             onClick={goToSignup}
//             className={styles.linkText}
//           >
//             Sign up here
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;

//newww

// import styles from "./login.module.css";
// import { BsFacebook } from "react-icons/bs";
// import { FcGoogle } from "react-icons/fc";
// import { useState } from "react";
// import { useHistory } from "react-router-dom";

// const Login = ({ setUser }) => {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: ""
//   });

//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
  
//   const history = useHistory();
//   const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:9900";

//   const handleInputChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//     if (error) setError("");
//   };

//   const validateForm = () => {
//     if (!formData.email.trim()) {
//       setError("Email is required");
//       return false;
//     }

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(formData.email)) {
//       setError("Please enter a valid email address");
//       return false;
//     }

//     if (!formData.password) {
//       setError("Password is required");
//       return false;
//     }

//     return true;
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
    
//     if (!validateForm()) return;

//     setLoading(true);
//     setError("");

//     try {
//       const response = await fetch(`${BACKEND_URL}/auth/login`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         credentials: 'include',
//         body: JSON.stringify({
//           email: formData.email.trim(),
//           password: formData.password
//         }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || "Login failed. Please try again.");
//       }

//       // Store user info
//       if (data.user) {
//         localStorage.setItem('user', JSON.stringify(data.user));
//         localStorage.setItem('isAuthenticated', 'true');

//         if (setUser) {
//           setUser({ isFetched: true, user: data.user });
//         }
//       }

//       // Role-based redirection
//       const role = data.user?.role?.toLowerCase();
//       if (role === "ngo") {
//         history.push("/add-ngo");
//       } else if (role === "volunteer" || role === "donor") {
//         history.push("/home");
//       } else {
//         history.push("/home");
//       }

//     } catch (err) {
//       console.error("Login error:", err);
//       setError(err.message || "Login failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loginWithGoogle = () => {
//     localStorage.setItem('intendedRedirect', '/home');
//     window.location.href = `${BACKEND_URL}/auth/google`;
//   };

//   const loginWithFacebook = () => {
//     try {
//       window.location.href = `${BACKEND_URL}/auth/facebook`;
//     } catch (err) {
//       setError("Cannot connect to authentication service");
//     }
//   };

//   const goToSignup = () => {
//     history.push("/signup");
//   };

//   return (
//     <div className={styles.main}>
//       <h1>Log in</h1>
//       <form className={styles.form} onSubmit={handleLogin}>
//         {error && <div className={styles.error}>{error}</div>}
        
//         <input
//           type="email" 
//           name="email" 
//           placeholder="Email Address"
//           value={formData.email}
//           onChange={handleInputChange}
//           disabled={loading}
//           required
//           autoComplete="email"
//         />
        
//         <input
//           type="password" 
//           name="password" 
//           placeholder="Password"
//           value={formData.password}
//           onChange={handleInputChange}
//           disabled={loading}
//           required
//           autoComplete="current-password"
//         />
        
//         <button 
//           type="submit" 
//           className={styles.login_btn}
//           disabled={loading}
//         >
//           {loading ? "Logging in..." : "Log in"}
//         </button>
//       </form>

//       <div className={styles.or}>
//         <div className={styles.number}>
//           <p>or</p>
//         </div>
//       </div>

//       <div className={styles.lower}>
//         <p className={styles.signUpWith}>Log in with</p>
//         <div 
//           onClick={loginWithGoogle} 
//           className={styles.google}
//         >
//           <FcGoogle className={styles.iconGoogle} />
//           <p>Login with Google</p>
//         </div>
//         <div 
//           onClick={loginWithFacebook} 
//           className={styles.google}
//         >
//           <BsFacebook className={styles.iconFb} />
//           <p>Login with Facebook</p>
//         </div>
//       </div>

//       <div className={styles.switchForm}>
//         <p>
//           Don't have an account?{' '}
//           <span 
//             onClick={goToSignup}
//             className={styles.linkText}
//           >
//             Sign up here
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;

 // neww22
import styles from "./login.module.css";
import { BsFacebook } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";

const Login = ({ setUser }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isMounted = useRef(true);
  const history = useHistory();
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:9900";

  useEffect(() => {
    // Mark component as mounted
    isMounted.current = true;

    // Cleanup on unmount
    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const validateForm = () => {
    if (!formData.email.trim()) {
      setError("Email is required");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      return false;
    }

    if (!formData.password) {
      setError("Password is required");
      return false;
    }

    return true;
  }

 const handleLogin = async (e) => {
  e.preventDefault();

  if (!validateForm()) return;

  setLoading(true);
  setError("");

  try {
    const response = await fetch(`${BACKEND_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: 'include',
      body: JSON.stringify({
        email: formData.email.trim(),
        password: formData.password
      }),
    });

    const data = await response.json();
    console.log("🔍 Login response:", data); // Debug log

    if (!response.ok) {
      throw new Error(data.message || "Login failed. Please try again.");
    }

    if (data.success && data.user) { // Check for success and user
      // Store auth data (no token from backend currently)
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('userRole', data.user.role);
      localStorage.setItem('userId', data.user._id || data.user.id);
      localStorage.setItem('isAuthenticated', 'true');

      console.log("✅ Stored auth data:");
      console.log("User:", data.user);
      console.log("Role:", data.user.role);

      if (setUser && isMounted.current) {
        setUser({ isFetched: true, user: data.user });
      }

      // Use redirectTo from backend or default routing
      if (data.redirectTo) {
        history.push(data.redirectTo);
      } else {
        const role = data.user?.role?.toLowerCase();
        if (role === "ngo") {
          history.push("/add-ngo");
        } else if (role === "admin") {
          history.push("/admin"); // ✅ Matches your App.js route
        } else {
          history.push("/home");
        }
      }
    } else {
      // ✅ Better error handling
      console.error("❌ Login failed or missing user data:", data);
      throw new Error(data.message || "Login failed - invalid response");
    }

  } catch (err) {
    console.error("❌ Login error:", err);
    if (isMounted.current) {
      setError(err.message || "Login failed. Please try again.");
    }
  } finally {
    if (isMounted.current) {
      setLoading(false);
    }
  }
};

  const loginWithGoogle = () => {
    localStorage.setItem('intendedRedirect', '/home');
    window.location.href = `${BACKEND_URL}/auth/google`;
  };

  const loginWithFacebook = () => {
    try {
      window.location.href = `${BACKEND_URL}/auth/facebook`;
    } catch {
      setError("Cannot connect to authentication service");
    }
  };

  const goToSignup = () => {
    history.push("/signup");
  };

  return (
    <div className={styles.main}>
      <h1>Log in</h1>
      <form className={styles.form} onSubmit={handleLogin}>
        {error && <div className={styles.error}>{error}</div>}

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleInputChange}
          disabled={loading}
          required
          autoComplete="email"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
          disabled={loading}
          required
          autoComplete="current-password"
        />

        <button
          type="submit"
          className={styles.login_btn}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Log in"}
        </button>
      </form>

      <div className={styles.or}>
        <div className={styles.number}><p>or</p></div>
      </div>

      <div className={styles.lower}>
        <p className={styles.signUpWith}>Log in with</p>
        <div onClick={loginWithGoogle} className={styles.google}>
          <FcGoogle className={styles.iconGoogle} />
          <p>Login with Google</p>
        </div>
        <div onClick={loginWithFacebook} className={styles.google}>
          <BsFacebook className={styles.iconFb} />
          <p>Login with Facebook</p>
        </div>
      </div>

      <div className={styles.switchForm}>
        <p>
          Don't have an account?{" "}
          <span onClick={goToSignup} className={styles.linkText}>
            Sign up here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
