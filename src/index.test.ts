import request from 'supertest';
import { server } from './index';
import mockAssociationTemplates from './mocks/mockAssociation';
import mockUserTemplates from './mocks/mockUser';
import mockMessage from './mocks/mockMessage';

describe('test user routes', () => {
  test('POST /signup Fake email', async (done) => {
    await request(server)
      .post('/signup')
      .send(mockUserTemplates.mockFakeEmailUser)
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toEqual('Invalid email input');
        done();
      })
      .catch(err => done(err));
  });

  test('POST /signup Empty email', async (done) => {
    await request(server)
      .post('/signup')
      .send(mockUserTemplates.mockEmptyEmailUser)
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toEqual('Invalid email input');
        done();
      })
      .catch(err => done(err));
  });

  test('POST /signup Empty password', async (done) => {
    await request(server)
      .post('/signup')
      .send(mockUserTemplates.mockEmptyPasswordUser)
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toEqual('Invalid password input');
        done();
      })
      .catch(err => done(err));
  });

  test('POST /signup Too short password', async (done) => {
    await request(server)
      .post('/signup')
      .send(mockUserTemplates.mockShortPasswordUser)
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toEqual('Invalid password input');
        done();
      })
      .catch(err => done(err));
  });

  test('POST /signup Reject signup user with invalid input', (done) => {
    request(server)
      .post('/signup')
      .send()
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toEqual('Input must be a string');
        done();
      })
      .catch(err => done(err));
  });

  test('POST /signup Nominal email', async (done) => {
    await request(server)
      .post('/signup')
      .send(mockUserTemplates.mockUser)
      .catch(err => done(err));

    request(server)
      .post('/user')
      .send({ email: mockUserTemplates.mockUser.email })
      .expect(200)
      .then(response => {
        expect(response.body.data[response.body.data.length -1].email).toEqual(mockUserTemplates.mockUser.email);
        expect(response.body.msg).toEqual("User retrieved successfully");
        done();
      })
      .catch(err => done(err));
  });

  test('POST /signup Reject get user with empty email', (done) => {
    request(server)
      .post('/user')
      .send({ email: mockUserTemplates.mockEmptyEmailUser.email })
      .expect(400)
      .then(response => {
        expect(response.body.msg).toEqual('Invalid email input');
        done();
      })
      .catch(err => done(err));
  });

  test('POST /signup Reject get user with invalid input', (done) => {
    request(server)
      .post('/user')
      .send()
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toEqual('Input must be a string');
        done();
      })
      .catch(err => done(err));
  });

  test('POST /signup Reject double sign up', (done) => {
    request(server)
      .post('/signup')
      .send(mockUserTemplates.mockUser)
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toEqual('Email address already used');
        done();
      })
      .catch(err => done(err));
  });

  test('POST /signup Reject delete user with invalid input', (done) => {
    request(server)
      .post('/signout')
      .send()
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toEqual('Input must be a string');
        done();
      })
      .catch(err => done(err));
  });

  test('POST /signup Reject delete user with invalid email', (done) => {
    request(server)
      .post('/signout')
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
      .post('/signout')
      .send({ email: mockUserTemplates.mockUser.email })
      .expect(200)
      .then((response) => {
        expect(response.body.msg).toEqual("User deleted");
      })
      .catch(err => done(err));

    request(server)
      .post('/user')
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

  test('POST /api/add_association Should reject if input not a string', async (done) => {
    await request(server)
      .post('/api/add_association')
      .send(mockAssociationTemplates.mockAssociationNameNotAString)
      .expect(400)
      .then(response => {
        expect(response.body.msg).toEqual('Input must be a string');
        done();
      })
      .catch(err => done(err));
  });

  test('POST /api/add_association Should reject if input is empty', async (done) => {
    await request(server)
      .post('/api/add_association')
      .send(mockAssociationTemplates.mockAssociationEmptyName)
      .expect(400)
      .then(response => {
        expect(response.body.msg).toEqual('Required input missing');
        done();
      })
      .catch(err => done(err));
  });

  test('POST /api/add_association Should reject if invalid email', async (done) => {
    await request(server)
      .post('/api/add_association')
      .send(mockAssociationTemplates.mockAssociationFakeEmail)
      .expect(400)
      .then(response => {
        expect(response.body.msg).toEqual('Invalid email input');
        done();
      })
      .catch(err => done(err));
  });

  test('POST /api/add_association', async (done) => {
    await request(server)
      .post('/api/add_association')
      .send(mockAssociationTemplates.mockAssociation);

    request(server)
      .get('/api/associations')
      .expect(200)
      .then(response => {
        expect(response.body.data[response.body.data.length -1].name).toEqual(mockAssociationTemplates.mockAssociation.name);
        done();
      })
      .catch(err => done(err));
  });

  test('POST /api/update_association Should reject if input not a string', async (done) => {
    await request(server)
      .post('/api/update_association')
      .send(mockAssociationTemplates.mockAssociationNameNotAString)
      .expect(400)
      .then(response => {
        expect(response.body.msg).toEqual('Input must be a string');
        done();
      })
      .catch(err => done(err));
  });

  test('POST /api/update_association Should reject if input is empty', async (done) => {
    await request(server)
      .post('/api/update_association')
      .send(mockAssociationTemplates.mockAssociationEmptyName)
      .expect(400)
      .then(response => {
        expect(response.body.msg).toEqual('Required input missing');
        done();
      })
      .catch(err => done(err));
  });

  test('POST /api/update_association', (done) => {
    request(server)
      .post('/api/update_association')
      .send({ name: mockAssociationTemplates.mockAssociation.name, continent: 'Worldwide', country: 'Worldwide' })
      .expect(200)
      .then(() => {
        done();
      });
  });

  test('POST /api/delete_association Should reject if input not a string', async (done) => {
    await request(server)
      .post('/api/delete_association')
      .send(mockAssociationTemplates.mockAssociationNameNotAString)
      .expect(400)
      .then(response => {
        expect(response.body.msg).toEqual('Input must be a string');
        done();
      })
      .catch(err => done(err));
  });

  test('POST /api/delete_association Should reject if input is empty', async (done) => {
    await request(server)
      .post('/api/delete_association')
      .send(mockAssociationTemplates.mockAssociationEmptyName)
      .expect(400)
      .then(response => {
        expect(response.body.msg).toEqual('Required input missing');
        done();
      })
      .catch(err => done(err));
  });

  test('POST /api/delete_association', async (done) => {
    await request(server)
      .post('/api/delete_association')
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
  test('POST /message', (done) => {
    request(server)
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