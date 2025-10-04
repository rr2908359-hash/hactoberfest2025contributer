'use client';

import React, { useState } from 'react';

export default function InitiateLaunchButton({ children = 'INITIATE LAUNCH', onClick }) {
    const [isPressed, setIsPressed] = useState(false);
    const [ripples, setRipples] = useState([]);

    const handleClick = (e) => {
        setIsPressed(true);

        // Create ripple effect
        const button = e.currentTarget;
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const newRipple = { x, y, id: Date.now() };
        setRipples(prev => [...prev, newRipple]);

        setTimeout(() => {
            setRipples(prev => prev.filter(r => r.id !== newRipple.id));
        }, 600);

        if (window.navigator && window.navigator.vibrate) {
            window.navigator.vibrate(50);
        }

        setTimeout(() => setIsPressed(false), 200);
        if (onClick) onClick(e);
    };

    return (
        <div className="relative group inline-block">
            <div
                className="absolute -inset-1 rounded-xl blur-md opacity-75 group-hover:opacity-100 group-hover:blur-lg transition-all duration-500"
                style={{
                    background: 'linear-gradient(45deg, #00BCD4, #5C6BC0, #DDA0DD, #FF6B9D, #00BCD4)',
                    backgroundSize: '400% 400%',
                    animation: 'shimmer 3s ease infinite',
                }}
            />

            <div className="absolute -inset-0.5 rounded-xl opacity-0 group-hover:opacity-60 transition-opacity duration-300"
                style={{
                    background: 'radial-gradient(circle at center, #00BCD4 0%, transparent 70%)',
                    animation: 'pulse 2s ease-in-out infinite',
                }}
            />

            <button
                onClick={handleClick}
                className={`relative px-10 py-4 font-extrabold tracking-widest uppercase text-lg rounded-xl transition-all duration-200 shadow-2xl border-2 focus:outline-none focus:ring-4 focus:ring-cyan-500/50 overflow-hidden ${isPressed
                    ? 'bg-gray-950 border-indigo-400 transform scale-95 shadow-inner'
                    : 'bg-gray-900 text-white border-transparent hover:text-cyan-300 hover:shadow-cyan-500/30 hover:scale-105'
                    }`}
            >
                {ripples.map(ripple => (
                    <span
                        key={ripple.id}
                        className="absolute rounded-full bg-white opacity-50"
                        style={{
                            left: ripple.x,
                            top: ripple.y,
                            width: 0,
                            height: 0,
                            transform: 'translate(-50%, -50%)',
                            animation: 'ripple 0.6s ease-out',
                        }}
                    />
                ))}

                <span className="relative z-10 inline-flex items-center gap-2">
                    {children}
                    <span className="inline-block group-hover:translate-x-1 transition-transform duration-300">→</span>
                </span>

                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </button>

            <style jsx>{`
        @keyframes shimmer {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        @keyframes ripple {
          to {
            width: 300px;
            height: 300px;
            opacity: 0;
          }
        }
      `}</style>
        </div>
    );
}