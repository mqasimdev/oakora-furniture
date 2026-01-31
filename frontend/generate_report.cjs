const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
    console.log("Starting Report Generation...");
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Set viewport to HD
    await page.setViewport({ width: 1366, height: 768 });

    const baseUrl = 'http://localhost:5173';

    // Define pages to capture
    const routes = [
        { url: `${baseUrl}/`, name: 'Home Landing Page' },
        { url: `${baseUrl}/shop`, name: 'Shop All Products' },
        { url: `${baseUrl}/shop?category=beds`, name: 'Category: Beds' },
        { url: `${baseUrl}/shop?category=sofas`, name: 'Category: Sofas' },
        { url: `${baseUrl}/shop?category=wardrobes`, name: 'Category: Wardrobes' },
        { url: `${baseUrl}/login`, name: 'Login Page' },
        { url: `${baseUrl}/register`, name: 'Register Page' },
    ];

    const screenshots = [];
    const screenshotDir = path.join(__dirname, 'report_screenshots');

    if (!fs.existsSync(screenshotDir)) {
        fs.mkdirSync(screenshotDir);
    }

    // 1. Capture Screenshots
    for (const route of routes) {
        console.log(`Capturing ${route.name}...`);
        try {
            await page.goto(route.url, { waitUntil: 'networkidle0', timeout: 30000 });
            // Add a small delay for animations
            await new Promise(r => setTimeout(r, 1000));

            const filePath = path.join(screenshotDir, `${route.name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.png`);
            await page.screenshot({ path: filePath, fullPage: true });
            screenshots.push({ name: route.name, path: filePath });
        } catch (e) {
            console.error(`Failed to capture ${route.name}:`, e);
        }
    }

    await browser.close();

    console.log("Screenshots captured. Compiling PDF...");

    // 2. Generate PDF using Puppeteer
    const reportBrowser = await puppeteer.launch();
    const reportPage = await reportBrowser.newPage();

    const today = new Date().toLocaleDateString('en-GB', {
        day: 'numeric', month: 'long', year: 'numeric'
    });

    let htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Project Report: OAKORA</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Outfit:wght@300;400;600&display=swap');
          
          body { 
            font-family: 'Outfit', sans-serif; 
            color: #333;
            max-width: 100%;
            margin: 0;
            padding: 40px;
          }
          
          h1, h2, h3 { font-family: 'Cinzel', serif; color: #2c3e50; }
          
          .cover {
            height: 90vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            page-break-after: always;
            border: 2px solid #2c3e50;
          }
          
          .cover h1 { font-size: 4rem; margin-bottom: 0.5rem; }
          .cover p { font-size: 1.5rem; color: #7f8c8d; }
          
          .section { margin-bottom: 50px; page-break-after: always; }
          
          .screenshot-container {
            text-align: center;
            margin-top: 20px;
          }
          
          img {
            max-width: 100%;
            border: 1px solid #ddd;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            border-radius: 4px;
          }
          
          .features-list {
            text-align: left;
            max-width: 600px;
            margin: 2rem auto;
            line-height: 1.6;
          }
        </style>
      </head>
      <body>
      
        <div class="cover">
            <h1>OAKORA</h1>
            <p>Premium British Furniture</p>
            <br/>
            <h3>Full Stack E-Commerce Project Report</h3>
            <p>${today}</p>
            
            <div class="features-list">
                <h3>Technical Overview</h3>
                <ul>
                    <li><strong>Frontend:</strong> React, Vite, Styled Components</li>
                    <li><strong>Backend:</strong> Node.js, Express, MongoDB (Atlas/Memory)</li>
                    <li><strong>Authentication:</strong> JWT (JSON Web Tokens)</li>
                    <li><strong>State Management:</strong> React Context API (User & Cart)</li>
                </ul>
                
                <h3>Key Features</h3>
                <ul>
                    <li>Responsive Premium UI Design</li>
                    <li>Product Catalog with Categories (Beds, Sofas, Wardrobes, Dining)</li>
                    <li>Shopping Cart & Checkout Flow</li>
                    <li>User Authentication (Login/Register) & Profile Management</li>
                    <li>Order Management & History</li>
                </ul>
            </div>
        </div>
  `;

    // Add Screenshots
    for (const s of screenshots) {
        // Read image file to base64
        const bitmap = fs.readFileSync(s.path);
        const base64 = Buffer.from(bitmap).toString('base64');
        const imgSrc = `data:image/png;base64,${base64}`;

        htmlContent += `
        <div class="section">
            <h2>${s.name}</h2>
            <div class="screenshot-container">
                <img src="${imgSrc}" />
            </div>
        </div>
        `;
    }

    htmlContent += `</body></html>`;

    await reportPage.setContent(htmlContent);
    await reportPage.pdf({
        path: path.join(__dirname, 'OAKORA_Project_Report.pdf'),
        format: 'A4',
        printBackground: true,
        margin: { top: '20px', bottom: '20px' }
    });

    await reportBrowser.close();
    console.log("PDF Report Successfully Generated!");
})();
