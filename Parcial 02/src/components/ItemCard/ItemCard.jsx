import React from 'react';
import { FaTrash } from "react-icons/fa";
import './ItemCard.css'; 

const ItemCard = ({ item, toggleComplete, removeItem }) => {
  return (
    <div className={`item-card ${item.completed ? 'completed' : ''}`}>
      <span>{item.name}</span>
      <button className="comprado-button" onClick={() => toggleComplete(item.id)}>
        {item.completed ? 'Desmarcar' : 'Comprado'}
      </button>
      <button className="eliminar-button" onClick={() => removeItem(item.id)}>
        <FaTrash />
      </button>
    </div>
  );
}

export default ItemCard;
