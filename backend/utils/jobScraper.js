import FirecrawlApp from '@mendable/firecrawl-js';
import dotenv from "dotenv";
dotenv.config();

const FIRECRAWL_API_KEY = process.env.FIRECRAWL_API_KEY;

const app = new FirecrawlApp({apiKey: FIRECRAWL_API_KEY});

export const fetchJobRecommendations = async (skills) => {
  const scrapeResponse = await app.scrapeUrl('https://weworkremotely.com', {
    formats: ['links'],
  });

  if (!scrapeResponse.success) {
    throw new Error(`Failed to scrape: ${scrapeResponse.error}`)
  }

  // console.log(scrapeResponse);

  // skills.push("engineer");

  let filteredJobs = scrapeResponse.links
    .filter((link) => link.startsWith("https://weworkremotely.com/remote-jobs/"))
    .map((link) => ({
      link: link,
      title: link.replace("https://weworkremotely.com/remote-jobs/", "").replace(/-/g, " ")
    }))
    .filter((job) => 
      skills.some((skill) => job.title.toLowerCase().includes(skill.toLowerCase()))
    );
    
  // console.log(filteredJobs);
  return filteredJobs;
}