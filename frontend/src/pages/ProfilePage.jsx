import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import { FaTimes } from 'react-icons/fa';

const Container = styled.div`
  max-width: 1200px;
  margin: 4rem auto;
  padding: 0 20px;
`;

const Layout = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Section = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  margin-bottom: 2rem;
  
  h2 {
    font-size: 1.4rem;
    margin-bottom: 1.5rem;
    color: var(--primary-color);
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  
  th, td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid #eee;
  }
  
  th {
    background: #f8f9fa;
    font-weight: 600;
  }
  
  tr:hover {
    background: #f1f1f1;
  }
`;

const Badge = styled.span`
  background: ${props => props.success ? '#d4edda' : '#f8d7da'};
  color: ${props => props.success ? '#155724' : '#721c24'};
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.85rem;
  font-weight: 600;
`;

const ProfilePage = () => {
    const { userInfo, logout } = useContext(UserContext);
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!userInfo) {
            navigate('/login');
            return;
        }

        const fetchOrders = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`,
                    },
                };
                const { data } = await axios.get('http://localhost:5000/api/orders/myorders', config);
                setOrders(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchOrders();
    }, [userInfo, navigate]);

    return (
        <Container>
            <h1>My Account</h1>
            <Layout>
                <div>
                    <Section>
                        <h2>User Profile</h2>
                        <p><strong>Name:</strong> {userInfo?.name}</p>
                        <p><strong>Email:</strong> {userInfo?.email}</p>
                        <button
                            onClick={logout}
                            style={{
                                marginTop: '1rem',
                                padding: '0.5rem 1rem',
                                background: 'var(--primary-color)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px'
                            }}
                        >
                            Logout
                        </button>
                    </Section>
                </div>

                <Section>
                    <h2>My Orders</h2>
                    {orders.length === 0 ? (
                        <p>No orders found.</p>
                    ) : (
                        <div style={{ overflowX: 'auto' }}>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Date</th>
                                        <th>Total</th>
                                        <th>Paid</th>
                                        <th>Delivered</th>
                                        <th>Items</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order) => (
                                        <tr key={order._id}>
                                            <td>{order._id.substring(0, 10)}...</td>
                                            <td>{order.createdAt.substring(0, 10)}</td>
                                            <td>£{order.totalPrice.toFixed(2)}</td>
                                            <td>
                                                {order.isPaid ? (
                                                    <Badge success>Paid</Badge>
                                                ) : (
                                                    <Badge>Pending (COD)</Badge>
                                                )}
                                            </td>
                                            <td>
                                                {order.isDelivered ? (
                                                    <Badge success>Yes</Badge>
                                                ) : (
                                                    <Badge>No</Badge>
                                                )}
                                            </td>
                                            <td>{order.orderItems.length} items</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    )}
                </Section>
            </Layout>
        </Container>
    );
};

export default ProfilePage;
