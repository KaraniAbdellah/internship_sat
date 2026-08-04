const HERO_CONTENT = {
  badge: '#1 DIGITAL MARKETING TOOLS',
  titleLine1: 'Smarter Marketing',
  titleLine2: 'Bigger',
  titleHighlight: 'Impacts',
  description:
    'Marketive gives you tools to engage, and convert without the chaos. From automated campaigns to real-time insights.',
  primaryCta: 'Get Started',
  secondaryCta: 'Book a Demo',
  rating: '4.8',
  reviewsCount: '(150K)',
  statusText: 'Creating Marketing Models...',
  blogTraffic: {
    title: 'Blog Traffic',
    growth: '+16.5%',
    value: '125,536',
    subtext: 'Since last week',
  },
  seoAnalytics: {
    title: 'SEO Analytics',
    growth: '+20%',
    score: '80%',
  },
  trustedBy: [
    { name: 'Loom', logo: '/placeholder-logo.svg' }, // Assuming custom or placeholder logos
    { name: 'Mailchimp', logo: '/placeholder-logo.svg' },
    { name: 'Notion', logo: '/placeholder-logo.svg' },
    { name: 'Stripe', logo: '/placeholder-logo.svg' },
  ],
};
export default HERO_CONTENT;



export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const FAQ_DATA: FAQItem[] = [
  {
    id: "q1",
    question: "How fast do AI agents generate personalized offers?",
    answer: "Offers are generated in real-time (under 500ms) by analyzing active user session data, historical purchases, and behavioral signals via our specialized Generation Agent."
  },
  {
    id: "q2",
    question: "How do you measure and score offer performance?",
    answer: "Our Scoring Agent uses machine learning models trained on customer segmentation data to evaluate engagement probability, predicted revenue, and conversion velocity before releasing an offer."
  },
  {
    id: "q3",
    question: "How do the specialized AI agents collaborate?",
    answer: "The system routes data through 4 dedicated agents: Generation creates the proposal, Scoring evaluates conversion odds, Validation enforces profit margin constraints, and Optimization continuously tunes live campaigns."
  },
  {
    id: "q4",
    question: "Why doesn't this match standard static discount rules?",
    answer: "Unlike static rules, our multi-agent architecture dynamically adapts offer parameters—such as discount depth, bundle incentives, and tone—to match individual context and real-time inventory limits."
  },
  {
    id: "q5",
    question: "Which agents and models do you cover?",
    answer: "We deploy specialized multi-agent architectures combining LLMs for dynamic copy synthesis with predictive ML classification and regression algorithms for customer scoring and behavioral tracking."
  },
  {
    id: "q6",
    question: "Do we have to migrate our existing database or CRM?",
    answer: "No. Smart Automation Technologies integrates directly into your existing APIs and databases, ensuring your URLs, customer records, and review workflows stay exactly as they are."
  }
];
