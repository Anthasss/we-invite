import { useState, useEffect } from 'react';
import PageHeader from '../../components/shared/pageHeader';
import AdminOrdersTable from '../../components/admin/AdminOrdersTable';
import { getAllOrders } from '../../services/orderApi';

export default function AdminOrderPage()  {
  const [searchQuery, setSearchQuery] = useState('');
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await getAllOrders();
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
    fetchOrders();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredOrders(orders);
    } else {
      const filtered = orders.filter(order => {
        const userName = order.user?.name?.toLowerCase() || '';
        const productName = order.product?.name?.toLowerCase() || '';
        const status = order.status?.toLowerCase() || '';
        const query = searchQuery.toLowerCase();
        
        return userName.includes(query) || productName.includes(query) || status.includes(query);
      });
      setFilteredOrders(filtered);
    }
  }, [searchQuery, orders]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleStatusUpdate = () => {
    fetchOrders(); // Refetch orders after status update
  };

  if (loading) {
    return (
      <div className="w-full h-screen pt-16 grid place-items-center">
        <span className="loading loading-spinner loading-lg"></span>
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
    <div className="w-full min-h-screen p-8 pt-16">
      <div className="max-w-7xl mx-auto">
        <PageHeader 
          title="Orders Management" 
          onSearch={handleSearch}
          searchPlaceholder="Search by user, product, or status..."
        />
        
        <div className="mt-6">
          <AdminOrdersTable orders={filteredOrders} onStatusUpdate={handleStatusUpdate} />
        </div>
      </div>
    </div>
  )
}