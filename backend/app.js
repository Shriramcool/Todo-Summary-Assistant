const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const todoRoutes = require('./routes/todoRoutes');

app.use(cors());
app.use(express.json());
app.use('/api', todoRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
