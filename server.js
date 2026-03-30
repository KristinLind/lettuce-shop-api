require('dotenv').config();
const express = require('express');
const cors = require('cors');

const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const passport = require('passport');

// Route imports
const itemRoutes = require('./routes/itemRoutes');
const listRoutes = require('./routes/listRoutes');
const storeRoutes = require('./routes/storeRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Swagger setup
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Lettuce Shop API',
      version: '1.0.0',
      description: 'API docs for Lettuce Shop'
    },
  },
  apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Basic route
app.get('/', (req, res) => {
  res.send('Lettuce Shop API is running');
});

// Routes
app.use('/items', itemRoutes);
app.use('/lists', listRoutes);
app.use('/stores', storeRoutes);
app.use('/users', userRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));