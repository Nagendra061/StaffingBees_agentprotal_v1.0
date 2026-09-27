import React from 'react';

interface HoneyBeeIconProps {
  className?: string;
  size?: number;
}

export const HoneyBeeIcon: React.FC<HoneyBeeIconProps> = ({
  className = 'w-6 h-6',
  size = 24,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Left Wing */}
      <ellipse
        cx="16"
        cy="15"
        rx="8"
        ry="13"
        transform="rotate(-28 16 15)"
        fill="#93C5FD"
        fillOpacity="0.85"
        stroke="#1E293B"
        strokeWidth="1.5"
      />
      <path
        d="M14 10C16 14 17 18 16 22"
        stroke="#60A5FA"
        strokeWidth="1.2"
        strokeLinecap="round"
      />

      {/* Right Wing */}
      <ellipse
        cx="32"
        cy="15"
        rx="8"
        ry="13"
        transform="rotate(28 32 15)"
        fill="#93C5FD"
        fillOpacity="0.85"
        stroke="#1E293B"
        strokeWidth="1.5"
      />
      <path
        d="M34 10C32 14 31 18 32 22"
        stroke="#60A5FA"
        strokeWidth="1.2"
        strokeLinecap="round"
      />

      {/* Antennae */}
      <path
        d="M20 15C18 10 15 8 13 9"
        stroke="#1E293B"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="12" cy="9" r="2.2" fill="#1E293B" />

      <path
        d="M28 15C30 10 33 8 35 9"
        stroke="#1E293B"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="36" cy="9" r="2.2" fill="#1E293B" />

      {/* Bee Body */}
      <ellipse
        cx="24"
        cy="28"
        rx="13"
        ry="15"
        fill="#FBBF24"
        stroke="#1E293B"
        strokeWidth="2"
      />

      {/* Black Stripes */}
      <path
        d="M12 24C15 22 33 22 36 24C35.5 27 34.5 28 33 29C28 27.5 19 27.5 15 29C13.5 28 12.5 27 12 24Z"
        fill="#1E293B"
      />
      <path
        d="M13.5 32C17 31 31 31 34.5 32C33.5 35 31.5 37 29 39C26 38 22 38 19 39C16.5 37 14.5 35 13.5 32Z"
        fill="#1E293B"
      />

      {/* Stinger */}
      <polygon points="24,45 22,41 26,41" fill="#1E293B" />

      {/* Eyes */}
      <ellipse cx="20" cy="20" rx="1.8" ry="2.4" fill="#1E293B" />
      <circle cx="19.3" cy="19.2" r="0.7" fill="#FFFFFF" />

      <ellipse cx="28" cy="20" rx="1.8" ry="2.4" fill="#1E293B" />
      <circle cx="27.3" cy="19.2" r="0.7" fill="#FFFFFF" />

      {/* Rosy Cheeks */}
      <circle cx="16.5" cy="22" r="1.5" fill="#F87171" fillOpacity="0.6" />
      <circle cx="31.5" cy="22" r="1.5" fill="#F87171" fillOpacity="0.6" />

      {/* Happy Smile */}
      <path
        d="M21.5 23.5C22.5 25 25.5 25 26.5 23.5"
        stroke="#1E293B"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
};

export const StaffingBeesLogo: React.FC<{
  size?: 'sm' | 'md' | 'lg' | 'xl';
  theme?: 'dark' | 'light';
  showIcon?: boolean;
}> = ({ size = 'md', theme = 'dark', showIcon = true }) => {
  const iconSize = size === 'sm' ? 22 : size === 'lg' ? 32 : size === 'xl' ? 38 : 26;
  const textSize =
    size === 'sm'
      ? 'text-xs'
      : size === 'lg'
      ? 'text-lg'
      : size === 'xl'
      ? 'text-xl'
      : 'text-sm';

  const staffingColor = theme === 'dark' ? 'text-white' : 'text-[#F59E0B]';
  const beesColor = theme === 'dark' ? 'text-[#FBBF24]' : 'text-[#111827]';

  return (
    <div className="flex items-center space-x-1.5 select-none">
      {showIcon && <HoneyBeeIcon size={iconSize} className="shrink-0 drop-shadow-xs" />}
      <div className={`flex items-center leading-none tracking-tight font-bold ${textSize}`}>
        <span className={staffingColor}>Staffing</span>
        <span className={`${beesColor} ml-0.5`}>Bees</span>
      </div>
    </div>
  );
};
