// import styles from "./foodDetails.module.css";

// import BottomNavbar from "../../components/BottomNavbar";
// import DonateFoodNavbar from "../../components/DonateFoodNavbar";

// import Button from "../../components/Button";
// import { useState } from "react";

// const FoodDetails = (props) => {
//   const { handleInput } = props;

//   const [quanity, setQuantity] = useState(0);
//   const [time, setTime] = useState(0);

//   return (
//     <>
//       <BottomNavbar />
//       <DonateFoodNavbar link="/category" />
//       <div className={styles.main}>
//         <p className={styles.heading}>Meal type</p>
//         <div className={styles.radios}>
//           <p>
//             <input
//               onClick={handleInput}
//               value="Veg"
//               type="radio"
//               id="test1"
//               name="type"
//             />
//             <label className={styles.label} for="test1">
//               Veg
//             </label>
//           </p>
//           <p>
//             <input
//               onClick={handleInput}
//               value="Non-veg"
//               type="radio"
//               id="test2"
//               name="type"
//             />
//             <label className={styles.label} for="test2">
//               Non-veg
//             </label>
//           </p>
//         </div>

//         <div className={styles.checkboxes}>
//           <div className={styles.checkbox_container}>
//             <input
//               onClick={handleInput}
//               name="meal"
//               value="Breakfast"
//               type="checkbox"
//               className={styles.checkbox}
//             />
//             <img className={styles.overlay} src="./images/breakfast.jpg" />
//             <div className={styles.checked_overlay}></div>
//             <p>Breakfast</p>
//           </div>
//           <div className={styles.checkbox_container}>
//             <input
//               onClick={handleInput}
//               name="meal"
//               type="checkbox"
//               value="Lunch"
//               className={styles.checkbox}
//             />
//             <img className={styles.overlay} src="./images/lunch.jpg" />
//             <div className={styles.checked_overlay}></div>
//             <p>Lunch</p>
//           </div>
//           <div className={styles.checkbox_container}>
//             <input
//               onClick={handleInput}
//               name="meal"
//               type="checkbox"
//               value="Dinner"
//               className={styles.checkbox}
//             />
//             <img className={styles.overlay} src="./images/dinner.jpg" />
//             <div className={styles.checked_overlay}></div>
//             <p>Dinner</p>
//           </div>
//         </div>

//         <div className={styles.range_slider}>
//           <p className={styles.heading}>Quantity (person)</p>
//           <input
//             value={quanity}
//             onChange={(e) => setQuantity(e.value)}
//             onClick={handleInput}
//             name="quantity"
//             type="range"
//             className={styles.slider}
//             min="0"
//             max="60"
//           />
//           <div className={styles.numbers}>
//             <p>0</p>
//             <p>10</p>
//             <p>20</p>
//             <p>30</p>
//             <p>40</p>
//             <p>50</p>
//             <p>60</p>
//           </div>
//         </div>

//         <div className={styles.range_slider}>
//           <p className={styles.heading}>When was the meal prepared (Hrs)</p>
//           <input
//             value={time}
//             onChange={(e) => setTime(e.value)}
//             type="range"
//             className={styles.slider}
//             min="0"
//             max="12"
//           />
//           <div className={styles.numbers}>
//             <p>0</p>
//             <p>2</p>
//             <p>4</p>
//             <p>6</p>
//             <p>8</p>
//             <p>10</p>
//             <p>12</p>
//           </div>
//         </div>

//         <div className={styles.btn}>
//           <Button text="Post" link="/confirmFoodDetails" />
//         </div>
//       </div>
//     </>
//   );
// };

// export default FoodDetails;

//new

import styles from "./foodDetails.module.css";
import BottomNavbar from "../../components/BottomNavbar";
import DonateFoodNavbar from "../../components/DonateFoodNavbar";
import { useState } from "react";
import { useFoodDonation } from "../../Context/FoodDonationContext";
import { useHistory } from "react-router-dom";

const FoodDetails = () => {
  const { foodData, setFoodData } = useFoodDonation();
  const history = useHistory();
  
  // Local state for sliders
  const [quantity, setQuantity] = useState(foodData.quantity || 0);
  const [time, setTime] = useState(foodData.preparedHoursAgo || 0);
  const [selectedMeals, setSelectedMeals] = useState(foodData.meal || []);
  const [selectedType, setSelectedType] = useState(foodData.type || "");

  // Handle radio button change for meal type
  const handleTypeChange = (e) => {
    const value = e.target.value;
    setSelectedType(value);
    setFoodData(prev => ({
      ...prev,
      type: value
    }));
  };

  // Handle checkbox change for meals
  const handleMealChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;
    
    let updatedMeals;
    if (isChecked) {
      updatedMeals = [...selectedMeals, value];
    } else {
      updatedMeals = selectedMeals.filter(meal => meal !== value);
    }
    
    setSelectedMeals(updatedMeals);
    setFoodData(prev => ({
      ...prev,
      meal: updatedMeals
    }));
  };

  // Handle quantity change
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    setQuantity(value);
    setFoodData(prev => ({
      ...prev,
      quantity: value
    }));
  };

  // Handle time change
  const handleTimeChange = (e) => {
    const value = parseInt(e.target.value);
    setTime(value);
    setFoodData(prev => ({
      ...prev,
      preparedHoursAgo: value
    }));
  };

  // Handle form submission
  const handleSubmit = () => {
    // Validate required fields
    if (!selectedType) {
      alert("❌ Please select meal type (Veg/Non-veg)");
      return;
    }
    
    if (selectedMeals.length === 0) {
      alert("❌ Please select at least one meal");
      return;
    }
    
    if (quantity === 0) {
      alert("❌ Please set quantity greater than 0");
      return;
    }

    // Save all data to context
    setFoodData(prev => ({
      ...prev,
      type: selectedType,
      meal: selectedMeals,
      quantity: quantity,
      preparedHoursAgo: time
    }));

    // Debug log
    console.log("Saving food data:", {
      type: selectedType,
      meal: selectedMeals,
      quantity: quantity,
      preparedHoursAgo: time
    });

    // Navigate to confirmation page
    history.push("/ConfirmFoodDetails");
  };

  return (
    <>
      <BottomNavbar />
      <DonateFoodNavbar link="/foodDetails" />
      <div className={styles.main}>
        <p className={styles.heading}>Meal type</p>
        <div className={styles.radios}>
          <p>
            <input
              onChange={handleTypeChange}
              value="Veg"
              type="radio"
              id="test1"
              name="type"
              checked={selectedType === "Veg"}
            />
            <label className={styles.label} htmlFor="test1">Veg</label>
          </p>
          <p>
            <input
              onChange={handleTypeChange}
              value="Non-veg"
              type="radio"
              id="test2"
              name="type"
              checked={selectedType === "Non-veg"}
            />
            <label className={styles.label} htmlFor="test2">Non-veg</label>
          </p>
        </div>

        <div className={styles.checkboxes}>
          <div className={styles.checkbox_container}>
            <input
              onChange={handleMealChange}
              name="meal"
              value="Breakfast"
              type="checkbox"
              className={styles.checkbox}
              checked={selectedMeals.includes("Breakfast")}
            />
            <img className={styles.overlay} src="./images/breakfast.jpg" alt="Breakfast" />
            <div className={styles.checked_overlay}></div>
            <p>Breakfast</p>
          </div>
          <div className={styles.checkbox_container}>
            <input
              onChange={handleMealChange}
              name="meal"
              type="checkbox"
              value="Lunch"
              className={styles.checkbox}
              checked={selectedMeals.includes("Lunch")}
            />
            <img className={styles.overlay} src="./images/lunch.jpg" alt="Lunch" />
            <div className={styles.checked_overlay}></div>
            <p>Lunch</p>
          </div>
          <div className={styles.checkbox_container}>
            <input
              onChange={handleMealChange}
              name="meal"
              type="checkbox"
              value="Dinner"
              className={styles.checkbox}
              checked={selectedMeals.includes("Dinner")}
            />
            <img className={styles.overlay} src="./images/dinner.jpg" alt="Dinner" />
            <div className={styles.checked_overlay}></div>
            <p>Dinner</p>
          </div>
        </div>

        <div className={styles.range_slider}>
          <p className={styles.heading}>Quantity (person)</p>
          <p className={styles.quantity_display}>Selected: {quantity} servings</p>
          <input
            value={quantity}
            onChange={handleQuantityChange}
            name="quantity"
            type="range"
            className={styles.slider}
            min="1"
            max="60"
          />
          <div className={styles.numbers}>
            <p>0</p>
            <p>10</p>
            <p>20</p>
            <p>30</p>
            <p>40</p>
            <p>50</p>
            <p>60</p>
          </div>
        </div>

        <div className={styles.range_slider}>
          <p className={styles.heading}>When was the meal prepared (Hrs)</p>
          <p className={styles.time_display}>Prepared: {time} hours ago</p>
          <input
            value={time}
            onChange={handleTimeChange}
            type="range"
            className={styles.slider}
            min="0"
            max="12"
          />
          <div className={styles.numbers}>
            <p>0</p>
            <p>2</p>
            <p>4</p>
            <p>6</p>
            <p>8</p>
            <p>10</p>
            <p>12</p>
          </div>
        </div>

        <div className={styles.btn}>
          <button onClick={handleSubmit} className={styles.submit_btn}>
            Continue to Details
          </button>
        </div>
      </div>
    </>
  );
};

export default FoodDetails;