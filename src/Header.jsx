function ChefClaudeLogo({ className = "" }) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Chef Hat - Main Feature */}
      <g>
        {/* Hat top (puffy) */}
        <path
          d="M100 45 C85 45, 72 52, 65 62 C60 52, 48 45, 35 48 C20 52, 10 65, 12 80 C12 80, 15 95, 25 100 L175 100 C185 95, 188 80, 188 80 C190 65, 180 52, 165 48 C152 45, 140 52, 135 62 C128 52, 115 45, 100 45Z"
          fill="white"
          stroke="#FF6B35"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        
        {/* Hat band */}
        <rect
          x="25"
          y="95"
          width="150"
          height="30"
          rx="8"
          fill="white"
          stroke="#FF6B35"
          strokeWidth="3"
        />
        
        {/* Hat pleats - decorative lines */}
        <line x1="70" y1="60" x2="65" y2="95" stroke="#FFB399" strokeWidth="2" opacity="0.6" />
        <line x1="100" y1="50" x2="100" y2="95" stroke="#FFB399" strokeWidth="2" opacity="0.6" />
        <line x1="130" y1="60" x2="135" y2="95" stroke="#FFB399" strokeWidth="2" opacity="0.6" />
      </g>

      {/* AI Brain Element inside hat */}
      <g opacity="0.9">
        <circle cx="100" cy="75" r="18" fill="#FF6B35" opacity="0.15" />
        {/* Neural network dots */}
        <circle cx="95" cy="70" r="2.5" fill="#FF6B35" />
        <circle cx="105" cy="70" r="2.5" fill="#FF6B35" />
        <circle cx="90" cy="80" r="2.5" fill="#FF6B35" />
        <circle cx="100" cy="80" r="2.5" fill="#FF6B35" />
        <circle cx="110" cy="80" r="2.5" fill="#FF6B35" />
        
        {/* Neural connections */}
        <line x1="95" y1="70" x2="90" y2="80" stroke="#FF6B35" strokeWidth="1" opacity="0.4" />
        <line x1="95" y1="70" x2="100" y2="80" stroke="#FF6B35" strokeWidth="1" opacity="0.4" />
        <line x1="105" y1="70" x2="100" y2="80" stroke="#FF6B35" strokeWidth="1" opacity="0.4" />
        <line x1="105" y1="70" x2="110" y2="80" stroke="#FF6B35" strokeWidth="1" opacity="0.4" />
      </g>

      {/* Spoon and Fork crossed */}
      <g transform="translate(100, 140)">
        {/* Spoon */}
        <g transform="rotate(-25)">
          <ellipse cx="0" cy="-25" rx="6" ry="8" fill="#FF6B35" />
          <rect x="-1.5" y="-17" width="3" height="35" rx="1.5" fill="#FF6B35" />
        </g>
        
        {/* Fork */}
        <g transform="rotate(25)">
          <rect x="-1.5" y="-25" width="3" height="35" rx="1.5" fill="#4ECDC4" />
          <rect x="-6" y="-25" width="2" height="10" rx="1" fill="#4ECDC4" />
          <rect x="-2" y="-25" width="2" height="10" rx="1" fill="#4ECDC4" />
          <rect x="2" y="-25" width="2" height="10" rx="1" fill="#4ECDC4" />
        </g>
      </g>

      {/* Sparkle effects */}
      <g opacity="0.8">
        <path d="M40 110 L42 112 L40 114 L38 112 Z" fill="#FFD700" />
        <path d="M160 110 L162 112 L160 114 L158 112 Z" fill="#FFD700" />
        <path d="M50 65 L51.5 66.5 L50 68 L48.5 66.5 Z" fill="#FFD700" />
        <path d="M150 65 L151.5 66.5 L150 68 L148.5 66.5 Z" fill="#FFD700" />
      </g>
    </svg>
  );
}

export default function Header() {
  return (
    <header>
      <div className="header-content">
        <div className="header-title">
          <ChefClaudeLogo className="chef-icon" />
          <h1>Chef Claude</h1>
        </div>
        <p className="header-subtitle">AI-Powered Recipe Generator</p>
      </div>
    </header>
  );
}
