const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const User = require('../models/User');

describe('Profile Management Endpoints', () => {
  let testUser;
  let authToken;
  const testEmail = `test${Date.now()}@example.com`;
  const otherEmail = `other${Date.now()}@example.com`;

  // Increase timeout for all tests in this suite
  jest.setTimeout(30000);

  beforeAll(async () => {
    // Connect to test database
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Clean up any existing test data
    await User.deleteMany({ email: { $regex: /@example\.com$/ } });

    // Create a test user
    testUser = await User.create({
      name: 'Test User',
      email: testEmail,
      password: 'password123',
      role: 'employee'
    });

    // Get auth token
    const loginResponse = await request(app)
      .post('/api/auth/login')
      .send({
        email: testEmail,
        password: 'password123'
      });

    authToken = loginResponse.body.token;
  });

  afterAll(async () => {
    // Clean up test data
    if (testUser && testUser._id) {
      await User.deleteOne({ _id: testUser._id });
    }
    await mongoose.connection.close();
  });

  describe('PUT /api/users/profile', () => {
    it('should update user profile', async () => {
      const response = await request(app)
        .put('/api/users/profile')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          name: 'Updated Name',
          email: `updated${Date.now()}@example.com`
        });

      expect(response.status).toBe(200);
      expect(response.body.user.name).toBe('Updated Name');
      expect(response.body.user.email).toMatch(/^updated\d+@example\.com$/);
    });

    it('should not allow duplicate email', async () => {
      // Create another user first
      const otherUser = await User.create({
        name: 'Other User',
        email: otherEmail,
        password: 'password123',
        role: 'employee'
      });

      const response = await request(app)
        .put('/api/users/profile')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          name: 'Test User',
          email: otherEmail // Try to use existing email
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Email already in use');

      // Clean up other user
      await User.deleteOne({ _id: otherUser._id });
    });
  });

  describe('PUT /api/users/password', () => {
    it('should change user password', async () => {
      const response = await request(app)
        .put('/api/users/password')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          currentPassword: 'password123',
          newPassword: 'newpassword123'
        });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Password updated successfully');

      // Verify new password works
      const loginResponse = await request(app)
        .post('/api/auth/login')
        .send({
          email: testEmail,
          password: 'newpassword123'
        });

      expect(loginResponse.status).toBe(200);
      expect(loginResponse.body.token).toBeDefined();
    });

    it('should not change password with incorrect current password', async () => {
      const response = await request(app)
        .put('/api/users/password')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          currentPassword: 'wrongpassword',
          newPassword: 'newpassword123'
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Current password is incorrect');
    });
  });
}); 