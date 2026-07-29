import Image from "next/image";
import Link from "next/link";
import { AspectRatio } from "radix-ui";

interface CardProps {
  path: string;
  imagePath: string;
  title: string;
  description: string;
}

const Card = (props: CardProps) => {
  const { path, imagePath, title, description } = props;

  return (
    <article className="w-full relative rounded-lg overflow-hidden">
      <Link href={path} className="flex flex-col gap-4">
        <AspectRatio.Root ratio={3 / 2}>
          <Image
            src={imagePath}
            alt=""
            fill
            loading="eager"
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </AspectRatio.Root>
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold">{title}</h3>
          <p className="font-light text-neutral-500 dark:text-neutral-400">
            {description}
          </p>
        </div>
      </Link>
    </article>
  );
};

export default Card;
