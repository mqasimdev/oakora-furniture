import React, { useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaShoppingBag, FaUser, FaSearch } from 'react-icons/fa';
import CartContext from '../context/CartContext';
import UserContext from '../context/UserContext';

const HeaderContainer = styled.header`
  background: white;
  border-bottom: 1px solid #eee;
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  font-family: 'Cinzel', serif;
  font-size: 2.2rem;
  font-weight: 700;
  color: var(--primary-color);
  letter-spacing: 2px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Menu = styled.ul`
  display: flex;
  gap: 2rem;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const MenuItem = styled.li`
  font-weight: 500;
  color: var(--text-color);
  
  &:hover {
    color: var(--secondary-color);
  }
`;

const IconGroup = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;
`;

const IconLink = styled(Link)`
  font-size: 1.2rem;
  color: var(--primary-color);
  position: relative;
  
  &:hover {
    color: var(--secondary-color);
  }
`;

const Badge = styled.span`
  position: absolute;
  top: -8px;
  right: -8px;
  background: var(--secondary-color);
  color: white;
  font-size: 0.7rem;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
`;

const UserDropdown = styled.div`
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  
  &:hover .dropdown {
    display: block;
  }
`;

const DropdownMenu = styled.div`
  display: none;
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border: 1px solid #eee;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  width: 150px;
  padding: 0.5rem 0;
  
  a, button {
    display: block;
    width: 100%;
    padding: 0.5rem 1rem;
    text-align: left;
    background: none;
    border: none;
    font-size: 0.9rem;
    color: #333;
    
    &:hover {
      background: #f9f9f9;
      color: var(--secondary-color);
    }
  }
`;

const Header = () => {
  const { cartItems } = useContext(CartContext);
  const { userInfo, logout } = useContext(UserContext);

  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <HeaderContainer>
      <div className="container">
        <Nav>
          <Logo to="/">
            <img src="https://cdn-icons-png.flaticon.com/512/5778/5778393.png" alt="Oak Logo" style={{ height: '35px', opacity: 0.8 }} />
            OAKORA
          </Logo>

          <Menu>
            <MenuItem><Link to="/">Home</Link></MenuItem>
            <MenuItem><Link to="/shop">Shop</Link></MenuItem>
            <MenuItem><Link to="/shop?category=beds">Beds</Link></MenuItem>
            <MenuItem><Link to="/shop?category=sofas">Sofas</Link></MenuItem>
            <MenuItem><Link to="/shop?category=dining">Dining</Link></MenuItem>
            <MenuItem><Link to="/shop?category=wardrobes">Wardrobes</Link></MenuItem>
          </Menu>

          <IconGroup>
            <IconLink to="/shop"><FaSearch /></IconLink>

            <IconLink to="/cart">
              <FaShoppingBag />
              {cartCount > 0 && <Badge>{cartCount}</Badge>}
            </IconLink>

            {userInfo ? (
              <UserDropdown>
                <FaUser /> <span>{userInfo.name.split(' ')[0]}</span>
                <DropdownMenu className="dropdown">
                  <Link to="/profile">Profile</Link>
                  {userInfo.isAdmin && (
                    <Link to="/admin/productlist">Admin Dashboard</Link>
                  )}
                  <button onClick={logout}>Logout</button>
                </DropdownMenu>
              </UserDropdown>
            ) : (
              <IconLink to="/login"><FaUser /></IconLink>
            )}
          </IconGroup>
        </Nav>
      </div>
    </HeaderContainer>
  );
};

export default Header;
