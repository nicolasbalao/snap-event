"use client";

import { useFormState, useFormStatus } from "react-dom";
import SignInAction from "../../actions/signIn.action";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { PasswordInput } from "../../components/PasswordInput";

export default function Page() {
  const [error, dispatch] = useFormState(SignInAction, undefined);

  return (
    <section className="w-full flex items-center justify-center mt-10">
      <Card>
        <CardHeader>
          <CardTitle>Se connecter</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={dispatch} className="flex flex-col gap-4">
            <PasswordInput
              name="password"
              placeholder="Mot de passe"
              required
            />
            {error && <p>{error}</p>}
            <LoginButton />
          </form>
        </CardContent>
      </Card>
    </section>
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
    <Button aria-disabled={pending} type="submit" onClick={handleClick}>
      Se connecter
    </Button>
  );
}
