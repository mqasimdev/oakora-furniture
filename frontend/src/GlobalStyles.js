import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
    --primary-color: #2c3e50;
    --secondary-color: #e67e22; /* Burnt orange/leather tone */
    --accent-color: #27ae60;
    --text-color: #333;
    --light-text: #777;
    --background-color: #fcfcfc;
    --white: #ffffff;
    --grey-100: #f4f4f4;
    --grey-200: #eee;
    --border-color: #ddd;
    --shadow: 0 4px 6px rgba(0,0,0,0.05);
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Outfit', sans-serif;
    background-color: var(--background-color);
    color: var(--text-color);
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
  }

  a {
    text-decoration: none;
    color: inherit;
    transition: color 0.3s;
  }

  ul {
    list-style: none;
  }

  img {
    max-width: 100%;
    display: block;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    line-height: 1.25;
    margin-bottom: 0.5em;
  }

  button {
    cursor: pointer;
    font-family: inherit;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }

  /* Utility classes */
  .text-center { text-align: center; }
  .my-1 { margin: 1rem 0; }
  .my-2 { margin: 2rem 0; }
  .py-2 { padding: 2rem 0; }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .fade-in {
    animation: fadeIn 0.5s ease-out forwards;
  }
`;

export default GlobalStyle;
