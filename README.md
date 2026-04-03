# Portfolio User Manual

Welcome to your new portfolio website! This project has been expertly engineered so that you do not need to touch a single line of React or TypeScript code to update your profile. Everything is seamlessly driven by a simple configuration file.

## 🚀 Quick Start Guide

To update your website, locate the `.env` file in the root of your project directory. This single file controls all the text, links, projects, and experiences shown on the website.

### 1. Basic Information
To update your name, role, email, or social media links, simply change the values inside the `.env` file:
```env
VITE_USER_NAME="Jayakrishnan"
VITE_USER_ROLE="STUDENT WEB DESIGNER"
VITE_USER_EMAIL="Vjaikrishna525@gmail.com"
VITE_USER_PHONE="+91 9499189426"
VITE_USER_LINKEDIN="https://www.linkedin.com/..."
VITE_USER_GITHUB="https://github.com/..."
```


### 2. Formspree Setup (Contact Form)
To make your "Hire Me" / Contact form work:
1. Create a free account at [Formspree](https://formspree.io/).
2. Create a new form and copy your unique Form ID.
3. Paste it into your `.env` file:
```env
VITE_FORMSPREE_ID=your_id_here
```

### 3. Updating Your Skills
Your skills are managed via a simple comma-separated list. Just add or remove items:
```env
VITE_SKILLS="HTML,Python,Java-oops,C,DS,DBMS,Figma,UI/UX"
```

## 🧩 Advanced Configuration (JSON Data)

For complex sections like Projects, Experiences, and Testimonials, the data is structured as **JSON arrays** within the `.env` file. 

> [!IMPORTANT]
> The JSON structure must stay on **one single line** inside the `.env` file. If you make a syntax error (like missing a `"`, `}`, or `,`), the website will automatically fall back to default dummy data to prevent the site from crashing.

### Managing Projects
To update your "Selected Works" section, edit the `VITE_PROJECTS_JSON` variable.
Here is the format for a single project:
```json
{
  "id": 1,
  "title": "My Awesome Project",
  "description": "Short description goes here...",
  "tags": ["HTML", "CSS", "Design"],
  "image": "/images/project-1.jpg",
  "link": "https://live-website.com",
  "github": "https://github.com/your-repo"
}
```

### Managing Experience
To update your professional timeline, edit the `VITE_EXPERIENCE_JSON` variable:
```json
{
  "id": 1,
  "role": "Web Design Intern",
  "company": "Design Studio",
  "period": "2023 - Present",
  "description": "Designed high-converting landing pages..."
}
```

### Image Management
All images referenced in your `.env` file (like `/images/project-1.jpg`) should be placed directly inside the `public/images/` directory in your project folder. We have already included dummy images for you to start with!

## 💻 Developer Commands

If you ever need to manually run or build the project from the terminal:

```bash
npm install      # Install dependencies (only needed once)
npm run dev      # Start the live development server on your computer
npm run build    # Build the application for production deployment
```

> [!TIP]
> **Hot Reloading:** When you run `npm run dev`, you can edit the `.env` file and save it. The website will automatically refresh in your browser with your new text immediately!

## 📞 Deployment

Because your portfolio uses standard Vite environment variables, deploying to platforms like Vercel or Netlify is incredibly easy. Just remember to copy all of the variables from your `.env` file into the "Environment Variables" settings of your hosting provider before deploying!
