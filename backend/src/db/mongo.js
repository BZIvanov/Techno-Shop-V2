const mongoose = require('mongoose');

mongoose.connection.once('open', () => {
  console.log('Connected to Mongo DB');
});

mongoose.connection.on('error', (error) => {
  console.log('Mongo DB error', error);
});

const mongoDbConnect = async () => {
  await mongoose.connect(process.env.DATABASE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = { mongoDbConnect };
