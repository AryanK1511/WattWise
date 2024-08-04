const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

function buildPrompt(message: string) {
  const prompt = `These are power readings from the past week. I want you to analyze them and tell me what you think 
  as far as my power consumption goes. Tips and tricks, how I'm using more power on certain days, certain times, etc.
  Give me 3 points, 1 short sentence each, don't talk about the lack of data or the quality of the data.
  You can be creative and have fun with it, give some facts in there too.
  ${message}`;
  console.log(prompt);
  return prompt;
}

export async function getResponse(message: string) {
  const genAI = new GoogleGenerativeAI(process.env.GEMINIAPI_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });

  const generationConfig = {
    temperature: 1,
    topK: 0,
    topP: 0.95,
    maxOutputTokens: 8192,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
  ];

  const prompt = buildPrompt(message);

  const result = await model.generateContent(
    prompt,
    generationConfig,
    safetySettings
  );
  const response = await result.response;
  const text = response.text();
  return text;
}
