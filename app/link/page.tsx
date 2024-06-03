import React from "react";
import { QRCodeSVG } from "qrcode.react";
import generateTokenAction from "../../actions/generate-token.action";

export const dynamic = "auto";

async function LinkPage() {
  const token = await generateTokenAction({ role: "guest" }, "1w");

  const baseUrl = (process.env.BASE_URL as string)
    ? "http://" + (process.env.BASE_URL as string)
    : "https://" + (process.env.VERCEL_URL as string);

  const url: string = baseUrl + `/upload/${token}`;

  return (
    <section>
      <h1 className="text-4xl">Share link:</h1>
      <p>Url: {url}</p>
      <QRCodeSVG value={url} className="m-40" />
    </section>
  );
}

export default LinkPage;
