import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

function generateHTML(portfolio) {
    const skillsByCategory = portfolio.skills.reduce((acc, skill) => {
        if (!acc[skill.category]) acc[skill.category] = [];
        acc[skill.category].push(skill.name);
        return acc;
    }, {});

    const categoryTitles = {
        mobile: 'Mobile Development',
        android: 'Android Development',
        ios: 'iOS Development',
        backend: 'Backend Development',
        web: 'Web Development',
        desktop: 'Desktop Development',
        iot: 'IoT Development'
    };

    return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${portfolio.name} - ${portfolio.title} CV</title>
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      body {
        font-family: "Arial", sans-serif;
        line-height: 1.6;
        color: #333;
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
        background: white;
      }

      .header {
        text-align: center;
        margin-bottom: 30px;
        border-bottom: 3px solid #2563eb;
        padding-bottom: 20px;
      }

      .name {
        font-size: 28px;
        font-weight: bold;
        color: #1e40af;
        margin-bottom: 5px;
      }

      .title {
        font-size: 18px;
        color: #64748b;
        margin-bottom: 15px;
      }

      .contact-info {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 20px;
        font-size: 14px;
      }

      .contact-item {
        display: flex;
        align-items: center;
        gap: 5px;
      }

      .section {
        margin-bottom: 25px;
      }

      .section-title {
        font-size: 18px;
        font-weight: bold;
        color: #1e40af;
        border-bottom: 2px solid #e2e8f0;
        padding-bottom: 5px;
        margin-bottom: 15px;
      }

      .summary {
        text-align: justify;
        line-height: 1.8;
      }

      .experience-item {
        margin-bottom: 20px;
      }

      .job-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 8px;
      }

      .job-title {
        font-weight: bold;
        font-size: 16px;
        color: #1e40af;
      }

      .company {
        font-weight: bold;
        color: #374151;
      }

      .period {
        color: #6b7280;
        font-size: 14px;
      }

      .location {
        color: #6b7280;
        font-size: 14px;
      }

      .job-description {
        text-align: justify;
        line-height: 1.6;
      }

      .skills-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 15px;
      }

      .skill-category {
        margin-bottom: 15px;
      }

      .category-title {
        font-weight: bold;
        color: #374151;
        margin-bottom: 8px;
        font-size: 14px;
      }

      .skill-list {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }

      .skill-item {
        background: #f1f5f9;
        padding: 4px 12px;
        border-radius: 15px;
        font-size: 13px;
        color: #374151;
      }

      .projects-grid {
        display: grid;
        gap: 20px;
      }

      .project-item {
        border-left: 3px solid #2563eb;
        padding-left: 15px;
        margin-bottom: 15px;
      }

      .project-title {
        font-weight: bold;
        color: #1e40af;
        margin-bottom: 5px;
      }

      .project-tech {
        font-size: 13px;
        color: #6b7280;
        margin-bottom: 8px;
      }

      .project-description {
        text-align: justify;
        line-height: 1.6;
        font-size: 14px;
      }

      @media print {
        body {
          margin: 0;
          padding: 15px;
        }

        .section {
          page-break-inside: avoid;
        }
      }
    </style>
  </head>
  <body>
    <div class="header">
      <div class="name">${portfolio.name}</div>
      <div class="title">${portfolio.title}</div>
      <div class="contact-info">
        <div class="contact-item">📧 ${portfolio.contact.email}</div>
        <div class="contact-item">📱 ${portfolio.contact.phone}</div>
        <div class="contact-item">📍 ${portfolio.contact.location}</div>
        <div class="contact-item">🔗 ${portfolio.contact.social.linkedin.replace('https://www.', '')}</div>
        <div class="contact-item">💻 ${portfolio.contact.social.github.replace('https://', '')}</div>
      </div>
    </div>

    <div class="section">
      <div class="section-title">PROFESSIONAL SUMMARY</div>
      <div class="summary">
        ${portfolio.about.description}
      </div>
    </div>

    <div class="section">
      <div class="section-title">PROFESSIONAL EXPERIENCE</div>
      ${portfolio.about.workHistory.map(job => `
      <div class="experience-item">
        <div class="job-header">
          <div>
            <div class="job-title">${job.position}</div>
            <div class="company">${job.company}</div>
          </div>
          <div>
            <div class="period">${job.period}</div>
            <div class="location">${job.location}</div>
          </div>
        </div>
        <div class="job-description">
          ${job.description}
        </div>
      </div>
      `).join('')}
    </div>

    <div class="section">
      <div class="section-title">TECHNICAL SKILLS</div>
      <div class="skills-grid">
        ${Object.entries(skillsByCategory).map(([category, skills]) => `
        <div class="skill-category">
          <div class="category-title">${categoryTitles[category] || category}</div>
          <div class="skill-list">
            ${skills.map(skill => `<span class="skill-item">${skill}</span>`).join('')}
          </div>
        </div>
        `).join('')}
      </div>
    </div>

    <div class="section">
      <div class="section-title">KEY PROJECTS</div>
      <div class="projects-grid">
        ${portfolio.projects.map(project => `
        <div class="project-item">
          <div class="project-title">${project.title}</div>
          <div class="project-tech">
            ${project.technologies.join(', ')}
          </div>
          <div class="project-description">
            ${project.description}
          </div>
        </div>
        `).join('')}
      </div>
    </div>

    <div class="section">
      <div class="section-title">ACHIEVEMENTS</div>
      <div class="summary">
        • Successfully developed and published 6+ applications on Google Play Store<br />
        • Implemented AI integration with Google Gemini and OpenAI APIs in production applications<br />
        • Built full-stack applications with Flutter frontend and Go backend<br />
        • Experienced in real-time communication systems using WebSocket<br />
        • Proficient in both cross-platform and native mobile development<br />
        • Strong expertise in modern architecture patterns and clean code principles
      </div>
    </div>
  </body>
</html>`;
}

async function generateCV() {
    try {
        console.log('🚀 Starting CV generation...');

        // Read portfolio data
        const portfolioData = JSON.parse(fs.readFileSync('src/data/portfolio.json', 'utf8'));

        // Generate HTML from portfolio data
        const htmlContent = generateHTML(portfolioData);

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

        // Save PDF to public/assets/
        const outputPath = 'public/assets/Fathul_Hidayat_CV.pdf';
        fs.writeFileSync(outputPath, pdfBuffer);

        console.log(`✅ CV generated successfully: ${outputPath}`);

        await browser.close();

    } catch (error) {
        console.error('❌ Error generating CV:', error);
    }
}

generateCV();
