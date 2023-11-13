import request from 'supertest';
import app from './app';
import axios from 'axios';

describe('users', () => {
  describe('POST /users', () => {
    it('should return 201 with a successful response body', async () => {
      const creatUserRequest = {
        firstName: 'John',
        lastName: 'Smith'
      };

      const response = await request(app)
        .post('/users')
        .send(creatUserRequest);

      axios.post('http://localhost:5907/validate', {
        "request": {
          "method": "POST",
          "path": "/users",
          "headers": [],
          "body": JSON.stringify(creatUserRequest)
        },
        "response": {
          "status": 201,
          "headers": [],
          "body": JSON.stringify(response.body)
        }
      }
        , {
          headers: {
            'Content-Type': 'application/json'
          }
        }).then((validationResponse) => {
          const body = validationResponse.data;
          expect(body.violations).toEqual([])
        }).catch((error) => {
          throw error;
        });
    });

    it('should return 400 with an invalid request response body', async () => {
      const creatUserRequest = {
        firstName: 'John',
        lastName: false
      };

      const response = await request(app)
        .post('/users')
        .send(creatUserRequest);

      axios.post('http://localhost:5907/validate', {
        "request": {
          "method": "POST",
          "path": "/users",
          "headers": [],
          "body": JSON.stringify(creatUserRequest)
        },
        "response": {
          "status": 400,
          "headers": [],
          "body": JSON.stringify(response.body)
        }
      }
        , {
          headers: {
            'Content-Type': 'application/json'
          }
        }).then((validationResponse) => {
          const body = validationResponse.data;
          expect(body.violations).toEqual([]);
        }).catch((error) => {
          throw error;
        });
    });
  });
})
