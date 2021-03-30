import request from 'supertest';
import { server } from './index';
import mockAssociationTemplates from './mocks/mockAssociation';
import mockUserTemplates from './mocks/mockUser';
import mockMessage from './mocks/mockMessage';

describe('test user routes', () => {
  test('POST /api/user/add Fake email', async (done) => {
    await request(server)
      .post('/api/user/add')
      .send(mockUserTemplates.mockFakeEmailUser)
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toEqual('Invalid email input');
        done();
      })
      .catch(err => done(err));
  });

  test('POST /api/user/add Empty email', async (done) => {
    await request(server)
      .post('/api/user/add')
      .send(mockUserTemplates.mockEmptyEmailUser)
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toEqual('Invalid email input');
        done();
      })
      .catch(err => done(err));
  });

  test('POST /api/user/add Empty password', async (done) => {
    await request(server)
      .post('/api/user/add')
      .send(mockUserTemplates.mockEmptyPasswordUser)
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toEqual('Invalid password input');
        done();
      })
      .catch(err => done(err));
  });

  test('POST /api/user/add Too short password', async (done) => {
    await request(server)
      .post('/api/user/add')
      .send(mockUserTemplates.mockShortPasswordUser)
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toEqual('Invalid password input');
        done();
      })
      .catch(err => done(err));
  });

  test('POST /api/user/add Reject signup user with invalid input', (done) => {
    request(server)
      .post('/api/user/add')
      .send()
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toEqual('Input must be a string');
        done();
      })
      .catch(err => done(err));
  });

  test('POST /api/user/add Nominal email', async (done) => {
    await request(server)
      .post('/api/user/add')
      .send(mockUserTemplates.mockUser)
      .expect(201)
      .catch(err => done(err));

    request(server)
      .get('/api/user')
      .send({ email: mockUserTemplates.mockUser.email })
      .expect(200)
      .then(response => {
        expect(response.body.data[response.body.data.length -1].email).toEqual(mockUserTemplates.mockUser.email);
        expect(response.body.msg).toEqual("User retrieved successfully");
        done();
      })
      .catch(err => done(err));
  });

  test('POST /api/user/add Reject get user with empty email', (done) => {
    request(server)
      .get('/api/user')
      .send({ email: mockUserTemplates.mockEmptyEmailUser.email })
      .expect(400)
      .then(response => {
        expect(response.body.msg).toEqual('Invalid email input');
        done();
      })
      .catch(err => done(err));
  });

  test('POST /api/user/add Reject get user with invalid input', (done) => {
    request(server)
      .get('/api/user')
      .send()
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toEqual('Input must be a string');
        done();
      })
      .catch(err => done(err));
  });

  test('POST /api/user/add Reject double sign up', (done) => {
    request(server)
      .post('/api/user/add')
      .send(mockUserTemplates.mockUser)
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toEqual('Email address already used');
        done();
      })
      .catch(err => done(err));
  });

  test('POST /api/user/add Reject delete user with invalid input', (done) => {
    request(server)
      .delete('/api/user/delete')
      .send()
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toEqual('Input must be a string');
        done();
      })
      .catch(err => done(err));
  });

  test('POST /api/user/add Reject delete user with invalid email', (done) => {
    request(server)
      .delete('/api/user/delete')
      .send({ email: mockUserTemplates.mockFakeEmailUser.email })
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toEqual('Invalid email input');
        done();
      })
      .catch(err => done(err));
  });

  test('POST /signout Remove user from database', async (done) => {
    await request(server)
      .delete('/api/user/delete')
      .send({ email: mockUserTemplates.mockUser.email })
      .expect(200)
      .then((response) => {
        expect(response.body.msg).toEqual("User deleted");
      })
      .catch(err => done(err));

    request(server)
      .get('/api/user')
      .send({ email: mockUserTemplates.mockUser.email })
      .expect(200)
      .then(response => {
        expect(response.body.data.length).toEqual(0);
        expect(response.body.msg).toEqual("User not found");
        done();
      })
      .catch(err => done(err));
  });
});

describe('test associations routes', () => {
  test('GET /api/associations', (done) => {
    request(server)
      .get('/api/associations')
      .expect(200)
      .then(response => {
        expect(response.body.msg).toEqual('Associations retrieved successfully');
      })
    done();
  });

  test('POST /api/association/add Should reject if input not a string', async (done) => {
    await request(server)
      .post('/api/association/add')
      .send(mockAssociationTemplates.mockAssociationNameNotAString)
      .expect(400)
      .then(response => {
        expect(response.body.msg).toEqual('Input must be a string');
        done();
      })
      .catch(err => done(err));
  });

  test('POST /api/association/add Should reject if input is empty', async (done) => {
    await request(server)
      .post('/api/association/add')
      .send(mockAssociationTemplates.mockAssociationEmptyName)
      .expect(400)
      .then(response => {
        expect(response.body.msg).toEqual('Required input missing');
        done();
      })
      .catch(err => done(err));
  });

  test('POST /api/association/add Should reject if invalid email', async (done) => {
    await request(server)
      .post('/api/association/add')
      .send(mockAssociationTemplates.mockAssociationFakeEmail)
      .expect(400)
      .then(response => {
        expect(response.body.msg).toEqual('Invalid email input');
        done();
      })
      .catch(err => done(err));
  });

  test('POST /api/association/add', async (done) => {
    await request(server)
      .post('/api/association/add')
      .send(mockAssociationTemplates.mockAssociation)
      .expect(201);

    request(server)
      .get('/api/associations')
      .expect(200)
      .then(response => {
        expect(response.body.data[response.body.data.length -1].name).toEqual(mockAssociationTemplates.mockAssociation.name);
        done();
      })
      .catch(err => done(err));
  });

  test('POST /api/association/update Should reject if input not a string', async (done) => {
    await request(server)
      .patch('/api/association/update')
      .send(mockAssociationTemplates.mockAssociationNameNotAString)
      .expect(400)
      .then(response => {
        expect(response.body.msg).toEqual('Input must be a string');
        done();
      })
      .catch(err => done(err));
  });

  test('POST /api/association/update Should reject if input is empty', async (done) => {
    await request(server)
      .patch('/api/association/update')
      .send(mockAssociationTemplates.mockAssociationEmptyName)
      .expect(400)
      .then(response => {
        expect(response.body.msg).toEqual('Required input missing');
        done();
      })
      .catch(err => done(err));
  });

  test('POST /api/association/update', (done) => {
    request(server)
      .patch('/api/association/update')
      .send({ name: mockAssociationTemplates.mockAssociation.name, continent: 'Worldwide', country: 'Worldwide' })
      .expect(200)
      .then(() => {
        done();
      });
  });

  test('POST /api/association/delete Should reject if input not a string', async (done) => {
    await request(server)
      .delete('/api/association/delete')
      .send(mockAssociationTemplates.mockAssociationNameNotAString)
      .expect(400)
      .then(response => {
        expect(response.body.msg).toEqual('Input must be a string');
        done();
      })
      .catch(err => done(err));
  });

  test('POST /api/association/delete Should reject if input is empty', async (done) => {
    await request(server)
      .delete('/api/association/delete')
      .send(mockAssociationTemplates.mockAssociationEmptyName)
      .expect(400)
      .then(response => {
        expect(response.body.msg).toEqual('Required input missing');
        done();
      })
      .catch(err => done(err));
  });

  test('POST /api/association/delete', async (done) => {
    await request(server)
      .delete('/api/association/delete')
      .send({ name: mockAssociationTemplates.mockAssociation.name })
      .expect(200);

    request(server)
      .get('/api/associations')
      .expect(200)
      .then(response => {
        expect(response.body.data[response.body.data.length -1].name).not.toEqual(mockAssociationTemplates.mockAssociation.name);
        done();
      })
      .catch(err => done(err));
  });
});

describe('test messages routes', () => {
  test('POST /api/message/add', (done) => {
    request(server)
      .post('/api/message/add')
      .send(mockMessage)
      .expect(201)
      .then((response) => {
        expect(response.body.msg).toEqual("Message sent successfully");
        done();
      })
      .catch(err => done(err));
  });
});