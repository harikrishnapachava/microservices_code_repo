const express = require('express');
const booksapi = require('dao/booksapi'); // eslint-disable-line import/no-extraneous-dependencies

const router = express.Router();

router.get('/', async (req, res) => {
  const books = await booksapi.getAll();
  res.send(books);
});

router.head('/:id', async (req, res) => {
  if (await booksapi.hasById(req.params.id)) {
    res.send('OK');
  } else {
    res.status(404).send();
  }
});

router.get('/:id', async (req, res) => {
  const book = await booksapi.getById(req.params.id);
  if (book) {
    res.send(book);
  } else {
    res.status(404).send();
  }
});

router.post('/:id*?', async (req, res) => {
  try {
    const validatorResult = booksapi.validate(req.body);
    if (validatorResult.errors.length <= 0) {
      const result = await booksapi.save(req.body);
      if (result.insertedCount === 0) {
        res.status(201).send();
      } else {
        res.status(204).send();
      }
    } else {
      res.status(400).send(validatorResult.errors);
    }
  } catch (error) {
    if (error.code === 11000) {
      res
        .status(400)
        .send({ status: false, message: `Book already exists with name ${req.body.name}`, error: JSON.stringify(error) });
    } else {
      res.status(500).send({ status: false, message: 'Could not save/update book', error: JSON.stringify(error) });
    }
  }
});

module.exports = router;
