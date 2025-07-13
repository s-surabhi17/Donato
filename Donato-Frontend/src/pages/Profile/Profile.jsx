// import styles from "./profile.module.css";
// import { FiSettings, FiHelpCircle, FiCalendar, FiClock } from "react-icons/fi";
// import BottomNavbar from "../../components/BottomNavbar";

// const Profile = ({ user }) => {
//   const handleLogout = async () => {
//     try {
//       const res = await fetch("http://localhost:9900/auth/logout", {
//         method: "POST",
//         credentials: "include",
//       });

//       if (res.ok) {
//         window.location.href = "/login"; // redirect to the logout screen
//       } else {
//         alert("Logout failed");
//       }
//     } catch (err) {
//       console.error("Logout error:", err);
//       alert("Logout failed");
//     }
//   };

//   return (
//     <>
//       <BottomNavbar />
//       <div className={styles.main}>
//         <h1>Profile</h1>

//         <div className={styles.upper}>
//           <div className={styles.addImage}>
//             <img src={user.profilePic || "/images/default-profile.png"} alt="Profile" />
//           </div>
//           <div className={styles.title}>
//             <h2>Hello {user.name || "User"}!</h2>
//             <p className={styles.edit}>Edit</p>
//           </div>
//         </div>

//         <div className={styles.lower}>
//           <div className={styles.tabs}>
//             <FiClock className={styles.icon} />
//             <p>Donation History</p>
//           </div>

//           <div className={styles.tabs}>
//             <FiCalendar className={styles.icon} />
//             <p>Schedule Donation</p>
//           </div>

//           <div className={styles.tabs}>
//             <FiHelpCircle className={styles.icon} />
//             <p>Help and FAQs</p>
//           </div>

//           <div className={styles.tabs}>
//             <FiSettings className={styles.icon} />
//             <p>Settings</p>
//           </div>
//         </div>

//         <div>
//           <button onClick={handleLogout} className={styles.signup_btn}>
//             Logout
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Profile;

//neww
// import styles from "./profile.module.css";
// import { FiSettings, FiHelpCircle, FiCalendar, FiClock } from "react-icons/fi";
// import BottomNavbar from "../../components/BottomNavbar";

// // ✅ Use fallback if env is undefined
// const API = process.env.REACT_APP_BACKEND_URL || "http://localhost:9900";
// console.log("🌐 ENV API:", API);

// const Profile = ({ user }) => {
//   const handleLogout = async () => {
//     try {
//       const res = await fetch(`${API}/auth/logout`, {
//         method: "POST",
//         credentials: "include",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       const contentType = res.headers.get("content-type");
//       if (!contentType || !contentType.includes("application/json")) {
//         throw new Error("Invalid response format");
//       }

//       const data = await res.json();
//       console.log("🔁 Logout response:", data);

//       if (res.ok && data.success) {
//         alert("✅ Logout successful");
//         window.location.href = "/login";
//       } else {
//         alert("❌ Logout failed: " + (data.message || "Unknown error"));
//       }
//     } catch (err) {
//       console.error("Logout error:", err);
//       alert("❌ Logout error: " + err.message);
//     }
//   };

//   return (
//     <>
//       <BottomNavbar />
//       <div className={styles.main}>
//         <h1>Profile</h1>

//         <div className={styles.upper}>
//           <div className={styles.addImage}>
//             <img
//               src={user?.profilePic || "/images/default-profile.png"}
//               alt="Profile"
//             />
//           </div>
//           <div className={styles.title}>
//             <h2>Hello {user?.name || "User"}!</h2>
//             <p className={styles.edit}>Edit</p>
//           </div>
//         </div>

//         <div className={styles.lower}>
//           <div className={styles.tabs}>
//             <FiClock className={styles.icon} />
//             <p>Donation History</p>
//           </div>

//           <div className={styles.tabs}>
//             <FiCalendar className={styles.icon} />
//             <p>Schedule Donation</p>
//           </div>

//           <div className={styles.tabs}>
//             <FiHelpCircle className={styles.icon} />
//             <p>Help and FAQs</p>
//           </div>

//           <div className={styles.tabs}>
//             <FiSettings className={styles.icon} />
//             <p>Settings</p>
//           </div>
//         </div>

//         <div>
//           <button onClick={handleLogout} className={styles.signup_btn}>
//             Logout
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Profile;

//neww33
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styles from "./profile.module.css";
import {
  FiSettings, FiHelpCircle, FiCalendar, FiClock,
  FiEdit, FiLogOut, FiArrowLeft, FiUser,
  FiHeart, FiPackage, FiStar, FiFilter,
  FiCheckCircle, FiXCircle, FiTruck
} from "react-icons/fi";
import BottomNavbar from "../../components/BottomNavbar";

const Profile = () => {
  const [currentView, setCurrentView] = useState('profile');
  const [user] = useState({
    name: 'sakshis',
    email: 'sakshis@example.com',
    phone: '+91 9876543210',
    totalDonations: 12,
    totalAmount: 25000,
    joinedDate: '2024-01-15'
  });
  const history = useHistory();

  const navigateToView = (view) => {
    setCurrentView(view);
  };

  const handleLogout = async () => {
  try {
    const res = await fetch("http://localhost:9900/auth/logout", {
      method: "POST", // ✅ must be POST
      credentials: "include", // ✅ required for session cookies
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log("🔐 Logout response:", data);

    if (res.ok && data.success) {
      console.log("✅ Logout successful");
    } else {
      console.warn("⚠️ Logout failed:", data.message || "Unknown error");
    }

    // Clear any local user data
    localStorage.removeItem("userToken");
    localStorage.removeItem("userId");

    // Redirect
    history.push("/login");
  } catch (err) {
    console.error("❌ Logout error:", err);
    alert("Something went wrong. Try again.");
    history.push("/login");
  }
};

  const renderCurrentView = () => {
    switch (currentView) {
      case 'donation-history':
        return <DonationHistory onBack={() => setCurrentView('profile')} />;
      case 'schedule-donation':
        return <ScheduleDonation onBack={() => setCurrentView('profile')} />;
      case 'help-faqs':
        return <HelpFAQs onBack={() => setCurrentView('profile')} />;
      case 'settings':
        return <SettingsPage onBack={() => setCurrentView('profile')} />;
      default:
        return <ProfileMain user={user} onNavigate={navigateToView} onLogout={handleLogout} />;
    }
  };

  return (
    <div className={styles.profileContainer}>
      {renderCurrentView()}
      <BottomNavbar />
    </div>
  );
};

const ProfileMain = ({ user, onNavigate, onLogout }) => (
  <div className={styles.profileContent}>
    <div className={styles.header}>
      <h1 className={styles.title}>Profile</h1>
    </div>

    <div className={styles.profileInfo}>
      <div className={styles.profilePicture}>
        <div className={styles.avatar}><FiUser size={60} color="#fff" /></div>
        <div className={styles.onlineIndicator}></div>
      </div>

      <h2 className={styles.userName}>Hello {user.name}!</h2>
      <button className={styles.editButton}><FiEdit size={16} /> Edit</button>
    </div>

    <div className={styles.statsGrid}>
      <div className={styles.statCard}>
        <div className={styles.statValue}>{user.totalDonations}</div>
        <div className={styles.statLabel}>Total Donations</div>
      </div>
    </div>

    <div className={styles.menuItems}>
      <button onClick={() => onNavigate('donation-history')} className={styles.menuItem}>
        <FiClock size={24} className={styles.menuIcon} />
        <span className={styles.menuText}>Donation History</span>
      </button>

      <button onClick={() => onNavigate('schedule-donation')} className={styles.menuItem}>
        <FiCalendar size={24} className={styles.menuIcon} />
        <span className={styles.menuText}>Schedule Donation</span>
      </button>

      <button onClick={() => onNavigate('help-faqs')} className={styles.menuItem}>
        <FiHelpCircle size={24} className={styles.menuIcon} />
        <span className={styles.menuText}>Help and FAQs</span>
      </button>

      <button onClick={() => onNavigate('settings')} className={styles.menuItem}>
        <FiSettings size={24} className={styles.menuIcon} />
        <span className={styles.menuText}>Settings</span>
      </button>
    </div>

    <button onClick={onLogout} className={styles.logoutButton}>
      <FiLogOut size={20} /> Logout
    </button>
  </div>
);

const DonationHistory = ({ onBack }) => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('all');
  const [stats, setStats] = useState({
    totalDonations: 0,
    impactScore: 120
  });

  useEffect(() => {
    const fetchDonations = async () => {
      setLoading(true);
      try {
        // const userId = localStorage.getItem("userId");
        // const res = await fetch(`http://localhost:9900/api/donations/user/${userId}?status=${filter !== 'all' ? filter : ''}`);
        // const data = await res.json();

        const mockDonations = [
          {
            _id: '1',
            donationId: 'DON-2024-001',
            ngoId: { NGOName: 'Hope Foundation' },
            donationType: 'food',
            amount: 0,
            foodItems: [{ itemName: 'Rice', quantity: 10, unit: 'kg' }],
            status: 'completed',
            createdAt: '2024-01-15T10:00:00Z',
            description: 'Food donation for community kitchen'
          },
          {
            _id: '2',
            donationId: 'DON-2024-002',
            ngoId: { NGOName: 'Smile Foundation' },
            donationType: 'food',
            amount: 0,
            status: 'completed',
            createdAt: '2024-01-20T12:00:00Z',
            description: 'food'
          }
        ];

        const filtered = filter === 'all'
          ? mockDonations
          : mockDonations.filter(d => d.status === filter);

        setDonations(filtered);
        setStats({
          totalDonations: filtered.length,
          impactScore: 100 + filtered.length * 10
        });
      } catch (err) {
        console.error("Failed to fetch donations:", err);
      }
      setLoading(false);
    };

    fetchDonations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const getStatusIcon = (status) => {
    const iconProps = { size: 20 };
    const icons = {
      pending: <FiClock {...iconProps} color="#f59e0b" />,
      confirmed: <FiCheckCircle {...iconProps} color="#3b82f6" />,
      picked_up: <FiTruck {...iconProps} color="#8b5cf6" />,
      delivered: <FiPackage {...iconProps} color="#10b981" />,
      completed: <FiCheckCircle {...iconProps} color="#059669" />,
      cancelled: <FiXCircle {...iconProps} color="#ef4444" />
    };
    return icons[status] || <FiClock {...iconProps} color="#6b7280" />;
  };

  const getStatusColor = (status) => {
    const map = {
      pending: styles.statusPending,
      confirmed: styles.statusConfirmed,
      picked_up: styles.statusPickedUp,
      delivered: styles.statusDelivered,
      completed: styles.statusCompleted,
      cancelled: styles.statusCancelled
    };
    return map[status] || styles.statusDefault;
  };

  const formatDate = (date) => new Date(date).toLocaleDateString('en-IN', {
    year: 'numeric', month: 'short', day: 'numeric'
  });

  return (
    <div className={styles.historyContainer}>
      <div className={styles.historyHeader}>
        <button onClick={onBack} className={styles.backButton}>
          <FiArrowLeft size={24} />
        </button>
        <h1 className={styles.historyTitle}>My Donations</h1>
      </div>

      <div className={styles.historyStats}>
        <div className={styles.historyStatCard}>
          <FiHeart size={24} color="#3b82f6" />
          <div className={styles.historyStatValue}>{stats.totalDonations}</div>
          <div className={styles.historyStatLabel}>Total</div>
        </div>
        <div className={styles.historyStatCard}>
          <FiStar size={24} color="#8b5cf6" />
          <div className={styles.historyStatValue}>{stats.impactScore}</div>
          <div className={styles.historyStatLabel}>Impact</div>
        </div>
      </div>

      <div className={styles.filterContainer}>
        <FiFilter size={16} />
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className={styles.filterSelect}>
          <option value="all">All Donations</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="picked_up">Picked Up</option>
          <option value="delivered">Delivered</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {loading ? (
        <div className={styles.loading}><div className={styles.spinner}></div></div>
      ) : (
        <div className={styles.donationsList}>
          {donations.map((d) => (
            <div key={d._id} className={styles.donationCard}>
              <div className={styles.donationHeader}>
                <div className={styles.donationInfo}>
                  <h3 className={styles.ngoName}>{d.ngoId?.NGOName}</h3>
                  <p className={styles.donationId}>ID: {d.donationId}</p>
                </div>
                <div className={styles.statusContainer}>
                  {getStatusIcon(d.status)}
                  <span className={`${styles.statusBadge} ${getStatusColor(d.status)}`}>{d.status.replace('_', ' ').toUpperCase()}</span>
                </div>
              </div>

              <div className={styles.donationDetails}>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Type:</span>
                  <span className={styles.detailValue}>{d.donationType}</span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Date:</span>
                  <span className={styles.detailValue}>{formatDate(d.createdAt)}</span>
                </div>
                {d.foodItems?.length > 0 && (
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Items:</span>
                    <span className={styles.detailValue}>
                      {d.foodItems.map(item => `${item.itemName} (${item.quantity}${item.unit})`).join(', ')}
                    </span>
                  </div>
                )}
              </div>

              {d.description && <div className={styles.donationDescription}>{d.description}</div>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const ScheduleDonation = ({ onBack }) => (
  <div className={styles.pageContainer}>
    <div className={styles.pageHeader}>
      <button onClick={onBack} className={styles.backButton}>
        <FiArrowLeft size={24} />
      </button>
      <h1 className={styles.pageTitle}>Schedule Donation</h1>
    </div>
    <div className={styles.pageContent}>
      <div className={styles.emptyState}>
        <FiCalendar size={64} color="#f97316" />
        <h3>Schedule Your Next Donation</h3>
        <p>Set up recurring donations or schedule one-time donations</p>
        <button className={styles.primaryButton}>Create Schedule</button>
      </div>
    </div>
  </div>
);

const HelpFAQs = ({ onBack }) => {
  const faqs = [
    {
      question: "How do I track my donations?",
      answer: "You can track all your donations in the 'Donation History' section of your profile."
    },
    {
      question: "How do I cancel a donation?",
      answer: "You can cancel a donation before it's confirmed by the NGO. Contact support for assistance."
    },
    {
      question: "What types of donations can I make?",
      answer: "You can donate food, money, clothes, books, medicine, and other items to registered NGOs."
    }
  ];

  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageHeader}>
        <button onClick={onBack} className={styles.backButton}><FiArrowLeft size={24} /></button>
        <h1 className={styles.pageTitle}>Help & FAQs</h1>
      </div>
      <div className={styles.pageContent}>
        <div className={styles.faqList}>
          {faqs.map((faq, idx) => (
            <div key={idx} className={styles.faqItem}>
              <h3 className={styles.faqQuestion}>{faq.question}</h3>
              <p className={styles.faqAnswer}>{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const SettingsPage = ({ onBack }) => (
  <div className={styles.pageContainer}>
    <div className={styles.pageHeader}>
      <button onClick={onBack} className={styles.backButton}><FiArrowLeft size={24} /></button>
      <h1 className={styles.pageTitle}>Settings</h1>
    </div>
    <div className={styles.pageContent}>
      <div className={styles.settingsList}>
        <div className={styles.settingsItem}>
          <h3>Account Settings</h3>
          <button className={styles.settingsAction}>Edit Profile</button>
        </div>
        <div className={styles.settingsItem}>
          <h3>Notifications</h3>
          <button className={styles.settingsAction}>Manage Notifications</button>
        </div>
        <div className={styles.settingsItem}>
          <h3>Privacy</h3>
          <button className={styles.settingsAction}>Privacy Settings</button>
        </div>
      </div>
    </div>
  </div>
);

export default Profile;
