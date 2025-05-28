
import React from 'react';
import { cn } from '@/lib/utils';

export interface ProgressBarProps {
  value: number;
  max?: number;
  min?: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info'| 'destructive';
  showLabel?: boolean;
  showPercentage?: boolean;
  label?: string;
  className?: string;
  animated?: boolean;
  striped?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  min = 0,
  size = 'md',
  variant = 'default',
  showLabel = false,
  showPercentage = false,
  label,
  className,
  animated = true,
  striped = false,
}) => {
  // Calculate percentage
  const percentage = Math.min(Math.max(((value - min) / (max - min)) * 100, 0), 100);
  
  // Size variants
  const sizeVariants = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
  };

  // Color variants
  const colorVariants = {
    default: 'bg-blue-500',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    error: 'bg-red-500',
    info: 'bg-cyan-500',
    destructive: 'bg-destructive',
  };

  return (
    <div className={cn('w-full', className)}>
      {/* Label and percentage display */}
      {(showLabel || showPercentage) && (
        <div className="flex justify-between items-center mb-2">
          {showLabel && (
            <span className="text-sm font-medium text-gray-700">
              {label || 'Progress'}
            </span>
          )}
          {showPercentage && (
            <span className="text-sm text-gray-500">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}
      
      {/* Progress bar container */}
      <div
        className={cn(
          'w-full bg-gray-200 rounded-full overflow-hidden',
          sizeVariants[size]
        )}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-label={label || `Progress: ${Math.round(percentage)}%`}
      >
        {/* Progress bar fill */}
        <div
          className={cn(
            'h-full rounded-full transition-all duration-500 ease-out',
            colorVariants[variant],
            {
              'bg-gradient-to-r from-transparent via-white/30 to-transparent bg-[length:2rem_100%] animate-pulse': striped,
            },
            animated && 'transition-transform'
          )}
          style={{ width: `${percentage}%` }}
        >
          {/* Animated stripes overlay */}
          {striped && (
            <div
              className="h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent bg-[length:1rem_100%]"
              style={{
                backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 6px, rgba(255,255,255,0.1) 6px, rgba(255,255,255,0.1) 12px)',
                animation: animated ? 'slide 1s linear infinite' : 'none',
              }}
            />
          )}
        </div>
      </div>
      
      {/* Value display below bar */}
      {!showPercentage && !showLabel && (
        <div className="mt-1 text-xs text-gray-500 text-center">
          {value} / {max}
        </div>
      )}
    </div>
  );
};

export default ProgressBar;
