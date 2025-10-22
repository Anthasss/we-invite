import { useState } from 'react';
import PageHeader from '../../components/shared/pageHeader';

export default function AdminOrderPage()  {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
    // Add your search logic here
  };

  // Sample data - replace with actual data from your API
  const orders = [
    { id: 1, username: 'john.doe', product: 'Wedding Invitation', status: 'Completed' },
    { id: 2, username: 'jane.smith', product: 'Birthday Card', status: 'Pending' },
    { id: 3, username: 'mike.johnson', product: 'Anniversary Card', status: 'In Progress' },
  ];

  return (
    <div className="w-full min-h-screen p-8 pt-16">
      <div className="max-w-7xl mx-auto">
        <PageHeader 
          title="Orders Management" 
          onSearch={handleSearch}
          searchPlaceholder="Search orders..."
        />
        
        <div className="overflow-x-auto mt-6">
          <table className="table border border-black/40 bg-black/50 rounded-none w-full">
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Product</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.username}</td>
                  <td>{order.product}</td>
                  <td>
                    <span className={`badge ${
                      order.status === 'Completed' ? 'badge-success' :
                      order.status === 'Pending' ? 'badge-warning' :
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
      </div>
    </div>
  )
}