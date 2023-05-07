import { handleRegister as register } from "../API/Auth";
import Button from '@mui/material/Button';
import {Form, redirect} from 'react-router-dom';

export async function action({ request }) {
  const formData = await request.formData();
  await register(formData);
  return redirect(`/`);
}

export default function Register() {
  return (
    <div>
      <h1>
        Registration page
      </h1>
      <Form method="post">
        <div>
        <label>
          <span>login</span>
          <input
            type="text"
            name="login"
          />
        </label>
        <label>
          <span>email</span>
          <input
            type="text"
            name="email"
          />
        </label>
        <label>
          <span>password</span>
          <input
            type="text"
            name="pass"
          />
        </label>
        </div>
        <p>
          <Button type="submit">Register</Button>
          <Button type="button">Cancel</Button>
        </p>
      </Form>
    </div>
  )
}
