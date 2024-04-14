"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function MagicLinkSingIn({ params }: { params: any }) {
  const { token } = params;

  const [isValideToke, setIsValideToken] = useState(false);

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
      }
    });
  }, []);

  return (
    <>
      {isValideToke ? (
        <div>
          <h1>Access limité à 1 semaine (à changé)</h1>
          <button className="bg-blue-700 p-2 rounded-md text-white">
            <Link href="/">Gallery</Link>
          </button>
        </div>
      ) : (
        <div>
          <h1>Invalid token</h1>
        </div>
      )}
    </>
  );
}
