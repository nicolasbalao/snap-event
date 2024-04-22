import Image from "next/image";

type HeartIconProps = {
  isFilled: boolean;
};

export default function HeartIcon(props: HeartIconProps) {
  const { isFilled } = props;
  return (
    <Image
      src={isFilled ? "/fav_filled.svg" : "/fav.svg"}
      height={10}
      width={10}
      alt="favorit icon"
    />
  );
}
