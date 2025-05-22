const supabase = require('../db/supabaseClient');

exports.getTodos = async (req, res) => {
  const { data, error } = await supabase.from('todos').select('*').order('created_at', { ascending: false });
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
};

exports.addTodo = async (req, res) => {
  const { title } = req.body;
  const { data, error } = await supabase.from('todos').insert([{ title }]).select();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data[0]);
};

exports.deleteTodo = async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from('todos').delete().eq('id', id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ message: 'Deleted successfully' });
};

