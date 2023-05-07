// Login placeholder. Transfer contents from board here and rename
import ExpLog from './Login'
import { handleSubmit } from "../API/Auth"
import Button from '@mui/material/Button'

export default function Login() {
  return (
    <div>
      <h1>
        Login page
      </h1>
      <ExpLog/>
      <Button onClick={handleSubmit('root','root')}> Login</Button>
    </div>
  )
}
