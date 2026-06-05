import { useAxios } from '@/hooks/useAxios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


function Dashboard() {
  const { get, loading, error, logout } = useAxios();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await get('/user/profile');
        setUserData(data);
      } catch (err) {
        // Error handled by hook
      }
    };
    fetchUser();
  }, [get]);

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  if (loading) return <div>Loading dashboard...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Dashboard</h1>
      {userData && <pre>{JSON.stringify(userData, null, 2)}</pre>}
      <div className="flex gap-4 mt-4">
        <Link to="/profile">Go to Profile</Link>
        <button onClick={handleLogout} className="text-red-500">Logout</button>
      </div>
    </div>
  );
}

export default Dashboard;