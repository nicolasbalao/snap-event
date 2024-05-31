import Link from "next/link";
import PhotoDetails from "../../../components/PhotoDetail";

export default async function PhotoDetailsPage({ params }: any) {
  const { public_id } = params;

  return (
    <section className="h-screen w-screen flex justify-center items-center  ">
      <Link href="/" className="self-start">
        Gallerie
      </Link>
      <PhotoDetails public_id={public_id} />
    </section>
  );
}
