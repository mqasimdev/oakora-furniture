import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../config';
import ProductCard from '../components/ProductCard';

const Container = styled.div`
  max-width: 1200px;
  margin: 4rem auto;
  padding: 0 20px;
`;

const Header = styled.div`
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  text-transform: capitalize;
`;

const FilterGrid = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FilterSidebar = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid #eee;
  height: fit-content;
`;

const FilterGroup = styled.div`
  margin-bottom: 2rem;
  
  h3 {
    font-size: 1rem;
    margin-bottom: 1rem;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  
  ul li {
    margin-bottom: 0.5rem;
    cursor: pointer;
    color: #666;
    
    &:hover, &.active {
      color: var(--secondary-color);
      font-weight: 500;
    }
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 2rem;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 3rem;
  gap: 0.5rem;
  
  button {
    padding: 0.5rem 1rem;
    border: 1px solid #ddd;
    background: white;
    
    &.active {
      background: var(--primary-color);
      color: white;
      border-color: var(--primary-color);
    }
    
    &:disabled {
      color: #ccc;
    }
  }
`;

const ShopPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const categoryParam = searchParams.get('category') || '';
    const searchParam = searchParams.get('search') || '';

    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [loading, setLoading] = useState(true);

    // Filters
    const [selectedCategory, setSelectedCategory] = useState(categoryParam);
    // We could add price filter state here too

    useEffect(() => {
        setSelectedCategory(categoryParam);
    }, [categoryParam]);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                let url = `${BASE_URL}/api/products?pageNumber=${page}`;
                if (selectedCategory) url += `&category=${selectedCategory}`;
                if (searchParam) url += `&keyword=${searchParam}`;

                const { data } = await axios.get(url);
                setProducts(data.products);
                setPage(data.page);
                setPages(data.pages);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };
        fetchProducts();
    }, [page, selectedCategory, searchParam]);

    const handleCategoryChange = (cat) => {
        setSelectedCategory(cat);
        setSearchParams({ category: cat });
        setPage(1);
    };

    return (
        <Container className="fade-in">
            <Header>
                <Title>{selectedCategory || 'All Products'}</Title>
            </Header>

            <FilterGrid>
                <FilterSidebar>
                    <FilterGroup>
                        <h3>Categories</h3>
                        <ul>
                            <li
                                className={selectedCategory === '' ? 'active' : ''}
                                onClick={() => handleCategoryChange('')}
                            >All</li>
                            <li
                                className={selectedCategory === 'beds' ? 'active' : ''}
                                onClick={() => handleCategoryChange('beds')}
                            >Beds</li>
                            <li
                                className={selectedCategory === 'sofas' ? 'active' : ''}
                                onClick={() => handleCategoryChange('sofas')}
                            >Sofas</li>
                            <li
                                className={selectedCategory === 'wardrobes' ? 'active' : ''}
                                onClick={() => handleCategoryChange('wardrobes')}
                            >Wardrobes</li>
                            <li
                                className={selectedCategory === 'dining' ? 'active' : ''}
                                onClick={() => handleCategoryChange('dining')}
                            >Dining</li>
                        </ul>
                    </FilterGroup>
                    {/* Price filter could go here */}
                </FilterSidebar>

                <div>
                    {loading ? (
                        <div>Loading...</div>
                    ) : products.length === 0 ? (
                        <div>No products found.</div>
                    ) : (
                        <>
                            <ProductGrid className="fade-in">
                                {products.map(product => (
                                    <ProductCard key={product._id} product={product} />
                                ))}
                            </ProductGrid>

                            {pages > 1 && (
                                <Pagination>
                                    {[...Array(pages).keys()].map(x => (
                                        <button
                                            key={x + 1}
                                            className={x + 1 === page ? 'active' : ''}
                                            onClick={() => setPage(x + 1)}
                                        >
                                            {x + 1}
                                        </button>
                                    ))}
                                </Pagination>
                            )}
                        </>
                    )}
                </div>
            </FilterGrid>
        </Container>
    );
};

export default ShopPage;
