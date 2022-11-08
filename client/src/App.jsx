import { useState, useEffect } from 'react';
import './App.css';
import Home from './Home';
import Nav from './Nav';
import RestaurantList from './RestaurantList';

function App() {
  const [restaurants, setRestaurants] = useState([]);
  const [selected, setSelected] = useState(null);
  const fetchRestaurants = () => {
    fetch('http://localhost:3000')
      .then((res) => res.json())
      .then((data) => setRestaurants(data.businesses));
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  useEffect(() => {
    setSelected(restaurants[12]);
  }, [restaurants]);

  return (
    <div className="App">
      <Nav />
      <Home restaurants={restaurants} selected={selected}></Home>
    </div>
  );
}

export default App;
