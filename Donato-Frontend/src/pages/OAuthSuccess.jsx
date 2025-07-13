import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const OAuthSuccess = ({ setUser }) => {
  const history = useHistory();
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:9900";

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(`${BACKEND_URL}/user`, {
          withCredentials: true,
        });

        if (data.user) {
          console.log("User Role:", data.user.role);
          setUser({ isFetched: true, user: data.user });

          // Redirect based on role
          if (data.user.role === "ngo") {
            history.push("/add-ngo");
          } else {
            history.push("/home");
          }
        } else {
          history.push("/login");
        }
      } catch (error) {
        console.error("Error fetching user after OAuth:", error);
        history.push("/login");
      }
    };

    fetchUser();
  }, [history, setUser, BACKEND_URL]);

  return <div>Logging you in...</div>;
};

export default OAuthSuccess;
