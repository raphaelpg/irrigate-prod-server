import request from 'supertest';
import app from '../app';
import mockMessagesTemplate from '../mocks/mockMessage';

describe('test messages routes', () => {

  test('POST /api/message/add Should post a message properly', (done) => {
    request(app)
      .post('/api/message/add')
      .send(mockMessagesTemplate.mockMessage)
      .expect(201)
      .then((response) => {
        expect(response.body.msg).toEqual("Message sent successfully");
        done();
      })
      .catch(err => done(err));
  });

  test('POST /api/message/add Should reject if message is empty', (done) => {
    request(app)
      .post('/api/message/add')
      .send(mockMessagesTemplate.emptyMockMessage)
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toEqual("Error in request field");
        done();
      })
      .catch(err => done(err));
  });

  test('POST /api/message/add Should reject if message not a string', (done) => {
    request(app)
      .post('/api/message/add')
      .send(mockMessagesTemplate.notStringMockMessage)
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toEqual("Error in request field");
        done();
      })
      .catch(err => done(err));
  });
});