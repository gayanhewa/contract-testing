import { api, body, endpoint, request, response, String } from "@airtasker/spot";

@api({ name: "my-api" })
class Api { }

@endpoint({
  method: "POST",
  path: "/users"
})
class CreateUser {
  @request
  request(
    @body body: CreateUserRequest
  ) { }

  @response({ status: 201 })
  successfulResponse(
    @body body: CreateUserResponse
  ) { }

  @response({ status: 400 })
  invalidRequestResponse(
    @body body: {
      error: String;
    }
  ) { }
}

interface CreateUserRequest {
  firstName: String;
  lastName: String;
}

interface CreateUserResponse {
  firstName: String;
  lastName: String;
  role: String;
}
