import React from 'react';

interface BrazilianFlagProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const BrazilianFlag: React.FC<BrazilianFlagProps> = ({ className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-6 h-4',
    md: 'w-8 h-6',
    lg: 'w-10 h-8'
  };

  return (
    <div className={`${sizeClasses[size]} ${className} relative overflow-hidden rounded-sm border border-slate-600`}>
      {/* Green background */}
      <div className="absolute inset-0 bg-green-600"></div>
      
      {/* Yellow diamond */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-3/4 h-3/4 bg-yellow-500 transform rotate-45"></div>
      </div>
      
      {/* Blue circle */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-1/3 h-1/3 bg-blue-600 rounded-full"></div>
      </div>
      
      {/* Stars (simplified) */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-white text-xs font-bold">★</div>
      </div>
    </div>
  );
};

export default BrazilianFlag;
