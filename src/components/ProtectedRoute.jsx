import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";

const Home = () => {
  const navigate = useNavigate();
  const auth = getAuth();

  const handleExploreNow = () => {
    const user = auth.currentUser;
    if (user) {
      navigate("/services");
    } else {
      navigate("/login", { state: { from: "/services" } });
    }
  };

  return (
    <div className="home-page">
      <button
        onClick={handleExploreNow}
        className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md transition"
      >
        Explore Now
      </button>
    </div>
  );
};

export default Home;
