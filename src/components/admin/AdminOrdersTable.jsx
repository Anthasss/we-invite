import { useState } from 'react';
import { updateOrderStatus } from '../../services/orderApi';

export default function AdminOrdersTable({ orders, onStatusUpdate }) {
  const [updatingOrderId, setUpdatingOrderId] = useState(null);

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdatingOrderId(orderId);
    try {
      await updateOrderStatus(orderId, newStatus);
      if (onStatusUpdate) {
        onStatusUpdate();
      }
    } catch (error) {
      console.error('Failed to update order status:', error);
      alert('Failed to update order status');
    } finally {
      setUpdatingOrderId(null);
    }
  };

  if (orders.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 text-lg">No orders found.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="table border border-black/40 bg-black/50 rounded-none w-full">
        <thead>
          <tr>
            <th>No.</th>
            <th>User Name</th>
            <th>Product Name</th>
            <th>Product Price</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={order.id}>
              <td>{index + 1}</td>
              <td>{order.user?.name || 'N/A'}</td>
              <td>{order.product?.name || 'N/A'}</td>
              <td>Rp {order.product?.price?.toLocaleString('id-ID') || 0}</td>
              <td>
                <select
                  className={`select select-bordered select-sm ${
                    order.status === 'done' ? 'select-success' :
                    order.status === 'in progress' ? 'select-info' :
                    'select-warning'
                  }`}
                  value={order.status}
                  onChange={(e) => handleStatusChange(order.id, e.target.value)}
                  disabled={updatingOrderId === order.id}
                >
                  <option value="pending">Pending</option>
                  <option value="in progress">In Progress</option>
                  <option value="done">Done</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
