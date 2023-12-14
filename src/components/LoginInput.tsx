import useInput from "@/hooks/useInput";
import PropTypes from "prop-types";
import Button from "./Button";

function LoginInput({ className, onLogin }: any) {
  const [email, setEmail] = useInput("");
  const [password, setPassword] = useInput("");

  const onLoginHandler = () => {
    onLogin({ email, password });
  };
  return (
    <div className="flex flex-col max-w-md">
      <input
        className="border-black border-2"
        type="text"
        name="email"
        value={email}
        onChange={setEmail}
        placeholder="input email ..."
      />
      <input
        className="border border-black"
        type="password"
        name="password"
        value={password}
        onChange={setPassword}
        placeholder="input password..."
      />
      <Button onClick={onLoginHandler}>Login</Button>
    </div>
  );
}

LoginInput.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default LoginInput;
