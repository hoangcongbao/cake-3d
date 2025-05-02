import React, { useState } from 'react';
import { Html } from '@react-three/drei';
import { Vector3 } from 'three';

interface CakePopupProps {
  position: Vector3;
  onClose: () => void;
  onAccept: (price: number, quantity: number) => void;
}

const CakePopup: React.FC<CakePopupProps> = ({ position, onClose, onAccept }) => {
  const [price, setPrice] = useState<number>(19.99);
  const [quantity, setQuantity] = useState<number>(1);

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value >= 0) {
      setPrice(value);
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };

  const handleAccept = () => {
    if (typeof onAccept === 'function') {
      onAccept(price, quantity);
    }
  };

  // No useThree hook here - simplified approach
  return (
    <mesh position={[position.x, position.y + 1.5, position.z]}>
      <sphereGeometry args={[0.1, 8, 8]} />
      <meshBasicMaterial visible={false} />
      <Html 
        position={[0, 0, 0]}
        center
        distanceFactor={10}
      >
        <div 
          className="bg-white p-6 rounded-lg shadow-xl w-72"
          style={{ 
            backdropFilter: 'blur(10px)',
            backgroundColor: 'rgba(255, 255, 255, 0.9)'
          }}
        >
          <h3 className="text-lg font-bold text-center mb-4 text-purple-600">Customize Your Order</h3>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price ($)
            </label>
            <input
              type="number"
              value={price}
              onChange={handlePriceChange}
              step="0.01"
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Quantity
            </label>
            <input
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              min="1"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          
          <div className="flex space-x-3 mt-6">
            <button
              onClick={handleAccept}
              className="flex-1 py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              Accept
            </button>
            <button
              onClick={onClose}
              className="flex-1 py-2 px-4 border border-gray-300 hover:bg-gray-100 text-gray-700 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Cancel
            </button>
          </div>
        </div>
      </Html>
    </mesh>
  );
};

export default CakePopup;
