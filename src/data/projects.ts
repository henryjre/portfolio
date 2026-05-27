export interface Project {
  id: string;
  title: string;
  description: string;
  images: string[];
  tags: string[];
  githubUrl: string | null;
  demoUrl: string | null;
}

const projects: Project[] = [
  {
    id: "project-1",
    title: "Monster Siomai Website",
    description:
      "A food brand saves time when its website, customer accounts, rewards, and admin work live in one connected system. This platform gives Monster Siomai a public site for menus, branches, story, and inquiries, plus a portal for accounts, roles, loyalty cards, email flows, and Odoo-connected rewards, reducing the need to manage customers and operations across scattered tools.",
    images: [
      "/projects/monster-siomai-website/monstersiomai-website.webp",
      "/projects/monster-siomai-website/monstersiomai-portal.webp",
    ],
    tags: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Prisma",
      "PostgreSQL",
      "NextAuth",
      "Odoo ERP",
      "Redis",
    ],
    githubUrl: null,
    demoUrl: "https://monstersiomai.ph/",
  },
  {
    id: "project-2",
    title: "ICP-FNET Engineering Website",
    description:
      "Engineering firms lose hours when project files, client updates, and portfolio proof are handled separately. This website combines a public project showcase with a secure document portal, giving clients their own file access while the team manages uploads and permissions through a role-based admin panel.",
    images: ["/projects/icp-website/icp-website.webp"],
    tags: [
      "React",
      "Node.js",
      "PostgreSQL",
      "Prisma",
      "Express",
      "JWT",
      "AWS S3",
      "RBAC",
    ],
    githubUrl: null,
    demoUrl: "https://icpfnetengineering.com",
  },
  {
    id: "project-3",
    title: "Omnilert Internal Platform",
    description:
      "Multi-branch operations get expensive when shifts, POS checks, HR requests, and approvals move through separate chats and spreadsheets. This internal platform centralizes those workflows, syncs with Odoo ERP, delivers real-time updates through Socket.IO, and uses granular permissions so teams can coordinate faster without losing control over access.",
    images: [
      "/projects/omnilert-webapp/omnilert-webapp-1.webp",
      "/projects/omnilert-webapp/omnilert-webapp-2.webp",
      "/projects/omnilert-webapp/omnilert-webapp-3.webp",
      "/projects/omnilert-webapp/omnilert-webapp-4.webp",
      "/projects/omnilert-webapp/omnilert-webapp-5.webp",
    ],
    tags: [
      "React",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Socket.IO",
      "JWT",
      "Odoo ERP",
      "RBAC",
      "Real-time",
      "B2B",
    ],
    githubUrl: null,
    demoUrl: "https://omnilert.app",
  },
  {
    id: "project-4",
    title: "Omnilert Discord Bot and Server",
    description:
      "Teams already working inside Discord can save context-switching time by handling routine operations where conversations happen. This bot brings shift tracking, POS verification, employee requests, and authorization flows into slash commands, with live Odoo ERP syncing so updates do not have to be copied between systems.",
    images: [
      "/projects/discord-servers/omnilert-server/omnilert-discord-1.webp",
    ],
    tags: ["Discord.js", "Node.js", "Odoo ERP", "Redis", "SQLite"],
    githubUrl: "https://github.com/henryjre/Omnilert-FBW-Discord-Bot.git",
    demoUrl: null,
  },
  {
    id: "project-5",
    title: "Automated Job Seeker",
    description:
      "Searching across job boards can eat hours before a good match even appears. This automation collects listings from LinkedIn, Indeed, and Onlinejobs.ph, filters them by keywords, checks fit with an AI model, and posts only the relevant matches to Discord on a schedule for faster review.",
    images: [
      "/projects/n8n/automated-job-seeker/automated-job-seeker.webp",
      "/projects/n8n/automated-job-seeker/discord-results.webp",
    ],
    tags: ["Python", "n8n", "Docker", "Workflow Automation"],
    githubUrl: null,
    demoUrl: null,
  },
  {
    id: "project-6",
    title: "Omnilert Daily Quota Rewards",
    description:
      "Daily incentive programs create extra admin work when attendance, sales, rewards, and notifications are checked by hand. This n8n workflow pulls attendance and POS session sales, creates the Odoo Sales Order for Token Pay rewards, sends tokens to the employee wallet, and notifies the team through Discord on a 4 AM schedule.",
    images: [
      "/projects/n8n/daily-token-pay/daily-quota-1.webp",
      "/projects/n8n/daily-token-pay/daily-quota-2.webp",
    ],
    tags: ["n8n", "Odoo ERP", "Workflow Automation"],
    githubUrl: null,
    demoUrl: null,
  },
  {
    id: "project-7",
    title: "Bakes & Basque",
    description:
      "Small food businesses can stall when they need polished menus and brand visuals before studio photos are available. This branding package gives Bakes & Basque a logo, menu layout, and AI-generated product imagery, helping the client launch with a cohesive look without waiting on a full photo production cycle.",
    images: [
      "/projects/graphic-design/bakesnbasque/bakesnbasque-1.webp",
      "/projects/graphic-design/bakesnbasque/bakesnbasque-2.webp",
      "/projects/graphic-design/bakesnbasque/bakesnbasque-3.webp",
      "/projects/graphic-design/bakesnbasque/bakesnbasque-4.webp",
      "/projects/graphic-design/bakesnbasque/bakesnbasque-5.webp",
      "/projects/graphic-design/bakesnbasque/bakesnbasque-6.webp",
      "/projects/graphic-design/bakesnbasque/bakesnbasque-7.webp",
      "/projects/graphic-design/bakesnbasque/bakesnbasque-8.webp",
      "/projects/graphic-design/bakesnbasque/bakesnbasque-9.webp",
      "/projects/graphic-design/bakesnbasque/bakesnbasque-10.webp",
      "/projects/graphic-design/bakesnbasque/bakesnbasque-11.webp",
    ],
    tags: ["Graphic Design", "Photoshop", "Illustrator", "AI Generated Images"],
    githubUrl: null,
    demoUrl: null,
  },
  {
    id: "project-8",
    title: "Monster Siomai",
    description:
      "Food booths need clear visuals fast, especially when there are no product photos ready for signage or screens. This visual identity gives Monster Siomai a logo, AI-generated product images, and an on-screen slideshow, turning a product list into customer-facing booth assets without a separate shoot.",
    images: [
      "/projects/graphic-design/monster-siomai/monster-siomai-1.webp",
      "/projects/graphic-design/monster-siomai/monster-siomai-2.webp",
      "/projects/graphic-design/monster-siomai/monster-siomai-3.webp",
      "/projects/graphic-design/monster-siomai/monster-siomai-4.webp",
      "/projects/graphic-design/monster-siomai/monster-siomai-5.webp",
      "/projects/graphic-design/monster-siomai/monster-siomai-6.webp",
      "/projects/graphic-design/monster-siomai/monster-siomai-7.webp",
      "/projects/graphic-design/monster-siomai/monster-siomai-8.webp",
      "/projects/graphic-design/monster-siomai/monster-siomai-9.webp",
    ],
    tags: ["Graphic Design", "Photoshop", "Illustrator", "AI Generated Images"],
    githubUrl: null,
    demoUrl: null,
  },
];

export default projects;
