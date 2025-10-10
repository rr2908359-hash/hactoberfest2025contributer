'use client';

import React, { useState } from 'react';

export default function NeonCyberpunkButton({ children = 'HACK SYSTEM', onClick }) {
    const [glitching, setGlitching] = useState(false);

    const handleClick = (e) => {
        setGlitching(true);
        setTimeout(() => setGlitching(false), 400);
        if (onClick) onClick(e);
    };

    return (
        <div className="relative inline-block">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-lg blur opacity-75 group-hover:opacity-100 animate-pulse" />

            <button
                onClick={handleClick}
                className="relative px-10 py-4 bg-black text-cyan-400 font-mono font-bold text-xl tracking-wider rounded-lg border-2 border-cyan-400 overflow-hidden transition-all duration-300 hover:bg-cyan-400 hover:text-black hover:border-pink-500 focus:outline-none focus:ring-4 focus:ring-cyan-500/50 group"
                style={{
                    textShadow: glitching ? '2px 2px #ff00de, -2px -2px #00ffff' : '0 0 10px currentColor',
                    animation: glitching ? 'glitch 0.3s infinite' : 'none',
                }}
            >
                <span className="relative z-10 inline-flex items-center gap-2">
                    <span className="text-2xl">{'>'}</span>
                    {children}
                    <span className="inline-block opacity-0 group-hover:opacity-100 transition-opacity animate-pulse">_</span>
                </span>

                <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                {[...Array(3)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute h-px bg-cyan-400 opacity-50"
                        style={{
                            width: '100%',
                            top: `${(i + 1) * 25}%`,
                            left: 0,
                            animation: `scan-line 2s linear infinite`,
                            animationDelay: `${i * 0.3}s`,
                        }}
                    />
                ))}
            </button>

            <style jsx>{`
        @keyframes glitch {
          0% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
          100% { transform: translate(0); }
        }
        @keyframes scan-line {
          0% { transform: translateY(-100px); opacity: 0; }
          50% { opacity: 0.5; }
          100% { transform: translateY(100px); opacity: 0; }
        }
      `}</style>
        </div>
    );
}
