import React, { useState } from "react";
import { Container, Form, Stack, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../../CSS/ProfileEdit.css";
import { editStudentInfo } from "../../API/api.js";

function ProfileEdit({ userId }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await editStudentInfo(userId, name, email, password);

      if (response.data.success) {
        setError("");
        navigate("/profile"); // Redirect to the profile page
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="form">
      <Container>
        <Form onSubmit={handleSubmit}>
          <h1 className="text-center pt-3 pb-3">Update Your Account</h1>

          <hr style={{ width: "350px", margin: "20px auto" }} />

          <Stack gap={1} className="col-12 mx-auto">
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required
              />
            </Form.Group>

            <Button variant="outline-primary" type="submit" className="my-2">
              Update My Account
            </Button>

            {error && <Alert variant="danger">{error}</Alert>}
          </Stack>
        </Form>
      </Container>
    </div>
  );
}

export default ProfileEdit;
