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

type SearchBarProps = {
  tags: string[];
  selectedTag: string;
};

export default function SearchBar(props: SearchBarProps) {
  const { selectedTag, tags } = props;

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
          <CommandGroup heading="Actions">
            <CommandItem>Calendar</CommandItem>
            <CommandItem>Search Emoji</CommandItem>
            <CommandItem>Calculator</CommandItem>
          </CommandGroup>
          <CommandSeparator />
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
