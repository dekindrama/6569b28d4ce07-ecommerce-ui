import useInput from "@/hooks/useInput";
import PropTypes from "prop-types";
import Button from "./Button";

const RegisterInput = ({ onRegister }: any) => {
  const [name, setName] = useInput("");
  const [email, setEmail] = useInput("");
  const [password, setPassword] = useInput("");
  const [passwordConfirmation, setPasswordConfirmation] = useInput("");
  const [role, setRole] = useInput("");

  function onRegisterHandler() {
    onRegister({ name, email, password, passwordConfirmation, role });
  }

  return (
    <div className="flex max-w-md flex-col">
      <input
        className="border-2 border-black"
        type="text"
        name="name"
        value={name}
        onChange={setName}
        placeholder="input name ..."
        required
      />
      <input
        className="border-2 border-black"
        type="email"
        name="email"
        value={email}
        onChange={setEmail}
        placeholder="input email ..."
        required
      />
      <input
        className="border border-black"
        type="password"
        name="password"
        value={password}
        onChange={setPassword}
        placeholder="input password..."
        required
      />
      <input
        className="border border-black"
        type="password"
        name="password_confirmation"
        value={passwordConfirmation}
        onChange={setPasswordConfirmation}
        placeholder="input password confirmation..."
        required
      />

      <select
        name="role"
        className="border border-black"
        value={role}
        onChange={setRole}
        required
      >
        <option value=""></option>
        <option value="ADMIN">Admin</option>
        <option value="SUPER_ADMIN">Super Admin</option>
      </select>

      <Button onClick={onRegisterHandler}>Register</Button>
    </div>
  );
};

RegisterInput.propTypes = {
  onRegister: PropTypes.func.isRequired,
};

export default RegisterInput;
