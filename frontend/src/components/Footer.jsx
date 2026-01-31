import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background: var(--primary-color);
  color: white;
  padding: 3rem 0;
  margin-top: 4rem;
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  
  h4 {
    margin-bottom: 1.5rem;
    font-size: 1.2rem;
  }
  
  ul li {
    margin-bottom: 0.8rem;
    color: #bdc3c7;
    cursor: pointer;
    
    &:hover {
      color: white;
    }
  }
`;

const Footer = () => {
    return (
        <FooterContainer>
            <div className="container">
                <FooterContent>
                    <div>
                        <h4 style={{ fontFamily: 'Cinzel, serif', letterSpacing: '1px' }}>OAKORA</h4>
                        <p style={{ color: '#bdc3c7' }}>Premium British design for your home. Quality craftsmanship, sustainable materials, and timeless style.</p>
                    </div>
                    <div>
                        <h4>Shop</h4>
                        <ul>
                            <li>Beds</li>
                            <li>Sofas</li>
                            <li>Wardrobes</li>
                            <li>Dining</li>
                        </ul>
                    </div>
                    <div>
                        <h4>Customer Service</h4>
                        <ul>
                            <li>Contact Us</li>
                            <li>Delivery & Returns</li>
                            <li>Warranty</li>
                            <li>FAQ</li>
                        </ul>
                    </div>
                    <div>
                        <h4>Newsletter</h4>
                        <p style={{ color: '#bdc3c7', marginBottom: '1rem' }}>Subscribe for latest offers.</p>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            style={{
                                padding: '0.5rem',
                                width: '100%',
                                marginBottom: '0.5rem',
                                border: 'none'
                            }}
                        />
                        <button
                            style={{
                                padding: '0.5rem 1rem',
                                background: 'var(--secondary-color)',
                                color: 'white',
                                border: 'none',
                                width: '100%',
                                fontWeight: 'bold'
                            }}
                        >
                            Subscribe
                        </button>
                    </div>
                </FooterContent>
                <div className="text-center" style={{ marginTop: '3rem', color: '#7f8c8d' }}>
                    &copy; {new Date().getFullYear()} OAKORA. All rights reserved.
                </div>
            </div>
        </FooterContainer>
    );
};

export default Footer;
