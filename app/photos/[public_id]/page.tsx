import Link from "next/link";
import PhotoDetails from "../../../components/PhotoDetail";
import { ChevronLeft } from "lucide-react";

export default async function PhotoDetailsPage({ params }: any) {
  const { public_id } = params;

  return (
    <section className="h-screen w-screen flex justify-center items-center">
      <div className="flex flex-col md:justify-center items-center gap-2">
        <Link href="/" className="self-start flex items-center ">
          <ChevronLeft />
          Gallerie
        </Link>
        <PhotoDetails public_id={public_id} />
      </div>
    </section>
  );
}
