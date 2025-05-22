const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

const openai = new OpenAIApi(new Configuration({ apiKey: process.env.OPENAI_API_KEY }));

exports.generateSummary = async (todos) => {
  const pending = todos.filter(todo => !todo.is_done).map(t => `- ${t.title}`).join('\n');
  const prompt = `Summarize the following pending tasks:\n${pending}`;
  
  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
  });

  return response.data.choices[0].message.content.trim();
};
