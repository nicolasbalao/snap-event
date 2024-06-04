"use client";
import { Share2 } from "lucide-react";

import { useEffect, useState } from "react";
import DialogCopyClipBoard from "./DialogCopyClipBoard";

export function DialogMagicLink() {
  const [magicLink, setMagicLink] = useState("");

  const fetchMagicLink = () => {
    const resp = fetch("/api/magic-link/generate", { cache: "no-store" });
    resp
      .then((res) => res.json())
      .then((data) => {
        if (data.magicLink) {
          setMagicLink(data.magicLink);
        }
      });
  };

  useEffect(() => {
    fetchMagicLink();
  }, []);

  return (
    <DialogCopyClipBoard
      title="Partager l'accès à la gallerie"
      buttonValue="Partager"
      description="N'importe qui utilise ce lien peut accéder à la gallerie pendant 1 semaine."
      value={magicLink}
      icon={<Share2 size={16} />}
      onOpenChange={fetchMagicLink}
    />
  );
}
