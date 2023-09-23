import mongoose from 'mongoose';

export async function connect() {
  try {

    await mongoose.disconnect();
      mongoose.connect(process.env.MONGO_URL);
 

      mongoose.connection.on('connected', () => {
        console.log('Connected to MongoDB users');
      });

      mongoose.connection.on('error', (err) => {
        console.log("MongoDB connection error: " + err);
      });
  } catch (error) {
    console.log(error);
  }
}

export async function connectProducts() {
  try {
      await mongoose.disconnect();
      mongoose.connect(process.env.PRODUCTS_MONGO_URL);

      mongoose.connection.on('connected', () => {
        console.log('Connected to MongoDB products');
      });

      mongoose.connection.on('error', (err) => {
        console.log("MongoDB products connection error: " + err);
      });
  } catch (error) {
    console.log(error);
  }
}
