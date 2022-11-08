import React from 'react';
import Restaurant from '../Restaurant';
import './RestaurantList.css';

const RestaurantList = ({ restaurants }) => {
  return (
    <div className="restaurant-list">
      {restaurants.map((restaurant) => {
        return <Restaurant restaurant={restaurant}></Restaurant>;
      })}
    </div>
  );
};

export default RestaurantList;
