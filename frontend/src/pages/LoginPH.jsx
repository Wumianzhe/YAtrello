// Login placeholder. Transfer contents from login here and rename
import { handleLogin as login } from "../API/Auth";
import Button from '@mui/material/Button';
import {Form, redirect, Link} from 'react-router-dom';

export async function action({ request }) {
  const formData = await request.formData();
  await login(formData.get("login"), formData.get("pass"));
  return redirect(`/`);
}

export default function Login() {
  return (
    <div>
      <h1>
        Login page
      </h1>
      <Form method="post">
        <label>
          <span>login</span>
          <input
            type="text"
            name="login"
          />
        </label>
        <label>
          <span>password</span>
          <input
            type="text"
            name="pass"
          />
        </label>
        <p>
          <Button type="submit">Login</Button>
          <Button type="button">
            <Link to='/register'> Register</Link>
          </Button>
        </p>
      </Form>
    </div>
  )
}
