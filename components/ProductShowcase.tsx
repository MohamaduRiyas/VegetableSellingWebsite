import React, { useState, useMemo } from 'react';
import { products, categories } from '../constants';
import ProductCard from './ProductCard';
import { Category } from '../types';

const CategorySidebar: React.FC<{
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
}> = ({ selectedCategory, onSelectCategory }) => {
  return (
    <aside className="w-full md:w-64 lg:w-72 flex-shrink-0 mb-8 md:mb-0">
      <nav className="space-y-2">
        {categories.map((category: Category) => (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category.id)}
            className={`w-full flex items-center gap-4 p-3 rounded-lg text-left transition-colors duration-200 ${
              selectedCategory === category.id
                ? 'bg-brand-sidebar-bg text-brand-pink font-bold'
                : 'text-brand-text/80 hover:bg-gray-100'
            }`}
          >
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
              <img src={category.imageUrl} alt={category.name} className="w-6 h-6 object-contain" />
            </div>
            <span>{category.name}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};


const ProductShowcase: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'all') {
      return products;
    }
    return products.filter(p => p.category === selectedCategory);
  }, [selectedCategory]);

  const activeCategoryName = categories.find(c => c.id === selectedCategory)?.name || 'All';

  return (
    <section id="products" className="py-16 sm:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-8 lg:gap-12">
          
          <CategorySidebar 
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
          
          <div className="flex-grow">
             <div className="mb-6">
              <div className="text-sm text-gray-500 mb-2">
                Home &gt; Fresh Produce &gt; <span className="text-brand-text font-semibold">{activeCategoryName}</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-brand-dark tracking-tight">Our Fresh Produce</h2>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;