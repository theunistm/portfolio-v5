// Sample project data for the work section
import type { ProjectProps } from '../components/work/types';

// Pharmacy icon SVG
const pharmacyIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path d="M20 6h-4V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM10 4h4v2h-4V4zm6 11h-3v3h-2v-3H8v-2h3V8h2v5h3v2z"/>
</svg>`;

// Sample project data
export const projects: ProjectProps[] = [
  {
    title: "My Pharmacy",
    icon: pharmacyIcon,
    categories: ["e-commerce", "personal health", "lifestyle"],
    duration: {
      start: 2023,
      ongoing: true
    },
    summary: "My Pharmacy is a multi-tenancy shopping app connecting 12k users with over 200 pharmacies all over Namibia. A first for the country.",
    caseStudy: `
      <h2>Project Background</h2>
      <p>My Pharmacy was developed to meet the growing demand for accessible pharmaceutical services in Namibia, especially in remote areas where physical pharmacies are limited.</p>
      
      <h2>Challenges</h2>
      <p>The main challenges included creating a user-friendly interface for both customers and pharmacists, ensuring secure handling of sensitive medical information, and building a reliable delivery system across diverse geographical locations.</p>
      
      <h2>Solution</h2>
      <p>We designed a comprehensive platform that allows users to:</p>
      <ul>
        <li>Browse medications by category or search by name</li>
        <li>Upload prescriptions securely</li>
        <li>Consult with pharmacists through in-app messaging</li>
        <li>Schedule deliveries or pickups</li>
      </ul>
      
      <h2>Results</h2>
      <p>Since launch, the app has connected over 12,000 users with 200+ pharmacies nationwide, processed 45,000+ orders, and received a satisfaction rating of 4.8/5 from users.</p>
    `,
    theme: {
      color: "#4D8B31" // Green color as shown in the screenshot
    },
    flows: [
      {
        page: "Home",
        interactions: "23 interaction points",
        challenge: "Present personalized recommendations without overwhelming new users",
        solution: "Progressive disclosure of features based on user engagement patterns",
        media: {
          type: "image",
          src: "/images/profile-01.png"
        }
      },
      {
        page: "Search",
        interactions: "17 interaction points",
        challenge: "Allow efficient search across thousands of products with limited metadata",
        solution: "Hybrid search algorithm combining text match with category filtering",
        media: {
          type: "image",
          src: "/images/profile-01.png"
        }
      },
      {
        page: "Product",
        interactions: "14 interaction points",
        challenge: "Present complex medical information in an accessible format",
        solution: "Visual hierarchy with expandable sections for detailed information",
        media: {
          type: "image",
          src: "/images/profile-01.png"
        }
      },
      {
        page: "Cart",
        interactions: "11 interaction points",
        challenge: "Handle mixed cart scenarios with prescription and non-prescription items",
        solution: "Split cart flow with clear verification steps for prescription items",
        media: {
          type: "image",
          src: "/images/profile-01.png"
        }
      },
      {
        page: "Checkout",
        interactions: "19 interaction points",
        challenge: "Streamline complex delivery logistics involving multiple pharmacies",
        solution: "Intelligent order splitting with unified tracking",
        media: {
          type: "image",
          src: "/images/profile-01.png"
        }
      }
    ]
  }
];
