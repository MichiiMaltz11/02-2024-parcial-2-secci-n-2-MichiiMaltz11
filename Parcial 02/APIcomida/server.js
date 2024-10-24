const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

let items = [];

app.use(cors());
app.use(bodyParser.json());

app.get('/api/products', (req, res) => {
    const searchTerm = req.query.q || '';
    const filteredItems = items.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));

    if (searchTerm) {
        res.json(filteredItems);
    } else {
        res.json(items);
    }
});


app.post('/api/products', (req, res) => {
    const newItem = { id: Date.now(), name: req.body.name, brand: req.body.brand, completed: false };
    items.push(newItem);
    res.status(201).json(newItem);
});

app.put('/api/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const item = items.find(item => item.id === id);
    if (item) {
        item.completed = !item.completed;
        res.json(item);
    } else {
        res.status(404).json({ message: 'Item not found' });
    }
});

app.delete('/api/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    items = items.filter(item => item.id !== id);
    res.status(204).send();
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
