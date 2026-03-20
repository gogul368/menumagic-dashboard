import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: LucideIcon;
  accentClass?: string;
}

export function StatCard({ title, value, subtitle, icon: Icon, accentClass = 'bg-primary/10 text-primary' }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-lg border bg-card p-5 shadow-[var(--shadow-card)]"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="mt-1 font-display text-2xl font-bold text-card-foreground">{value}</p>
          {subtitle && <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>}
        </div>
        <div className={`rounded-lg p-2.5 ${accentClass}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </motion.div>
  );
}
