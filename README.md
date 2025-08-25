# Portfolio Website - Fathul Hidayat

A modern portfolio website built with Vue 3, TypeScript, and Vite. Features a responsive design with dark/light theme toggle and smooth scrolling navigation.

## 🚀 Features

- **Responsive Design** - Works on desktop, tablet, and mobile
- **Dark/Light Theme** - Toggle between themes
- **Smooth Scrolling** - Smooth navigation between sections
- **Modern UI** - Clean and professional design
- **TypeScript** - Type-safe development
- **Vite** - Fast development and build

## 📋 Sections

- **Home** - Introduction and hero section
- **About** - Professional summary and work history
- **Skills** - Technical skills with categories
- **Projects** - Portfolio projects with technologies
- **Contact** - Contact information and social links

## 🛠️ Tech Stack

- **Frontend**: Vue 3 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **State Management**: Vue Composables
- **Build Tool**: Vite

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd portofolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

## 📄 Generate CV PDF

This project includes functionality to generate an ATS-friendly CV PDF from the portfolio data.

### Prerequisites for PDF Generation

- Node.js with ES modules support
- Puppeteer (automatically installed)

### Generate CV PDF

1. **Install dependencies** (if not already installed)
   ```bash
   npm install
   ```

2. **Generate CV PDF**
   ```bash
   node cv-generator.mjs
   ```

3. **Find the generated PDF**
   The CV will be saved as `Fathul_Hidayat_CV.pdf` in the project root.

### CV Features

- **ATS-Friendly Format** - Optimized for Applicant Tracking Systems
- **Professional Layout** - Clean and readable design
- **Complete Information** - All portfolio data included
- **Print-Ready** - Optimized for printing and sharing

### Cleanup (Optional)

To remove temporary files after generating the PDF:
```bash
node cleanup.js
```

## 📦 Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 🎨 Customization

### Update Portfolio Data

Edit `src/data/portfolio.json` to update:
- Personal information
- Work experience
- Skills and levels
- Projects
- Contact details

### Styling

The project uses Tailwind CSS. Customize styles in:
- `src/assets/styles/styles.css`
- Component-specific styles in Vue files

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

**Developer**: Fathul Hidayat  
**Contact**: fahtul.singaparna@gmail.com  
**LinkedIn**: [linkedin.com/in/fathul-hidayat-dev](https://linkedin.com/in/fathul-hidayat-dev)  
**GitHub**: [github.com/Kirara02](https://github.com/Kirara02)
