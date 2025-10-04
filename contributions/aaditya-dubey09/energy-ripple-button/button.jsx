'use client';

import { useState } from 'react';

export default function ExplosiveEnergyButton({ children = 'UNLEASH', onClick }) {
    const [exploding, setExploding] = useState(false);
    const [shockwave, setShockwave] = useState(false);

    const handleClick = (e) => {
        setExploding(true);
        setTimeout(() => setShockwave(true), 100);
        setTimeout(() => {
            setExploding(false);
            setShockwave(false);
        }, 600);
        if (onClick) onClick(e);
    };

    return (
        <div className="relative inline-block">
            {shockwave && (
                <div className="absolute inset-0 rounded-full border-4 border-yellow-400 animate-ping" style={{ animationDuration: '0.6s' }} />
            )}

            <button
                onClick={handleClick}
                className={`relative px-12 py-5 font-black text-xl tracking-wide text-gray-900 rounded-2xl overflow-hidden transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-yellow-500/50 ${exploding ? 'scale-110' : 'hover:scale-105'
                    }`}
                style={{
                    background: 'linear-gradient(135deg, #f9d423 0%, #ff4e50 100%)',
                    boxShadow: exploding
                        ? '0 0 50px rgba(255, 78, 80, 0.8), 0 0 100px rgba(249, 212, 35, 0.6)'
                        : '0 10px 30px rgba(255, 78, 80, 0.4)',
                }}
            >
                {exploding && (
                    <>
                        {[...Array(16)].map((_, i) => (
                            <div
                                key={i}
                                className="absolute w-1 h-8 bg-gradient-to-t from-yellow-300 to-red-500 rounded-full"
                                style={{
                                    top: '50%',
                                    left: '50%',
                                    transformOrigin: 'center',
                                    animation: `energy-burst 0.6s ease-out forwards`,
                                    transform: `rotate(${i * 22.5}deg)`,
                                }}
                            />
                        ))}
                    </>
                )}

                <span className="relative z-10 inline-flex items-center gap-3">
                    <span className="text-2xl" style={{ animation: 'spin 1s linear infinite' }}>⚡</span>
                    {children}
                    <span className="text-2xl" style={{ animation: 'spin 1s linear infinite reverse' }}>⚡</span>
                </span>

                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
                    style={{ animation: 'energy-flow 2s linear infinite' }}
                />
            </button>

            <style jsx>{`
        @keyframes energy-burst {
          0% { transform: translateY(0) scale(1); opacity: 1; }
          100% { transform: translateY(-120px) scale(0.3); opacity: 0; }
        }
        @keyframes energy-flow {
          0% { transform: translateX(-200%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
        </div>
    );
}