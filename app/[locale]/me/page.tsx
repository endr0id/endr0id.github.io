import clsx from "clsx";
import { Separator } from "radix-ui";
import Avatar from "@/src/components/avatar/Avatar";
import CareerTimeline from "./_components/careerTimeline/careerTimeline";
import TechStack from "./_components/techStack/techStack";
import { bioText } from "./_constants";

export default function Page() {
  return (
    <main className="grid grid-cols-[120px_1fr] gap-x-4 gap-y-8 mx-auto lg:w-[1024px]">
      <Avatar size="size-[120px]" />

      <section aria-labelledby="profile" className="col-start-2 row-start-1">
        <h1 className="text-3xl font-bold tracking-tight">Wataru Endo</h1>
        <p className="mb-2 text-base text-neutral-500 dark:text-neutral-400">
          Software Engineer
        </p>
        <p
          className={clsx([
            "w-full mt-3",
            "whitespace-pre-line leading-relaxed",
            "text-base text-neutral-600 dark:text-neutral-300",
          ])}
        >
          {bioText}
        </p>
      </section>

      <div className="col-start-2">
        <TechStack />
      </div>

      <Separator.Root
        aria-hidden="true"
        className="col-start-2 border border-outline"
      />

      <div className="col-start-2">
        <h2 className="mb-4">ENGINEER CAREER</h2>

        <section
          aria-labelledby="engineer-career"
          className={clsx(
            "max-h-[60vh] overflow-y-auto",
            "[scrollbar-width:none]", // Firefox
            "[&::-webkit-scrollbar]:hidden", // Chrome, Safari, Edge
          )}
        >
          <CareerTimeline />
        </section>
      </div>
    </main>
  );
}
