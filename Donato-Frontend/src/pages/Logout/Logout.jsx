// src/pages/Logout/Logout.jsx
// import React, { useEffect } from "react";
// import styles from "./logout.module.css";


// const Logout = () => {
//   useEffect(() => {
//     // Clear session/local storage
//     localStorage.removeItem("token"); // or "user" or both

//     // Redirect to login after 1 second (optional delay)
//     setTimeout(() => {
//       window.location.href = "/login"; // replace with your actual login route
//     }, 1000);
//   }, []);

//   return (
//     <div className={styles.logoutContainer}>
//       <h1 className={styles.message}>Logging you out...</h1>
//     </div>
//   );
// };

// export default Logout;

//new
/*import React, { useEffect } from "react";
import styles from "./logout.module.css";

const Logout = () => {
  useEffect(() => {
    console.log("📤 Sending logout request...");

    fetch("http://localhost:9900/auth/logout", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => {
        const data = await res.json();
        console.log("🔎 Logout response:", data);

        if (res.ok && data.success) {
          console.log("✅ Logout successful");
        } else {
          console.warn("⚠️ Logout may have failed:", data.message || res.status);
        }

        // Always redirect regardless of logout success
        setTimeout(() => {
          window.location.href = "/login";
        }, 1000);
      })
      .catch((err) => {
        console.error("❌ Logout error:", err);
        window.location.href = "/login";
      });
  }, []);

  return (
    <div className={styles.logoutContainer}>
      <h1 className={styles.message}>🚪 Logging out...</h1>
    </div>
  );
};

export default Logout;
*/
// src/pages/Logout/Logout.jsx
/*import { useEffect } from "react";
import styles from "./logout.module.css";

const Logout = () => {
  useEffect(() => {
    console.log("📤 Sending logout request...");

    fetch("http://localhost:9900/auth/logout", {
      method: "POST",
      credentials: "include", // ensures cookies (like session ID) are sent
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => {
        const data = await res.json();
        console.log("🔎 Logout response:", data);

        if (res.ok && data.success) {
          console.log("✅ Logout successful");
        } else {
          console.warn("⚠️ Logout may have failed:", data.message || res.status);
        }

        // Always redirect regardless of logout success
        setTimeout(() => {
          window.location.href = "/login";
        }, 1000);
      })
      .catch((err) => {
        console.error("❌ Logout error:", err);
        window.location.href = "/login";
      });
  }, []);

  return (
    <div className={styles.logoutContainer}>
      <h1 className={styles.message}>🚪 Logging out...</h1>
    </div>
  );
};

export default Logout;*/
import React, { useEffect } from "react";
import styles from "./logout.module.css";

const Logout = () => {
  useEffect(() => {
    console.log("📤 Sending logout request...");

    fetch("http://localhost:9900/auth/logout", {
      method: "POST",
      credentials: "include", // ✅ This is important for cookies to work
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => {
        const data = await res.json();
        console.log("🔎 Logout response:", data);

        if (res.ok && data.success) {
          console.log("✅ Logout successful");

          // Optionally clear frontend state
          localStorage.removeItem("user");  // Only if you're storing anything
          sessionStorage.clear();
        } else {
          console.warn("⚠️ Logout failed or incomplete:", data.message || res.status);
        }

        // Always redirect after logout
        setTimeout(() => {
          window.location.href = "/login";
        }, 1000);
      })
      .catch((err) => {
        console.error("❌ Logout error:", err);
        window.location.href = "/login";
      });
  }, []);

  return (
    <div className={styles.logoutContainer}>
      <h1 className={styles.message}>🚪 Logging out...</h1>
    </div>
  );
};

export default Logout;

