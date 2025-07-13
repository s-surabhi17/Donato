// import { useEffect, useState } from "react";
// import { useHistory } from "react-router-dom";
// import styles from "./NGOProfile.module.css";

// const NGOProfile = () => {
//   const [ngo, setNgo] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const history = useHistory();
//   const user = JSON.parse(localStorage.getItem("user"));

//   useEffect(() => {
//     if (!user) {
//       history.push("/login");
//       return;
//     }

//     if (user.role !== "ngo") {
//       history.push("/home");
//       return;
//     }

//     const fetchNGO = async () => {
//       try {
//         const res = await fetch(`http://localhost:9900/ngos/by-user/${user._id}`, {
//           credentials: "include"
//         });
//         const data = await res.json();
//         if (res.ok && data.success) {
//           setNgo(data.data); // ✅ matches backend structure
//         } else {
//           console.warn("NGO not found or fetch failed");
//         }
//       } catch (err) {
//         console.error("Failed to load NGO profile:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchNGO();
//   }, [user, history]);

//   const handleLogout = async () => {
//     try {
//       const res = await fetch("http://localhost:9900/logout", {
//         method: "GET",
//         credentials: "include",
//       });

//       if (res.ok) {
//         localStorage.removeItem("user");
//         history.push("/");
//       } else {
//         console.error("Logout failed with status:", res.status);
//         alert("Logout failed.");
//       }
//     } catch (err) {
//       console.error("Logout failed:", err);
//     }
//   };

//   if (loading) return <p>Loading dashboard...</p>;

//   if (!ngo) {
//     return (
//       <div className={styles.dashboardContainer}>
//         <h2>No NGO profile found</h2>
//         <p>You haven't added your NGO yet.</p>
//         <button onClick={() => history.push("/add-ngo")} className={styles.editBtn}>
//           ➕ Add NGO
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className={styles.dashboardContainer}>
//       <div className={styles.sidebar}>
//         <h2>{ngo.NGOName}</h2>
//         <img
//           src={ngo.image || "https://via.placeholder.com/150"}
//           alt="NGO"
//           className={styles.ngoImage}
//         />
//         <button onClick={() => history.push("/add-ngo")} className={styles.editBtn}>
//           ✏️ Edit NGO
//         </button>
//         <button onClick={handleLogout} className={styles.logoutButton}>
//           🚪 Logout
//         </button>
//       </div>

//       <div className={styles.details}>
//         <h3>📄 NGO Overview</h3>
//         <p><strong>📍 Location:</strong> {ngo.location}</p>
//         <p><strong>📞 Contact:</strong> {ngo.contact}</p>
//         <p><strong>ℹ️ About:</strong> {ngo.about || ngo.description || "No description provided."}</p>

//         <div className={styles.stats}>
//           <div className={styles.statBox}><strong>⭐ Reviews:</strong> {ngo.reviews ?? 0}</div>
//           <div className={styles.statBox}><strong>🍽️ Feeds:</strong> {ngo.totalFeeds ?? 0}</div>
//           <div className={styles.statBox}><strong>🎯 Campaigns:</strong> {ngo.totalCampaigns ?? 0}</div>
//           <div className={styles.statBox}><strong>🧑‍🤝‍🧑 Volunteers:</strong> {ngo.totalVolunteers ?? 0}</div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NGOProfile;

//neww11
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styles from "./NGOProfile.module.css";

const NGOProfile = () => {
  const [ngo, setNgo] = useState(null);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    let isMounted = true; // ✅ Prevent memory leak

    if (!user) {
      history.push("/login");
      return;
    }

    if (user.role !== "ngo") {
      history.push("/home");
      return;
    }

    const fetchNGO = async () => {
      try {
        const res = await fetch(`http://localhost:9900/ngos/by-user/${user._id}`, {
          credentials: "include"
        });
        const data = await res.json();
        if (isMounted) {
          if (res.ok && data.data) {
            setNgo(data.data);
          } else {
            console.warn("NGO not found or fetch failed");
          }
        }
      } catch (err) {
        if (isMounted) {
          console.error("Failed to load NGO profile:", err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchNGO();

    return () => {
      isMounted = false; // ✅ Cleanup on unmount
    };
  }, [user, history]);

  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:9900/logout", {
        method: "GET",
        credentials: "include",
      });

      if (res.ok) {
        localStorage.removeItem("user");
        history.push("/");
      } else {
        console.error("Logout failed with status:", res.status);
        alert("Logout failed.");
      }
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  if (loading) return <p>Loading dashboard...</p>;

  if (!ngo) {
    return (
      <div className={styles.dashboardContainer}>
        <h2>No NGO profile found</h2>
        <p>You haven't added your NGO yet.</p>
        <button onClick={() => history.push("/add-ngo")} className={styles.editBtn}>
          ➕ Add NGO
        </button>
      </div>
    );
  }

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.sidebar}>
        <h2>{ngo.NGOName}</h2>
        <img
          src={ngo.image || "https://via.placeholder.com/150"}
          alt="NGO"
          className={styles.ngoImage}
        />
        <button onClick={() => history.push("/add-ngo")} className={styles.editBtn}>
          ✏️ Edit NGO
        </button>
        <button onClick={handleLogout} className={styles.logoutButton}>
          🚪 Logout
        </button>
      </div>

      <div className={styles.details}>
        <h3>📄 NGO Overview</h3>
        <p><strong>📍 Location:</strong> {ngo.location}</p>
        <p><strong>📞 Contact:</strong> {ngo.contact}</p>
        <p><strong>ℹ️ About:</strong> {ngo.about || ngo.description || "No description provided."}</p>

        <div className={styles.stats}>
          <div className={styles.statBox}><strong>⭐ Reviews:</strong> {ngo.reviews ?? 0}</div>
          <div className={styles.statBox}><strong>🍽️ Feeds:</strong> {ngo.totalFeeds ?? 0}</div>
          <div className={styles.statBox}><strong>🎯 Campaigns:</strong> {ngo.totalCampaigns ?? 0}</div>
          <div className={styles.statBox}><strong>🧑‍🤝‍🧑 Volunteers:</strong> {ngo.totalVolunteers ?? 0}</div>
        </div>
      </div>
    </div>
  );
};

export default NGOProfile;
