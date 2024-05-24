"use client";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "./ui/button";

type QRCodeProps = { value: string };

export default function QRCode({ value }: QRCodeProps) {
  const handleDownloadPNG = () => {
    const svgElement = document.getElementById("QRCode");
    if (!svgElement) {
      console.error("SVG element not found");
      return;
    }

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    if (!context) {
      console.error("Canvas context not supported");
      return;
    }

    const svgString = new XMLSerializer().serializeToString(svgElement);
    const svgBlob = new Blob([svgString], { type: "image/svg+xml" });
    const url = URL.createObjectURL(svgBlob);

    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      context.drawImage(img, 0, 0);

      canvas.toBlob((blob) => {
        if (!blob) {
          console.error("Failed to convert canvas to blob");
          return;
        }

        const pngUrl = URL.createObjectURL(blob);

        // Trigger download
        const downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = "QRCode.png";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);

        URL.revokeObjectURL(pngUrl);
      }, "image/png");
    };
    img.src = url;
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <QRCodeSVG value={value} id="QRCode" />
      <Button onClick={handleDownloadPNG} size="sm">
        Télécharger
      </Button>
    </div>
  );
}
