const supabase = require('../db/supabaseClient');
const { generateSummary } = require('../services/llmService');
const { sendToSlack } = require('../services/slackService');

exports.summarizeTodos = async (req, res) => {
  const { data: todos, error } = await supabase.from('todos').select('*');
  if (error) return res.status(500).json({ error: error.message });

  try {
    const summary = await generateSummary(todos);
    const sent = await sendToSlack(summary);
    if (!sent) return res.status(500).json({ error: 'Failed to send to Slack' });
    res.json({ message: 'Summary sent to Slack', summary });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
