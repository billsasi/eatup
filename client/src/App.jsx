import { useState, useEffect } from 'react';
import './App.css';
import Nav from './Nav';
import RestaurantList from './RestaurantList';

function App() {
  const key = import.meta.env.VITE_YELP;
  console.log(key);

  const fetchRestaurants = async () => {
    const response = await fetch(
      `https://api.yelp.com/v3/businesses/search` +
        new URLSearchParams({
          location: 'Fremont, CA',
        }),
      {
        mode: 'no-cors',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${key}`,
        },
      }
    );
    const data = await response.json();
    console.log(data);
  };

  return (
    <div className="App">
      <Nav />
      <RestaurantList />
      <button onClick={() => fetchRestaurants()}>Find</button>
    </div>
  );
}

export default App;
