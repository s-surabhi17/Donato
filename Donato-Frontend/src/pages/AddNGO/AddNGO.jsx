import axios from "axios";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styles from "./AddNGO.module.css";

const AddNGO = () => {
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem("user"));

  const [ngoData, setNgoData] = useState({
    NGOName: "",
    image: "",
    about: "",
    reviews: 0,
    totalFeeds: 0,
    totalCampaigns: 0,
    totalVolunteers: 0,
    location: "",
    contact: ""
  });

  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Fetch existing NGO data if available

  // Redirect if not NGO, and fetch if allowed
  useEffect(() => {
  if (!user || user.role !== "ngo") {
    history.push("/home");
  } else {
    const fetchExistingNGO = async () => {
      try {
        const res = await axios.get(`http://localhost:9900/ngos/by-user/${user._id}`, {
          withCredentials: true
        });

        if (res.data.ngo) {
          setNgoData(res.data.ngo);
          setIsEditing(true);
        }
      } catch (err) {
        console.warn("No existing NGO found or failed to fetch:", err.message);
      }
    };

    fetchExistingNGO(); // call it inside
  }
}, [user, history]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNgoData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isEditing
        ? `http://localhost:9900/ngos/${ngoData._id}`
        : `http://localhost:9900/ngos/add-ngo`;

      const method = isEditing ? "put" : "post";

      await axios({
        method,
        url,
        data: {
          ...ngoData,
          createdBy: user._id
        },
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        }
      });

      setSuccessMessage(
        isEditing ? "✅ NGO updated successfully!" : "✅ NGO added successfully!"
      );

      setTimeout(() => {
        history.push("/ngo-profile");
      }, 2000);
    } catch (err) {
      console.error("Error submitting NGO data:", err.response?.data || err.message);
      alert("❌ Failed to submit NGO. Check console for details.");
    }
  };

  return (
    <div className={styles.container}>
      <h2>{isEditing ? "Edit NGO" : "Add New NGO"}</h2>

      {successMessage && (
        <p style={{ color: "green", fontWeight: "bold", marginBottom: "10px" }}>
          {successMessage}
        </p>
      )}

      <form onSubmit={handleSubmit} className={styles.form}>
        <input type="text"name="NGOName" placeholder="NGO Name" value={ngoData.NGOName} onChange={handleChange} required />
        <input type="text" name="image" placeholder="Image URL" value={ngoData.image} onChange={handleChange} />
        <textarea name="about" placeholder="About NGO" value={ngoData.about} onChange={handleChange} />
        <input type="number" name="reviews" placeholder="Reviews" value={ngoData.reviews} onChange={handleChange} />
        <input type="number" name="totalFeeds" placeholder="Total Feeds" value={ngoData.totalFeeds} onChange={handleChange} />
        <input type="number" name="totalCampaigns" placeholder="Total Campaigns" value={ngoData.totalCampaigns} onChange={handleChange} />
        <input type="number" name="totalVolunteers" placeholder="Total Volunteers" value={ngoData.totalVolunteers} onChange={handleChange} />
        <input type="text" name="location" placeholder="Location" value={ngoData.location} onChange={handleChange} required />
        <input type="text" name="contact" placeholder="Contact Info" value={ngoData.contact} onChange={handleChange} required />

        <button type="submit" className={styles.submitBtn}>
          {isEditing ? "Update NGO" : "Add NGO"}
        </button>
      </form>
    </div>
  );
};

export default AddNGO;
