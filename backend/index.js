

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { createClient } = require('@supabase/supabase-js');
const { OpenAI } = require('openai');
const axios = require('axios');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Supabase setup
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// OpenAI setup
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Routes

app.get('/api/todos', async (req, res) => {
  const { data, error } = await supabase.from('todos').select('*').order('id', { ascending: true });
  if (error) return res.status(500).json({ error });
  res.json(data);
});

app.post('/api/todos', async (req, res) => {
  const { title } = req.body;
  const { data, error } = await supabase.from('todos').insert([{ title }]);
  if (error) return res.status(500).json({ error });
  res.json(data[0]);
});

app.delete('/api/todos/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const { error } = await supabase.from('todos').delete().eq('id', id);
  if (error) return res.status(500).json({ error });
  res.json({ success: true });
});

app.post('/api/summarize', async (req, res) => {
  const { data: todos, error } = await supabase.from('todos').select('*');
  if (error) return res.status(500).json({ error });

  const todoTexts = todos.map((todo) => `- ${todo.title}`).join('\n');
  const prompt = `Summarize the following to-dos:\n\n${todoTexts}`;

  try {
    const chatResponse = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    });

    const summary = chatResponse.choices[0].message.content;

    await axios.post(process.env.SLACK_WEBHOOK_URL, { text: summary });

    res.json({ success: true, summary });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Failed to summarize or send to Slack' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Backend is running on http://localhost:${PORT}`);
});
