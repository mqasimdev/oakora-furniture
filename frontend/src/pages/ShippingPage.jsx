import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import CartContext from '../context/CartContext';

const Container = styled.div`
  max-width: 600px;
  margin: 4rem auto;
  padding: 0 20px;
`;

const Title = styled.h1`
  margin-bottom: 2rem;
  text-align: center;
`;

const Form = styled.form`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: var(--shadow);
`;

const InputGroup = styled.div`
  margin-bottom: 1.5rem;
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }
  
  input {
    width: 100%;
    padding: 0.8rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
  }
`;

const Button = styled.button`
  background: var(--primary-color);
  color: white;
  padding: 1rem;
  width: 100%;
  border: none;
  border-radius: 4px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  
  &:hover {
    background: #34495e;
  }
`;

const ShippingPage = () => {
    const { saveShippingAddress, shippingAddress } = useContext(CartContext);
    const navigate = useNavigate();

    const [address, setAddress] = useState(shippingAddress.address || '');
    const [city, setCity] = useState(shippingAddress.city || '');
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
    const [country, setCountry] = useState(shippingAddress.country || 'UK');

    const submitHandler = (e) => {
        e.preventDefault();
        saveShippingAddress({ address, city, postalCode, country });
        navigate('/placeorder');
    };

    return (
        <Container>
            <Title>Shipping Address</Title>
            <Form onSubmit={submitHandler}>
                <InputGroup>
                    <label>Address</label>
                    <input
                        type="text"
                        placeholder="Enter address"
                        value={address}
                        required
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </InputGroup>

                <InputGroup>
                    <label>City</label>
                    <input
                        type="text"
                        placeholder="Enter city"
                        value={city}
                        required
                        onChange={(e) => setCity(e.target.value)}
                    />
                </InputGroup>

                <InputGroup>
                    <label>Postal Code</label>
                    <input
                        type="text"
                        placeholder="Enter postal code"
                        value={postalCode}
                        required
                        onChange={(e) => setPostalCode(e.target.value)}
                    />
                </InputGroup>

                <InputGroup>
                    <label>Country</label>
                    <input
                        type="text"
                        placeholder="Enter country"
                        value={country}
                        required
                        onChange={(e) => setCountry(e.target.value)}
                    />
                </InputGroup>

                <Button type="submit">Continue to Payment</Button>
            </Form>
        </Container>
    );
};

export default ShippingPage;
