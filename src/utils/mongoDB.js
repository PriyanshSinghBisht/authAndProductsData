import mongoose from 'mongoose';

export function connect() {
  try {
    if (!mongoose.connection.readyState) {
      mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      mongoose.connection.on('connected', () => {
        console.log('Connected to MongoDB users');
      });

      mongoose.connection.on('error', (err) => {
        console.log("MongoDB connection error: " + err);
      });
    }
  } catch (error) {
    console.log(error);
  }
}

export function connectProducts() {
  try {
    if (!mongoose.connection.readyState) {
      mongoose.connect(process.env.PRODUCTS_MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      mongoose.connection.on('connected', () => {
        console.log('Connected to MongoDB products');
      });

      mongoose.connection.on('error', (err) => {
        console.log("MongoDB products connection error: " + err);
      });
    }
  } catch (error) {
    console.log(error);
  }
}
