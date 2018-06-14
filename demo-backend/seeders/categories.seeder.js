'use strict';

import { Seeder } from 'mongoose-data-seed';
import Category from '../src/models/category';

const categories = [
    {
        name: 'Galletitas'
    },
    {
        name: 'Cereales'
    },
    {
        name: 'Pastas/Arroz'
    },
    {
        name: 'Aderezos'
    },
    {
        name: 'Infusiones'
    },
    {
        name: 'Alimentos congelados'
    },
    {
        name: 'Lácteos'
    },
    {
        name: 'Bebidas'
    },
    {
        name: 'Limpieza'
    }
];

const FAKE_CATEGORIES_COUNT = categories.length;

const data = Array(FAKE_CATEGORIES_COUNT).fill().map((_, i) => {
    let category = categories[i];
    category.order = i;
    return category;
})

class CategoriesSeeder extends Seeder {

    async shouldRun() {
        return Category.count().exec().then(count => count === 0);
    }

    async run() {
        return Category.create(data);
    }
}

export default CategoriesSeeder;
