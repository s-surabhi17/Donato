// import BottomNavbar from "../../components/BottomNavbar";
// import styles from "./donationSelection.module.css";
// import DonateFoodNavbar from "../../components/DonateFoodNavbar";
// import { Link } from "react-router-dom";

// const DonationSelection = () => {
//   return (
//     <>
//       <DonateFoodNavbar link="/all"/>
//       <BottomNavbar />

//       <div className={styles.main}>
//         <h1>Choose where you want to Donate</h1>
//         <div className={styles.image_section}>
//           <Link to="/category">
//             <img src="./images/ngo.png" alt="NGO" />
//           </Link>
//           <Link to="/category">
//             <img src="./images/hunger.jpg" alt="Hunger" />
//           </Link>
//         </div>
//       </div>

//       <style jsx>
//         {`
//           .App {
//             overflow: hidden;
//           }
//         `}
//       </style>
//     </>
//   );
// };

// export default DonationSelection;

//new

import BottomNavbar from "../../components/BottomNavbar";
import styles from "./donationSelection.module.css";
import DonateFoodNavbar from "../../components/DonateFoodNavbar";
import { Link } from "react-router-dom";

const DonationSelection = () => {
  return (
    <div className={styles.appContainer}>
      <DonateFoodNavbar link="/all" />
      
      <div className={styles.main}>
        <h1>Choose where you want to Donate</h1>
        <div className={styles.imageSection}>
          <Link to="/category">
            <img src="./images/ngo.png" alt="NGO" className={styles.donationImage} />
          </Link>
          <Link to="/category">
            <img src="./images/hunger.jpg" alt="Hunger" className={styles.donationImage} />
          </Link>
        </div>
      </div>

      <BottomNavbar />
    </div>
  );
};

export default DonationSelection;