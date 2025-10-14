import * as React from 'react';
import { cn } from '~/lib/utils';

interface PricingToggleProps {
  isYearly: boolean;
  onToggle: (isYearly: boolean) => void;
}

export function PricingToggle({ isYearly, onToggle }: PricingToggleProps) {
  return (
    <div className="flex items-center justify-center gap-3 mb-12">
      <span
        className={cn(
          'text-sm font-medium transition-colors',
          !isYearly ? 'text-foreground' : 'text-muted-foreground'
        )}
      >
        Thanh toán 1 lần
      </span>
      <button
        onClick={() => onToggle(!isYearly)}
        className={cn(
          'relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
          isYearly ? 'bg-primary' : 'bg-muted'
        )}
        role="switch"
        aria-checked={isYearly}
      >
        <span
          className={cn(
            'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
            isYearly ? 'translate-x-6' : 'translate-x-1'
          )}
        />
      </button>
      <span
        className={cn(
          'text-sm font-medium transition-colors',
          isYearly ? 'text-foreground' : 'text-muted-foreground'
        )}
      >
        Gói năm
        <span className="ml-2 text-xs text-green-500 font-semibold">(Tiết kiệm 20%)</span>
      </span>
    </div>
  );
}

