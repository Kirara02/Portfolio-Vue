import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

// Get format from command line arguments
const format = process.argv[2] || 'ats';

function generateHTML(portfolio, format = 'ats') {
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
        iot: 'IoT Development',
        tools: 'Tools & Technologies',
        cloud: 'Cloud & DevOps',
        methodology: 'Methodologies'
    };

    switch (format) {
        case 'developer':
            return generateDeveloperFormat(portfolio, skillsByCategory, categoryTitles);
        case 'executive':
            return generateExecutiveFormat(portfolio, skillsByCategory, categoryTitles);
        case 'compact':
            return generateCompactFormat(portfolio, skillsByCategory, categoryTitles);
        case 'ats':
        default:
            return generateATSFormat(portfolio, skillsByCategory, categoryTitles);
    }
}

function generateATSFormat(portfolio, skillsByCategory, categoryTitles) {
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
      <div class="section-title">EDUCATION</div>
      ${portfolio.education ? portfolio.education.map(edu => `
      <div class="experience-item">
        <div class="job-header">
          <div>
            <div class="job-title">${edu.degree}</div>
            <div class="company">${edu.school}</div>
          </div>
          <div class="period">${edu.year}</div>
        </div>
        <div class="job-description">
          ${edu.description}
        </div>
      </div>
      `).join('') : ''}
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
        • Successfully developed and published 7+ applications on Google Play Store and Apple App Store<br />
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

function generateDeveloperFormat(portfolio, skillsByCategory, categoryTitles) {
   return `<!DOCTYPE html>
<html lang="en">
 <head>
   <meta charset="UTF-8" />
   <meta name="viewport" content="width=device-width, initial-scale=1.0" />
   <title>${portfolio.name} - Developer CV</title>
   <style>
     * {
       margin: 0;
       padding: 0;
       box-sizing: border-box;
     }

     body {
       font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
       line-height: 1.6;
       color: #f8f8f2;
       max-width: 900px;
       margin: 0 auto;
       padding: 20px;
       background: #282a36;
     }

     .header {
       text-align: center;
       margin-bottom: 30px;
       border-bottom: 2px solid #50fa7b;
       padding-bottom: 20px;
       background: #44475a;
       padding: 20px;
       border-radius: 8px;
     }

     .name {
       font-size: 32px;
       font-weight: bold;
       color: #50fa7b;
       margin-bottom: 5px;
     }

     .title {
       font-size: 18px;
       color: #6272a4;
       margin-bottom: 15px;
     }

     .contact-info {
       display: flex;
       justify-content: center;
       flex-wrap: wrap;
       gap: 20px;
       font-size: 14px;
       color: #f8f8f2;
     }

     .section {
       margin-bottom: 25px;
       background: #44475a;
       padding: 20px;
       border-radius: 8px;
       border-left: 4px solid #50fa7b;
     }

     .section-title {
       font-size: 20px;
       font-weight: bold;
       color: #50fa7b;
       margin-bottom: 15px;
       text-transform: uppercase;
       letter-spacing: 1px;
     }

     .code-block {
       background: #282a36;
       border: 1px solid #6272a4;
       border-radius: 4px;
       padding: 15px;
       margin: 10px 0;
       font-family: 'SF Mono', monospace;
       font-size: 14px;
       line-height: 1.5;
     }

     .keyword { color: #ff79c6; }
     .string { color: #f1fa8c; }
     .comment { color: #6272a4; }
     .function { color: #50fa7b; }

     .project-item {
       margin-bottom: 20px;
       border-left: 3px solid #bd93f9;
       padding-left: 15px;
     }

     .project-title {
       font-weight: bold;
       color: #bd93f9;
       margin-bottom: 5px;
       font-size: 18px;
     }

     .tech-stack {
       background: #282a36;
       padding: 8px 12px;
       border-radius: 4px;
       margin: 8px 0;
       font-size: 12px;
       color: #ffb86c;
       display: inline-block;
     }

     .skill-grid {
       display: grid;
       grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
       gap: 15px;
     }

     .skill-category {
       background: #282a36;
       padding: 15px;
       border-radius: 4px;
       border: 1px solid #6272a4;
     }

     .category-title {
       color: #50fa7b;
       font-weight: bold;
       margin-bottom: 10px;
       text-transform: uppercase;
       font-size: 12px;
     }

     .skill-list {
       display: flex;
       flex-wrap: wrap;
       gap: 8px;
     }

     .skill-item {
       background: #6272a4;
       color: #f8f8f2;
       padding: 4px 10px;
       border-radius: 12px;
       font-size: 12px;
       border: 1px solid #50fa7b;
     }

     .achievement-list {
       background: #282a36;
       padding: 15px;
       border-radius: 4px;
       border: 1px solid #ffb86c;
     }

     .achievement-item {
       color: #f8f8f2;
       margin-bottom: 8px;
       padding-left: 15px;
       position: relative;
     }

     .achievement-item:before {
       content: "▸";
       color: #50fa7b;
       position: absolute;
       left: 0;
     }

     .education-item {
       margin-bottom: 15px;
       border-left: 2px solid #bd93f9;
       padding-left: 15px;
     }

     .education-title {
       color: #bd93f9;
       font-size: 16px;
       margin-bottom: 5px;
     }

     .education-school {
       color: #ffb86c;
       font-size: 14px;
       margin-bottom: 8px;
     }

     .education-year {
       color: #6272a4;
       font-size: 12px;
       margin-bottom: 8px;
     }

     .education-description {
       color: #f8f8f2;
       font-size: 13px;
       line-height: 1.4;
     }
   </style>
 </head>
 <body>
   <div class="header">
     <div class="name">${portfolio.name}</div>
     <div class="title">${portfolio.title}</div>
     <div class="contact-info">
       <span>📧 ${portfolio.contact.email}</span>
       <span>📱 ${portfolio.contact.phone}</span>
       <span>📍 ${portfolio.contact.location}</span>
       <span>🔗 ${portfolio.contact.social.linkedin.replace('https://www.', '')}</span>
       <span>💻 ${portfolio.contact.social.github.replace('https://', '')}</span>
     </div>
   </div>

   <div class="section">
     <div class="section-title">// PROFESSIONAL SUMMARY</div>
     <div class="code-block">
       <span class="comment">/*</span><br>
       <span class="string">${portfolio.about.description}</span><br>
       <span class="comment">*/</span>
     </div>
   </div>

   <div class="section">
     <div class="section-title">// TECHNICAL SKILLS</div>
     <div class="skill-grid">
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
     <div class="section-title">// EDUCATION</div>
     ${portfolio.education ? portfolio.education.map(edu => `
     <div class="education-item">
       <div class="education-title">${edu.degree}</div>
       <div class="education-school">${edu.school}</div>
       <div class="education-year">${edu.year}</div>
       <div class="education-description">${edu.description}</div>
     </div>
     `).join('') : ''}
   </div>

   <div class="section">
     <div class="section-title">// KEY PROJECTS</div>
     ${portfolio.projects.map(project => `
     <div class="project-item">
       <div class="project-title">${project.title}</div>
       <div class="tech-stack">Tech: ${project.technologies.join(', ')}</div>
       <div class="code-block">
         <span class="comment">// ${project.description}</span>
       </div>
     </div>
     `).join('')}
   </div>

   <div class="section">
     <div class="section-title">// ACHIEVEMENTS</div>
     <div class="achievement-list">
       <div class="achievement-item">Successfully developed and published 7+ applications on Google Play Store and Apple App Store</div>
       <div class="achievement-item">Implemented AI integration with Google Gemini and OpenAI APIs in production</div>
       <div class="achievement-item">Built full-stack applications with Flutter frontend and Go backend</div>
       <div class="achievement-item">Experienced in real-time communication systems using WebSocket</div>
       <div class="achievement-item">Proficient in both cross-platform and native mobile development</div>
       <div class="achievement-item">Strong expertise in modern architecture patterns and clean code principles</div>
     </div>
   </div>
 </body>
</html>`;
}

function generateExecutiveFormat(portfolio, skillsByCategory, categoryTitles) {
   return `<!DOCTYPE html>
<html lang="en">
 <head>
   <meta charset="UTF-8" />
   <meta name="viewport" content="width=device-width, initial-scale=1.0" />
   <title>${portfolio.name} - Executive CV</title>
   <style>
     * {
       margin: 0;
       padding: 0;
       box-sizing: border-box;
     }

     body {
       font-family: "Times New Roman", serif;
       line-height: 1.6;
       color: #1a1a1a;
       max-width: 800px;
       margin: 0 auto;
       padding: 20px;
       background: white;
     }

     .header {
       text-align: center;
       margin-bottom: 30px;
       border-bottom: 3px solid #2c3e50;
       padding-bottom: 20px;
     }

     .name {
       font-size: 32px;
       font-weight: bold;
       color: #2c3e50;
       margin-bottom: 5px;
       text-transform: uppercase;
       letter-spacing: 2px;
     }

     .title {
       font-size: 18px;
       color: #7f8c8d;
       margin-bottom: 15px;
       font-style: italic;
     }

     .contact-info {
       display: flex;
       justify-content: center;
       flex-wrap: wrap;
       gap: 25px;
       font-size: 14px;
       color: #34495e;
     }

     .section {
       margin-bottom: 30px;
     }

     .section-title {
       font-size: 20px;
       font-weight: bold;
       color: #2c3e50;
       border-bottom: 2px solid #ecf0f1;
       padding-bottom: 8px;
       margin-bottom: 20px;
       text-transform: uppercase;
       letter-spacing: 1px;
     }

     .summary {
       text-align: justify;
       line-height: 1.8;
       font-size: 16px;
       color: #2c3e50;
     }

     .experience-item {
       margin-bottom: 25px;
       border-left: 4px solid #3498db;
       padding-left: 20px;
     }

     .job-header {
       display: flex;
       justify-content: space-between;
       align-items: flex-start;
       margin-bottom: 12px;
     }

     .job-title {
       font-weight: bold;
       font-size: 18px;
       color: #2c3e50;
     }

     .company {
       font-weight: bold;
       color: #e74c3c;
       font-size: 16px;
     }

     .period-location {
       text-align: right;
       color: #7f8c8d;
       font-size: 14px;
     }

     .job-description {
       text-align: justify;
       line-height: 1.7;
       color: #34495e;
     }

     .skills-section {
       display: grid;
       grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
       gap: 20px;
     }

     .skill-category {
       margin-bottom: 20px;
     }

     .category-title {
       font-weight: bold;
       color: #2c3e50;
       margin-bottom: 10px;
       font-size: 16px;
       text-transform: uppercase;
       letter-spacing: 0.5px;
     }

     .skill-list {
       display: flex;
       flex-wrap: wrap;
       gap: 10px;
     }

     .skill-item {
       background: #ecf0f1;
       padding: 6px 14px;
       border-radius: 20px;
       font-size: 14px;
       color: #2c3e50;
       border: 1px solid #bdc3c7;
     }

     .projects-section {
       display: grid;
       gap: 25px;
     }

     .project-item {
       border-left: 4px solid #e74c3c;
       padding-left: 20px;
       background: #f8f9fa;
       padding: 20px;
       border-radius: 4px;
     }

     .project-title {
       font-weight: bold;
       color: #2c3e50;
       margin-bottom: 8px;
       font-size: 18px;
     }

     .project-tech {
       font-size: 14px;
       color: #7f8c8d;
       margin-bottom: 12px;
       font-style: italic;
     }

     .project-description {
       text-align: justify;
       line-height: 1.7;
       color: #34495e;
     }

     .education-section {
       background: #f8f9fa;
       padding: 20px;
       border-radius: 4px;
       border-left: 4px solid #9b59b6;
       margin-bottom: 20px;
     }

     .education-item {
       margin-bottom: 15px;
     }

     .education-title {
       font-weight: bold;
       color: #2c3e50;
       margin-bottom: 5px;
     }

     .education-school {
       color: #e74c3c;
       font-style: italic;
       margin-bottom: 3px;
     }

     .education-year {
       color: #7f8c8d;
       font-size: 14px;
       margin-bottom: 8px;
     }

     .education-description {
       color: #34495e;
       line-height: 1.6;
     }

     .achievements-section {
       background: #f8f9fa;
       padding: 20px;
       border-radius: 4px;
       border-left: 4px solid #27ae60;
     }

     .achievement-list {
       list-style: none;
       padding: 0;
     }

     .achievement-item {
       margin-bottom: 10px;
       padding-left: 20px;
       position: relative;
       color: #34495e;
     }

     .achievement-item:before {
       content: "✓";
       color: #27ae60;
       font-weight: bold;
       position: absolute;
       left: 0;
     }
   </style>
 </head>
 <body>
   <div class="header">
     <div class="name">${portfolio.name}</div>
     <div class="title">${portfolio.title}</div>
     <div class="contact-info">
       <span>📧 ${portfolio.contact.email}</span>
       <span>📱 ${portfolio.contact.phone}</span>
       <span>📍 ${portfolio.contact.location}</span>
       <span>🔗 ${portfolio.contact.social.linkedin.replace('https://www.', '')}</span>
       <span>💻 ${portfolio.contact.social.github.replace('https://', '')}</span>
     </div>
   </div>

   <div class="section">
     <div class="section-title">Executive Summary</div>
     <div class="summary">
       ${portfolio.about.description}
     </div>
   </div>

   <div class="section">
     <div class="section-title">Professional Experience</div>
     ${portfolio.about.workHistory.map(job => `
     <div class="experience-item">
       <div class="job-header">
         <div>
           <div class="job-title">${job.position}</div>
           <div class="company">${job.company}</div>
         </div>
         <div class="period-location">
           <div>${job.period}</div>
           <div>${job.location}</div>
         </div>
       </div>
       <div class="job-description">
         ${job.description}
       </div>
     </div>
     `).join('')}
   </div>

   <div class="section">
     <div class="section-title">Technical Expertise</div>
     <div class="skills-section">
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
     <div class="section-title">Education</div>
     <div class="education-section">
       ${portfolio.education ? portfolio.education.map(edu => `
       <div class="education-item">
         <div class="education-title">${edu.degree}</div>
         <div class="education-school">${edu.school}</div>
         <div class="education-year">${edu.year}</div>
         <div class="education-description">${edu.description}</div>
       </div>
       `).join('') : ''}
     </div>
   </div>

   <div class="section">
     <div class="section-title">Key Projects & Achievements</div>
     <div class="projects-section">
       ${portfolio.projects.map(project => `
       <div class="project-item">
         <div class="project-title">${project.title}</div>
         <div class="project-tech">Technologies: ${project.technologies.join(', ')}</div>
         <div class="project-description">
           ${project.description}
         </div>
       </div>
       `).join('')}
     </div>
   </div>

   <div class="section">
     <div class="section-title">Professional Achievements</div>
     <div class="achievements-section">
       <ul class="achievement-list">
         <li class="achievement-item">Successfully developed and published 7+ applications on Google Play Store and Apple App Store</li>
         <li class="achievement-item">Implemented AI integration with Google Gemini and OpenAI APIs in production applications</li>
         <li class="achievement-item">Built full-stack applications with Flutter frontend and Go backend architecture</li>
         <li class="achievement-item">Experienced in real-time communication systems using WebSocket technology</li>
         <li class="achievement-item">Proficient in both cross-platform and native mobile development methodologies</li>
         <li class="achievement-item">Strong expertise in modern architecture patterns and clean code principles</li>
       </ul>
     </div>
   </div>
 </body>
</html>`;
}

function generateCompactFormat(portfolio, skillsByCategory, categoryTitles) {
   return `<!DOCTYPE html>
<html lang="en">
 <head>
   <meta charset="UTF-8" />
   <meta name="viewport" content="width=device-width, initial-scale=1.0" />
   <title>${portfolio.name} - Compact CV</title>
   <style>
     * {
       margin: 0;
       padding: 0;
       box-sizing: border-box;
     }

     body {
       font-family: "Arial", sans-serif;
       line-height: 1.4;
       color: #333;
       max-width: 800px;
       margin: 0 auto;
       padding: 15px;
       background: white;
       font-size: 12px;
     }

     .header {
       text-align: center;
       margin-bottom: 20px;
       border-bottom: 2px solid #2563eb;
       padding-bottom: 15px;
     }

     .name {
       font-size: 24px;
       font-weight: bold;
       color: #1e40af;
       margin-bottom: 3px;
     }

     .title {
       font-size: 14px;
       color: #64748b;
       margin-bottom: 10px;
     }

     .contact-info {
       display: flex;
       justify-content: center;
       flex-wrap: wrap;
       gap: 15px;
       font-size: 11px;
     }

     .section {
       margin-bottom: 15px;
     }

     .section-title {
       font-size: 14px;
       font-weight: bold;
       color: #1e40af;
       border-bottom: 1px solid #e2e8f0;
       padding-bottom: 3px;
       margin-bottom: 8px;
       text-transform: uppercase;
     }

     .summary {
       text-align: justify;
       line-height: 1.5;
     }

     .experience-item {
       margin-bottom: 12px;
     }

     .job-header {
       display: flex;
       justify-content: space-between;
       align-items: center;
       margin-bottom: 5px;
     }

     .job-title {
       font-weight: bold;
       font-size: 13px;
       color: #1e40af;
     }

     .company {
       font-weight: bold;
       color: #374151;
       font-size: 12px;
     }

     .period {
       color: #6b7280;
       font-size: 11px;
     }

     .job-description {
       text-align: justify;
       line-height: 1.4;
     }

     .skills-grid {
       display: grid;
       grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
       gap: 10px;
     }

     .skill-category {
       margin-bottom: 10px;
     }

     .category-title {
       font-weight: bold;
       color: #374151;
       margin-bottom: 5px;
       font-size: 11px;
     }

     .skill-list {
       display: flex;
       flex-wrap: wrap;
       gap: 5px;
     }

     .skill-item {
       background: #f1f5f9;
       padding: 3px 8px;
       border-radius: 10px;
       font-size: 10px;
       color: #374151;
     }

     .projects-grid {
       display: grid;
       gap: 12px;
     }

     .project-item {
       border-left: 2px solid #2563eb;
       padding-left: 10px;
     }

     .project-title {
       font-weight: bold;
       color: #1e40af;
       margin-bottom: 3px;
       font-size: 13px;
     }

     .project-tech {
       font-size: 10px;
       color: #6b7280;
       margin-bottom: 5px;
     }

     .project-description {
       text-align: justify;
       line-height: 1.4;
     }

     .education-section {
       background: #f8f9fa;
       padding: 15px;
       border-radius: 4px;
       border-left: 3px solid #9b59b6;
       margin-bottom: 15px;
     }

     .education-item {
       margin-bottom: 12px;
     }

     .education-title {
       font-weight: bold;
       color: #1e40af;
       margin-bottom: 3px;
       font-size: 13px;
     }

     .education-school {
       color: #e74c3c;
       font-size: 12px;
       margin-bottom: 2px;
     }

     .education-year {
       color: #6b7280;
       font-size: 11px;
       margin-bottom: 5px;
     }

     .education-description {
       color: #374151;
       font-size: 11px;
       line-height: 1.4;
     }

     .achievements {
       line-height: 1.5;
     }

     @media print {
       body {
         margin: 0;
         padding: 10px;
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
       <span>📧 ${portfolio.contact.email}</span>
       <span>📱 ${portfolio.contact.phone}</span>
       <span>📍 ${portfolio.contact.location}</span>
       <span>🔗 ${portfolio.contact.social.linkedin.replace('https://www.', '')}</span>
       <span>💻 ${portfolio.contact.social.github.replace('https://', '')}</span>
     </div>
   </div>

   <div class="section">
     <div class="section-title">Summary</div>
     <div class="summary">
       ${portfolio.about.description}
     </div>
   </div>

   <div class="section">
     <div class="section-title">Experience</div>
     ${portfolio.about.workHistory.map(job => `
     <div class="experience-item">
       <div class="job-header">
         <div>
           <div class="job-title">${job.position}</div>
           <div class="company">${job.company}</div>
         </div>
         <div class="period">${job.period}</div>
       </div>
       <div class="job-description">
         ${job.description}
       </div>
     </div>
     `).join('')}
   </div>

   <div class="section">
     <div class="section-title">Skills</div>
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
     <div class="section-title">Education</div>
     <div class="education-section">
       ${portfolio.education ? portfolio.education.map(edu => `
       <div class="education-item">
         <div class="education-title">${edu.degree}</div>
         <div class="education-school">${edu.school}</div>
         <div class="education-year">${edu.year}</div>
         <div class="education-description">${edu.description}</div>
       </div>
       `).join('') : ''}
     </div>
   </div>

   <div class="section">
     <div class="section-title">Projects</div>
     <div class="projects-grid">
       ${portfolio.projects.map(project => `
       <div class="project-item">
         <div class="project-title">${project.title}</div>
         <div class="project-tech">${project.technologies.join(', ')}</div>
         <div class="project-description">
           ${project.description}
         </div>
       </div>
       `).join('')}
     </div>
   </div>

   <div class="section">
     <div class="section-title">Achievements</div>
     <div class="achievements">
       • 7+ published apps on Play Store & App Store<br>
       • AI integration with Gemini & OpenAI<br>
       • Full-stack Flutter + Go development<br>
       • Real-time WebSocket communication<br>
       • Cross-platform & native expertise<br>
       • Clean architecture & modern patterns
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

        // Generate HTML from portfolio data with selected format
        const htmlContent = generateHTML(portfolioData, format);

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

        // Save PDF to public/assets/ with format-specific name
        const formatSuffix = format === 'ats' ? '' : `_${format.charAt(0).toUpperCase() + format.slice(1)}`;
        const outputPath = `public/assets/Fathul_Hidayat_CV${formatSuffix}.pdf`;
        fs.writeFileSync(outputPath, pdfBuffer);

        console.log(`✅ CV generated successfully (${format} format): ${outputPath}`);
        console.log(`📖 Available formats: ats, developer, executive, compact`);
        console.log(`💡 Usage: node cv-generator.mjs [format]`);

        await browser.close();

    } catch (error) {
        console.error('❌ Error generating CV:', error);
    }
}

generateCV();
