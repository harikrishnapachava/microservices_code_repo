const assert = require('assert');
const { ObjectID } = require('mongodb');
const { Validator } = require('jsonschema');

const userSchema = {
  id: '/user',
  type: 'object',
  properties: {
    name: { type: 'string' },
    email: {
      type: 'string',
      format: 'email'
    },
    address: { $ref: '/address' }
  },
  required: ['name', 'email', 'address']
};
// Address, to be embedded on user
const addressSchema = {
  id: '/address',
  type: 'object',
  properties: {
    line1: { type: 'string' },
    line2: { type: 'string' },
    zip: { type: 'string' },
    city: { type: 'string' },
    state: { type: 'string' },
    country: { type: 'string' }
  },
  required: ['country']
};

const validator = new Validator();
validator.addSchema(addressSchema, '/address');

const userApi = {

  init: async () => {
    const { db } = await require('./db');
    const collection = db.collection('users');
    // Insert some documents
    const existingUser = await collection.find({ email: 'harikrishnacpachava@gmail.com' }, { _id: 1 }).limit(1).count();
    if (!existingUser) {
      const result = await collection.insertMany([{
        email: 'harikrishnacpachava@gmail.com',
        name: 'Harikrishna Pachava',
        address: {
          line1: 'Something somthing',
          zip: '910114',
          city: 'Pune',
          state: 'MH',
          country: 'India'
        }
      }, {
        email: 'admin@example.com',
        name: 'Admin user',
        address: {
          line1: 'Lorem Ipsum',
          line2: 'consectetur adipiscing elit',
          zip: '41120',
          city: 'Obrazhiivka',
          state: 'Sumska',
          country: 'Ukrainian'
        }
      }, {
        email: 'sample@example.com',
        name: 'Dummy1 Lastname',
        address: {
          line1: 'Arrondissement de Romorantin',
          zip: '41140',
          city: 'Thésée',
          state: 'Loir-et-Cher',
          country: 'France'
        }
      }]);
      assert.equal(3, result.result.n);
      assert.equal(3, result.ops.length);
      console.log('Inserted 3 documents into the collection');
    }
  },

  validate: user => validator.validate(user, userSchema),

  save: user => new Promise(async (resolve, reject) => {
    try {
      const validatorResult = userApi.validate(user);
      if (validatorResult.errors.length > 0) {
        throw validatorResult;
      }
      const { db } = await require('./db');
      const collection = db.collection('users');
      // Insert some documents
      let result;
      if (user._id) {
        const userToUpdate = Object.assign(user, {
          _id: ObjectID.createFromHexString(user._id)
        });
        result = await collection.replaceOne({ _id: userToUpdate._id }, userToUpdate, { upsert: true });
      } else {
        result = await collection.insertOne(user);
      }
      resolve(result);
    } catch (error) {
      reject(error);
    }
  }),

  hasByEmail: async (email) => {
    const { db } = await require('./db');
    const collection = db.collection('users');
    // Insert some documents
    return await collection.findOne({ email }).count() > 0;
  },

  getByEmail: async (email) => {
    const { db } = await require('./db');
    const collection = db.collection('users');
    // Insert some documents
    return collection.findOne({ email });
  },

  hasById: async (_id) => {
    const { db } = await require('./db');
    const collection = db.collection('users');
    // Insert some documents
    return await collection.findOne({ _id: ObjectID.createFromHexString(_id) }).count() > 0;
  },

  getById: async (_id) => {
    const { db } = await require('./db');
    const collection = db.collection('users');
    // Insert some documents
    return collection.findOne({ _id: ObjectID.createFromHexString(_id) });
  },

  getAll: async () => {
    const { db } = await require('./db');
    const collection = db.collection('users');
    // Insert some documents
    return collection.find({}).toArray();
  },
};

userApi.init();

module.exports = userApi;
