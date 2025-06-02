const assert = require('assert');
const { ObjectID } = require('mongodb');
const { Validator } = require('jsonschema');

const bookSchema = {
  id: '/book',
  type: 'object',
  properties: {
    id: {
      ype: 'integer',
      minimum: 0
    },
    name: { type: 'string' },
    pages: {
      type: 'integer',
      minimum: 0
    }
  },
  required: ['name', 'pages']
};

const validator = new Validator();

const bookApi = {

  init: async () => {
    const { db } = await require('./db');
    const collection = db.collection('books');
    // Insert some documents
    const existingBook = await collection.find({ name: 'The Power of your Subconscious Mind' }, { _id: 1 }).limit(1).count();
    if (!existingBook) {
      const result = await collection.insertMany([{
        name: 'The Power of your Subconscious Mind',
        pages: 312
      }, {
        name: 'Word Power Made Easy',
        pages: 686
      }, {
        name: 'The Alchemist',
        pages: 172
      }]);
      assert.equal(3, result.result.n);
      assert.equal(3, result.ops.length);
      console.log('Inserted 3 documents into the collection');
    }
  },

  validate: book => validator.validate(book, bookSchema),

  save: book => new Promise(async (resolve, reject) => {
    try {
      const validatorResult = bookApi.validate(book);
      if (validatorResult.errors.length > 0) {
        throw validatorResult;
      }
      const { db } = await require('./db');
      const collection = db.collection('books');
      // Insert some documents
      let result;
      if (book._id) {
        const bookToUpdate = Object.assign(book, {
          _id: ObjectID.createFromHexString(book._id)
        });
        result = await collection.replaceOne({ _id: bookToUpdate._id }, bookToUpdate, { upsert: true });
      } else {
        result = await collection.insertOne(book);
      }
      resolve(result);
    } catch (error) {
      reject(error);
    }
  }),

  hasByName: async (name) => {
    const { db } = await require('./db');
    const collection = db.collection('books');
    // Insert some documents
    return await collection.findOne({ name }).count() > 0;
  },

  getByName: async (name) => {
    const { db } = await require('./db');
    const collection = db.collection('books');
    // Insert some documents
    return collection.findOne({ name });
  },

  hasById: async (_id) => {
    const { db } = await require('./db');
    const collection = db.collection('books');
    // Insert some documents
    return await collection.findOne({ _id: ObjectID.createFromHexString(_id) }).count() > 0;
  },

  getById: async (_id) => {
    const { db } = await require('./db');
    const collection = db.collection('books');
    // Insert some documents
    return collection.findOne({ _id: ObjectID.createFromHexString(_id) });
  },

  getAll: async () => {
    const { db } = await require('./db');
    const collection = db.collection('books');
    // Insert some documents
    return collection.find({}).toArray();
  },
};

bookApi.init();

module.exports = bookApi;
