import * as React from 'react';
import { Check, Package } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { Badge } from '~/components/ui/badge';
import type { PackageInfo } from '~/types/registration';

interface PackageInfoCardProps {
  packageInfo: PackageInfo;
}

export function PackageInfoCard({ packageInfo }: PackageInfoCardProps) {
  return (
    <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
      <CardHeader className="pb-3 sm:pb-6">
        <div className="flex items-center gap-2 mb-2">
          <Package className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
          <Badge variant="secondary" className="text-[10px] sm:text-xs px-1.5 sm:px-2">
            Gói đã chọn
          </Badge>
        </div>
        <CardTitle className="text-lg sm:text-xl md:text-2xl">{packageInfo.name}</CardTitle>
        <CardDescription className="text-xl sm:text-2xl md:text-3xl font-bold text-primary mt-1.5 sm:mt-2">
          {(packageInfo.price / 1000).toFixed(0)}k VND
        </CardDescription>
      </CardHeader>

      {packageInfo.features && packageInfo.features.length > 0 && (
        <CardContent className="pt-0">
          <div className="space-y-2">
            <p className="text-xs sm:text-sm font-medium text-muted-foreground">Bao gồm:</p>
            {packageInfo.features.slice(0, 3).map((feature, index) => (
              <div key={index} className="flex items-start gap-2">
                <div className="rounded-full p-0.5 bg-primary/10 mt-0.5 flex-shrink-0">
                  <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-primary" />
                </div>
                <span className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{feature}</span>
              </div>
            ))}
            {packageInfo.features.length > 3 && (
              <p className="text-[10px] sm:text-xs text-muted-foreground italic pt-1">
                + {packageInfo.features.length - 3} tính năng khác
              </p>
            )}
          </div>
        </CardContent>
      )}
    </Card>
  );
}

