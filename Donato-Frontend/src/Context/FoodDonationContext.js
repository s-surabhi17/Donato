import { createContext, useContext, useState } from "react";

const FoodDonationContext = createContext();

export const FoodDonationProvider = ({ children }) => {
  const [foodData, setFoodData] = useState({
    type: "",
    meal: [],
    quantity: 0,
    location: "",
    phone: "",
    donationDate: "",
    donationTime: "",
    agreedToGuidelines: false,
  });

  return (
    <FoodDonationContext.Provider value={{ foodData, setFoodData }}>
      {children}
    </FoodDonationContext.Provider>
  );
};

export const useFoodDonation = () => useContext(FoodDonationContext);
