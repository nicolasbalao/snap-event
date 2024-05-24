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

  useEffect(() => {
    const resp = fetch("/api/magic-link/generate", { cache: "no-store" });
    resp
      .then((res) => res.json())
      .then((data) => {
        if (data.magicLink) {
          setMagicLink(data.magicLink);
        }
      });
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex item-center gap-2">
          <Share2 size={16} />
          <p>Partager l'accès à la gallerie</p>
        </div>
      </DialogTrigger>
      <DialogContent className="w-11/12 rounded-sm sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Partager l'accès à la gallerie</DialogTitle>
          <DialogDescription>
            N'importe qui à ce lien peut accéder à la gallerie pendant 1
            semaine.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input id="link" defaultValue={magicLink} readOnly />
          </div>
          <Button type="submit" size="sm" className="px-3">
            <span className="sr-only">Copier</span>
            {isCopied ? (
              <CopyCheck className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" onClick={handleCopyToClipboard} />
            )}
          </Button>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Fermer
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
