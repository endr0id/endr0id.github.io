import clsx from "clsx";
import { Avatar, Separator } from "radix-ui";
import CareerTimeline from "./_components/careerTimeline/careerTimeline";
import TechStack from "./_components/techStack/techStack";
import { bioText } from "./_constants";

export default function Page() {
  return (
    <main className="grid grid-cols-[120px_1fr] gap-x-4 mx-auto lg:w-[1280px]">
      <Avatar.Root className="col-start-1 row-start-1  inline-flex rounded-full overflow-hidden size-[120px]">
        <Avatar.Fallback
          className={clsx([
            "flex items-center justify-center",
            "font-medium text-neutral-300 dark:text-neutral-500",
            "size-full bg-black dark:bg-white",
          ])}
        >
          WE
        </Avatar.Fallback>
      </Avatar.Root>

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

      <div className="col-start-2 mt-8">
        <TechStack />
      </div>

      <Separator.Root
        aria-hidden="true"
        className="col-start-2 border border-outline"
      />

      <div className="col-start-2">
        <h2>ENGINEER CAREER</h2>

        <section aria-labelledby="engineer-career">
          <CareerTimeline />
        </section>
      </div>
    </main>
  );
}
