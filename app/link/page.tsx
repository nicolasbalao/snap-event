import React from "react";
import * as jwt from "jsonwebtoken";
import { QRCodeSVG } from "qrcode.react";

function LinkPage() {
  const token = jwt.sign({ foo: "bar" }, process.env.JWT_KEY as string, {
    expiresIn: "1h",
  });

  const baseUrl =
    (process.env.BASE_URL as string) ?? (process.env.VERCEL_URL as string);

  const url: string = baseUrl + `upload/${token}`;

  return (
    <section>
      <h1 className="text-4xl">Share link:</h1>
      <p>Url: {url}</p>
      <QRCodeSVG value={url} className="m-40" />
    </section>
  );
}

export default LinkPage;
