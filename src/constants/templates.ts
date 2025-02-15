export const templates = [
  {
    id: "blank",
    label: "Blank Document",
    imageUrl: "/blank-document.svg",
    initialContent: "<p></p>", // Boş içerik
  },
  {
    id: "software-proposal",
    label: "Software Development Proposal",
    imageUrl: "/software-proposal.svg",
    initialContent: `
      <h1>Software Development Proposal</h1>
      <p><strong>Client Name:</strong> [Client]</p>
      <p><strong>Project Name:</strong> [Project]</p>
      <h2>Project Overview</h2>
      <p>We propose to develop a software solution that meets your business needs...</p>
      <h2>Deliverables</h2>
      <ul>
        <li>Feature 1</li>
        <li>Feature 2</li>
      </ul>
      <h2>Timeline</h2>
      <p>Estimated completion: [Timeline]</p>
    `,
  },
  {
    id: "project-proposal",
    label: "Project Development Proposal",
    imageUrl: "/project-proposal.svg",
    initialContent: `
      <h1>Project Proposal</h1>
      <p><strong>Client:</strong> [Client Name]</p>
      <h2>Introduction</h2>
      <p>This proposal outlines the key aspects of the project...</p>
      <h2>Objectives</h2>
      <ul>
        <li>Objective 1</li>
        <li>Objective 2</li>
      </ul>
      <h2>Budget</h2>
      <p>Total estimated cost: [Budget]</p>
    `,
  },
  {
    id: "resume",
    label: "Resume",
    imageUrl: "/resume.svg",
    initialContent: `
      <h1>[Your Name]</h1>
      <p><strong>Email:</strong> [your@email.com]</p>
      <p><strong>Phone:</strong> [Your Phone]</p>
      <h2>Experience</h2>
      <p><strong>Company Name</strong> - [Job Title]</p>
      <p>[Job Description]</p>
      <h2>Education</h2>
      <p>[Degree] - [University]</p>
    `,
  },
  {
    id: "cover-letter",
    label: "Cover Letter",
    imageUrl: "/cover-letter.svg",
    initialContent: `
      <p>[Your Name]</p>
      <p>[Your Address]</p>
      <p>[Date]</p>
      <p><strong>Dear Hiring Manager,</strong></p>
      <p>I am excited to apply for [Job Title] at [Company Name]. I believe my skills...</p>
      <p>Best regards,</p>
      <p>[Your Name]</p>
    `,
  },
  {
    id: "letter",
    label: "Letter",
    imageUrl: "/letter.svg",
    initialContent: `
      <p>[Your Name]</p>
      <p>[Your Address]</p>
      <p>[Date]</p>
      <p><strong>Dear [Recipient Name],</strong></p>
      <p>I am writing to you regarding...</p>
      <p>Sincerely,</p>
      <p>[Your Name]</p>
    `,
  },
];
