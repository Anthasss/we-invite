import { useOrderPayment } from '../../hooks/useOrderPayment';
import { useMidtransSnap } from '../../hooks/useMidtransSnap';

export default function OrdersTable({ orders, onPaymentComplete }) {
  const snapLoaded = useMidtransSnap();
  const { resumePayment, isProcessing, toast, clearToast } = useOrderPayment(null, null, snapLoaded);

  const handleResumePayment = async (order) => {
    await resumePayment(order.id, order.snapToken);
    
    // Refresh orders after payment
    if (onPaymentComplete) {
      onPaymentComplete();
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
    <>
      {toast && (
        <div className="toast toast-top toast-end">
          <div className={`alert ${
            toast.type === 'success' ? 'alert-success' :
            toast.type === 'error' ? 'alert-error' :
            toast.type === 'warning' ? 'alert-warning' :
            'alert-info'
          }`}>
            <span>{toast.message}</span>
            <button onClick={clearToast} className="btn btn-sm btn-ghost">✕</button>
          </div>
        </div>
      )}
      
      <div className="overflow-x-auto bg-black/20">
        <table className="table">
          <thead>
            <tr>
              <th>No.</th>
              <th>Product Name</th>
              <th>Product Price</th>
              <th>Status</th>
              <th>Action</th>
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
                <td>
                  {order.status === 'pending' && order.snapToken && (
                    <button 
                      className="btn btn-sm btn-primary"
                      onClick={() => handleResumePayment(order)}
                      disabled={isProcessing || !snapLoaded}
                    >
                      {isProcessing ? 'Processing...' : !snapLoaded ? 'Loading...' : 'Pay Now'}
                    </button>
                  )}
                  {order.status === 'pending' && !order.snapToken && (
                    <span className="text-sm text-gray-500">Payment expired</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
