function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}

const AWS = require('aws-sdk');

// These 'process.env' variables pull from Netlify's settings, not your code.
AWS.config.update({
  accessKeyId: process.env.MY_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY,
  region: process.env.MY_AWS_REGION
});

const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async () => {
  const params = {
    TableName: 'SiteAnalytics',
    Key: { page_id: 'homepage' },
    UpdateExpression: 'ADD #v :inc',
    ExpressionAttributeNames: { '#v': 'views' },
    ExpressionAttributeValues: { ':inc': 1 },
    ReturnValues: 'UPDATED_NEW'
  };

 
async function updateVisitorCount() {
  try {
    
    const response = await fetch('/.netlify/functions/get-views');
    const data = await response.json();
    
    
    const counterElement = document.getElementById('view-count');
    if (counterElement) {
      counterElement.innerText = data.views;
    }
  } catch (err) {
    console.error('View counter error:', err);
  }
}

updateVisitorCount();
}

async function updateVisitorCount() {
  try {
   
    const response = await fetch('/.netlify/functions/get-views');
    const data = await response.json();
    
    const counterElement = document.getElementById('view-count');
    if (counterElement && data.views !== undefined) {
      counterElement.innerText = data.views;
    }
  } catch (err) {
    console.error('Error updating visitor count:', err);
   
    const counterElement = document.getElementById('view-count');
    if (counterElement) counterElement.innerText = "Real-time";
  }
}

updateVisitorCount();