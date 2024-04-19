import { v2 as cloudinary } from "cloudinary";
import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";

export default async function TagNav() {
  noStore();
  const { tags }: { tags: string[] } = await cloudinary.api.tags();

  return (
    <div className="flex gap-2 text-xl m-16">
      {tags.map((tag, index) => (
        <Link key={tag + index} href={`/?query=${tag}`}>
          {tag}
        </Link>
      ))}

      <Link href="/" className="bg-red-300 text-white rounded-md p-3">
        Clear
      </Link>
    </div>
  );
}
