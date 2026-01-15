import OpenAI from 'openai';


const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true 
});

export const getAIFeed = async () => {
  try {
   
    const proxy = "https://api.allorigins.win/raw?url=";
    const apiUrl = 'https://api.semanticscholar.org/graph/v1/paper/search?query=artificial+intelligence+innovation&limit=6&fields=title,abstract,url,citationCount,publicationDate,year&sort=publicationDate-desc&year=2024-';
    
    const response = await fetch(proxy + encodeURIComponent(apiUrl));
    
    if (!response.ok) throw new Error("NETWORK_RESPONSE_NOT_OK");

    const result = await response.json();
    const papers = result.data || [];

    const feedPromise = papers.map(async (paper) => {
      try {
        const completion = await openai.chat.completions.create({
          messages: [
            { role: "system", content: "You are a technical analyst. Summarize this in 12 words. Focus on innovation." },
            { role: "user", content: `Title: ${paper.title}\nAbstract: ${paper.abstract}` }
          ],
          model: "gpt-4o-mini",
        });

        // This object is returned to the UI only.
        return {
          title: paper.title,
          summary: completion.choices[0].message.content,
          url: paper.url,
          impact_score: Math.min(100, 75 + (paper.citationCount || 0)),
          category: "AI_RESEARCH",
          
          // Show the actual publication year/date if available
          date: paper.publicationDate || paper.year?.toString() || new Date().toISOString()
        };
      } catch (err) {
        console.error("Error processing single paper:", err);
        return null; 
      }
    });


    const results = await Promise.all(feedPromise);
    const validResults = results.filter(r => r !== null);

    if (validResults.length === 0) return getFallbackData();

    return validResults;

  } catch (error) {
    console.error("CRITICAL_SYSTEM_ERROR:", error);
    return getFallbackData();
  }
};

function getFallbackData() {
  return [
    {
      title: "Latest System Pulse",
      summary: "System check complete. Live data stream temporarily unavailable. Showing cached nodes.",
      url: "#",
      impact_score: 99,
      category: "SYSTEM_CACHE"
    }
  ];
}