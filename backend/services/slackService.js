const axios = require('axios');
require('dotenv').config();

exports.sendToSlack = async (message) => {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;
  const payload = { text: message };

  try {
    await axios.post(webhookUrl, payload);
    return true;
  } catch (error) {
    console.error('Slack error:', error.message);
    return false;
  }
};
