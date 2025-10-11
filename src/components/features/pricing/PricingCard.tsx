import * as React from 'react';
import { Check, Sparkles } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '~/components/ui/card.tsx';
import { Button } from '~/components/ui/button.tsx';
import { Badge } from '~/components/ui/badge.tsx';
import { cn } from '~/lib/utils.ts';

interface PricingCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number | null;
  features?: string[];
  isFeatured?: boolean;
  isPopular?: boolean;
}

export function PricingCard({
  id,
  name,
  description,
  price,
  originalPrice,
  features = [],
  isFeatured = false,
  isPopular = false,
}: PricingCardProps) {
  const isHighlighted = isFeatured || isPopular;
  const hasDiscount = originalPrice !== null && originalPrice !== undefined && originalPrice > price;

  return (
    <Card
      className={cn(
        'relative overflow-hidden transition-all duration-500 hover:shadow-2xl group h-full flex flex-col',
        isHighlighted
          ? 'border-2 border-yellow-500 shadow-xl shadow-yellow-500/20 md:scale-105 hover:scale-105 md:hover:scale-110'
          : 'border-border hover:border-primary/50 hover:scale-105'
      )}
    >
      {/* Featured badge */}
      {isHighlighted && (
        <div className="absolute top-0 right-0 -translate-y-1 translate-x-1 z-10">
          <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-none shadow-lg animate-pulse text-[10px] sm:text-xs px-2 py-0.5 sm:px-3 sm:py-1">
            <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-0.5 sm:mr-1" />
            PHỔ BIẾN NHẤT
          </Badge>
        </div>
      )}

      {/* Gradient overlay for highlighted cards */}
      {isHighlighted && (
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-orange-500/5 pointer-events-none" />
      )}
      
      {/* Hover gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:to-primary/10 transition-all duration-500 pointer-events-none" />

      <CardHeader className="text-center space-y-2 relative pb-4 sm:pb-6">
        <Badge
          variant={isHighlighted ? 'default' : 'secondary'}
          className={cn(
            'w-fit mx-auto text-[10px] sm:text-xs font-bold px-2 py-0.5 sm:px-3 sm:py-1',
            isHighlighted && 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white'
          )}
        >
          {name}
        </Badge>

        <div className="flex items-center justify-center gap-1.5 sm:gap-2">
          {hasDiscount && originalPrice && (
            <span className="text-lg sm:text-2xl text-muted-foreground line-through">
              {(originalPrice / 1000).toFixed(0)}k
            </span>
          )}
          <CardTitle className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text">
            {(price / 1000).toFixed(0)}k
          </CardTitle>
        </div>

        <CardDescription className="text-xs sm:text-sm min-h-[32px] sm:min-h-[40px] px-2">{description}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-3 sm:space-y-4 flex-1 pb-4 sm:pb-6">
        <div className="space-y-2 sm:space-y-3">
          {features.slice(0, 5).map((feature, index) => (
            <div key={index} className="flex items-start gap-2 sm:gap-3">
              <div
                className={cn(
                  'rounded-full p-0.5 sm:p-1 mt-0.5 flex-shrink-0',
                  isHighlighted ? 'bg-yellow-500/20' : 'bg-primary/10'
                )}
              >
                <Check
                  className={cn(
                    'w-3 h-3 sm:w-4 sm:h-4',
                    isHighlighted ? 'text-yellow-600 dark:text-yellow-400' : 'text-primary'
                  )}
                />
              </div>
              <span className="text-xs sm:text-sm text-muted-foreground flex-1 leading-relaxed">{feature}</span>
            </div>
          ))}
        </div>
      </CardContent>

      <CardFooter className="pt-0 pb-4 sm:pb-6">
        <Button
          onClick={() => {
            // Call the global selectPackage function
            if (typeof window !== 'undefined' && window.selectPackage) {
              window.selectPackage(id, name, price);
            } else {
              console.error('selectPackage function not found on window');
            }
          }}
          className={cn(
            'w-full font-semibold transition-all duration-300 group-hover:scale-105 text-sm sm:text-base h-10 sm:h-11',
            isHighlighted
              ? 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white shadow-lg hover:shadow-xl hover:shadow-yellow-500/50'
              : 'hover:shadow-lg'
          )}
          size="lg"
        >
          Chọn gói này
          <span className="ml-1.5 sm:ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
        </Button>
      </CardFooter>
    </Card>
  );
}

