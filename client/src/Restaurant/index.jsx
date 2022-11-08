import React from 'react';

const Restaurant = ({ restaurant }) => {
  return (
    <div>
      <h2>{restaurant.name}</h2>
      <p>{restaurant.price}</p>
      <img
        src={restaurant.image_url}
        alt={restaurant.name}
        width={200}
        height={200}
      />
    </div>
  );
};

export default Restaurant;
