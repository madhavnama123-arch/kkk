// src/services/aiService.ts

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
}

class AIService {
  private baseUrl: string;
  private model: string;

  constructor() {
    this.baseUrl = 'https://ocean-main.onrender.com/api';
    this.model = 'gemini-1.5-flash';
  }

  async sendMessage(messages: ChatMessage[]): Promise<string> {
    try {
      const response = await fetch(`${this.baseUrl}/ai`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: this.model,
          messages: [
            {
              role: 'system',
              content: `You are Shark AI, a marine data assistant. Always format your answers in a clear, structured way using Markdown.
- Use bullet points with a hyphen (-) for lists.
- Use indented plus signs (  +) for sub-bullets.
- Use numbered lists (1., 2.) when order matters.
- Use bold text ('**text**') for headings or key terms.
- When presenting tabular data, use Markdown tables, like this:
| Species         | Family      | Confidence |
| --------------- | ----------- | ---------- |
| Gadus morhua    | Gadidae     | 94%        |
| Salmo salar     | Salmonidae  | 89%        |
`
            },
            ...messages
          ],
          temperature: 0.7,
          max_tokens: 1024,
          top_p: 1,
          stream: false
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`Backend error: ${response.status} - ${errorData.error || 'Unknown error'}`);
      }

      const data: GeminiResponse = await response.json();

      if (!data.candidates || data.candidates.length === 0) {
        throw new Error('No response from Gemini API');
      }

      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error('Error calling backend AI proxy:', error);
      throw error;
    }
  }

  async analyzeMarineData(dataType: string, query: string): Promise<string> {
    return this.sendMessage([{ role: 'user', content: `Analyze this ${dataType}: ${query}` }]);
  }

  async identifySpecies(description: string): Promise<string> {
    return this.sendMessage([{ role: 'user', content: `Identify species: ${description}` }]);
  }

  async interpretEDNA(sampleData: string): Promise<string> {
    return this.sendMessage([{ role: 'user', content: `Interpret eDNA: ${sampleData}` }]);
  }

  async analyzeOceanConditions(conditions: string): Promise<string> {
    return this.sendMessage([{ role: 'user', content: `Analyze ocean conditions: ${conditions}` }]);
  }
}

export const aiService = new AIService();
export type { ChatMessage };