import React, { useContext } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import CartContext from '../context/CartContext';
import { FaTrash } from 'react-icons/fa';

const Container = styled.div`
  max-width: 1200px;
  margin: 4rem auto;
  padding: 0 20px;
`;

const Title = styled.h1`
  margin-bottom: 2rem;
`;

const CartGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CartItems = styled.div``;

const CartItem = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eee;
  padding: 1.5rem 0;
  gap: 1.5rem;
  
  img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 4px;
  }
  
  @media (max-width: 500px) {
    flex-wrap: wrap;
  }
`;

const ItemInfo = styled.div`
  flex: 1;
  h3 { font-size: 1.1rem; margin-bottom: 0.5rem; }
  p { color: #666; font-size: 0.9rem; }
`;

const QuantitySelect = styled.select`
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Price = styled.div`
  font-weight: 700;
  font-size: 1.1rem;
  min-width: 80px;
  text-align: right;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: #e74c3c;
  cursor: pointer;
  font-size: 1rem;
  padding: 0.5rem;
  
  &:hover { color: #c0392b; }
`;

const Summary = styled.div`
  background: white; /* Changed from var(--grey-100) to white for simplicity or defined var */
  background-color: #f9f9f9;
  padding: 2rem;
  border-radius: 8px;
  height: fit-content;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-size: 1.1rem;
  
  &.total {
    font-weight: 700;
    font-size: 1.3rem;
    border-top: 1px solid #ddd;
    padding-top: 1rem;
    margin-top: 1rem;
  }
`;

const CheckoutButton = styled.button`
  background: var(--primary-color);
  color: white;
  width: 100%;
  padding: 1rem;
  border: none;
  border-radius: 4px;
  font-size: 1.1rem;
  font-weight: 600;
  margin-top: 1.5rem;
  
  &:hover {
    background: #34495e;
  }
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const CartPage = () => {
    const { cartItems, removeFromCart, addToCart } = useContext(CartContext);
    const navigate = useNavigate();

    const total = cartItems
        .reduce((acc, item) => acc + item.qty * item.price, 0)
        .toFixed(2);

    const handleCheckout = () => {
        navigate('/login?redirect=shipping');
    };

    return (
        <Container>
            <Title>Your Shopping Cart</Title>
            {cartItems.length === 0 ? (
                <div>
                    Your cart is empty. <Link to="/shop" style={{ color: 'var(--secondary-color)' }}>Go Shopping</Link>
                </div>
            ) : (
                <CartGrid>
                    <CartItems>
                        {cartItems.map((item) => (
                            <CartItem key={item.product}>
                                <img src={item.image} alt={item.name} />
                                <ItemInfo>
                                    <Link to={`/product/${item.product}`}>
                                        <h3>{item.name}</h3>
                                    </Link>
                                    <p>In Stock</p>
                                </ItemInfo>
                                <QuantitySelect
                                    value={item.qty}
                                    onChange={(e) =>
                                        addToCart({ ...item, _id: item.product }, Number(e.target.value))
                                    }
                                >
                                    {[...Array(item.countInStock || 10).keys()].slice(0, 10).map((x) => (
                                        <option key={x + 1} value={x + 1}>
                                            {x + 1}
                                        </option>
                                    ))}
                                </QuantitySelect>
                                <Price>£{item.price}</Price>
                                <RemoveButton onClick={() => removeFromCart(item.product)}>
                                    <FaTrash />
                                </RemoveButton>
                            </CartItem>
                        ))}
                    </CartItems>
                    <Summary>
                        <h2>Order Summary</h2>
                        <SummaryRow>
                            <span>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)} items)</span>
                            <span>£{total}</span>
                        </SummaryRow>
                        <SummaryRow>
                            <span>Shipping</span>
                            <span>Free</span>
                        </SummaryRow>
                        <SummaryRow className="total">
                            <span>Total</span>
                            <span>£{total}</span>
                        </SummaryRow>
                        <CheckoutButton onClick={handleCheckout}>
                            Proceed to Checkout
                        </CheckoutButton>
                    </Summary>
                </CartGrid>
            )}
        </Container>
    );
};

export default CartPage;
