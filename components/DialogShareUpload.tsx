"use client";
import DialogCopyClipBoard from "./DialogCopyClipBoard";
import QRCode from "./QRCode";
import { QrCode } from "lucide-react";
import { useEffect, useState } from "react";

export function DialogShareUpload() {
  const [url, setUrl] = useState<string>("");

  const fetchUploadUrl = () => {
    console.log("Fetch upload url");
    fetch("/api/generate-upload-link", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (data.url) {
          setUrl(data.url);
        }
      });
  };

  useEffect(() => {
    fetchUploadUrl();
  }, []);

  return (
    <DialogCopyClipBoard
      title="Partager l'accès au dépot de photos"
      buttonValue="QR code"
      description="Le QR code est valid pendant 1 semaine"
      value={url}
      icon={<QrCode size={16} />}
      onOpenChange={fetchUploadUrl}
    >
      <QRCode value={url} />
    </DialogCopyClipBoard>
  );
}
