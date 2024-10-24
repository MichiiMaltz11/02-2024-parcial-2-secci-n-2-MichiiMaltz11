import React, { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import Form from './components/Form/Form';
import ItemList from './components/ItemList/ItemList';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [edamamItems, setEdamamItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, []);

  const searchEdamamItems = async () => {
    const app_id = 'c51f96e9';
    const app_key = '901591963b3408411bc0e98768350d8a';

    setEdamamItems([]);

    try {
      const response = await fetch(`https://api.edamam.com/api/food-database/v2/parser?ingr=${inputValue}&app_id=${app_id}&app_key=${app_key}`);
      const data = await response.json();
      setEdamamItems(data.hints);
    } catch (error) {
      console.error('Error fetching items from Edamam:', error);
    }
  };

  const addItem = async (name) => {
    try {
      const response = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name })
      });

      const newItem = await response.json();
      setItems((prevItems) => [...prevItems, newItem]);
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const toggleComplete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: 'PUT'
      });

      const updatedItem = await response.json();
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? updatedItem : item
        )
      );
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const removeItem = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/products/${id}`, {
        method: 'DELETE'
      });

      setItems((prevItems) => prevItems.filter((item) => item.id !== id));  // Lo eliminamos del estado local
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const fetchAllItems = () => {
    setEdamamItems([]);
  };

  return (
    <div className="App">
      <Header />
      <Form
        inputValue={inputValue}
        setInputValue={setInputValue}
        searchEdamamItems={searchEdamamItems}
      />

      <button onClick={fetchAllItems} style={{ margin: '10px', padding: '10px' }}>
        Ver toda la lista
      </button>

      {edamamItems.length > 0 && (
        <div className="edamam-results">
          {edamamItems.map((item, index) => (
            <div key={`${item.food.foodId}-${index}`} className="edamam-item">
              <span>{item.food.label}</span>
              <button id='agregar' onClick={() => addItem(item.food.label)}>Agregar</button>
            </div>
          ))}

        </div>
      )}

      {!items.length ? (
        <div className="no-items">
          <img src="/src/assets/carro-vacio.png" id="carrito" alt="Carrito vacío" />
          <p>No hay artículos aún.</p>
        </div>
      ) : (
        <ItemList
          items={items}
          toggleComplete={toggleComplete}
          removeItem={removeItem}
        />
      )}
    </div>
  );
}

export default App;
