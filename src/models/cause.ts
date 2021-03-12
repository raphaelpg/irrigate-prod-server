import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const CauseSchema = new Schema({
  date: {
    type: String,
    default: Date.now()
  },
  name: String,
  description: String,
  link: String,
  category: String,
  continent: String,
  country: String,
  address: String,
  logoName: String,
  logo: String
});

const Cause: mongoose.Model<any> = mongoose.model('Cause', CauseSchema);

export default Cause