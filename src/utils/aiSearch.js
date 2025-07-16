export async function analyzeCompliance(text) {
  const response = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "llama2", // or any model you have running
      prompt: `You are a compliance assistant. Analyze the following FDA drug event report and summarize what actions should be taken to ensure compliance and what to avoid:\n\n${text}`,
      stream: false
    }),
  });

  const data = await response.json();
  return data.response; // Ollama returns `response` field with text
}
