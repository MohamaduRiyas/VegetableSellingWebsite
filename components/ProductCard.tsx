
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
    <div className="bg-white rounded-lg border border-gray-200/80 group transition-all duration-300 flex flex-col h-full hover:shadow-lg hover:-translate-y-1">
      {/* Image container */}
      <div className="overflow-hidden rounded-t-lg bg-gray-100 p-4">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-32 sm:h-40 object-contain transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content container */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Text details */}
        <div>
          <h3 className="text-base font-semibold text-brand-dark leading-tight">
            {product.name}
          </h3>
          <p className="text-sm text-gray-500">{product.tamilName}</p>
          <p className="text-sm text-gray-500 mt-1">{product.weight}</p>
        </div>

        {/* Price and Action container - pushed to bottom */}
        <div className="flex justify-between items-center mt-auto pt-4">
          <p className="text-lg font-bold text-brand-dark">
            ₹{product.price}
          </p>
          
          <div>
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
      </div>
    </div>
  );
};

export default ProductCard;
