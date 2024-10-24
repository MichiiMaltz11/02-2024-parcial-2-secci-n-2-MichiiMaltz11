import React, { useState } from 'react';
import Header from './components/Header/Header';
import Form from './components/Form/Form';
import ItemList from './components/ItemList/ItemList';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [edamamItems, setEdamamItems] = useState([]);

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

  const addItem = (name) => {
    const newItem = { id: Date.now(), name, completed: false };
    setItems((prevItems) => [...prevItems, newItem]);
  };

  const toggleComplete = (id) => {
    setItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item))
    );
  };

  const removeItem = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
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
          {edamamItems.map((item) => (
            <div key={item.food.foodId} className="edamam-item">
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