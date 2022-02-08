import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import { useMutation } from 'react-query'
import { signupUser } from "../api/users";
import { Button, TextField, Paper, Stack, Typography, Container, Link as ChakraLink, Box } from '@mui/material'
import { colors } from "../theme";

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')

  const signupMutation = useMutation(signupUser)

  const navigate = useNavigate();

  function signup() {
    signupMutation.mutate({ email, password, username })
      .then((res) => {
        console.log(res);
        toast.success("U have entered Nirvana :')");
        navigate("/login");
      })
      .catch(error => {
        toast.error("Some error occured! Try harder ;)");
      });
  }

  return (
    <Box bgcolor={colors.green[100]}>
      <Container>
        <Stack direction={{ xs: 'column', md: "row" }} alignItems="center" justifyContent="center" spacing={8} sx={{ height: '100vh' }}>
          <Stack px="3rem">
            <Typography variant="h3" color="success.main" fontWeight="bold">picsup</Typography>
            <Typography variant="h5">See with friends and the world around you on picsup.</Typography>
          </Stack>
          <Stack alignItems="center" justifyContent="center" spacing={2}>
            <Paper sx={{ p: 2 }}>
              <Stack spacing={2}>
                <TextField variant="outlined" label="Username" type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)} />
                <TextField variant="outlined" label="Email" type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} />
                <TextField variant="outlined" label="Password" type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} />
                <Button variant="contained" size="large" disableElevation color="success"
                  onClick={() => signup()}>
                  Create New Account
                </Button>
                <ChakraLink to="/login" component={Link} alignSelf="center">Already have an account?</ChakraLink>
              </Stack>
            </Paper>
            <Typography>
              <b>View Photos</b> of celebrity, friends or family
            </Typography>
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}