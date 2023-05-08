const request = require('supertest');
const assert = require('assert');
const app = require('../app');

function postRoleRequest(name, description) {
  return request(app).post('/roles').send({ name, description });
}

describe('In the role controller', () => {
  beforeEach(async () => {
    await request(app).delete('/roles');
  });

  it('POST /roles responds with a 201 the created role on success', (done) => {
    postRoleRequest('admin', 'They administrate')
      .set('Accept', 'application/json')
      .expect(201)
      .expect('Content-Type', /json/)
      .expect(/"name":\s*"admin"/)
      .expect(/"description":\s*"They administrate"/, done);
  });

  it('GET /roles responds with a 200 on success', async () => {
    await postRoleRequest('admin', 'Running the show').expect(201);
    await postRoleRequest('founder', 'Starting it up').expect(201);
    await postRoleRequest('case manager', 'Helping').expect(201);
    await postRoleRequest('volunteer', 'Donating the time').expect(201);
    await request(app).get('/roles').expect(200)
      .then((res) => {
        assert.equal(res.body.length, 4);
        assert.deepEqual(res.body[0], { name: 'admin', description: 'Running the show' });
        assert.deepEqual(res.body[1], { name: 'case manager', description: 'Helping' });
        assert.deepEqual(res.body[2], { name: 'founder', description: 'Starting it up' });
        assert.deepEqual(res.body[3], { name: 'volunteer', description: 'Donating the time' });
      });
  });
});
