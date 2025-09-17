const request = require('supertest');
const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../server');


let mongo;


beforeAll(async () => {
    mongo = await MongoMemoryServer.create();
    const uri = mongo.getUri();
    process.env.MONGO_URI = uri;

    await mongoose.disconnect()
    await mongoose.connect(uri)
})


afterAll(async () => {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()

    if(mongo){
        await mongo.stop()
    }
})


afterEach(async () => {
    const collections = mongoose.connection.collections
    for(const key of Object.keys(collections)){
        await collections[key].deleteMany({})
    }
})

describe('POST /api/v1/auth/login', () => {
    const registerEndpoint = '/api/v1/auth/register'
    const loginEndpoint = '/api/v1/auth/login'

    test('logs in successfully and returns a token', async () => {
        await request(app)
            .post(registerEndpoint)
            .send({
                name: 'Alice',
                email: 'alice@cool.com',
                password:'alice123',
                role: 'CUSTOMER'
            })
        
        const res = await request(app)
            .post(loginEndpoint)
            .send({
                email:'alice@cool.com',
                password:'alice123'
            })
        
        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty('token')
    })

    test('return 400 when user is not found', async () => {
        const res = await request(app)
            .post(loginEndpoint)
            .send({
                email:'missing@email.com',
                password:'doesnotexsists'
            })
        
        expect(res.status).toBe(400)
        expect(res.body.success).toBe(false)
        expect(res.body.message).toBe('User not found')
    })

    test('returns 400 when password is wrong', async () => {
        await request(app)
            .post(registerEndpoint)
            .send({
                name: 'Alice',
                email: 'alice@cool.com',
                password:'alice123',
                role: 'CUSTOMER'
            })
        
        const res = await request(app)
            .post(loginEndpoint)
            .send({
                email:'alice@cool.com',
                password:'alicewrong'
            })
        
        expect(res.status).toBe(400)
    })

})