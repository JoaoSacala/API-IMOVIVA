const app = require('./app');
require('dotenv').config();

const PORT = process.env.PORT || 5173;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));