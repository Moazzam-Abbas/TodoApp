import { expect } from 'chai';
import UserValidations from '../Validations/UserValidations.js';

describe('Starting Unit Tests', () => {
    describe('User Password Compatibility Checks', function () {
 
        before(() => {
            // This code runs before any tests in the describe block
            const userRepository = {
                createUser(user) { },
                findAllUser() { },
                findOne(userId) { },
                UpdateUser(userRequestObj) { },
                deleteUser(userId) { },
                paginate(startIndex, endIndex) { },
            };
        });
 
        after(() => {
            // This code runs after all tests in the describe block
        });

        it('should return true for a valid password', () => {
            // Arrange
            const password = 'Password123!';
            // Act
            const result = UserValidations.passwordCompatibilityCheck(password);
            // Assert
            expect(result.isComplex).to.be.true;
        });

        it('should return false for a password with no uppercase letter', () => {
            // Arrange
            const password = 'password123!';
            // Act
            let error;
            try {
                const result = UserValidations.passwordCompatibilityCheck(password);
                // If the function call succeeds, check that the result is false
                expect(result.isComplex).to.be.false;
            } catch (err) {
                error = err;
            }
            // Assert
            expect(error).to.exist;
        });

        it('should return false for a password with no lowercase letter', () => {
            // Arrange
            const password = 'PASSWORD123!';
            // Act
            let error;
            try {
                const result = UserValidations.passwordCompatibilityCheck(password);
                // If the function call succeeds, check that the result is false
                expect(result.isComplex).to.be.false;
            } catch (err) {
                error = err;
            }
            // Assert
            expect(error).to.exist;
        });

        it('should return false for a password with no digit', () => {
            // Arrange
            const password = 'Password!';
            // Act
            let error;
            try {
                const result = UserValidations.passwordCompatibilityCheck(password);
                // If the function call succeeds, check that the result is false
                expect(result.isComplex).to.be.false;
            } catch (err) {
                error = err;
            }
            // Assert
            expect(error).to.exist;
        });

        it('should return false for a password with no special character', () => {
            // Arrange
            const password = 'Password123';
            // Act
            let error;
            try {
                const result = UserValidations.passwordCompatibilityCheck(password);
                // If the function call succeeds, check that the result is false
                expect(result.isComplex).to.be.false;
            } catch (err) {
                error = err;
            }
            // Assert
            expect(error).to.exist;
        });

        it('should return false for a password with fewer than 3 characters', () => {
            // Arrange
            const password = 'Pw';
            // Act
            let error;
            try {
                const result = UserValidations.passwordCompatibilityCheck(password);
                // If the function call succeeds, check that the result is false
                expect(result.isComplex).to.be.false;
            } catch (err) {
                error = err;
            }
            // Assert
            expect(error).to.exist;
        });
    });
})



