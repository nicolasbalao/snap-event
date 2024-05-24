"use client";
import { Copy, CopyCheck, Share2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import DialogCopyClipBoard from "./DialogCopyClipBoard";

export function DialogMagicLink() {
  const [isCopied, setIsCopied] = useState(false);
  const [magicLink, setMagicLink] = useState("");

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(magicLink);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

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
      description="N'importe qui à ce lien peut accéder à la gallerie pendant 1 semaine."
      value={magicLink}
      icon={<Share2 size={16} />}
      onOpenChange={fetchMagicLink}
    />
  );
}
