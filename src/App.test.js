import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// Test for a button that reserves a table (which exists in your App)
test('renders reserve a table button', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  const buttonElement = screen.getByText(/Reserve a table/i);
  expect(buttonElement).toBeInTheDocument();
});
