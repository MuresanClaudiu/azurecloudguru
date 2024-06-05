import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the car model finder header', () => {
  render(<App />);
  const headerElement = screen.getByText(/Car Model Finder/i);
  expect(headerElement).toBeInTheDocument();
});
