"use client";

import { useFormState, useFormStatus } from "react-dom";
import SignInAction from "../../actions/authenticate.action";

export default function Page() {
  const [error, dispatch] = useFormState(SignInAction, undefined);

  return (
    <form action={dispatch}>
      <input type="password" name="password" placeholder="Password" required />
      {error && <p>{error}</p>}
      <LoginButton />
    </form>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

  const handleClick = (event: any) => {
    if (pending) {
      event.preventDefault();
    }
  };

  return (
    <button aria-disabled={pending} type="submit" onClick={handleClick}>
      Login
    </button>
  );
}
