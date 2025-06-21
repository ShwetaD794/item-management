import React from 'react';

const ItemCard = ({ item, onClick }) => {
  return (
    <div className="card" onClick={onClick}>
      <img src={item.coverImage} alt={item.name} />
      <h4>{item.name}</h4>
    </div>
  );
};

export default ItemCard;
