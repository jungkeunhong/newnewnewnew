import React from 'react';
import { motion } from 'framer-motion';

const Marker = ({ text, onClick, selected }) => (
  <motion.div
    onClick={onClick}
    className="relative"
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    whileHover={{ scale: 1.1 }}
  >
    <div className={`
      w-10 h-10 rounded-full 
      ${selected ? 'bg-luxe-500' : 'bg-luxe-400'} 
      flex items-center justify-center 
      cursor-pointer 
      shadow-lg
      border-2 border-white
    `}>
      <div className="w-4 h-4 rounded-full bg-white" />
    </div>
    {text && (
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
        <div className="bg-white px-2 py-1 rounded-lg shadow-md text-sm text-luxe-900">
          {text}
        </div>
      </div>
    )}
  </motion.div>
);

export default Marker; 