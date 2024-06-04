import React from "react";
import { Card, CardContent } from "../../../components/ui/card";
import { Image } from "lucide-react";
import { UploadButtonShadcn } from "../../../components/UploadButtonShadcn";
import { verifyTokenAction } from "../../../actions/verify-token";

async function UploadTokenPage({ params }: { params: { token: string } }) {
  const { token } = params;

  const isValid: boolean = (await verifyTokenAction(token)) ? true : false;

  return (
    <section className="h-screen flex flex-col items-center justify-center p-3 gap-8">
      {isValid ? (
        <Card className="border-dashed border-2 justify-items-center border-gray-600 self-center">
          <CardContent className="flex flex-col items-center gap-4">
            <Image size={60} className="mt-3" />
            <p className="text-center text-gray-500 text-sm mb-3">
              Parcourez et choisissez les photos que vous souhaitez publier
            </p>
            <UploadButtonShadcn />
          </CardContent>
        </Card>
      ) : (
        <h1>Invalid token</h1>
      )}
    </section>
  );
}

export default UploadTokenPage;
