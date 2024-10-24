import React from 'react';
import ItemCard from '../ItemCard/ItemCard';

const ItemList = ({ items, toggleComplete, removeItem }) => {
  return (
    <div className="item-list">
      {items.map(item => (
        <ItemCard
          key={item.id}
          item={item}
          toggleComplete={toggleComplete}
          removeItem={removeItem}
        />
      ))}
    </div>
  );
};

export default ItemList;
