// 'use client';

// import { motion } from 'framer-motion';

// export default function GlassmorphismButton() {
//   return (
//     <motion.button
//       whileHover={{
//         scale: 1.06,
//         background: 'rgba(95, 155, 246, 0.35)',
//         boxShadow: '0 17px 40px rgba(95, 155, 246, 0.45)',
//       }}
//       whileTap={{
//         scale: 0.97,
//         boxShadow: '0 px 20px rgba(95, 155, 246, 0.25)',
//       }}
//       transition={{
//         type: 'spring',
//         stiffness: 260,
//         damping: 18,
//       }}
//       className="glass-btn"
//     >
//       ✨ Glassmorphism
//       <style jsx>{`
//         .glass-btn {
//           position: relative;
//           padding: 16px 40px;
//           font-size: 1.15rem;
//           font-weight: 600;
//           letter-spacing: 0.5px;
//           color: #ffffff;
//           background: rgba(95, 155, 246, 0.25);
//           border: 1.5px solid rgba(255, 255, 255, 0.3);
//           border-radius: 18px;
//           backdrop-filter: blur(12px);
//           box-shadow: 0 8px 30px rgba(31, 38, 135, 0.25);
//           cursor: pointer;
//           outline: none;
//           overflow: hidden;
//           transition: all 0.3s ease;
//           text-shadow: 0 0 8px rgba(255, 255, 255, 0.25);
//         }

//         /* animated shimmer effect */
//         .glass-btn::before {
//           content: '';
//           position: absolute;
//           top: 0;
//           left: -75%;
//           width: 50%;
//           height: 100%;
//           background: linear-gradient(
//             120deg,
//             rgba(255, 255, 255, 0.1) 0%,
//             rgba(255, 255, 255, 0.5) 50%,
//             rgba(255, 255, 255, 0.1) 100%
//           );
//           transform: skewX(-20deg);
//           transition: all 0.7s;
//         }

//         .glass-btn:hover::before {
//           left: 125%;
//           transition: all 0.8s;
//         }

//         .glass-btn:focus {
//           box-shadow: 0 0 0 3px rgba(95, 155, 246, 0.4);
//         }
//       `}</style>
//     </motion.button>
//   );
// }
// 'use client';

// export default function GlassmorphismButton() {
//   return (
//     <button className="glass-btn">
//       ✨ Glass Button
//       <style jsx>{`
//         .glass-btn {
//           position: relative;
//           padding: 16px 40px;
//           font-size: 1.2rem;
//           font-weight: 600;
//           color: #ffffff;
//           background: rgba(255, 255, 255, 0.1);
//           border: 1.5px solid rgba(255, 255, 255, 0.3);
//           border-radius: 20px;
//           backdrop-filter: blur(12px);
//           box-shadow: 0 8px 32px rgba(31, 38, 135, 0.25);
//           cursor: pointer;
//           overflow: hidden;
//           transition: all 0.3s ease;
//           text-shadow: 0 0 6px rgba(255,255,255,0.25);
//         }

//         .glass-btn::before {
//           content: '';
//           position: absolute;
//           top: -50%;
//           left: -50%;
//           width: 200%;
//           height: 200%;
//           background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2), transparent 70%);
//           transform: rotate(0deg);
//           transition: all 0.5s ease;
//         }

//         .glass-btn:hover::before {
//           transform: rotate(45deg);
//         }

//         .glass-btn:hover {
//           background: rgba(255, 255, 255, 0.15);
//           box-shadow: 0 12px 40px rgba(31, 38, 135, 0.35);
//         }

//         .glass-btn:active {
//           transform: scale(0.97);
//           box-shadow: 0 6px 20px rgba(31, 38, 135, 0.25);
//         }
//       `}</style>
//     </button>
//   );
// }
'use client';

export default function PureGlassButton() {
  return (
    <button className="pure-glass-btn">
      Glassmorphism
      <style jsx>{`
        .pure-glass-btn {
          position: relative;
          padding: 16px 50px;
          font-size: 1.2rem;
          font-weight: 600;
          color: #333;
          background: rgba(255, 255, 255, 0.3);
          backdrop-filter: blur(12px);
          border: 1.5px solid rgba(255, 255, 255, 0.5);
          border-radius: 25px;
          cursor: pointer;
          overflow: hidden;
          box-shadow: 0 6px 20px rgba(71, 222, 194, 0.4),
                      0 6px 20px rgba(47, 109, 175, 0.2);
          transition: all 0.3s ease;
        }

        .pure-glass-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -75%;
          width: 50%;
          height: 100%;
          background: linear-gradient(
            120deg,
            rgba(255,255,255,0.6),
            rgba(255,255,255,0.1),
            rgba(255,255,255,0.6)
          );
          transform: skewX(-20deg);
          transition: all 0.3s ease;
          pointer-events: none;
        }

        .pure-glass-btn:hover::before {
          left: 125%;
          transition: all 0.6s ease-in-out;
        }

        .pure-glass-btn:hover {
          background: rgba(255, 255, 255, 0.4);
          box-shadow: 0 8px 25px rgba(255, 255, 255, 0.5),
                      0 8px 25px rgba(200, 200, 200, 0.3);
        }

        .pure-glass-btn:active {
          transform: scale(0.97);
          box-shadow: 0 4px 15px rgba(255, 255, 255, 0.4),
                      0 4px 15px rgba(200, 200, 200, 0.2);
        }
      `}</style>
    </button>
  );
}
