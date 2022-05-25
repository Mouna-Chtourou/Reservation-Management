const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MDB_CONNECT)
    console.log('MongoDB connected')
  } catch (error) {
    console.log(error)
    proccess.exit(1)
  }
}

module.exports = connectDB
