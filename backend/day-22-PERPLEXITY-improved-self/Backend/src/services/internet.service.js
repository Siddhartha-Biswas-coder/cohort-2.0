import { tavily as Tavily } from "@tavily/core";

const tavily = Tavily({
  apiKey: process.env.TAVILY_API_KEY,
});

/**
 * Searches the internet for information matching the query using Tavily API
 * @param {Object} params - The parameters object
 * @param {string} params.query - The search query string
 * @returns {Promise<Object>} - Search results list containing snippets, URLs, and titles
 */
export const searchInternet = async ({query}) => {
  const results = await tavily.search(query, {
    maxResults: 5,
    searchDepth: "advanced",
  });

  return results;
};
