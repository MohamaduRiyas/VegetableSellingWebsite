
import React from 'react';
import { Product } from '../types';
import { useCart } from '../contexts/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { cartItems, addToCart, updateQuantity } = useCart();

  const cartItem = cartItems.find(item => item.product.id === product.id);

  return (
    <div className="bg-white rounded-lg border border-gray-200/80 group transition-all duration-300 flex flex-col p-3 h-full hover:shadow-lg hover:-translate-y-1">
      <div className="relative overflow-hidden rounded-md bg-gray-100">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-32 sm:h-40 object-contain transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute bottom-2 right-2">
            {!cartItem ? (
                <button
                    onClick={() => addToCart(product)}
                    className="bg-white text-brand-pink font-bold text-sm py-2 px-6 rounded-lg border-2 border-brand-pink hover:bg-brand-pink/5 transition-all duration-300 transform group-hover:scale-105"
                >
                    ADD
                </button>
            ) : (
                <div className="flex items-center justify-center bg-white rounded-lg border-2 border-brand-pink text-brand-pink shadow-md text-sm font-semibold">
                    <button onClick={() => updateQuantity(product.id, cartItem.quantity - 1)} className="w-8 h-8 flex items-center justify-center hover:bg-brand-pink/5 rounded-l-md transition-colors">-</button>
                    <span className="w-8 text-center text-brand-dark">{cartItem.quantity}</span>
                    <button onClick={() => updateQuantity(product.id, cartItem.quantity + 1)} className="w-8 h-8 flex items-center justify-center hover:bg-brand-pink/5 rounded-r-md transition-colors">+</button>
                </div>
            )}
        </div>
      </div>
      <div className="pt-3 flex flex-col flex-grow">
        <h3 className="text-base font-medium text-brand-text/90 mt-2 flex-grow">
            {product.name}
            <span className="block text-sm text-gray-500">{product.tamilName}</span>
        </h3>
        <p className="text-sm text-gray-500 mt-1">{product.weight}</p>
      </div>
    </div>
  );
};

export default ProductCard;