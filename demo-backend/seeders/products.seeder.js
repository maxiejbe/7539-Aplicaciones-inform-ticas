import { Seeder } from 'mongoose-data-seed';
import Category from '../src/models/category';
import Product from '../src/models/product';

//Please check categories.seeder order to seed products.
const data = [
  [
    { name: 'Oreo' },
    { name: 'Melba' },
    { name: 'Pepitos' },
    { name: 'Sonrisas' },
    { name: 'Rumba' },
    { name: 'Saladix' }
  ],
  [
    { name: 'Zucaritas' },
    { name: 'Chococrispis' },
    { name: 'Froot loops' },
    { name: 'Honey Graham' }
  ],
  [
    { name: 'Fideos largos' },
    { name: 'Fideos de moño' },
    { name: 'Arroz blanco' },
    { name: 'Capeletinis' },
    { name: 'Sopa' }
  ],
  [
    { name: 'Aceite' },
    { name: 'Vinagre' },
    { name: 'Sal' },
    { name: 'Azúcar' },
    { name: 'Ketchup' },
    { name: 'Mostaza' },
    { name: 'Salsa Golf' },
    { name: 'Mayonesa' },
  ],
  [
    { name: 'Té' },
    { name: 'Café' },
    { name: 'Yerba' },
    { name: 'Mate cocido' }
  ],
  [
    { name: 'Kanikama' },
    { name: 'Patitas de pollo' },
    { name: 'Papas fritas' },
    { name: 'Milanesas de soja' },
    { name: 'Patys' },
    { name: 'Salchichas' }
  ],
  [
    { name: 'Casancrem' },
    { name: 'Philadelfia' },
    { name: 'Leche' },
    { name: 'Serenito'},
    { name: 'Queso' }
  ],
  [
    { name: 'Coca-cola' },
    { name: 'Sprint' },
    { name: 'Agua' },
    { name: 'Seven-up' },
    { name: 'Fanta' }
  ],
  [
    { name: 'Lavandina' },
    { name: 'Desinfectante' },
    { name: 'Escoba' },
    { name: 'Trapo de piso' },
    { name: 'Repasador' }
  ]
];

class ProductsSeeder extends Seeder {

  async beforeRun() {
    this.categories = await Category.find({}).exec();
    this.productsData = this._generateProducts();
  }

  async shouldRun() {
    return Product.count().exec().then(count => count === 0);
  }

  async run() {
    return Product.create(this.productsData);
  }
  
  _generateProducts() {
    const categoriesCount = this.categories.length;
    return Array(categoriesCount).fill().map((_, i) => {
      let category = this.categories.find(cat => cat.order === i);
      return data[i].map(product => {
        product.category = category._id;
        return product;
      });
    }).flatten();
  }
}

export default ProductsSeeder;
