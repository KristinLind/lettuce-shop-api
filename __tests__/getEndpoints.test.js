const request = require('supertest');
const mongoose = require('mongoose');

jest.mock('../config/passport', () => ({
  initialize: () => (req, res, next) => next(),
  session: () => (req, res, next) => next(),
  authenticate: () => (req, res, next) => next(), // This fixes the crash!
  use: jest.fn(),
  serializeUser: jest.fn(),
  deserializeUser: jest.fn(),
  logout: (req, res, next) => next(),
}));

jest.mock('../models/itemModel');
jest.mock('../models/listModel');
jest.mock('../models/storeModel');
jest.mock('../models/userModel');

const Item = require('../models/itemModel');
const Store = require('../models/storeModel');
const List = require('../models/listModel');
const User = require('../models/userModel');

const app = require('../server');

jest.mock('mongoose', () => {
    const actualMongoose = jest.requireActual('mongoose');
    return {
        ...actualMongoose,
        connect: jest.fn().mockResolvedValue(true),
   };
});

describe('GET Endpoints Unit Tests', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    const MOCK_ID = '645a1b2c3d4e5f6a7b8c9d0e';

    describe('GET /items', () => {
        it('should return all items', async() => {
            const mockItems = [{
                _id:  MOCK_ID,
                name: 'Romaine Lettuce', 
                price: 2.50}];
            Item.find.mockResolvedValue(mockItems);

            const res = await request(app).get('/items');

            expect(res.statusCode).toEqual(200);
            expect(res.body).toBeInstanceOf(Array);
            expect(res.body[0].name).toBe('Romaine Lettuce');
        });
    });

    describe('GET /stores', () => {
        it('should return all stores', async() => {
            const mockStores = [{
                _id: MOCK_ID, 
                name: 'Walmart', 
                location: 'Houston'}];
            Store.find.mockResolvedValue(mockStores);

            const res = await request(app).get('/stores');

            expect(res.statusCode).toEqual(200);
            expect(res.body).toBeInstanceOf(Array);
            expect(res.body[0].name).toBe('Walmart');
        });
    });

    describe('GET /lists', () => {
        it('should return all lists', async() => {
            const mockLists = [{
                _id: MOCK_ID, 
                name: "Sarah's List"}];
            List.find.mockResolvedValue(mockLists);  

            const res = await request(app).get('/lists');

            expect(res.statusCode).toEqual(200);
            expect(res.body).toBeInstanceOf(Array);
            expect(res.body[0].name).toBe("Sarah's List");
        });
    });

    describe('GET /users', () => {
        it('should return all users', async() => {
            const mockUsers = [{
                _id: MOCK_ID, 
                username: 'Slord'}];
            User.find.mockResolvedValue(mockUsers);  

            const res = await request(app).get('/users');

            expect(res.statusCode).toEqual(200);
            expect(res.body).toBeInstanceOf(Array);
            expect(res.body[0].username).toBe('Slord');
        });
    });

    describe('GET /items/:id', () => {
        it('should return by a single item by ID', async () => {
            const MockItem = {
                _id: MOCK_ID,
                name: 'Romaine Lettuce',
                price: 2.50};
            Item.findById.mockResolvedValue(MockItem);

            const res = await request(app).get(`/items/${MOCK_ID}`);

            expect(res.statusCode).toEqual(200);
            expect(res.body._id).toBe(MOCK_ID);
            expect(res.body.name).toBe('Romaine Lettuce');
        });
    });

    describe('GET /stores/:id', () => {
        it('should return by a single store by ID', async () => {
            const MockStore = {
                _id: MOCK_ID,
                name: 'Walmart',
                address: 'Houston'};
            Store.findById.mockResolvedValue(MockStore);

            const res = await request(app).get(`/stores/${MOCK_ID}`);

            expect(res.statusCode).toEqual(200);
            expect(res.body._id).toBe(MOCK_ID);
            expect(res.body.name).toBe('Walmart');
        });
    });
})