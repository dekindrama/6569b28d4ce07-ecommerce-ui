import useInput from "@/hooks/useInput";
import PropTypes from "prop-types";
import Button from "./Button";

const RegisterInput = ({ onRegister }: any) => {
  const [name, setName] = useInput("");
  const [email, setEmail] = useInput("");
  const [password, setPassword] = useInput("");
  const [passwordConfirmation, setPasswordConfirmation] = useInput("");
  const [role, setRole] = useInput("");

  return (
    <div className="flex flex-col max-w-md">
      <input
        className="border-black border-2"
        type="text"
        name="name"
        value={name}
        onChange={setName}
        placeholder="input name ..."
        required
      />
      <input
        className="border-black border-2"
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

      <Button onClick={onRegister}>Register</Button>
    </div>
  );
};

RegisterInput.propTypes = {
  onRegister: PropTypes.func.isRequired,
};

export default RegisterInput;
