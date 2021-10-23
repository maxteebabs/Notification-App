const sinon = require("sinon");
const server = require('../publisher-server');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const TopicObserver = require("../publisher/Observers/TopicObserver");
const { expect } = chai;

describe('Pubisher Server tests', async () => {
  const testRunner = async (statusCode, url, data) => {
    const res = await chai.request(server)
      .post(url)
      .send(data);
    expect(res.status).to.equal(statusCode);
  }

  before(() => {
    sinon.stub(TopicObserver.prototype, "notify").returns(new Promise(resolve => resolve({topic: "Test topic 1"})))
  });

  after(() => {
    sinon.restore();
  });

  it('should return 201 on successful subscription', () => {
    const data = {
        "url": "http://localhost:9000/test1"
    };
    return testRunner(201, "/subscribe/topic1", data);
  });

  it('should return 200 if published topic is succesful', () => {
    const data = {
        "name": "Mike John",
        "age": 46
    }
    return testRunner(200, "/publish/topic1", data);
  });

});