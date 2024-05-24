"use client";
import { Label } from "@radix-ui/react-label";
import { Share2, CopyCheck, Copy } from "lucide-react";
import { Button } from "./ui/button";
import {
  DialogHeader,
  DialogFooter,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { useState } from "react";

type DialogCopyClipBoardProps = {
  value: string;
  buttonValue: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  children?: React.ReactNode;
} & React.ComponentProps<typeof Dialog>;
export default function DialogCopyClipBoard(props: DialogCopyClipBoardProps) {
  const { value, children, buttonValue, title, description, icon } = props;

  const [isCopied, setIsCopied] = useState(false);

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(value);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };
  return (
    <Dialog {...props}>
      <DialogTrigger asChild>
        <div className="flex item-center gap-2">
          {icon}
          <p>{buttonValue}</p>
        </div>
      </DialogTrigger>
      <DialogContent className="w-11/12 rounded-sm  sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="w-full flex justify-center my-3">{children}</div>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input id="link" defaultValue={value} readOnly />
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
