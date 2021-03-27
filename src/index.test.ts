import request from 'supertest';
import {app} from './index';
import mockAssociation from './mocks/mockAssociation';
import mockUser from './mocks/mockUser';
import mockMessage from './mocks/mockMessage';

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

  test('POST /api/delete_association', async (done) => {
    await request(app)
      .post('/api/delete_association')
      .send({ name: mockAssociation.name })
      .expect(200)

    request(app)
      .get('/api/associations')
      .expect(200)
      .then(response => {
        expect(response.body.data[response.body.data.length -1].name).not.toEqual(mockAssociation.name);
        done();
      })
      .catch(err => done(err));
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
        expect(response.body.msg).toEqual("User retrieved successfully");
        done();
      })
      .catch(err => done(err));
  });

  test('POST /signout', async (done) => {
    await request(app)
      .post('/signout')
      .send({ email: mockUser.email })
      .expect(200)
      .then((response) => {
        expect(response.body.msg).toEqual("User deleted");
      })

    request(app)
      .post('/user')
      .send({ email: mockUser.email })
      .expect(200)
      .then(response => {
        expect(response.body.data.length).toEqual(0);
        expect(response.body.msg).toEqual("User not found");
        done();
      })
      .catch(err => done(err));
  });

  test('POST /message', (done) => {
    request(app)
      .post('/message')
      .send(mockMessage)
      .expect(200)
      .then((response) => {
        expect(response.body.msg).toEqual("Message sent successfully");
        done();
      })
      .catch(err => done(err));
  });
});