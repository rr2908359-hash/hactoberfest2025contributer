'use client';

import React, { useState } from 'react';

export default function QuantumFluxButton({ children = 'QUANTUM LEAP', onClick }) {
    const [particles, setParticles] = useState([]);
    const [isHovered, setIsHovered] = useState(false);

    const handleClick = (e) => {
        const newParticles = Array.from({ length: 12 }, (_, i) => ({
            id: Date.now() + i,
            angle: (360 / 12) * i,
        }));

        setParticles(newParticles);
        setTimeout(() => setParticles([]), 800);

        if (onClick) onClick(e);
    };

    return (
        <div className="relative inline-block">
            <button
                onClick={handleClick}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="relative px-12 py-5 font-bold text-lg rounded-2xl overflow-hidden bg-gradient-to-br from-purple-600 via-pink-500 to-orange-500 text-white shadow-2xl transform transition-all duration-300 hover:scale-110 hover:shadow-pink-500/50 focus:outline-none focus:ring-4 focus:ring-pink-500/50"
                style={{
                    animation: isHovered ? 'morph 0.6s ease-in-out infinite alternate' : 'none',
                }}
            >
                {particles.map(particle => (
                    <div
                        key={particle.id}
                        className="absolute w-2 h-2 bg-white rounded-full"
                        style={{
                            left: '50%',
                            top: '50%',
                            animation: `particle-burst 0.8s ease-out forwards`,
                            transform: `rotate(${particle.angle}deg)`,
                        }}
                    />
                ))}

                <span className="relative z-10 inline-flex items-center gap-3">
                    <span className="w-2 h-2 bg-white rounded-full animate-ping" />
                    {children}
                    <span className="w-2 h-2 bg-white rounded-full animate-ping" style={{ animationDelay: '0.3s' }} />
                </span>

                <div className="absolute inset-0 opacity-30"
                    style={{
                        background: 'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)',
                        animation: 'scan 1.5s linear infinite',
                    }}
                />
            </button>

            <style jsx>{`
        @keyframes particle-burst {
          0% { transform: translateY(0) scale(1); opacity: 1; }
          100% { transform: translateY(-100px) scale(0); opacity: 0; }
        }
        @keyframes morph {
          0% { border-radius: 32px; }
          50% { border-radius: 12px; }
          100% { border-radius: 32px; }
        }
        @keyframes scan {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
        </div>
    );
}
