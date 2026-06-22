import { _React } from "@dev.icons/react";

interface CardProps {
  title: string;
  description: string;
}

const Card = (props: CardProps) => {
  const { title, description } = props;

  return (
    <div className="flex flex-col gap-2 pb-2 border rounded-lg border-neutral-300 overflow-hidden">
      <div className="flex items-center justify-center py-2 bg-neutral-200">
        <_React size={64} />
      </div>
      <div className="px-6">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-sm text-neutral-500">{description}</p>
      </div>
    </div>
  );
};

export default Card;
