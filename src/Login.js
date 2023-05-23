import React, { useState } from 'react';
import { Container, TextField, Box, Button, Typography } from '@mui/material';
import PropTypes from 'prop-types';

async function loginUser(credentials, setToken) {
  fetch('http://localhost:8000/users', {
    method: 'GET',
  })
    .then((data) => data.json())
    .then((res) => {
      // check to see if the user is known
      const user = res.filter((o) => o.username === credentials.username && o.password === credentials.password);
      if (user.length === 0) {
        throw 'unknown user';
      } else {
        return fetch('http://localhost:8000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(credentials),
        })
          .then((data) => data.json())
          .then((response) => setToken(response));
      }
    });
}

export default function Login({ setToken }) {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const handleSignIn = async (e) => {
    e.preventDefault();
    await loginUser(
      {
        username,
        password,
      },
      setToken
    );
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <Typography component="h1" variant="h5">
          The friendly fruit shop
        </Typography>
        <Box component="form" onSubmit={handleSignIn} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            onChange={(event) => setUsername(event.target.value)}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
