import { IndianRupee, ShoppingBag, UtensilsCrossed, TrendingUp } from 'lucide-react';
import { StatCard } from '@/components/StatCard';
import { useStore } from '@/store/useStore';
import { Badge } from '@/components/ui/badge';

export default function Dashboard() {
  const { dishes, getTodayOrders, getTodayRevenue } = useStore();
  const todayOrders = getTodayOrders();
  const revenue = getTodayRevenue();
  const pendingCount = todayOrders.filter((o) => o.status === 'pending').length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="mt-1 text-muted-foreground">Welcome back! Here's today's overview.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Today's Revenue"
          value={`₹${revenue.toLocaleString()}`}
          subtitle="From completed orders"
          icon={IndianRupee}
        />
        <StatCard
          title="Orders Today"
          value={String(todayOrders.length)}
          subtitle={`${pendingCount} pending`}
          icon={ShoppingBag}
          accentClass="bg-info/10 text-info"
        />
        <StatCard
          title="Active Menu Items"
          value={String(dishes.filter((d) => d.available).length)}
          subtitle={`${dishes.length} total`}
          icon={UtensilsCrossed}
          accentClass="bg-success/10 text-success"
        />
        <StatCard
          title="Avg. Order Value"
          value={todayOrders.length ? `₹${Math.round(revenue / todayOrders.filter(o => o.status !== 'pending').length || 1)}` : '₹0'}
          icon={TrendingUp}
          accentClass="bg-warning/10 text-warning"
        />
      </div>

      <div>
        <h2 className="font-display text-xl font-semibold text-foreground mb-4">Recent Orders</h2>
        <div className="space-y-3">
          {todayOrders.slice(0, 5).map((order) => (
            <div key={order.id} className="flex items-center justify-between rounded-lg border bg-card p-4 shadow-[var(--shadow-card)]">
              <div className="flex items-center gap-4">
                <span className="font-mono text-sm font-semibold text-muted-foreground">{order.id}</span>
                <span className="text-sm text-foreground">Table {order.tableNumber}</span>
                <span className="text-sm text-muted-foreground">{order.items.length} items</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-semibold text-foreground">₹{order.totalPrice}</span>
                <Badge
                  variant={
                    order.status === 'completed' ? 'default' :
                    order.status === 'preparing' ? 'secondary' :
                    order.status === 'served' ? 'outline' : 'destructive'
                  }
                  className={
                    order.status === 'completed' ? 'bg-success text-success-foreground' :
                    order.status === 'preparing' ? 'bg-warning text-warning-foreground' :
                    order.status === 'served' ? 'bg-info text-info-foreground' : ''
                  }
                >
                  {order.status}
                </Badge>
              </div>
            </div>
          ))}
          {todayOrders.length === 0 && (
            <p className="text-center text-muted-foreground py-8">No orders yet today.</p>
          )}
        </div>
      </div>
    </div>
  );
}
