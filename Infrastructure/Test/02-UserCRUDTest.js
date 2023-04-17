import * as dotenv from 'dotenv'
dotenv.config()
import { expect } from 'chai';
import supertest from 'supertest';

const port = process.env.PORT || 3000;
const request = supertest(`http://localhost:${port}`);

describe('Starting Integration Tests', () => {
    
    let createdId;
    let todoId;

    describe('JWT Authentication Process', () => {

        it('should create a new user ', async () => {
            //Arrange
            const user = {
                "userName": "TestRecord",
                "password": "Password123!"
            }
            //Act
            const res = await request.post('/users').send(user);
            //Assert
            expect(res.status).to.equal(201);
            expect(res.body).to.have.property('id');
            expect(res.body).to.have.property('userName');
            expect(res.body).to.have.property('password');
            expect(res.body).to.have.property('updatedAt');
            expect(res.body).to.have.property('createdAt');
            expect(res.body.userName).to.equal('TestRecord');
            createdId = res.body.id;
        });

        it('should get acesstoken. ', async () => {
            //Arrange
            const user = {
                "userName": "TestRecord",
                "password": "Password123!"
            }
            // Act
            const res = await request.post(`/jwt`).send(user);
            //Assert
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property('access_token')
        });
    })

    describe('User API', () => {

        let authToken;

        before(async () => {
            // This code runs before any tests in the describe block
            const user = {
                "userName": "TestRecord",
                "password": "Password123!"
            }
            const res = await request.post(`/jwt`).send(user);
            authToken = res.body.access_token
        });

        it('should get all users ', async () => {
            // Act
            const res = await request.get(`/users`).set('Authorization', `${authToken}`);
            //Assert
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property('result').that.is.an('array');
        });

        it('should update a user by id', async () => {
            //Arrange
            const user = {
                "password": "Password123!"
            }
            //Act
            const res = await request.put(`/users/${createdId}`).set('Authorization', `${authToken}`).send(user);
            //Assert
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property('message');
        });
    })

    describe('Todo API', () => {

        let authToken;

        before(async () => {
            // This code runs before any tests in the describe block
            const user = {
                "userName": "TestRecord",
                "password": "Password123!"
            }
            const res = await request.post(`/jwt`).send(user);
            authToken = res.body.access_token
        });

        it('should create an item ', async () => {
            //Arrange
            const todo = {
                "title": "TestRecord",
                "description": "Password123!",
                "userId": createdId
            }
            //Act
            const res = await request.post('/todo').set('Authorization', `${authToken}`).send(todo);
            //Assert
            expect(res.status).to.equal(201);
            expect(res.body).to.have.property('id');
            expect(res.body).to.have.property('title');
            expect(res.body).to.have.property('description');
            expect(res.body).to.have.property('userId');
            expect(res.body).to.have.property('updatedAt');
            expect(res.body).to.have.property('createdAt');
            todoId = res.body.id;
        });

        it('should get all items ', async () => {
            // Act
            const res = await request.get(`/todo`).set('Authorization', `${authToken}`);
            //Assert
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property('result').that.is.an('array');
        });

        it('should update an item', async () => {
            //Arrange
            const todo = {
                "description": "updated description!"
            }
            //Act
            const res = await request.put(`/todo/${todoId}`).set('Authorization', `${authToken}`).send(todo);
            //Assert
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property('message');
        });

        it('should delete an item', async () => {
            //Act
            const res = await request.delete(`/todo/${todoId}`).set('Authorization', `${authToken}`);
            //Assert
            expect(res.status).to.equal(204);
        });

    })

    describe('Clearance of Test Setup', () => {

        let authToken;

        before(async () => {
            // This code runs before any tests in the describe block
            const user = {
                "userName": "TestRecord",
                "password": "Password123!"
            }
            const res = await request.post(`/jwt`).send(user);
            authToken = res.body.access_token
        });

        it('should delete a user', async () => {
            //Act
            const res = await request.delete(`/users/${createdId}`).set('Authorization', `${authToken}`);
            //Assert
            expect(res.status).to.equal(204);
        });
    })

})

