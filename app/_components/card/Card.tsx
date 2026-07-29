import Image from "next/image";
import Link from "next/link";
import { _React } from "@dev.icons/react";

interface CardProps {
  path: string;
  imagePath: string;
  title: string;
  description: string;
}

const Card = (props: CardProps) => {
  const { path, imagePath, title, description } = props;

  return (
    <article className="w-full rounded-lg overflow-hidden">
      <Link href={path} className="flex flex-col gap-4">
        <div className="relative aspect-3/2 w-full overflow-hidden rounded-lg">
          <Image
            src={imagePath}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
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
