import React from 'react';

const Details = ({ restaurant }) => {
  return restaurant ? (
    <div>
      <h1>{restaurant.name}</h1>
      <p>{restaurant.price}</p>
      <img
        src={restaurant.image_url}
        alt={restaurant.name}
        width={500}
        height={500}
      />
    </div>
  ) : (
    <div></div>
  );
};

export default Details;
