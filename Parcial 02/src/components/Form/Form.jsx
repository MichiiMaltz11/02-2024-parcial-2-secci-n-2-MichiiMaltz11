import React from 'react';
import './Form.css'

const Form = ({ inputValue, setInputValue, searchEdamamItems }) => {
  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Buscar artículo"
      />
      <button onClick={searchEdamamItems}>Buscar</button>
    </div>
  );
};

export default Form;