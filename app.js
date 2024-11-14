require('dotenv').config();
const express = require('express');

const {
  authorizeRole,
  authenticateJwtToken,
  errorHandler,
  undefinedEndpointHandler,
} = require('./src/middlewares');

const {
  bookRoute,
  borrowRoute,
  roleRoute,
  userRoute,
} = require('./src/routes');

const { Roles } = require('./src/utils');

const port = process.env.PORT || 3000;
const app = express();

app.get('/', async (req, res) => {
  try {
    res.send('<h1>Welcome to the Libary!</h1>');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

app.use(express.json());

app.use(userRoute);
app.use('/books', authenticateJwtToken, bookRoute);
app.use('/borrows', authenticateJwtToken, borrowRoute);
app.use('/roles', authenticateJwtToken, authorizeRole(Roles.Admin), roleRoute);

app.use(errorHandler);
app.use(undefinedEndpointHandler);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
