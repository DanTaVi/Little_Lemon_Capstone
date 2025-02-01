import React, { useState, useEffect } from 'react';
import resto from './restaurant.jpg';
import { Link } from 'react-router-dom';

const Book = ({ availableTimes, updateTimes }) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState('1');
  const [occasion, setOccasion] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState('');
  const [loading, setLoading] = useState(true); // Start loading by default

  // Initialize available times with today's date only if date is empty
  useEffect(() => {
    if (!date) {
      const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
      setDate(today); // Set date only if it's empty
      updateTimes(today); // Fetch available times for today on initial load
    }
  }, [date, updateTimes]); // Run only once unless date is empty

  useEffect(() => {
    if (availableTimes.length > 0) {
      setLoading(false); // Stop loading when availableTimes are set
      if (!time && availableTimes.length) {
        setTime(availableTimes[0]); // Set the first available time if no time is selected
      }
    }
  }, [availableTimes, time]); // Updates when availableTimes or time changes

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setDate(selectedDate);
    setLoading(true); // Show loading again when the date changes
    updateTimes(selectedDate); // Fetch available times for the selected date
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate the form
    if (!date || !time || !guests) {
      setFormError('All fields are required. Please fill out all fields.');
      return;
    }

    setFormError(''); // Clear error message if everything is valid
    setSubmitted(true);
    const formData = { date, time, guests, occasion };
    console.log('Form Data:', formData);
    alert('Reservation Submitted!');
    // Call submitAPI(formData) to actually submit the form data to the API
    window.submitAPI(formData); // Submit the form data to the API
  };

  return (
    <div className="BookingPage">
      <img src={resto} alt="Restaurant" className="Resto" />
      <Link to="/">
        <button className="ReturnButton" aria-label="On Click">Return</button>
      </Link>
      <b>Please book your table!</b>

      {formError && <div className="error-message" style={{ color: 'red' }}>{formError}</div>} {/* Display the error message */}

      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <label htmlFor="resDate">Choose a Date</label>
          <input
            type="date"
            id="resDate"
            value={date}
            onChange={handleDateChange}
            aria-label="On Click"
            required
          />
          <label htmlFor="resTime">Select a Time</label>
          <select
            id="resTime"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            aria-label="On Click"
            required
          >
            {loading ? (
              <option>Loading...</option> // Show Loading... when times are being fetched
            ) : (
              availableTimes.map((availableTime) => (
                <option key={availableTime} value={availableTime}>
                  {availableTime}
                </option>
              ))
            )}
          </select>
          <label htmlFor="resGuests">How many Guests?</label>
          <input
            type="number"
            id="resGuests"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            aria-label="On Click"
            placeholder="1"
            min="1"
            max="10"
            required
          />
          <label htmlFor="occasion">Occasion</label>
          <select
            id="occasion"
            value={occasion}
            onChange={(e) => setOccasion(e.target.value)}
          >
            <option value="None">None</option>
            <option value="Birthday">Birthday</option>
            <option value="Anniversary">Anniversary</option>
          </select>
          <input type="submit" value="Make your reservation!" aria-label="On Click" />
        </form>
      ) : (
        <div className="Confirmation">
          <h2>Booking Confirmation</h2>
          <p><strong>Date:</strong> {date}</p>
          <p><strong>Time:</strong> {time}</p>
          <p><strong>Guests:</strong> {guests}</p>
          <p><strong>Occasion:</strong> {occasion}</p>
        </div>
      )}
    </div>
  );
};

export default Book;



