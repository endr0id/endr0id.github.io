import { _React } from "@dev.icons/react";

interface CardProps {
  title: string;
  description: string;
}

const Card = (props: CardProps) => {
  const { title, description } = props;

  return (
    <div className="flex flex-col gap-2 pb-2 border rounded-lg border-outline overflow-hidden">
      <div className="flex items-center justify-center py-2 bg-neutral-200 dark:bg-neutral-700">
        <_React size={64} />
      </div>
      <div className="px-6">
        <h3 className="text-xl whitespace-pre-wrap break-words font-semibold">
          {title}
        </h3>
        <p className="text-sm whitespace-pre-wrap break-words text-neutral-500 dark:text-neutral-300">
          {description}
        </p>
      </div>
    </div>
  );
};

export default Card;
