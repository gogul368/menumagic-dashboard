import { motion } from 'framer-motion';
import { ImageIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useStore } from '@/store/useStore';
import { isDishAvailableNow, getEffectivePrice, getCurrentTimeSlot } from '@/types/menu';

export default function MenuPreview() {
  const { dishes } = useStore();
  const availableDishes = dishes.filter(isDishAvailableNow);
  const categories = [...new Set(availableDishes.map((d) => d.category))];
  const slot = getCurrentTimeSlot();

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="font-display text-3xl font-bold text-foreground">🍽 Our Menu</h1>
        <p className="mt-1 text-muted-foreground">
          Showing {availableDishes.length} dishes available right now
        </p>
        <Badge variant="outline" className="mt-2">
          {slot === 'morning' ? '🌅 Morning Menu' : slot === 'evening' ? '☀️ Afternoon Menu' : '🌙 Evening Menu'}
        </Badge>
      </div>

      {categories.map((cat) => (
        <div key={String(cat)}>
          <h2 className="font-display text-xl font-semibold text-foreground mb-3">{String(cat)}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {availableDishes
              .filter((d) => d.category === cat)
              .map((dish, i) => (
                <motion.div
                  key={dish.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="rounded-lg border bg-card overflow-hidden shadow-[var(--shadow-card)]"
                >
                  <div className="h-32 bg-muted flex items-center justify-center relative">
                    {dish.imageUrl ? (
                      <img src={dish.imageUrl} alt={dish.name} className="h-full w-full object-cover" />
                    ) : (
                      <ImageIcon className="h-8 w-8 text-muted-foreground/40" />
                    )}
                    {dish.offer && (
                      <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs">{dish.offer}</Badge>
                    )}
                  </div>
                  <div className="p-4 flex items-center justify-between">
                    <h3 className="font-display font-semibold text-card-foreground">{dish.name}</h3>
                    <div className="text-right">
                      {dish.offerPercent ? (
                        <>
                          <span className="text-xs text-muted-foreground line-through">₹{dish.price}</span>
                          <p className="font-bold text-primary">₹{getEffectivePrice(dish).toFixed(0)}</p>
                        </>
                      ) : (
                        <p className="font-bold text-card-foreground">₹{dish.price}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      ))}

      {availableDishes.length === 0 && (
        <p className="text-center text-muted-foreground py-12">No dishes available right now.</p>
      )}
    </div>
  );
}
