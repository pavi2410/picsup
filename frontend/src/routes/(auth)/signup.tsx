import { Button, Card, CardBody, CardFooter, CardHeader, Divider, Input, Link } from '@nextui-org/react';
import { useMutation } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState } from "react";
import { toast } from 'sonner';
import { signupUser } from "../../api/users";

export const Route = createFileRoute('/(auth)/signup')({
  component: SignUp,
})

function SignUp() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')

  const signupMutation = useMutation({
    mutationFn: signupUser,
    onSuccess: () => {
      toast.success("U have entered Nirvana :')");
      navigate({ to: '/' });
    },
    onError: () => {
      toast.error("Some error occured! Try harder ;)");
    }
  });

  function doSignup() {
    signupMutation.mutate({ email, password, username });
  }

  return (
    <div className="flex items-center justify-center h-screen bg-green-100">
      <Card>
        <CardHeader>
          <div>
            <h3 className='text-3xl font-bold'>picsup</h3>
            <h5>See with friends and the world around you on picsup.</h5>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <div className='flex flex-col gap-2'>
            <Input variant="bordered" label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)} />
            <Input variant="bordered" label="Email" type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} />
            <Input variant="bordered" label="Password" type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} />
            <Button variant="solid" size="lg" color='success'
              onPress={() => doSignup()}>
              Create New Account
            </Button>
            <Link className='self-center' href="/login">
              Already have an account?
            </Link>
          </div>
        </CardBody>
        <Divider />
        <CardFooter>
          <div className='text-center w-full'>
            <b>View Photos</b>&nbsp;of celebrity, friends or family.
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}