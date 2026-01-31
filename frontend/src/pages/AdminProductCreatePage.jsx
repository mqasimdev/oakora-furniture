import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import { BASE_URL } from '../config';

const Container = styled.div`
  max-width: 800px;
  margin: 4rem auto;
  padding: 0 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background: #fff;
  padding: 2rem;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  border-radius: 8px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  
  label {
    font-weight: 600;
  }
  
  input, textarea {
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
  }

  textarea {
    resize: vertical;
    min-height: 100px;
  }
`;

const Button = styled.button`
  background: var(--primary-color);
  color: white;
  padding: 1rem;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 1rem;
  
  &:hover {
    opacity: 0.9;
  }
`;

const BackButton = styled.button`
    background: transparent;
    border: 1px solid #ddd;
    padding: 0.5rem 1rem;
    cursor: pointer;
    margin-bottom: 2rem;
`;

const AdminProductCreatePage = () => {
    const navigate = useNavigate();
    const { userInfo } = useContext(UserContext);

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState('');
    const [sku, setSku] = useState('');
    const [dimensions, setDimensions] = useState('');
    const [material, setMaterial] = useState('');
    const [designStyle, setDesignStyle] = useState('Modern UK');

    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (!userInfo || !userInfo.isAdmin) {
            navigate('/login');
        }
    }, [userInfo, navigate]);

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);
        setUploading(true);

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            };

            const { data } = await axios.post(`${BASE_URL}/api/upload`, formData, config);

            setImage(data);
            setUploading(false);
        } catch (error) {
            console.error(error);
            setUploading(false);
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            await axios.post(
                `${BASE_URL}/api/products`,
                {
                    name,
                    priceGBP: price,
                    imageURL: image,
                    category,
                    countInStock,
                    description,
                    sku,
                    dimensions,
                    material,
                    designStyle
                },
                config
            );

            navigate('/admin/productlist');
        } catch (error) {
            console.error(error);
            alert('Error creating product');
        }
    };

    return (
        <Container>
            <BackButton onClick={() => navigate('/admin/productlist')}>Go Back</BackButton>
            <h1>Create Product</h1>
            <Form onSubmit={submitHandler}>
                <FormGroup>
                    <label>Name</label>
                    <input
                        type="text"
                        placeholder="Enter name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </FormGroup>

                <FormGroup>
                    <label>Price (GBP)</label>
                    <input
                        type="number"
                        placeholder="Enter price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </FormGroup>

                <FormGroup>
                    <label>Image URL</label>
                    <input
                        type="text"
                        placeholder="Enter image url"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                    />
                    <input
                        type="file"
                        onChange={uploadFileHandler}
                        style={{ marginTop: '0.5rem' }}
                    />
                    {uploading && <span style={{ fontSize: '0.9rem', color: '#666' }}>Uploading...</span>}
                </FormGroup>

                <FormGroup>
                    <label>Category</label>
                    <input
                        type="text"
                        placeholder="Enter category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />
                </FormGroup>

                <FormGroup>
                    <label>Count In Stock</label>
                    <input
                        type="number"
                        placeholder="Enter count in stock"
                        value={countInStock}
                        onChange={(e) => setCountInStock(e.target.value)}
                    />
                </FormGroup>

                <FormGroup>
                    <label>SKU</label>
                    <input
                        type="text"
                        placeholder="Enter SKU"
                        value={sku}
                        onChange={(e) => setSku(e.target.value)}
                    />
                </FormGroup>

                <FormGroup>
                    <label>Dimensions</label>
                    <input
                        type="text"
                        placeholder="e.g. 200x150cm"
                        value={dimensions}
                        onChange={(e) => setDimensions(e.target.value)}
                    />
                </FormGroup>

                <FormGroup>
                    <label>Material</label>
                    <input
                        type="text"
                        placeholder="e.g. Oak Wood"
                        value={material}
                        onChange={(e) => setMaterial(e.target.value)}
                    />
                </FormGroup>

                <FormGroup>
                    <label>Design Style</label>
                    <input
                        type="text"
                        placeholder="e.g. Modern UK"
                        value={designStyle}
                        onChange={(e) => setDesignStyle(e.target.value)}
                    />
                </FormGroup>

                <FormGroup>
                    <label>Description</label>
                    <textarea
                        placeholder="Enter description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                </FormGroup>

                <Button type="submit">Create Product</Button>
            </Form>
        </Container>
    );
};

export default AdminProductCreatePage;
