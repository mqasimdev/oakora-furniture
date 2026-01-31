import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import CartContext from '../context/CartContext';
import UserContext from '../context/UserContext';

const Container = styled.div`
  max-width: 1200px;
  margin: 4rem auto;
  padding: 0 20px;
`;

const Layout = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Section = styled.div`
  background: white;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  
  h2 {
    font-size: 1.2rem;
    margin-bottom: 1rem;
    color: var(--primary-color);
    border-bottom: 1px solid #eee;
    padding-bottom: 0.5rem;
  }
  
  p {
    color: #555;
    margin-bottom: 0.5rem;
  }
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eee;
  padding: 1rem 0;
  gap: 1rem;
  
  img {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 4px;
  }
  
  a {
    font-weight: 500;
      color: var(--text-color);
  }
`;

const Button = styled.button`
  background: var(--secondary-color);
  color: white;
  width: 100%;
  padding: 1rem;
  border: none;
  border-radius: 4px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  
  &:hover {
    background: #d35400;
  }
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  
  &.total {
    font-weight: 700;
    font-size: 1.2rem;
    border-top: 1px solid #eee;
    padding-top: 0.5rem;
    margin-top: 0.5rem;
  }
`;

const PlaceOrderPage = () => {
    const navigate = useNavigate();
    const { cartItems, shippingAddress, clearCart } = useContext(CartContext);
    const { userInfo } = useContext(UserContext);

    useEffect(() => {
        if (!shippingAddress.address) {
            navigate('/shipping');
        }
    }, [shippingAddress, navigate]);

    if (!shippingAddress.address) {
        return null;
    }

    // Calculate prices
    const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
    const shippingPrice = itemsPrice > 500 ? 0 : 50; // Free shipping over 500
    const taxPrice = Number((0.2 * itemsPrice).toFixed(2)); // UK VAT 20%
    const totalPrice = itemsPrice + shippingPrice; // Usually VAT included in UK prices, but let's assume displayed prices are gross for simplicity or add extra.
    // The user prompt says "All prices in GBP". In UK, listed prices usually include VAT.
    // Let's assume listed price INCLUDES VAT.
    // So tax part is internal calculation or we add on top. Usually consumer site: Price is final.
    // I will just list "VAT (included)" for clarity.

    const placeOrderHandler = async () => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            await axios.post(
                'http://localhost:5000/api/orders',
                {
                    orderItems: cartItems,
                    shippingAddress,
                    paymentMethod: 'COD',
                    itemsPrice,
                    taxPrice, // Just recording it
                    shippingPrice,
                    totalPrice,
                },
                config
            );

            clearCart();
            navigate('/profile'); // Redirect to profile/orders
        } catch (error) {
            console.error(error);
            alert('Error placing order');
        }
    };

    return (
        <Container>
            <h1>Confirm Order</h1>
            <Layout>
                <div>
                    <Section>
                        <h2>Shipping</h2>
                        <p><strong>Address: </strong>
                            {shippingAddress.address}, {shippingAddress.city}, {shippingAddress.postalCode}, {shippingAddress.country}
                        </p>
                    </Section>

                    <Section>
                        <h2>Payment Method</h2>
                        <p><strong>Method: </strong>Cash On Delivery (COD)</p>
                    </Section>

                    <Section>
                        <h2>Order Items</h2>
                        {cartItems.length === 0 ? <p>Your cart is empty</p> : (
                            <div>
                                {cartItems.map((item, index) => (
                                    <Item key={index}>
                                        <img src={item.image} alt={item.name} />
                                        <Link to={`/product/${item.product}`}>
                                            {item.name}
                                        </Link>
                                        <div style={{ marginLeft: 'auto' }}>
                                            {item.qty} x £{item.price} = £{item.qty * item.price}
                                        </div>
                                    </Item>
                                ))}
                            </div>
                        )}
                    </Section>
                </div>

                <Section>
                    <h2>Order Summary</h2>
                    <SummaryRow>
                        <span>Items</span>
                        <span>£{itemsPrice.toFixed(2)}</span>
                    </SummaryRow>
                    <SummaryRow>
                        <span>Shipping</span>
                        <span>£{shippingPrice.toFixed(2)}</span>
                    </SummaryRow>
                    <SummaryRow>
                        <span>VAT (Included)</span>
                        <span>£{taxPrice.toFixed(2)}</span>
                    </SummaryRow>
                    <SummaryRow className="total">
                        <span>Total</span>
                        <span>£{totalPrice.toFixed(2)}</span>
                    </SummaryRow>

                    <Button onClick={placeOrderHandler}>Place Order</Button>
                </Section>
            </Layout>
        </Container>
    );
};

export default PlaceOrderPage;
