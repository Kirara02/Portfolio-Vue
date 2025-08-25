import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

async function generateCV() {
    try {
        console.log('🚀 Starting CV generation...');
        
        // Read the HTML template
        const htmlContent = fs.readFileSync('cv-template.html', 'utf8');
        
        // Launch browser
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        
        const page = await browser.newPage();
        
        // Set content and wait for it to load
        await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
        
        // Generate PDF
        const pdfBuffer = await page.pdf({
            format: 'A4',
            printBackground: true,
            margin: {
                top: '20mm',
                right: '20mm',
                bottom: '20mm',
                left: '20mm'
            }
        });
        
        // Save PDF
        const outputPath = 'Fathul_Hidayat_CV.pdf';
        fs.writeFileSync(outputPath, pdfBuffer);
        
        console.log(`✅ CV generated successfully: ${outputPath}`);
        
        await browser.close();
        
    } catch (error) {
        console.error('❌ Error generating CV:', error);
    }
}

generateCV();
