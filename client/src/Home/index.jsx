import React from 'react';
import Details from '../Details';
import RestaurantList from '../RestaurantList';
import './Home.css';

const Home = ({ restaurants, selected }) => {
  return (
    <div className="home">
      <RestaurantList restaurants={restaurants} />
      <Details restaurant={selected}></Details>
    </div>
  );
};

export default Home;
