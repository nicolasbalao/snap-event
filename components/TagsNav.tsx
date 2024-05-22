import { v2 as cloudinary } from "cloudinary";
import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";
import { Badge } from "./ui/badge";

type TagNavProps = {
  selectedTag: string;
};

export default async function TagNav(props: TagNavProps) {
  noStore();
  const { tags }: { tags: string[] } = await cloudinary.api.tags();

  const { selectedTag } = props;

  return (
    <div className="flex gap-2 text-xl m-6">
      {tags.map((tag, index) => (
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
