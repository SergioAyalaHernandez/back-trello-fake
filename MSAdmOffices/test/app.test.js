const request = require('supertest');
const express = require('express');
const officeRouter = require('../router/officeRouter');

const app = express();
app.use('/api/v1/offices', officeRouter);

describe('Office Router', () => {
    it('should respond with a 200 status code for GET /api/v1/offices', async () => {
        const response = await request(app).get('/api/v1/offices');
        expect(response.status).toBe(200);
    });

    it('should respond with a 405 status code for an unsupported method on /api/v1/offices', async () => {
        const response = await request(app).put('/api/v1/offices');
        expect(response.status).toBe(405);
    });

});