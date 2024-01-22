import React from "react";
import * as jwt from "jsonwebtoken";
import { CldUploadButton } from "next-cloudinary";
import UploadButton from "../../Components/UploadButton";

function UploadTokenPage({ params }: { params: { token: string } }) {
  const { token } = params;

  const isValid = jwt.verify(token, process.env.JWT_KEY as string)
    ? true
    : false;

  console.log("IsValid", isValid);

  return (
    <div>
      {isValid ? (
        <main className="flex flex-col items-center justify-center gap-20 h-screen">
          <h1 className="text-5xl">Upload page</h1>
          <UploadButton />
        </main>
      ) : (
        <p>Please log in to access this page.</p>
      )}
    </div>
  );
}

export default UploadTokenPage;