import mongoose from 'mongoose';
import env from 'env';

// TODO :
mongoose.connect('mongodb+srv://root:asdf1234@cluster0.m2rk2.mongodb.net/Clustor0?retryWrites=true&w=majority', {
  useNewUrlParser: true,
});

export const MongoCode = {
  Duplicated: 11000,
};
