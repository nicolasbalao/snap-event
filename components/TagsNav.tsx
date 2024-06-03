import Link from "next/link";
import { Badge } from "./ui/badge";

type TagNavProps = {
  selectedTag: string;
  tags: string[];
};

export default function TagNav(props: TagNavProps) {
  const { selectedTag, tags } = props;

  return (
    <div className="flex flex-wrap gap-2 my-4">
      {tags &&
        tags.map((tag, index) => (
          <Link
            key={tag + index}
            href={tag !== selectedTag ? `/?query=${tag}` : "/"}
          >
            {selectedTag === tag ? (
              <Badge variant="default">{tag}</Badge>
            ) : (
              <Badge variant="outline">{tag}</Badge>
            )}
          </Link>
        ))}
    </div>
  );
}
