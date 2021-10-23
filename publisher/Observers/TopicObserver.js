const axios = require('axios');

class TopicObserver{
  constructor(topic, url) {
    this.topic = topic;
    this.url = url;
  }
  notify(body) {
    const payload = {
      topic: this.topic,
      data: body
    }
 
    console.log(`Publisher server: Data to be sent is ${JSON.stringify(payload)}`);
    return axios.post(this.url, payload,
      {'content-type': 'application/json'});
  }
}
module.exports = TopicObserver;