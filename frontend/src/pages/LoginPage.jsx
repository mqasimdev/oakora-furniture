import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';

const Container = styled.div`
  max-width: 400px;
  margin: 4rem auto;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: var(--shadow);
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  
  label {
    margin-bottom: 0.5rem;
    font-weight: 500;
  }
  
  input {
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
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 600;
  margin-top: 1rem;
  transition: background 0.3s;
  
  &:hover {
    background: #34495e;
  }
`;

const Message = styled.div`
  background: #ffcfcf;
  color: #c0392b;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
`;

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const { login, userInfo } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  const redirect = new URLSearchParams(location.search).get('redirect') || '/';

  useEffect(() => {
    if (userInfo) {
      // Ensure we don't redirect to loop or invalid relative path
      const target = redirect === '/' ? '/' : (redirect.startsWith('/') ? redirect : `/${redirect}`);
      navigate(target);
    }
  }, [userInfo, navigate, redirect]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const result = await login(email, password);
    if (!result.success) {
      setError(result.error);
    }
  };

  return (
    <Container>
      <Title>Sign In</Title>
      {error && <Message>{error}</Message>}
      <Form onSubmit={submitHandler}>
        <InputGroup>
          <label>Email Address</label>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </InputGroup>

        <InputGroup>
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </InputGroup>

        <Button type="submit">Sign In</Button>
      </Form>

      <div className="text-center my-1">
        New Customer? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'} style={{ fontWeight: 'bold' }}>Register</Link>
      </div>
    </Container>
  );
};

export default LoginPage;
