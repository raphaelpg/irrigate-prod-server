import request from 'supertest';
import app from './index';
import mockAssociationTemplates from './mocks/mockAssociation';
import mockUserTemplates from './mocks/mockUser';
import mockMessagesTemplate from './mocks/mockMessage';

describe('test user routes', () => {
  test('POST /api/user/add Fake email', async (done) => {
    await request(app)
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
    await request(app)
      .post('/api/user/add')
      .send(mockUserTemplates.mockEmptyEmailUser)
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toEqual('Error in request field');
        done();
      })
      .catch(err => done(err));
  });

  test('POST /api/user/add Empty password', async (done) => {
    await request(app)
      .post('/api/user/add')
      .send(mockUserTemplates.mockEmptyPasswordUser)
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toEqual('Error in request field');
        done();
      })
      .catch(err => done(err));
  });

  test('POST /api/user/add Too short password', async (done) => {
    await request(app)
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
    request(app)
      .post('/api/user/add')
      .send()
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toEqual('Error in request field');
        done();
      })
      .catch(err => done(err));
  });

  test('POST /api/user/add Nominal email', async (done) => {
    await request(app)
      .post('/api/user/add')
      .send(mockUserTemplates.mockUser)
      .expect(201)
      .catch(err => done(err));

    request(app)
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

  test('GET /api/user Reject get user with empty email', (done) => {
    request(app)
      .get('/api/user')
      .send({ email: mockUserTemplates.mockEmptyEmailUser.email })
      .expect(400)
      .then(response => {
        expect(response.body.msg).toEqual('Error in request field');
        done();
      })
      .catch(err => done(err));
  });

  test('GET /api/user Reject get user with invalid input', (done) => {
    request(app)
      .get('/api/user')
      .send()
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toEqual('Error in request field');
        done();
      })
      .catch(err => done(err));
  });

  test("GET /api/user Reject get user that doesn't exists", (done) => {
    request(app)
      .get('/api/user')
      .send(mockUserTemplates.mockUser2)
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toEqual('Error while retrieving user');
        done();
      })
      .catch(err => done(err));
  });

  test('POST /api/user/add Reject double sign up', (done) => {
    request(app)
      .post('/api/user/add')
      .send(mockUserTemplates.mockUser)
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toEqual('Email address already used');
        done();
      })
      .catch(err => done(err));
  });

  test("POST /api/user/login Reject user login that doesn't exists", async (done) => {
    await request(app)
    .post('/api/user/login')
    .send(mockUserTemplates.mockUser2)
    .expect(400)
    .then(response => {
      expect(response.body.msg).toEqual("Can't find user");
      done();
    })
    .catch(err => done(err));
  });

  test("POST /api/user/login Reject user login with wrong password", async (done) => {
    await request(app)
    .post('/api/user/login')
    .send(mockUserTemplates.mockWrongPasswordUser)
    .expect(400)
    .then(response => {
      expect(response.body.msg).toEqual("Unauthorized");
      done();
    })
    .catch(err => done(err));
  });
    
  test('POST /api/user/delete Reject delete user with invalid input', async (done) => {
    let token = '';

    await request(app)
    .post('/api/user/login')
    .send(mockUserTemplates.mockUser)
    .expect(200)
    .then(response => {
      expect(response.body.msg).toEqual('User authorized')
      token =  'Bearer ' + response.body.token
    })
    .then(() => {
      request(app)
        .delete('/api/user/delete')
        .set({'Authorization': token, 'Content-Type': 'application/json'})
        .send()
        .expect(400)
        .then((res) => {
          expect(res.body.msg).toEqual('Error in request field');
          done()
        })
        .catch(err => done(err));
    })
  });

  test('POST /api/user/delete Reject delete user with invalid email', async (done) => {
    let token = '';

    await request(app)
    .post('/api/user/login')
    .send(mockUserTemplates.mockUser)
    .expect(200)
    .then(response => {
      expect(response.body.msg).toEqual('User authorized')
      token =  'Bearer ' + response.body.token
    })
    .then(() => {
      request(app)
        .delete('/api/user/delete')
        .set({'Authorization': token, 'Content-Type': 'application/json'})
        .send({ email: mockUserTemplates.mockFakeEmailUser.email })
        .expect(400)
        .then((res) => {
          expect(res.body.msg).toEqual('Invalid email input');
          done()
        })
        .catch(err => done(err));
    })
  });

  test('POST /api/user/delete Reject delete user with fake token', async (done) => {
    let token = '';

    await request(app)
    .post('/api/user/login')
    .send(mockUserTemplates.mockUser)
    .expect(200)
    .then(response => {
      expect(response.body.msg).toEqual('User authorized')
      token =  'Bearer ' + 'faketoken123456'
    })
    .then(() => {
      request(app)
        .delete('/api/user/delete')
        .set({'Authorization': token, 'Content-Type': 'application/json'})
        .send({ email: mockUserTemplates.mockUser.email })
        .expect(404)
        .then((res) => {
          expect(res.body.msg).toEqual('jwt malformed');
          done()
        })
        .catch(err => done(err));
    })
  });

  test('POST /api/user/delete Reject delete user without token', async (done) => {
    let token = '';

    await request(app)
    .post('/api/user/login')
    .send(mockUserTemplates.mockUser)
    .expect(200)
    .then(response => {
      expect(response.body.msg).toEqual('User authorized')
    })
    .then(() => {
      request(app)
        .delete('/api/user/delete')
        .set({'Authorization': token, 'Content-Type': 'application/json'})
        .send({ email: mockUserTemplates.mockUser.email })
        .expect(401)
        .then((res) => {
          expect(res.body.msg).toEqual('Unauthorized');
          done()
        })
        .catch(err => done(err));
    })
  });

  test('POST /api/user/delete Reject delete another user', async (done) => {
    let token = '';

    await request(app)
    .post('/api/user/login')
    .send(mockUserTemplates.mockUser)
    .expect(200)
    .then(response => {
      expect(response.body.msg).toEqual('User authorized')
    })
    .then(() => {
      request(app)
        .delete('/api/user/delete')
        .set({'Authorization': token, 'Content-Type': 'application/json'})
        .send({ email: mockUserTemplates.mockUser2.email })
        .expect(401)
        .then((res) => {
          expect(res.body.msg).toEqual('Unauthorized');
          done()
        })
        .catch(err => done(err));
    })
  });

  test('POST /api/user/delete Remove user from database', async (done) => {
    let token = '';

    await request(app)
    .post('/api/user/login')
    .send(mockUserTemplates.mockUser)
    .expect(200)
    .then(response => {
      expect(response.body.msg).toEqual('User authorized')
      token =  'Bearer ' + response.body.token
    })
    .then(() => {
      request(app)
        .delete('/api/user/delete')
        .set({'Authorization': token, 'Content-Type': 'application/json'})
        .send({ email: mockUserTemplates.mockUser.email })
        .expect(200)
        .then((res) => {
          expect(res.body.msg).toEqual("User deleted");
          done();
        })
        .catch(err => done(err));
    })
  });
});

describe('test associations routes', () => {
  test('GET /api/associations', (done) => {
    request(app)
      .get('/api/associations')
      .expect(200)
      .then(response => {
        expect(response.body.msg).toEqual('Associations retrieved successfully');
      })
    done();
  });

  test('POST /api/association/add Should reject if input not a string', async (done) => {
    await request(app)
      .post('/api/association/add')
      .send(mockAssociationTemplates.mockAssociationNameNotAString)
      .expect(400)
      .then(response => {
        expect(response.body.msg).toEqual("Error in request field");
        done();
      })
      .catch(err => done(err));
  });

  test('POST /api/association/add Should reject if input is empty', async (done) => {
    await request(app)
      .post('/api/association/add')
      .send(mockAssociationTemplates.mockAssociationEmptyName)
      .expect(400)
      .then(response => {
        expect(response.body.msg).toEqual("Error in request field");
        done();
      })
      .catch(err => done(err));
  });

  test('POST /api/association/add Should reject if invalid email', async (done) => {
    await request(app)
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
    await request(app)
      .post('/api/association/add')
      .send(mockAssociationTemplates.mockAssociation)
      .expect(201);

    request(app)
      .get('/api/associations')
      .expect(200)
      .then(response => {
        expect(response.body.data[response.body.data.length -1].name).toEqual(mockAssociationTemplates.mockAssociation.name);
        done();
      })
      .catch(err => done(err));
  });

  test('POST /api/association/update Should reject if input not a string', async (done) => {
    await request(app)
      .patch('/api/association/update')
      .send(mockAssociationTemplates.mockAssociationNameNotAString)
      .expect(400)
      .then(response => {
        expect(response.body.msg).toEqual('Error in request field');
        done();
      })
      .catch(err => done(err));
  });

  test('POST /api/association/update Should reject if input is empty', async (done) => {
    await request(app)
      .patch('/api/association/update')
      .send(mockAssociationTemplates.mockAssociationEmptyName)
      .expect(400)
      .then(response => {
        expect(response.body.msg).toEqual('Error in request field');
        done();
      })
      .catch(err => done(err));
  });

  test('POST /api/association/update', (done) => {
    request(app)
      .patch('/api/association/update')
      .send({ name: mockAssociationTemplates.mockAssociation.name, continent: 'Worldwide', country: 'Worldwide' })
      .expect(200)
      .then(() => {
        done();
      });
  });

  test('POST /api/association/delete Should reject if input not a string', async (done) => {
    await request(app)
      .delete('/api/association/delete')
      .send(mockAssociationTemplates.mockAssociationNameNotAString)
      .expect(400)
      .then(response => {
        expect(response.body.msg).toEqual('Error in request field');
        done();
      })
      .catch(err => done(err));
  });

  test('POST /api/association/delete Should reject if input is empty', async (done) => {
    await request(app)
      .delete('/api/association/delete')
      .send(mockAssociationTemplates.mockAssociationEmptyName)
      .expect(400)
      .then(response => {
        expect(response.body.msg).toEqual('Error in request field');
        done();
      })
      .catch(err => done(err));
  });

  test('POST /api/association/delete', async (done) => {
    await request(app)
      .delete('/api/association/delete')
      .send({ name: mockAssociationTemplates.mockAssociation.name })
      .expect(200);

    request(app)
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