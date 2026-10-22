const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use('/wasmoon', express.static(path.join(__dirname, 'node_modules/wasmoon/dist')));

app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/editor', (req, res) => {
    res.render('editor');
});

app.listen(port, () => {
    console.log(`Open on http://localhost:${port}`);
});