'use client';
import { useState } from 'react';

export default function LiquidMorphButton({ children = 'TRANSFORM', onClick }) {
    const [morphing, setMorphing] = useState(false);

    const handleClick = (e) => {
        setMorphing(true);
        setTimeout(() => setMorphing(false), 1000);
        if (onClick) onClick(e);
    };

    return (
        <div className="relative inline-block">
            <button
                onClick={handleClick}
                className={`relative px-14 py-6 font-bold text-xl text-white overflow-hidden transition-all duration-500 focus:outline-none focus:ring-4 focus:ring-blue-500/50 ${morphing ? 'scale-95' : 'hover:scale-105'
                    }`}
                style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
                    borderRadius: morphing ? '50%' : '60px',
                    boxShadow: '0 10px 40px rgba(102, 126, 234, 0.4)',
                    transition: 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                }}
            >
                <span className="relative z-10">{children}</span>

                <div
                    className="absolute inset-0 opacity-50"
                    style={{
                        background: 'radial-gradient(circle at 30% 50%, rgba(255,255,255,0.3) 0%, transparent 60%)',
                        animation: 'liquid-move 3s ease-in-out infinite',
                    }}
                />

                <div
                    className="absolute inset-0 opacity-30"
                    style={{
                        background: 'radial-gradient(circle at 70% 50%, rgba(255,255,255,0.2) 0%, transparent 60%)',
                        animation: 'liquid-move 3s ease-in-out infinite reverse',
                    }}
                />

                {morphing && (
                    <>
                        {[...Array(8)].map((_, i) => (
                            <div
                                key={i}
                                className="absolute w-4 h-4 bg-white rounded-full opacity-70"
                                style={{
                                    top: '50%',
                                    left: '50%',
                                    animation: `droplet 1s ease-out forwards`,
                                    animationDelay: `${i * 0.1}s`,
                                    transform: `rotate(${i * 45}deg)`,
                                }}
                            />
                        ))}
                    </>
                )}
            </button>

            <style jsx>{`
        @keyframes liquid-move {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -20px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        @keyframes droplet {
          0% { transform: translate(-50%, -50%) translateY(0) scale(1); opacity: 0.7; }
          100% { transform: translate(-50%, -50%) translateY(-80px) scale(0); opacity: 0; }
        }
      `}</style>
        </div>
    );
}