// import styles from "./confirmFoodDetails.module.css";
// import BottomNavbar from "../../components/BottomNavbar";
// import DonateFoodNavbar from "../../components/DonateFoodNavbar";
// import { Link } from "react-router-dom";

// import { GoLocation } from "react-icons/go";
// import { BsTelephone } from "react-icons/bs";
// import { IoCalendarNumberOutline } from "react-icons/io5";
// import { GrAlarm } from "react-icons/gr";

// import Button from "../../components/Button";

// const ConfirmFoodDetails = (props) => {
//   const { foodData } = props;
//   return (
//     <>
//       <DonateFoodNavbar link="/foodDetails" />
//       <BottomNavbar />
//       <div className={styles.main}>
//         <p className={styles.heading}>Confirm food details</p>
//         <div className={styles.top_section}>
//           <div className={styles.left}>
//             <p>{foodData.type}</p>
//             <p>{foodData.meal}</p>
//             <p>{foodData.quantity} servings</p>
//           </div>
//           <div className={styles.right}>
//             <img
//               src="https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9vZHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60"
//               alt=""
//             />
//           </div>
//         </div>

//         <p className={styles.heading}>Pickup Location</p>
//         <div className={styles.input_box}>
//           <GoLocation />
//           <input
//             type="text"
//             placeholder="Sector 15, MIDC Road, Spine City, Pune"
//           />
//         </div>

//         <p className={styles.heading}>Contact Information</p>
//         <div className={styles.input_box}>
//           <BsTelephone />
//           <input type="number" placeholder="9876383735" />
//         </div>

//         <p className={styles.heading}>By when you can donate</p>
//         <div className={styles.input_box}>
//           <input type="date" placeholder="30-Sep-2021" />
//         </div>

//         <div className={[styles.input_box, styles.bottom_input].join(" ")}>
//           <input type="time" placeholder="Time" />
//         </div>

//         <div className={styles.guideline}>
//           <input type="checkbox" />
//           <label>All food donated should be under Guidelines</label>
//         </div>
//         <div className={styles.btn}>
//           <Button text="Post" link="/delivery" />
//         </div>
//       </div>
//     </>
//   );
// };

// export default ConfirmFoodDetails;

//new
// import styles from "./confirmFoodDetails.module.css";
// import BottomNavbar from "../../components/BottomNavbar";
// import DonateFoodNavbar from "../../components/DonateFoodNavbar";
// import { GoLocation } from "react-icons/go";
// import { BsTelephone } from "react-icons/bs";
// import { useFoodDonation } from "../../Context/FoodDonationContext";

// const ConfirmFoodDetails = () => {
//   const { foodData, setFoodData } = useFoodDonation();

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFoodData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleSubmit = async () => {
//     const requiredFields = ["location", "phone", "donationDate", "donationTime", "agreedToGuidelines"];
//     for (let field of requiredFields) {
//       if (!foodData[field]) {
//         alert(`❌ Please fill out the "${field}" field.`);
//         return;
//       }
//     }

//     const postData = {
//       ...foodData,
//       date: foodData.donationDate,
//       time: foodData.donationTime,
//       guidelinesAccepted: foodData.agreedToGuidelines,
//       preparedHoursAgo: foodData.time,
//     };

//     delete postData.donationDate;
//     delete postData.donationTime;
//     delete postData.agreedToGuidelines;
//     delete postData.time;

//     try {
//       const res = await fetch("http://localhost:9900/food-donation", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         credentials: "include", // Ensures cookies/session is sent
//         body: JSON.stringify(postData),
//       });

//       const data = await res.json();

//       if (res.ok && data.success) {
//         const confirmDelivery = window.confirm(
//           "✅ Food added successfully!\nWould you like to arrange delivery now?"
//         );
//         window.location.href = confirmDelivery ? "/scheduleDelivery" : "/home";
//       } else {
//         throw new Error(data.message || "Failed to donate food");
//       }
//     } catch (err) {
//       alert("❌ Error: " + err.message);
//       console.error("Food donation error:", err);
//     }
//   };

//   return (
//     <>
//       <DonateFoodNavbar link="/foodDetails" />
//       <BottomNavbar />

//       <div className={styles.main}>
//         <p className={styles.heading}>Confirm food details</p>

//         <div className={styles.top_section}>
//           <div className={styles.left}>
//             <p>{foodData.type || "N/A"}</p>
//             <p>{(foodData.meal || []).join(", ")}</p>
//             <p>{foodData.quantity || 0} servings</p>
//           </div>
//           <div className={styles.right}>
//             <img
//               src="https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60"
//               alt="Food"
//             />
//           </div>
//         </div>

//         <p className={styles.heading}>Pickup Location</p>
//         <div className={styles.input_box}>
//           <GoLocation />
//           <input
//             type="text"
//             name="location"
//             placeholder="Sector 15, MIDC Road, Spine City, Pune"
//             value={foodData.location || ""}
//             onChange={handleChange}
//           />
//         </div>

//         <p className={styles.heading}>Contact Information</p>
//         <div className={styles.input_box}>
//           <BsTelephone />
//           <input
//             type="number"
//             name="phone"
//             placeholder="9876383735"
//             value={foodData.phone || ""}
//             onChange={handleChange}
//           />
//         </div>

//         <p className={styles.heading}>By when you can donate</p>
//         <div className={styles.input_box}>
//           <input
//             type="date"
//             name="donationDate"
//             value={foodData.donationDate || ""}
//             onChange={handleChange}
//           />
//         </div>

//         <div className={[styles.input_box, styles.bottom_input].join(" ")}>
//           <input
//             type="time"
//             name="donationTime"
//             value={foodData.donationTime || ""}
//             onChange={handleChange}
//           />
//         </div>

//         <div className={styles.guideline}>
//           <input
//             type="checkbox"
//             name="agreedToGuidelines"
//             checked={foodData.agreedToGuidelines || false}
//             onChange={handleChange}
//           />
//           <label>All food donated should be under Guidelines</label>
//         </div>

//         <div className={styles.btn}>
//           <button onClick={handleSubmit}>Post</button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ConfirmFoodDetails;


//new 22
import styles from "./confirmFoodDetails.module.css";
import BottomNavbar from "../../components/BottomNavbar";
import DonateFoodNavbar from "../../components/DonateFoodNavbar";
import { GoLocation } from "react-icons/go";
import { BsTelephone } from "react-icons/bs";
import { useFoodDonation } from "../../Context/FoodDonationContext";
import { useHistory } from "react-router-dom"; // Add this import

const ConfirmFoodDetails = () => {
  const { foodData, setFoodData } = useFoodDonation();
  const history = useHistory(); // Add this hook

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFoodData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async () => {
  // Updated required fields to include type and meal
  const requiredFields = [
    "type",
    "meal", 
    "quantity",
    "location",
    "phone",
    "donationDate",
    "donationTime",
    "agreedToGuidelines",
  ];

  // Validate required fields
  for (let field of requiredFields) {
    if (!foodData[field]) {
      alert(`❌ Please fill out the "${field}" field.`);
      return;
    }
  }

  // Additional validation for type enum
  if (!["Veg", "Non-veg"].includes(foodData.type)) {
    alert(`❌ Food type must be either "Veg" or "Non-veg".`);
    return;
  }

  // Additional validation for meal array
  if (!Array.isArray(foodData.meal) || foodData.meal.length === 0) {
    alert(`❌ Please select at least one meal.`);
    return;
  }

  // Prepare data for backend
  const postData = {
    type: foodData.type,
    meal: foodData.meal,
    quantity: parseInt(foodData.quantity),
    location: foodData.location,
    phone: foodData.phone,
    date: foodData.donationDate,
    time: foodData.donationTime,
    guidelinesAccepted: foodData.agreedToGuidelines,
    preparedHoursAgo: foodData.preparedHoursAgo || 0, // Fixed: was using foodData.time
  };

  // Debug: Log the data being sent
  console.log("Sending data to backend:", postData);

  try {
    const res = await fetch("http://localhost:9900/food-donation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(postData),
    });

    const data = await res.json();

    if (res.ok && data.success) {
      const confirmDelivery = window.confirm(
        "✅ Food added successfully!\nWould you like to arrange delivery now?"
      );
      
      if (confirmDelivery) {
        history.push("/delivery");
      } else {
        history.push("/home");
      }
    } else {
      throw new Error(data.message || "Failed to donate food");
    }
  } catch (err) {
    alert("❌ Error: " + err.message);
    console.error("Food donation error:", err);
  }
};

  return (
    <>
      <DonateFoodNavbar backLink="/foodDetails" />
      <BottomNavbar />

      <div className={styles.main}>
        <p className={styles.heading}>Confirm food details</p>

        <div className={styles.top_section}>
          <div className={styles.left}>
            <p>{foodData.type || "N/A"}</p>
            <p>{(foodData.meal || []).join(", ")}</p>
            <p>{foodData.quantity || 0} servings</p>
          </div>
          <div className={styles.right}>
            <img
              src="https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60"
              alt="Food"
            />
          </div>
        </div>

        <p className={styles.heading}>Pickup Location</p>
        <div className={styles.input_box}>
          <GoLocation />
          <input
            type="text"
            name="location"
            placeholder="Sector 15, MIDC Road, Spine City, Pune"
            value={foodData.location || ""}
            onChange={handleChange}
          />
        </div>

        <p className={styles.heading}>Contact Information</p>
        <div className={styles.input_box}>
          <BsTelephone />
          <input
            type="number"
            name="phone"
            placeholder="9876383735"
            value={foodData.phone || ""}
            onChange={handleChange}
          />
        </div>

        <p className={styles.heading}>By when you can donate</p>
        <div className={styles.input_box}>
          <input
            type="date"
            name="donationDate"
            value={foodData.donationDate || ""}
            onChange={handleChange}
          />
        </div>

        <div className={[styles.input_box, styles.bottom_input].join(" ")}>
          <input
            type="time"
            name="donationTime"
            value={foodData.donationTime || ""}
            onChange={handleChange}
          />
        </div>

        <div className={styles.guideline}>
          <input
            type="checkbox"
            name="agreedToGuidelines"
            checked={foodData.agreedToGuidelines || false}
            onChange={handleChange}
          />
          <label>All food donated should be under Guidelines</label>
        </div>

        <div className={styles.btn}>
          <button onClick={handleSubmit}>Post</button>
        </div>
      </div>
    </>
  );
};

export default ConfirmFoodDetails;