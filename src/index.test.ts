import request from 'supertest';
import {app} from './index';
import mockAssociation from './tests/mocks/mockAssociation';

describe('test app routes', () => {

  test('GET /auth', (done) => {
    request(app)
      .get('/auth')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done)
  });
  
  test('GET /api/associations', (done) => {
    request(app)
      .get('/api/associations')
      .expect(200)
      .then(response => {
        expect(response.body.msg).toEqual('Associations retrieved successfully');
      })
    done();
  });

  test('POST /api/add_association', async (done) => {
    await request(app)
      .post('/api/add_association')
      .send(mockAssociation)

    request(app)
      .get('/api/associations')
      .expect(200)
      .then(response => {
        expect(response.body.data[response.body.data.length -1].name).toEqual(mockAssociation.name);
        done();
      })
      .catch(err => done(err));
  });
})