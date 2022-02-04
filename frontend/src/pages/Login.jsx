import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { useAuth } from "../auth";
import { toast } from 'react-toastify';
import { useMutation } from 'react-query'
import { loginUser } from '../api/users'
import { Button, TextField, Paper, Stack, Typography, Container, Link, Box } from '@mui/material'
import { colors, theme } from "../theme";

export default function Login() {
  const auth = useAuth();
  let navigate = useNavigate();
  let location = useLocation();

  let from = location.state?.from?.pathname || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginMutation = useMutation(loginUser)

  function login() {
    loginMutation.mutateAsync({ email, password })
      .then((res) => {
        toast.success("Welcome to picsup!!");
        auth.setToken(res.data.token);
        navigate(from, { replace: true });
      })
      .catch(error => {
        toast.error("Some error occured! Try harder ;)");
      });
  }

  return (
    <Box bgcolor={colors.blue[100]}>
      <Container>
        <Stack direction={{ xs: 'column', md: "row" }} alignItems="center" justifyContent="center" spacing={8} sx={{ height: '100vh' }}>
          <Stack px="3rem">
            <Typography variant="h3" color="primary" fontWeight="bold">picsup</Typography>
            <Typography variant="h5">See with friends and the world around you on picsup.</Typography>
          </Stack>
          <Stack alignItems="center" justifyContent="center" spacing={2}>
            <Paper sx={{ p: 2 }}>
              <Stack spacing={2}>
                <TextField variant="outlined" label="Email" type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} />
                <TextField variant="outlined" label="Password" type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} />
                <Button variant="contained" size="large" disableElevation
                  onClick={() => login()}>
                  Login
                </Button>
                <Link alignSelf="center">Forgot Pasword?</Link>
                <Button variant="outlined" size="large" color="success" disableElevation
                  onClick={() => navigate("/signup")}>
                  Create New Account
                </Button>
              </Stack>
            </Paper>
            <Typography>
              <b>View Photos</b> of celebrity, friends or family
            </Typography>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
