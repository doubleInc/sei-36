// Import modli and the NeDB adapter
const { model, adapter, use, Joi } = require("modli");
const nedb = require("modli-nedb");

// Add an adapter instance
adapter.add({
  name: "appDB",
  source: nedb,
  config: {
    inMemoryOnly: true,
  },
});

// Add a data model
model.add({
  name: "images",
  version: 1,
  schema: {
    id: Joi.number().integer(),
  },
});

// Create an instance of the datasource object with the Model and Adapter
const myDataSource = use("images", "appDB");
module.exports = myDataSource;
