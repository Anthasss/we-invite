export default function OrdersTable({ orders }) {
  if (orders.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 text-lg">No orders found.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Product Name</th>
            <th>Product Price</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={order.id}>
              <td>{index + 1}</td>
              <td>{order.product?.name || 'N/A'}</td>
              <td>Rp {order.product?.price?.toLocaleString('id-ID') || 0}</td>
              <td>
                <span className={`badge ${
                  order.status === 'completed' ? 'badge-success' :
                  order.status === 'pending' ? 'badge-warning' :
                  order.status === 'cancelled' ? 'badge-error' :
                  'badge-info'
                }`}>
                  {order.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
