require('dotenv').config()
import mongoose from 'mongoose'

export const connectDB = async () => {
  await mongoose.connect(process.env.NODE_ENV === 'development' ? process.env.MONGODB_CONNECTION_DEV : process.env.MONGODB_CONNECTION)
}


// export default connectDB = mongoose.connect(process.env.NODE_ENV === 'development' ? process.env.MONGO_CONNECTION_DEV : process.env.MONGO_CONNECTION, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
