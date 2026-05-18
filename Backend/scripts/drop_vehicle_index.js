require('dotenv').config();
const mongoose = require('mongoose');

(async function run(){
  try {
    await mongoose.connect(process.env.DB_CONNECT);
    console.log('Connected to DB');
    const coll = mongoose.connection.collection('captains');
    const indexes = await coll.indexes();
    console.log('Indexes before:', indexes.map(i => i.name));
    const idxName = 'vehicle.vehiclenumber_1';
    const exists = indexes.some(i => i.name === idxName);
    if (!exists) {
      console.log('Index not found:', idxName);
    } else {
      await coll.dropIndex(idxName);
      console.log('Dropped index:', idxName);
    }
    const after = await coll.indexes();
    console.log('Indexes after:', after.map(i => i.name));
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Error dropping index:', err);
    try { await mongoose.disconnect(); } catch(e){}
    process.exit(1);
  }
})();
