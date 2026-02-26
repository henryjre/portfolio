/**
 * Project data for the Projects page.
 * Each project is displayed as a full-height scroll-snap section.
 *
 * Fields:
 *   id          - unique string key
 *   title       - project name
 *   description - 2-4 sentence summary
 *   images      - array of image paths relative to /public. Use [] for no images.
 *   tags        - array of tech/skill strings
 *   githubUrl   - GitHub repo URL (null if private)
 *   demoUrl     - Live demo URL (null if none)
 */
const projects = [
  {
    id: 'project-1',
    title: 'ICP-FNET Engineering Website',
    description:
      'I built a full-stack website for an engineering firm that includes a public project portfolio and a document portal. Clients get their own login to access project files, and the team manages everything through an admin panel with role-based access.',
    images: ['projects/icp-website/icp-website.webp'],
    tags: ['React', 'Node.js', 'PostgreSQL', 'Prisma', 'Express', 'JWT', 'AWS S3', 'RBAC'],
    githubUrl: 'https://github.com/henryjre/icp-website.git',
    demoUrl: 'https://icpfnetengineering.com',
  },
  {
    id: 'project-2',
    title: 'Omnilert Web Application',
    description:
      'I built an internal operations platform for a multi-branch business. It handles employee shifts, POS verification, HR workflows, and authorization requests across branches, all connected to their Odoo ERP through webhooks with real-time updates via Socket.IO. I also built the access control system around a Discord-inspired role and permission model, where each role carries a set of granular permission keys that gate specific actions across the platform.',
    images: ['projects/omnilert-webapp/omnilert-web-app.webp', 'projects/omnilert-webapp/Screenshot_7.webp', 'projects/omnilert-webapp/Screenshot_8.webp', 'projects/omnilert-webapp/Screenshot_9.webp', 'projects/omnilert-webapp/Screenshot_10.webp'],
    tags: ['React', 'Node.js', 'PostgreSQL', 'Express', 'Socket.io', 'JWT', 'Odoo ERP', 'B2B'],
    githubUrl: 'https://github.com/henryjre/omnilert-web-app.git',
    demoUrl: 'https://omnilert.app',
  },
  {
    id: 'project-3',
    title: 'Omnilert Discord Bot and Server',
    description:
      'I built a Discord bot that brings the core features of the Omnilert platform into a Discord server. It handles shift tracking, POS verification, employee requests, and authorization flows through slash commands, all synced live with Odoo ERP.',
    images: ['projects/discord-servers/omnilert-server/omnilert-discord-1.webp'],
    tags: ['Discord.js', 'Node.js', 'Odoo ERP', 'Redis', 'SQLite'],
    githubUrl: 'https://github.com/henryjre/Omnilert-FBW-Discord-Bot.git',
    demoUrl: null,
  },
  {
    id: 'project-4',
    title: 'Automated Job Seeker',
    description:
      'I built an automation that scrapes job listings from LinkedIn, Indeed, and Onlinejobs.ph, filters them by keywords, and runs each one through an AI model to check if it fits a target profile. Matches get posted to a Discord channel on a schedule for easy review.',
    images: ['projects/n8n/automated-job-seeker/automated-job-seeker.webp', 'projects/n8n/automated-job-seeker/discord-results.webp'],
    tags: ['Python', 'n8n', 'Docker', "Workflow Automation"],
    githubUrl: null,
    demoUrl: null,
  },
  {
    id: 'project-5',
    title: 'Omnilert Daily Quota Rewards',
    description:
      'I built an n8n workflow that pulls each employee\'s daily attendance and POS session sales, then automatically fires a Sales Order in Odoo with a Token Pay reward. The tokens land directly in the employee\'s wallet and can be redeemed at the POS. Rewarded employees also get notified through Discord. It runs on a 4 AM schedule every day without manual intervention.',
    images: ['projects/n8n/daily-token-pay/daily-quota-1.webp', 'projects/n8n/daily-token-pay/daily-quota-2.webp'],
    tags: ['n8n', 'Odoo ERP', 'Workflow Automation'],
    githubUrl: null,
    demoUrl: null,
  },
];

export default projects;
