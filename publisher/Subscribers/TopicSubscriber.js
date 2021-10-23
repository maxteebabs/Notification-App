class TopicSubscriber {
  constructor() {
    this.subscribers = [];
  }
  async subscribe(observer) {
    this.subscribers.push(observer);
    console.log(`${this.subscribers.length} subscribers`);
  }
  getSubscribersByTopic(topic) {
    return this.subscribers.filter(observer => observer.topic === topic);
  }
}
module.exports = new TopicSubscriber();