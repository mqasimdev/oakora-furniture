import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

const Hero = styled.section`
  background: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&w=1920&q=80');
  background-size: cover;
  background-position: center;
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
`;

const HeroContent = styled.div`
  max-width: 800px;
  padding: 20px;
  
  h1 {
    font-size: 3.5rem;
    margin-bottom: 1rem;
    text-shadow: 0 2px 4px rgba(0,0,0,0.3);
  }
  
  p {
    font-size: 1.2rem;
    margin-bottom: 2rem;
    text-shadow: 0 1px 2px rgba(0,0,0,0.3);
  }
`;

const PrimaryButton = styled(Link)`
  background: var(--secondary-color);
  color: white;
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 4px;
  transition: background 0.3s;
  
  &:hover {
    background: #d35400;
    color: white;
  }
`;

const Section = styled.section`
  padding: 4rem 0;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  position: relative;
  
  &:after {
    content: '';
    display: block;
    width: 60px;
    height: 3px;
    background: var(--secondary-color);
    margin: 1rem auto 0;
  }
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
`;

const CategoryCard = styled(Link)`
  position: relative;
  height: 300px;
  overflow: hidden;
  border-radius: 8px;
  
  &:hover img {
    transform: scale(1.1);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s;
  }
`;

const CategoryOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  
  h3 {
    color: white;
    font-size: 2rem;
    text-shadow: 0 2px 4px rgba(0,0,0,0.5);
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
`;

const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/products?pageNumber=1');
        setProducts(data.products.slice(0, 8)); // Just show 8
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <>
      <Hero>
        <HeroContent>
          <h1>Modern British Furniture Design</h1>
          <p>Curated collections for every room. Quality craftsmanship delivered to your door.</p>
          <PrimaryButton to="/shop">Shop Collection</PrimaryButton>
        </HeroContent>
      </Hero>

      <div className="container">
        <Section>
          <SectionTitle>Shop by Category</SectionTitle>
          <CategoryGrid>
            <CategoryCard to="/shop?category=beds">
              <img src="/images/beds/bed1.jpg" alt="Beds" />
              <CategoryOverlay><h3>Beds</h3></CategoryOverlay>
            </CategoryCard>
            <CategoryCard to="/shop?category=sofas">
              <img src="/images/sofas/sofa1.jpg" alt="Sofas" />
              <CategoryOverlay><h3>Sofas</h3></CategoryOverlay>
            </CategoryCard>
            <CategoryCard to="/shop?category=wardrobes">
              <img src="/images/wardrobes/war1.jpg" alt="Wardrobes" />
              <CategoryOverlay><h3>Wardrobes</h3></CategoryOverlay>
            </CategoryCard>
            <CategoryCard to="/shop?category=dining">
              <img src="https://images.unsplash.com/photo-1617806118233-18e1de247200?q=80&w=800&auto=format&fit=crop" alt="Dining" />
              <CategoryOverlay><h3>Dining</h3></CategoryOverlay>
            </CategoryCard>
          </CategoryGrid>
        </Section>

        <Section>
          <SectionTitle>Featured Products</SectionTitle>
          <Grid>
            {products.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </Grid>
          <div className="text-center" style={{ marginTop: '3rem' }}>
            <PrimaryButton to="/shop">View All Products</PrimaryButton>
          </div>
        </Section>
      </div>
    </>
  );
};

export default HomePage;
