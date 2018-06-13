import { Seeder } from 'mongoose-data-seed';
import Category from '../src/models/category';

const data = [
  { name: 'Bebidas'},
  { name: 'Galletitas'},
  { name: 'Limpieza'}
];

class CategoriesSeeder extends Seeder {

  async shouldRun() {
    return Category.count().exec().then(count => count === 0);
  }

  async run() {
    return Category.create(data);
  }
}

export default CategoriesSeeder;
