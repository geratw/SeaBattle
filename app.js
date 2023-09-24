const express = require("express");
const app = express();
const serverRoutes = require('./routes/routes.js');
const PORT = 3000;
const path = require('path'); 

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(serverRoutes);



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
