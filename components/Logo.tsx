import React from 'react';

export const Logo = ({ className = "w-6 h-6" }: { className?: string }) => {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="currentColor" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Top Blade */}
      <path d="M55 5 C65 5 70 15 65 40 L55 45 L45 40 L50 10 C50 5 55 5 55 5Z" />
      
      {/* Right Blade */}
      <path d="M95 45 C95 35 85 30 60 35 L55 45 L60 55 L90 50 C95 50 95 45 95 45Z" />
      
      {/* Bottom Blade */}
      <path d="M45 95 C35 95 30 85 35 60 L45 55 L55 60 L50 90 C50 95 45 95 45 95Z" />
      
      {/* Left Blade */}
      <path d="M5 55 C5 65 15 70 40 65 L45 55 L40 45 L10 50 C5 50 5 55 5 55Z" />
      
      {/* Center accents (abstracting the smaller shapes) */}
      <path d="M65 20 L75 15 L80 35 L70 40 Z" />
      <path d="M80 65 L85 75 L65 80 L60 70 Z" />
      <path d="M35 80 L25 85 L20 65 L30 60 Z" />
      <path d="M20 35 L15 25 L35 20 L40 30 Z" />
    </svg>
  );
};
