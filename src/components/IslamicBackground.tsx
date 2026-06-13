import React, { useMemo } from 'react';

export const IslamicBackground: React.FC = () => {
  // Generate random particles that float upwards in the background
  const particles = useMemo(() => {
    return Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      size: Math.random() * 6 + 3,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 15}s`,
      dur: `${Math.random() * 10 + 15}s`,
      opacity: Math.random() * 0.4 + 0.2,
    }));
  }, []);

  return (
    <div className="fixed inset-0 -z-10 w-full h-full overflow-hidden select-none pointer-events-none">
      {/* 
        1. Beautiful pastel fluid marble gradient backdrop.
        Slow shifting of soft mint green, cream white, pale rose, and warm gold.
      */}
      <div 
        className="absolute inset-0 bg-[#fdfaf5]"
        style={{
          background: 'radial-gradient(circle at center, #ffffff 0%, #f7e8d0 100%)',
        }}
      />

      {/* 
        2. Soft glowing atmospheric blur spheres from the theme
      */}
      <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-orange-100/40 blur-[100px] animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-amber-100/30 blur-[120px] animate-pulse" style={{ animationDuration: '12s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] max-w-[800px] aspect-square border border-amber-200/20 rounded-full" />

      {/* 
        3. Floating golden stardust particles 
      */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-gradient-to-b from-[#D4AF37] to-[#E6C687] shadow-[0_0_8px_rgba(212,175,55,0.4)] animate-float"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            left: p.left,
            animationDelay: p.delay,
            animationDuration: p.dur,
            opacity: p.opacity,
          }}
        />
      ))}

      {/* 
        4. Ornate 4-Corner Islamic Pattern
        Faithfully replicates the elegant dome-like scalloped Islamic arches, geometric star panels
        and gold curves in all 4 corners (Top-Left, Top-Right, Bottom-Left, Bottom-Right) as shown in the uploaded image.
      */}
      
      {/* Top Left Corner Pattern */}
      <div className="absolute top-0 left-0 w-[240px] h-[240px] md:w-[350px] md:h-[350px] pointer-events-none opacity-90 origin-top-left transform scale-90 sm:scale-100">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          {/* Pastel backgrounds */}
          <polygon points="0,0 120,0 100,20 60,30 25,65 0,110" fill="#E8F6F2" opacity="0.85" />
          <polygon points="0,0 70,0 55,20 20,55 0,70" fill="#FDF1F3" opacity="0.85" />
          
          {/* Thicker main gold outline */}
          <path 
            d="M 120,0 L 100,20 C 85,25 75,45 61,59 C 45,75 25,85 20,100 L 0,120" 
            fill="none" 
            stroke="#C5A059" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
          />
          <path 
            d="M 115,0 L 96,16 C 82,21 72,40 57,55 C 40,72 21,82 16,96 L 0,115" 
            fill="none" 
            stroke="#DDBA76" 
            strokeWidth="1" 
            strokeDasharray="3,3"
          />

          {/* Star Node left (X=30, Y=30) */}
          <g transform="translate(32, 32) scale(0.6)" stroke="#C5A059" strokeWidth="2" fill="#FCECEF">
            <rect x="-20" y="-20" width="40" height="40" transform="rotate(15)" rx="3" />
            <rect x="-20" y="-20" width="40" height="40" transform="rotate(60)" rx="3" />
            <circle r="6" fill="#E8F4EC" stroke="#C5A059" strokeWidth="1" />
          </g>

          {/* Outer Star Node (X=85, Y=15) */}
          <g transform="translate(85, 15) scale(0.4)" stroke="#C5A059" strokeWidth="2" fill="#FAF6EE">
            <rect x="-20" y="-20" width="40" height="40" transform="rotate(0)" rx="2" />
            <rect x="-20" y="-20" width="40" height="40" transform="rotate(45)" rx="2" />
          </g>

          {/* Outer Star Node (X=15, Y=85) */}
          <g transform="translate(15, 85) scale(0.4)" stroke="#C5A059" strokeWidth="2" fill="#E8F6F2">
            <rect x="-20" y="-20" width="40" height="40" transform="rotate(0)" rx="2" />
            <rect x="-20" y="-20" width="40" height="40" transform="rotate(45)" rx="2" />
          </g>

          {/* Arabesque filigree curves */}
          <path d="M 60,10 Q 40,30 20,15" fill="none" stroke="#C5A059" strokeWidth="0.8" opacity="0.7" />
          <path d="M 10,60 Q 30,40 15,20" fill="none" stroke="#C5A059" strokeWidth="0.8" opacity="0.7" />
          <path d="M 90,5 Q 70,35 45,45" fill="none" stroke="#C5A059" strokeWidth="0.8" opacity="0.7" />
          <path d="M 5,90 Q 35,70 45,45" fill="none" stroke="#C5A059" strokeWidth="0.8" opacity="0.7" />
        </svg>
      </div>

      {/* Top Right Corner Pattern (horizontally flipped Top-Left) */}
      <div className="absolute top-0 right-0 w-[240px] h-[240px] md:w-[350px] md:h-[350px] pointer-events-none opacity-90 origin-top-right transform scale-90 sm:scale-100">
        <svg viewBox="0 0 200 200" className="w-full h-full transform scale-x-[-1]">
          {/* Pastel backgrounds */}
          <polygon points="0,0 120,0 100,20 60,30 25,65 0,110" fill="#FCF4E8" opacity="0.85" />
          <polygon points="0,0 70,0 55,20 20,55 0,70" fill="#FDF1F3" opacity="0.85" />
          
          {/* Thicker main gold outline */}
          <path 
            d="M 120,0 L 100,20 C 85,25 75,45 61,59 C 45,75 25,85 20,100 L 0,120" 
            fill="none" 
            stroke="#C5A059" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
          />
          <path 
            d="M 115,0 L 96,16 C 82,21 72,40 57,55 C 40,72 21,82 16,96 L 0,115" 
            fill="none" 
            stroke="#DDBA76" 
            strokeWidth="1" 
            strokeDasharray="3,3"
          />

          {/* Star Node (X=32, Y=32) */}
          <g transform="translate(32, 32) scale(0.6)" stroke="#C5A059" strokeWidth="2" fill="#E8F6F1">
            <rect x="-20" y="-20" width="40" height="40" transform="rotate(15)" rx="3" />
            <rect x="-20" y="-20" width="40" height="40" transform="rotate(60)" rx="3" />
            <circle r="6" fill="#FFFCE8" stroke="#C5A059" strokeWidth="1" />
          </g>

          {/* Outer Star Nodes */}
          <g transform="translate(85, 15) scale(0.4)" stroke="#C5A059" strokeWidth="2" fill="#FFFCE8">
            <rect x="-20" y="-20" width="40" height="40" transform="rotate(0)" rx="2" />
            <rect x="-20" y="-20" width="40" height="40" transform="rotate(45)" rx="2" />
          </g>
          <g transform="translate(15, 85) scale(0.4)" stroke="#C5A059" strokeWidth="2" fill="#FDF1F3">
            <rect x="-20" y="-20" width="40" height="40" transform="rotate(0)" rx="2" />
            <rect x="-20" y="-20" width="40" height="40" transform="rotate(45)" rx="2" />
          </g>

          {/* Arabesque filigree curves */}
          <path d="M 60,10 Q 40,30 20,15" fill="none" stroke="#C5A059" strokeWidth="0.8" opacity="0.7" />
          <path d="M 10,60 Q 30,40 15,20" fill="none" stroke="#C5A059" strokeWidth="0.8" opacity="0.7" />
          <path d="M 90,5 Q 70,35 45,45" fill="none" stroke="#C5A059" strokeWidth="0.8" opacity="0.7" />
        </svg>
      </div>

      {/* Bottom Left Corner Pattern (vertically flipped Top-Left) */}
      <div className="absolute bottom-0 left-0 w-[240px] h-[240px] md:w-[350px] md:h-[350px] pointer-events-none opacity-90 origin-bottom-left transform scale-90 sm:scale-100">
        <svg viewBox="0 0 200 200" className="w-full h-full transform scale-y-[-1]">
          {/* Pastel backgrounds */}
          <polygon points="0,0 120,0 100,20 60,30 25,65 0,110" fill="#FCF4E8" opacity="0.85" />
          <polygon points="0,0 70,0 55,20 20,55 0,70" fill="#E8F6F2" opacity="0.85" />
          
          {/* Thicker main gold outline */}
          <path 
            d="M 120,0 L 100,20 C 85,25 75,45 61,59 C 45,75 25,85 20,100 L 0,120" 
            fill="none" 
            stroke="#C5A059" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
          />
          <path 
            d="M 115,0 L 96,16 C 82,21 72,40 57,55 C 40,72 21,82 16,96 L 0,115" 
            fill="none" 
            stroke="#DDBA76" 
            strokeWidth="1" 
            strokeDasharray="3,3"
          />

          {/* Star Node (X=32, Y=32) */}
          <g transform="translate(32, 32) scale(0.6)" stroke="#C5A059" strokeWidth="2" fill="#FDF1F3">
            <rect x="-20" y="-20" width="40" height="40" transform="rotate(15)" rx="3" />
            <rect x="-20" y="-20" width="40" height="40" transform="rotate(60)" rx="3" />
            <circle r="6" fill="#E8F4EC" stroke="#C5A059" strokeWidth="1" />
          </g>

          {/* Outer Star Nodes */}
          <g transform="translate(85, 15) scale(0.4)" stroke="#C5A059" strokeWidth="2" fill="#FAF6EE">
            <rect x="-20" y="-20" width="40" height="40" transform="rotate(0)" rx="2" />
            <rect x="-20" y="-20" width="40" height="40" transform="rotate(45)" rx="2" />
          </g>
          <g transform="translate(15, 85) scale(0.4)" stroke="#C5A059" strokeWidth="2" fill="#E8F6F2">
            <rect x="-20" y="-20" width="40" height="40" transform="rotate(0)" rx="2" />
            <rect x="-20" y="-20" width="40" height="40" transform="rotate(45)" rx="2" />
          </g>

          {/* Arabesque filigree curves */}
          <path d="M 60,10 Q 40,30 20,15" fill="none" stroke="#C5A059" strokeWidth="0.8" opacity="0.7" />
          <path d="M 10,60 Q 30,40 15,20" fill="none" stroke="#C5A059" strokeWidth="0.8" opacity="0.7" />
        </svg>
      </div>

      {/* Bottom Right Corner Pattern (horizontally and vertically flipped Top-Left) */}
      <div className="absolute bottom-0 right-0 w-[240px] h-[240px] md:w-[350px] md:h-[350px] pointer-events-none opacity-90 origin-bottom-right transform scale-90 sm:scale-100">
        <svg viewBox="0 0 200 200" className="w-full h-full transform scale-x-[-1] scale-y-[-1]">
          {/* Pastel backgrounds */}
          <polygon points="0,0 120,0 100,20 60,30 25,65 0,110" fill="#E8F6F2" opacity="0.85" />
          <polygon points="0,0 70,0 55,20 20,55 0,70" fill="#FDF1F3" opacity="0.85" />
          
          {/* Thicker main gold outline */}
          <path 
            d="M 120,0 L 100,20 C 85,25 75,45 61,59 C 45,75 25,85 20,100 L 0,120" 
            fill="none" 
            stroke="#C5A059" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
          />
          <path 
            d="M 115,0 L 96,16 C 82,21 72,40 57,55 C 40,72 21,82 16,96 L 0,115" 
            fill="none" 
            stroke="#DDBA76" 
            strokeWidth="1" 
            strokeDasharray="3,3"
          />

          {/* Star Node (X=32, Y=32) */}
          <g transform="translate(32, 32) scale(0.6)" stroke="#C5A059" strokeWidth="2" fill="#FCF4E8">
            <rect x="-20" y="-20" width="40" height="40" transform="rotate(15)" rx="3" />
            <rect x="-20" y="-20" width="40" height="40" transform="rotate(60)" rx="3" />
            <circle r="6" fill="#FDF1F3" stroke="#C5A059" strokeWidth="1" />
          </g>

          {/* Outer Star Nodes */}
          <g transform="translate(85, 15) scale(0.4)" stroke="#C5A059" strokeWidth="2" fill="#E8F6F2">
            <rect x="-20" y="-20" width="40" height="40" transform="rotate(0)" rx="2" />
            <rect x="-20" y="-20" width="40" height="40" transform="rotate(45)" rx="2" />
          </g>
          <g transform="translate(15, 85) scale(0.4)" stroke="#C5A059" strokeWidth="2" fill="#FAF6EE">
            <rect x="-20" y="-20" width="40" height="40" transform="rotate(0)" rx="2" />
            <rect x="-20" y="-20" width="40" height="40" transform="rotate(45)" rx="2" />
          </g>

          {/* Arabesque filigree curves */}
          <path d="M 60,10 Q 40,30 20,15" fill="none" stroke="#C5A059" strokeWidth="0.8" opacity="0.7" />
        </svg>
      </div>

      {/* 
        5. Side Hanging Ornaments (Hanging chains from the top corners)
        Classic thin gold chains with stylized diamonds and star medallions that frame the page.
      */}
      {/* Left side panel */}
      <div className="absolute top-[12vw] md:top-[130px] left-3 md:left-6 w-10 md:w-16 pointer-events-none opacity-80">
        <svg viewBox="0 0 40 400" className="w-full h-auto">
          {/* Chain line */}
          <line x1="20" y1="0" x2="20" y2="350" stroke="#C5A059" strokeWidth="1" strokeDasharray="3,3" />

          {/* Medallion 1 */}
          <g transform="translate(20, 60) scale(0.8)">
            <polygon points="0,-15 15,0 0,15 -15,0" fill="#FFFCE8" stroke="#C5A059" strokeWidth="1.5" />
            <polygon points="0,-8 8,0 0,8 -8,0" fill="#E8F6F1" stroke="#C5A059" strokeWidth="0.8" />
          </g>

          {/* Arabesque Flourish */}
          <path 
            d="M 10,120 Q 20,130 30,120 Q 20,150 20,180" 
            fill="none" 
            stroke="#C5A059" 
            strokeWidth="1" 
          />

          {/* Medallion 2 - Hanging star */}
          <g transform="translate(20, 180) scale(0.6)">
            <rect x="-12" y="-12" width="24" height="24" transform="rotate(15)" fill="#FDF1F3" stroke="#C5A059" strokeWidth="1.5" />
            <rect x="-12" y="-12" width="24" height="24" transform="rotate(60)" fill="#FDF1F3" stroke="#C5A059" strokeWidth="1.5" />
          </g>

          {/* Bottom Drop pendant */}
          <path d="M 20,220 L 20,290" stroke="#C5A059" strokeWidth="1.2" />
          <polygon points="20,290 14,275 26,275" fill="#C5A059" />
          <circle cx="20" cy="300" r="2.5" fill="#C5A059" />
        </svg>
      </div>

      {/* Right side panel */}
      <div className="absolute top-[12vw] md:top-[130px] right-3 md:right-6 w-10 md:w-16 pointer-events-none opacity-80">
        <svg viewBox="0 0 40 400" className="w-full h-auto">
          {/* Chain line */}
          <line x1="20" y1="0" x2="20" y2="350" stroke="#C5A059" strokeWidth="1" strokeDasharray="3,3" />

          {/* Medallion 1 */}
          <g transform="translate(20, 60) scale(0.8)">
            <polygon points="0,-15 15,0 0,15 -15,0" fill="#FDF1F3" stroke="#C5A059" strokeWidth="1.5" />
            <polygon points="0,-8 8,0 0,8 -8,0" fill="#FFFCE8" stroke="#C5A059" strokeWidth="0.8" />
          </g>

          {/* Arabesque Flourish */}
          <path 
            d="M 30,120 Q 20,130 10,120 Q 20,150 20,180" 
            fill="none" 
            stroke="#C5A059" 
            strokeWidth="1" 
          />

          {/* Medallion 2 - Hanging star */}
          <g transform="translate(20, 180) scale(0.6)">
            <rect x="-12" y="-12" width="24" height="24" transform="rotate(15)" fill="#E8F6F1" stroke="#C5A059" strokeWidth="1.5" />
            <rect x="-12" y="-12" width="24" height="24" transform="rotate(60)" fill="#E8F6F1" stroke="#C5A059" strokeWidth="1.5" />
          </g>

          {/* Bottom Drop pendant */}
          <path d="M 20,220 L 20,290" stroke="#C5A059" strokeWidth="1.2" />
          <polygon points="20,290 14,275 26,275" fill="#C5A059" />
          <circle cx="20" cy="300" r="2.5" fill="#C5A059" />
        </svg>
      </div>

      {/* Decorative Warm Vignette shadow around the borders for a high-end editorial feel */}
      <div className="absolute inset-0 ring-1 ring-inset ring-[#C5A059]/10 pointer-events-none" />

      {/* Vintage Noise Texture overlay */}
      <div 
        className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-20" 
        style={{
          backgroundImage: `url('data:image/svg+xml,%3Csvg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noiseFilter"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noiseFilter)"/%3E%3C/svg%3E')`
        }} 
      />
    </div>
  );
};
