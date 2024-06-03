"use client";
import { useState } from "react";
import TagNav from "./TagsNav";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "./ui/command";
import UploadButton from "./UploadButton";
import { DialogMagicLink } from "./DialogMagicLink";
import { DialogShareUpload } from "./DialogShareUpload";

type SearchBarProps = {
  tags: string[];
  selectedTag: string;
  isAdmin?: boolean;
};

export default function SearchBar(props: SearchBarProps) {
  const { selectedTag, tags, isAdmin } = props;


  const [filteredTags, setFilteredTags] = useState<string[]>(tags);

  return (
    <>
      <Command>
        <CommandInput
          placeholder="Type a command or search..."
          onValueChange={(value) => {
            if (value !== "") {
              setFilteredTags(
                tags.filter((tag) =>
                  tag.toLowerCase().includes(value.toLowerCase())
                )
              );
            } else {
              setFilteredTags(tags);
            }
          }}
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {isAdmin && (
            <div>
              <CommandGroup heading="Actions">
                <CommandItem>
                  <DialogMagicLink />
                </CommandItem>
                <CommandItem>
                  <DialogShareUpload />
                </CommandItem>
                <CommandItem>
                  <div>
                    <UploadButton />
                  </div>
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
            </div>
          )}
          <CommandGroup heading="Tags">
            <CommandItem>
              <TagNav selectedTag={selectedTag} tags={filteredTags} />
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </>
  );
}
