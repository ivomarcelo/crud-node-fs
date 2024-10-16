const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json());

const filePath = path.join(__dirname, 'data.json');

// lendo o arquivo JSON - READ
const readData = () => {
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify([]));
    }
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
};

// Função para escrever no arquivo JSON - WRITE
const writeData = (data) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// Rotas CRUD
// Create
app.post('/items', (req, res) => {
    const items = readData();
    const newItem = { id: Date.now(), ...req.body };
    items.push(newItem);
    writeData(items);
    res.status(201).json(newItem);
});

// Read
app.get('/items', (req, res) => {
    const items = readData();
    res.json(items);
});

// Update
app.put('/items/:id', (req, res) => {
    const items = readData();
    const index = items.findIndex(item => item.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ message: 'Item not found' });

    items[index] = { ...items[index], ...req.body };
    writeData(items);
    res.json(items[index]);
});

// Delete
app.delete('/items/:id', (req, res) => {
    let items = readData();
    items = items.filter(item => item.id !== parseInt(req.params.id));
    writeData(items);
    res.status(204).send();
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
