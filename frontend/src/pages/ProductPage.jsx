import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CartContext from '../context/CartContext';
import { FaTruck, FaUndo, FaShieldAlt } from 'react-icons/fa';

const Container = styled.div`
  max-width: 1200px;
  margin: 4rem auto;
  padding: 0 20px;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ImageSection = styled.div`
  img {
    width: 100%;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.05);
  }
`;

const InfoSection = styled.div``;

const Category = styled.div`
  text-transform: uppercase;
  color: var(--light-text);
  font-size: 0.9rem;
  letter-spacing: 1px;
  margin-bottom: 0.5rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: var(--primary-color);
`;

const Price = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 2rem;
`;

const Description = styled.p`
  color: #555;
  margin-bottom: 2rem;
  font-size: 1.1rem;
`;

const MetaData = styled.div`
  margin-bottom: 2rem;
  font-size: 0.9rem;
  color: #666;
  
  p {
    margin-bottom: 0.5rem;
    strong { color: #333; }
  }
`;

const AddToCartSection = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 3rem;
  align-items: center;
`;

const Select = styled.select`
  padding: 0.8rem;
  font-size: 1rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
`;

const Button = styled.button`
  background: var(--primary-color);
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 4px;
  font-size: 1.1rem;
  font-weight: 600;
  flex: 1;
  transition: background 0.3s;
  
  &:hover {
    background: #34495e;
  }
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const Features = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  border-top: 1px solid #eee;
  padding-top: 2rem;
`;

const FeatureItem = styled.div`
  text-align: center;
  
  svg {
    font-size: 1.5rem;
    color: var(--secondary-color);
    margin-bottom: 0.5rem;
  }
  
  p {
    font-size: 0.9rem;
    color: #666;
  }
`;

const ProductPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({});
    const [qty, setQty] = useState(1);
    const { addToCart } = useContext(CartContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
                setProduct(data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        addToCart(product, Number(qty));
        navigate('/cart');
    };

    if (loading) return <div className="container py-2">Loading...</div>;

    return (
        <Container>
            <ProductGrid>
                <ImageSection>
                    <img src={product.imageURL} alt={product.name} />
                </ImageSection>
                <InfoSection>
                    <Category>{product.category}</Category>
                    <Title>{product.name}</Title>
                    <Price>£{product.priceGBP?.toFixed(2)}</Price>
                    <Description>{product.description}</Description>

                    <MetaData>
                        <p><strong>SKU:</strong> {product.sku || 'N/A'}</p>
                        <p><strong>Material:</strong> {product.material || 'Standard'}</p>
                        <p><strong>Dimensions:</strong> {product.dimensions || 'Standard'}</p>
                        <p><strong>Availability:</strong> {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</p>
                    </MetaData>

                    {product.countInStock > 0 && (
                        <AddToCartSection>
                            <Select value={qty} onChange={(e) => setQty(e.target.value)}>
                                {[...Array(product.countInStock).keys()].slice(0, 10).map((x) => (
                                    <option key={x + 1} value={x + 1}>
                                        {x + 1}
                                    </option>
                                ))}
                            </Select>
                            <Button onClick={handleAddToCart}>Add to Cart</Button>
                        </AddToCartSection>
                    )}

                    <Features>
                        <FeatureItem>
                            <FaTruck />
                            <p>Fast UK Delivery</p>
                        </FeatureItem>
                        <FeatureItem>
                            <FaUndo />
                            <p>30 Day Returns</p>
                        </FeatureItem>
                        <FeatureItem>
                            <FaShieldAlt />
                            <p>5 Year Warranty</p>
                        </FeatureItem>
                    </Features>
                </InfoSection>
            </ProductGrid>
        </Container>
    );
};

export default ProductPage;
