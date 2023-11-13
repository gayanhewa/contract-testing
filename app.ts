import express from 'express';

const app = express();
app.use(express.json());

app.post('/users', (request, response) => {
  // throw an error if the request body is missing values from CreateUserRequest
  if (!request.body.firstName || !request.body.lastName) {
    response.status(400).json({
      error: 'Bad Request'
    });
    return;
  }

  response.status(201).json({
    firstName: request.body.firstName,
    lastName: request.body.lastName,
    role: 'user'
  });
});

export default app;
