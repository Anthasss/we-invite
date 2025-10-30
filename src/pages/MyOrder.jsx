import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { getOrdersByUser } from '../services/orderApi';
import PageHeader from '../components/shared/pageHeader';
import OrdersTable from '../components/orderComponents/OrdersTable';

export default function MyOrder() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchOrders = async () => {
    if (!isAuthenticated || !user?.sub) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const data = await getOrdersByUser(user.sub);
      setOrders(data);
      setFilteredOrders(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isLoading) {
      fetchOrders();
    }
  }, [isAuthenticated, user?.sub, isLoading]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredOrders(orders);
    } else {
      const filtered = orders.filter(order => {
        const productName = order.product?.name?.toLowerCase() || '';
        const status = order.status?.toLowerCase() || '';
        const query = searchQuery.toLowerCase();
        
        return productName.includes(query) || status.includes(query);
      });
      setFilteredOrders(filtered);
    }
  }, [searchQuery, orders]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handlePaymentComplete = () => {
    // Refresh orders after payment
    fetchOrders();
  };

  if (isLoading || loading) {
    return (
      <div className="w-full h-screen pt-16 grid place-items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="w-full h-screen pt-16 grid place-items-center">
        <div className="text-center">
          <h1 className="text-3xl font-medium mb-4">Please Log In</h1>
          <p className="text-gray-600">You need to be logged in to view your orders.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-screen pt-16 grid place-items-center">
        <div className="text-center">
          <h1 className="text-3xl font-medium mb-4 text-error">Error</h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen pt-16 px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <PageHeader 
          title="My Orders" 
          onSearch={handleSearch}
          searchPlaceholder="Search by product name or status..."
        />
        
        {orders.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">You don't have any orders yet.</p>
          </div>
        ) : (
          <OrdersTable orders={filteredOrders} onPaymentComplete={handlePaymentComplete} />
        )}
      </div>
    </div>
  );
}