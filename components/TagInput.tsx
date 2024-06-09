"use client";

import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tags, X } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { useToast } from "./ui/use-toast";

type TagInputProps = {
  public_id: string;
  setIsModified: (state: boolean) => void;
};

type AutoCompleteProps = {
  inputValue: string | undefined;
  setInputValue: (value: string) => void;
};

export function AutoComplete(props: AutoCompleteProps) {
  const { inputValue, setInputValue } = props;
  const [tags, setTags] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState(false);

  const getAllTags = async () => {
    try {
      const res = await fetch("/api/tags", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setTags(data.tags || []); // Ensure tags is an array
      } else {
        setTags([]); // Handle the case where response is not OK
      }
    } catch (error) {
      console.error("Failed to fetch tags:", error);
      setTags([]); // Handle fetch error
    }
  };

  useEffect(() => {
    getAllTags();
  }, []);

  return (
    <Command>
      <CommandInput
        placeholder="Type a command or search..."
        value={inputValue}
        onValueChange={(e) => setInputValue(e)}
        onFocus={() => setIsFocused(true)}
      />

      {isFocused && (
        <CommandList>
          <CommandEmpty>Ajouter un nouveau tag "{inputValue}".</CommandEmpty>
          <CommandGroup heading="Suggestions">
            {tags.map((tag, index) => (
              <CommandItem
                onSelect={(value) => {
                  setInputValue(value);
                }}
                key={tag + index}
              >
                {tag}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      )}
    </Command>
  );
}

export default function TagInput(props: TagInputProps) {
  const { public_id, setIsModified } = props;

  const [existingTags, setExistingTags] = useState<string[]>([]);
  const [newTags, setNewTags] = useState<string>();
  const { toast } = useToast();

  const addTagsRequest = async () => {
    try {
      const res = await fetch(`/api/photos/${public_id}/tags`, {
        method: "PUT",
        body: JSON.stringify({ tags: [newTags, ...existingTags] }),
        headers: {
          "content-type": "application/json",
        },
      });

      if (res.ok) {
        const data = await res.json();
        const { tags } = data;
        setIsModified(true);
        setExistingTags(tags);
        setNewTags("");
        toast({
          title: "Tag ajouté",
          description: `Le tag ${newTags} a été ajouté avec succès.`,
        });
      } else {
        console.error(res.statusText);
        toast({
          title: "Erreur",
          description: "Une erreur s'est produite lors de l'ajout du tag.",
          variant: "destructive",
        });
      }
    } catch (e) {
      console.error(e);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de l'ajout du tag.",
        variant: "destructive",
      });
    }
  };
  const getTags = () => {
    fetch(`/api/photos/${public_id}/tags`)
      .then((res) => res.json())
      .then((data) => {
        if (data.tags && data.tags.length > 0) {
          setExistingTags(data.tags);
        }
      });
  };

  function deleteTag(tag: string): void {
    try {
      fetch(`/api/photos/${public_id}/tags`, {
        method: "DELETE",
        body: JSON.stringify({ tag }),
        headers: {
          "content-type": "application/json",
        },
      }).then((res) => {
        if (res.ok) {
          setExistingTags(existingTags.filter((t) => t !== tag));
          setIsModified(true);
          toast({
            title: "Tag supprimé",
            description: `Le tag ${tag} a été supprimé avec succès.`,
          });
        } else {
          console.error(res.statusText);
        }
      });
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    getTags();
  }, []);

  return (
    <>
      <div className="bg-white w-full p-2 mt-3  flex flex-col gap-6 self-start sm:gap-4 lg:rounded-sm lg:mt-0 lg:max-w-sm">
        <div className="flex items-center gap-2">
          <Tags />
          <h2 className="text-base font-normal md:text-xl md:font-semibold">
            Tags
          </h2>
        </div>
        {existingTags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {existingTags.map((tag, index) => (
              <Badge
                key={tag + index}
                className="flex items-center space-x-1.5"
              >
                <span>{tag}</span>
                <X size={16} onClick={() => deleteTag(tag)} />
              </Badge>
            ))}
          </div>
        )}

        <AutoComplete inputValue={newTags} setInputValue={setNewTags} />
        <Button size="sm" onClick={() => addTagsRequest()}>
          Ajouter
        </Button>
      </div>
    </>
  );
}
