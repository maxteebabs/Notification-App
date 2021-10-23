const { response } = require("express");
const TopicObserver = require("../Observers/TopicObserver");
const topicSubscriber = require("../Subscribers/TopicSubscriber");

const publish = (req, res) => {
  const {topic} = req.params;
  const body = req.body;
  const subscribers = topicSubscriber.getSubscribersByTopic(topic);
  Promise.all(subscribers.map(subscriber => subscriber.notify(body))).then(responses => {
    const responseData = responses.map(r => r.data);
    res.status(200).send({"message": "Successful", responses: responseData});
  }).catch(error => {
    res.status(400).send({"error": error.message});
  });
}

const subscribe = (req, res) => {
  const {topic} = req.params;
  const {url} = req.body;
  topicSubscriber.subscribe(new TopicObserver(topic, url));
  res.status(201).send({
    topic, url
  });
}

module.exports = {
  publish,
  subscribe
}