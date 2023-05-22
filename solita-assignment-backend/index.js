const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Test Endpoint!');
});

app.get('/trips', (req, res) => {
    res.send('LIST_ALL');
});

app.get('/trips/:id', (req, res) => {
    const { params: { id } } = req;
    res.send('Requested trip: ' + id);
})

app.listen(3000, () => {
    console.log("Server listening on port: " + 3000);
})