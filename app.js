const express = require("express");
const bodyParser = require("body-parser");
const db = require("./config/database");
const leadRoutes = require("./routes/leadRoutes");
const segmentRoutes = require("./routes/segmentRoutes");

const app = express();
const PORT = 3000;

db.authenticate()
  .then(() => {
    console.log("Connection to database has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

// Middleware
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Routes
app.use("/leads", leadRoutes);
app.use("/segments", segmentRoutes);

// Define the query to run
const query = `SELECT * FROM public."leadTables" WHERE "customerName" = 'Raj Mehra';`;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// // const express = require('express');
// // const { engine } = require('express-handlebars');
// // const bodyParser = require('body-parser');
// // const path = require('path');

// // // Database
// // const db = require('./config/database');

// // // Test DB
// // db.authenticate()
// //     .then(() => console.log('Database connected...'))
// //     .catch(err => console.log('Error: ' + err))

// // const app = express();

// // // Handlebars
// // app.engine('handlebars', engine({
// //     defaultLayout: "main", extname: '.handlebars',

// //     runtimeOptions: {
// //         allowProtoMethodsByDefault: true,
// //         allowProtoPropertiesByDefault: true
// //     }
// // }));
// // app.set('view engine', 'handlebars');

// // // Body Parser
// // app.use(express.urlencoded({ extended: false }));

// // // Set static folder
// // app.use(express.static(path.join(__dirname, 'public')));

// // // Index route
// // app.get('/', (req, res) => res.render('index', { layout: 'landing' }));

// // // Gig routes
// // app.use('/gigs', require('./routes/gigs'));

// // const PORT = process.env.PORT || 5000;
// // const hostname = '127.0.0.1';
// // app.listen(PORT, hostname, () => {
// //     console.log(`Server running at http://${hostname}:${PORT}/`);
// // });
