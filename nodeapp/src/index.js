const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const compression = require('compression');
const usersRoute = require('./routes/users');
const booksRoute = require('./routes/books');

const app = express();
app.use(bodyParser.json());
app.use(compression());
app.use('/api/users', usersRoute);
app.use('/api/books', booksRoute);
app.get('/api/packages', (req, res) => {
  const packageJson = JSON.parse(fs.readFileSync('package.json'));
  res.send(packageJson);
});

app.use(express.static('dist'));
app.use((req, res, next) => {
  res.set('Content-Encoding', 'gzip');
  next();
});

app.get('/', (req, res) => {
  // for react-router to work. always serve index.html
  res.send({ message: 'api is running successfully' });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.info(`Listening on port ${PORT} !`));
