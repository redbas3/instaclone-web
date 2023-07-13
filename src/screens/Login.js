import { isLoggedInVar } from "../apollo";

function Login() {
  return (
    <div>
      <h1>Login</h1>
      <button onClick={() => isLoggedInVar(true)}>log in now!</button>
    </div>
  );
}

export default Login;
