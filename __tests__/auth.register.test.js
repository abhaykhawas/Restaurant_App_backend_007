const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../server');

let mongo


beforeAll(async () => {
    mongo = await MongoMemoryServer.create()
    let uri = mongo.getUri()
    process.env.MONGO_URI = uri

    await mongoose.disconnect()
    await mongoose.connect(uri)
})

afterAll(async () => {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()

    if (mongo) {
        await mongo.stop()
    }
})

afterEach(async () => {
    const collections = mongoose.connection.collections
    for (const key of Object.keys(collections)){
        await collections[key].deleteMany({})
    }
})

describe('POST /api/v1/auth/register', () => {
    const endpoint = '/api/v1/auth/register'

    test('Create a new user return 201 with user payload', async () => {
        const res = await request(app)
            .post(endpoint)
            .send({
                name: 'Alice',
                email: 'alice@cool.com',
                password:'alice123',
                role: 'CUSTOMER'
            })
        
        expect(res.status).toBe(201)
        expect(res.body.success).toBe(true)
    })

    test('returns 400 when email already exsists', async () => {
        await request(app)
            .post(endpoint)
            .send({
                name: 'Alice',
                email: 'alice@cool.com',
                password:'alice123',
                role: 'CUSTOMER'
            })
        
        const res = await request(app)
            .post(endpoint)
            .send({
                name: 'Alice',
                email: 'alice@cool.com',
                password:'alice123',
                role: 'CUSTOMER'
            })
        
        expect(res.status).toBe(400)
        expect(res.body.message).toBe("User already exsists")
        expect(res.body.success).toBe(false)
        
    })

    // write a test case of missing a field
})