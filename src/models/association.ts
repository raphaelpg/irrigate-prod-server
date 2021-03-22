import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const AssociationSchema = new Schema({
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
  logo: String,
  contactName: String,
  contactEmail: String
});

const Association: mongoose.Model<any> = mongoose.model('Association', AssociationSchema);

export default Association;