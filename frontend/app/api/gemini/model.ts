const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

function buildPrompt(message: string) {
  const prompt = `These are timestamps and power values from the last 60 seconds. Can you sum up and tell me
  a predicted energy usage for the next 60 seconds in Watt Hours? Just the number with unit. (Energy = Power * Time):
  ${message}`;
  return prompt;
}

export async function getResponse(message: string) {
  const genAI = new GoogleGenerativeAI(process.env.GEMINIAPI_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });

  const generationConfig = {
    temperature: 0.4,
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
