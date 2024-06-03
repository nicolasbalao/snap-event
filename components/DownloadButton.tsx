"use client";

import { Button } from "./ui/button";

type DownloadButtonProps = { url: string };

export default function DownloadButton(props: DownloadButtonProps) {
  const { url } = props;

  async function handleDownload() {
    try {
      // Fetch the image as a blob
      const response = await fetch(url);
      const blob = await response.blob();

      // Create a temporary anchor element
      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download = "image"; // You can set custom download filename here
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  }

  return <Button onClick={handleDownload} size={"sm"}>Télécharger</Button>;
}
