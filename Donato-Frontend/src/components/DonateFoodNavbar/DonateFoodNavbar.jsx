// import { Link } from "react-router-dom";

// import { RiArrowLeftSLine } from "react-icons/ri";

// const DonateFoodNavbar = ({ link }) => {
//   return (
//     <>
//       <div className="navbar">
//         <Link className="link" to={link}>
//           <RiArrowLeftSLine className="icon" />
//         </Link>
//         <p className="heading">Donate Food</p>
//       </div>

//       <style jsx>
//         {`
//           .navbar {
//             padding: 22px;
//             background-color: white;
//             display: flex;
//             align-items: center;
//             gap: 70px;
//             margin-bottom: 41px;
//             position: fixed;
//             top: 0;
//             width: 414px;
//             z-index: 1;
//           }

//           .link {
//             font-weight: 600;
//             font-size: 30px;
//             line-height: 22px;
//             color: black;
//           }

//           .heading {
//             font-weight: 600;
//             font-size: 24px;
//             line-height: 36px;
//           }
//         `}
//       </style>
//     </>
//   );
// };

// export default DonateFoodNavbar;

//new

// import { Link } from "react-router-dom";
// import { RiArrowLeftSLine } from "react-icons/ri";
// import PropTypes from 'prop-types';
// import styles from './donatefoodNavbar.module.css'; // Note: Case-sensitive import

// const DonateFoodNavbar = ({ backLink = "/" }) => { // Added default prop
//   return (
//     <nav className={styles.navbar}>
//       <Link to={backLink} className={styles.backButton} aria-label="Go back">
//         <RiArrowLeftSLine className={styles.icon} />
//       </Link>
//       <h1 className={styles.title}>Donate Food</h1>
//     </nav>
//   );
// };

// DonateFoodNavbar.propTypes = {
//   backLink: PropTypes.string
// };

// export default DonateFoodNavbar;


import PropTypes from 'prop-types';
import styles from './donatefoodNavbar.module.css';
import { Link } from "react-router-dom";
import { RiArrowLeftSLine } from "react-icons/ri";

const DonateFoodNavbar = ({ link }) => {
  const validLink = typeof link === 'string' ? link : '/';

  return (
    <nav className={styles.navbar}>
      <Link to={validLink} className={styles.backButton} aria-label="Go back">
        <RiArrowLeftSLine className={styles.icon} />
      </Link>
      <h1 className={styles.title}>Donate Food</h1>
    </nav>
  );
};

DonateFoodNavbar.propTypes = {
  link: PropTypes.string,
};

DonateFoodNavbar.defaultProps = {
  link: '/', // Fallback to home if no link is passed
};

export default DonateFoodNavbar;
