export function Logo({ className = "w-8 h-8" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Awanda Portfolio Logo</title>
      <defs>
        <linearGradient id="awandaLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#818cf8" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="45" fill="url(#awandaLogoGradient)" opacity="0.2" />
      <path d="M 50 20 L 75 45 L 50 40 Z" fill="#3b82f6" />
      <path d="M 50 40 L 75 45 L 65 70 L 50 65 Z" fill="#6366f1" />
      <path d="M 50 40 L 50 65 L 35 70 L 25 45 Z" fill="#8b5cf6" />
      <circle cx="50" cy="50" r="4" fill="white" />
    </svg>
  );
}
