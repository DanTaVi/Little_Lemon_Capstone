import './App.css';
import Main from './Main.js';
import Footer from './Footer.js';
import Book from './Book2.js';
import { Routes, Route, Link } from 'react-router-dom';
import MenuLogo from './HamburgerMenuLogo.png';
import CompLogo from './Little_Lemon.jpg';
import CartLogo from './ShoppingCart.png';
import { useReducer } from 'react';

// Reducer to manage available times
function availableTimesReducer(state, action) {
  switch (action.type) {
    case 'UPDATE_TIMES':
      return action.availableTimes;
    default:
      return state;
  }
}

function App() {
  const [availableTimes, dispatch] = useReducer(availableTimesReducer, []);

  // Fetch API for available times
  const fetchAPI = async (selectedDate) => {
    try {
      const response = await fetch(`https://your-api-endpoint.com/times?date=${selectedDate}`);
      const availableTimesForDate = await response.json();
      console.log("Fetched available times:", availableTimesForDate); // Debug: check API response
      return availableTimesForDate;
    } catch (error) {
      console.error("Error fetching available times:", error);
      return [];
    }
  };

  const updateTimes = (selectedDate) => {
    console.log("Fetching times for date:", selectedDate); // Debug: track date
    fetchAPI(selectedDate).then((availableTimesForDate) => {
      console.log("Updated available times:", availableTimesForDate); // Debug: check data update
      dispatch({
        type: 'UPDATE_TIMES',
        availableTimes: availableTimesForDate,
      });
    });
  };

  return (
    <div className="App">
      <nav className="NavBar">
        <img src={MenuLogo} alt="Menu Logo" className="MenuLogo" />
        <Link to="/">
          <img src={CompLogo} alt="Main Logo" className="CompLogo" />
        </Link>
        <img src={CartLogo} alt="Cart Logo" className="CartLogo" />
      </nav>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/Book" element={<Book availableTimes={availableTimes} updateTimes={updateTimes} />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

