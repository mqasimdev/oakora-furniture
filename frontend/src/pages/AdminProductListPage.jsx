import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import { BASE_URL } from '../config';

const Container = styled.div`
  max-width: 1200px;
  margin: 4rem auto;
  padding: 0 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Button = styled.button`
  background: var(--primary-color);
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  cursor: pointer;
  
  &:hover {
    opacity: 0.9;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;

  th, td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid #eee;
  }

  th {
    background: #f9f9f9;
  }
`;

const ActionButton = styled.button`
  padding: 0.5rem;
  margin-right: 0.5rem;
  border: 1px solid #ddd;
  background: white;
  cursor: pointer;

  &.edit {
    color: blue;
  }

  &.delete {
    color: red;
  }
`;

const AdminProductListPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { userInfo } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!userInfo || !userInfo.isAdmin) {
            navigate('/login');
        } else {
            fetchProducts();
        }
    }, [userInfo, navigate]);

    const fetchProducts = async () => {
        try {
            // Fetch all products (you might want to handle pagination differently later)
            const { data } = await axios.get(`${BASE_URL}/api/products?pageNumber=1`);
            // Note: Currently backend paginates. For a true admin list we might want a different endpoint 
            // or just iterate pages. For now, fetch page 1.
            // Ideally backend should have an admin endpoint returning all or handle pagination here.
            setProducts(data.products);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`,
                    },
                };
                await axios.delete(`${BASE_URL}/api/products/${id}`, config);
                fetchProducts();
            } catch (error) {
                console.error(error);
                alert(error.response?.data?.message || 'Error deleting product');
            }
        }
    };

    const createProductHandler = () => {
        navigate('/admin/product/create');
    };

    return (
        <Container>
            <Header>
                <h1>Products</h1>
                <Button onClick={createProductHandler}>+ Create Product</Button>
            </Header>

            {loading ? (
                <div>Loading...</div>
            ) : (
                <Table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>PRICE</th>
                            <th>CATEGORY</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>£{product.priceGBP}</td>
                                <td>{product.category}</td>
                                <td>
                                    <ActionButton
                                        className="edit"
                                        onClick={() => navigate(`/admin/product/${product._id}/edit`)}
                                    >
                                        Edit
                                    </ActionButton>
                                    <ActionButton
                                        className="delete"
                                        onClick={() => deleteHandler(product._id)}
                                    >
                                        Delete
                                    </ActionButton>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </Container>
    );
};

export default AdminProductListPage;
