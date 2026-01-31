import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaRegHeart } from 'react-icons/fa';

const Card = styled.div`
  background: white;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  height: 250px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s;
  }

  ${Card}:hover & img {
    transform: scale(1.05);
  }
`;

const Content = styled.div`
  padding: 1.5rem;
`;

const Category = styled.span`
  font-size: 0.8rem;
  text-transform: uppercase;
  color: var(--light-text);
  letter-spacing: 1px;
`;

const Title = styled.h3`
  font-size: 1.1rem;
  margin: 0.5rem 0;
  color: var(--primary-color);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Price = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--text-color);
  margin-top: 0.5rem;
`;

const ActionButton = styled(Link)`
  display: block;
  text-align: center;
  background: var(--grey-100);
  color: var(--text-color);
  padding: 0.8rem;
  margin-top: 1rem;
  font-weight: 600;
  border-radius: 4px;
  
  &:hover {
    background: var(--primary-color);
    color: white;
  }
`;

const ProductCard = ({ product }) => {
  const placeholderImage = "https://via.placeholder.com/300x300?text=No+Image";

  return (
    <Card>
      <Link to={`/product/${product._id}`}>
        <ImageContainer>
          <img
            src={product.imageURL}
            alt={product.name}
            onError={(e) => { e.target.onerror = null; e.target.src = placeholderImage; }}
          />
        </ImageContainer>
      </Link>
      <Content>
        <Category>{product.category}</Category>
        <Link to={`/product/${product._id}`}>
          <Title>{product.name}</Title>
        </Link>
        <Price>£{product.priceGBP.toFixed(2)}</Price>
        <ActionButton to={`/product/${product._id}`}>View Details</ActionButton>
      </Content>
    </Card>
  );
};

export default ProductCard;
