import request from 'supertest';
import {app} from './index';
import mockAssociation from './tests/mocks/mockAssociation';
import mockUser from './tests/mocks/mockUser';
import mockMessage from './tests/mocks/mockMessage';

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

  test('POST /api/delete_association', (done) => {
    request(app)
    .post('/api/delete_association')
    .send({ name: mockAssociation.name })
    .expect(200)
    .then(() => {
      done();
    })
    .catch(err => done(err))
  });

  test('POST /signup', async (done) => {
    await request(app)
    .post('/signup')
    .send(mockUser);

    await request(app)
    .post('/signup')
    .send(mockUser)
    .expect(409)
    .catch(err => done(err));

    request(app)
    .post('/user')
    .send({ email: mockUser.email })
    .expect(200)
    .then(response => {
      expect(response.body.data[response.body.data.length -1].email).toEqual(mockUser.email);
      done();
    })
    .catch(err => done(err));
  });

  test('POST /signout', (done) => {
    request(app)
    .post('/signout')
    .send({ email: mockUser.email })
    .expect(200)
    .then(() => {
      done();
    })
    .catch(err => done(err));
  });

  test('POST /message', (done) => {
    request(app)
    .post('/message')
    .send(mockMessage)
    .expect(200)
    .then(() => {
      done();
    })
    .catch(err => done(err));
  });
});