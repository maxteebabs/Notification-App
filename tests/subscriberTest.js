const server = require('../subscriber-server');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const {  expect } = chai;

describe('Subscriber Server tests', async () => {
  const testRunner = async (statusCode, url, data) => {
    const res = await chai.request(server)
      .post(url)
      .send(data);
    expect(res.status).to.equal(statusCode);
  }

  it('should return 200 after notifying the subscriber', () => {
    const data = {
        "name": "Mike John",
        "age": 30
    };
    return testRunner(200, "/topic1", data);
  });
});