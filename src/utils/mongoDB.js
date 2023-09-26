import mongoose from 'mongoose';

function makeNewConnection(uri) {
  const db = mongoose.createConnection(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
  });

  db.on('error', function (error) {
      console.log(`MongoDB :: connection ${this.name} ${JSON.stringify(error)}`);
      db.close().catch(() => console.log(`MongoDB :: failed to close connection ${this.name}`));
  });

  db.on('connected', function () {
      mongoose.set('debug', function (col, method, query, doc) {
          console.log(`MongoDB :: ${this.conn.name} ${col}.${method}(${JSON.stringify(query)},${JSON.stringify(doc)})`);
      });
      console.log(`MongoDB :: connected ${this.name}`);
  });

  db.on('disconnected', function () {
      console.log(`MongoDB :: disconnected ${this.name}`);
  });

  return db;
}

export const connect = makeNewConnection(process.env.MONGO_URL);
export const connectProducts = makeNewConnection(process.env.PRODUCTS_MONGO_URL);
