"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../../../../components/ui/button";

export default function MagicLinkSingIn({ params }: { params: any }) {
  const { token } = params;

  const [isValideToke, setIsValideToken] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch(`/api/auth/login/magic-link`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    }).then((res) => {
      if (res.status === 200) {
        setIsValideToken(true);
        router.push("/");
      }
    });
  }, []);

  return (
    <>
      {isValideToke ? (
        <div>
          <h1>Access limité à 1 semaine (à changé)</h1>
          <Button className="bg-blue-700 p-2 rounded-md text-white">
            <Link href="/">Gallery</Link>
          </Button>
        </div>
      ) : (
        <div>
          <h1>Invalid token</h1>
        </div>
      )}
    </>
  );
}
