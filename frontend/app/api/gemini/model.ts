const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

function buildPrompt(message: string) {
  const prompt = `These 60 power values (in Watts) over 60 seconds. Can you average them and predict what the energy comsuption would be
  over the next 1 minute in watt hours? (the average *  60 seconds):
  (Note: Predict even if you think it's not enough data & Give me only the number + unit)
  ${message}`;
  console.log(prompt);
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
