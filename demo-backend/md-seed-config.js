import mongooseLib from 'mongoose';

import Users from "./seeders/users.seeder";
import Categories from "./seeders/categories.seeder";
import Products from "./seeders/products.seeder";


mongooseLib.Promise = global.Promise;

// Export the mongoose lib
export const mongoose = mongooseLib;

// Export the mongodb url
export const mongoURL = process.env.MONGO_URL;

/*
  Seeders List
  ------
  order is important
*/
export const seedersList = {
  Users,
  Categories,
  Products
};
