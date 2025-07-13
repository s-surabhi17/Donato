//newwww

import styles from "./signup.module.css";
import { BsFacebook } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "donor" // default role
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const history = useHistory();
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:9900";

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

    if (error) setError("");
    if (success) setSuccess("");
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError("Name is required");
      return false;
    }

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

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }

    if (!formData.confirmPassword) {
      setError("Please confirm your password");
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return false;
    }

    return true;
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

     console.log("Submitting signup with role:", formData.role)

    try {
      const response = await fetch(`${BACKEND_URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          password: formData.password,
          role: formData.role
        }),
      });

      if (!response.ok) {
        if (response.status === 409) {
          throw new Error("User already exists with this email");
        } else if (response.status === 400) {
          throw new Error("Invalid input data");
        } else if (response.status >= 500) {
          throw new Error("Server error. Please try again later");
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      }

      setSuccess("Account created successfully! Redirecting to login...");

      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "donor"
      });

      setTimeout(() => {
        history.push("/login");
      }, 2000);

    } catch (err) {
      if (err.message.includes("fetch")) {
        setError("Cannot connect to server. Please check if the backend is running on port 9900");
      } else {
        setError(err.message || "Signup failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = () => {
    try {
      window.location.href = `${BACKEND_URL}/auth/google`;
    } catch (err) {
      setError("Cannot connect to authentication service");
    }
  };

  const loginWithFacebook = () => {
    try {
      window.location.href = `${BACKEND_URL}/auth/facebook`;
    } catch (err) {
      setError("Cannot connect to authentication service");
    }
  };

  const goToLogin = () => {
    history.push("/login");
  };

  return (
    <div className={styles.main}>
      <h1>Sign up</h1>
      <form className={styles.form} onSubmit={handleSignup}>
        {error && <div className={styles.error}>{error}</div>}
        {success && <div className={styles.success}>{success}</div>}

        <input 
          type="text" 
          id="name" 
          name="name" 
          placeholder="Name"
          value={formData.name}
          onChange={handleInputChange}
          disabled={loading}
          required
        />

        <input
          type="email" 
          id="email" 
          name="email" 
          placeholder="Email Address"
          value={formData.email}
          onChange={handleInputChange}
          disabled={loading}
          required
        />

        <input
          type="password" 
          id="password" 
          name="password" 
          placeholder="Password (min 6 characters)"
          value={formData.password}
          onChange={handleInputChange}
          disabled={loading}
          required
          minLength="6"
        />

        <input
          type="password" 
          id="confirmPassword" 
          name="confirmPassword" 
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          disabled={loading}
          required
        />

        {/* Role dropdown */}
        <div className={styles.selectWrapper}>
        <select
          name="role"
          value={formData.role}
          onChange={handleInputChange}
          disabled={loading}
          required
        >
          <option value="ngo">NGO</option>
          <option value="volunteer">Volunteer</option>
          <option value="donor">Donor</option>
          <option value="admin">Admin</option>
        </select>
        </div>

        <button 
          type="submit" 
          className={styles.signup_btn}
          disabled={loading}
        >
          {loading ? "Creating Account..." : "Sign up"}
        </button>
      </form>

      <div className={styles.or}>
        <div className={styles.number}>
          <p>or</p>
        </div>
      </div>

      <div className={styles.lower}>
        <p className={styles.signUpWith}>Sign up with</p>
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
          Already have an account?{' '}
          <span 
            onClick={goToLogin}
            className={styles.linkText}
          >
            Login here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
