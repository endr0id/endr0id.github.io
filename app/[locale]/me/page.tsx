import clsx from "clsx";
import { Avatar, Separator } from "radix-ui";
import { bioText } from "./_constants";

export default function Page() {
  return (
    <main className="lg:w-[1280px] mx-auto">
      <div className="flex items-center gap-4">
        <Avatar.Root className="inline-flex rounded-full overflow-hidden size-[45px]">
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

        <section aria-labelledby="profile">
          <h1 className="text-3xl font-bold tracking-tight">Wataru Endo</h1>
          <p className="my-1 text-base text-neutral-500 dark:text-neutral-400">
            Software Engineer
          </p>
          <p
            className={clsx([
              "max-w-[1280px] mt-3",
              "whitespace-pre-line leading-relaxed",
              "text-base text-neutral-600 dark:text-neutral-300",
            ])}
          >
            {bioText}
          </p>
        </section>
      </div>

      <div>
        <h2>Tech Stack</h2>

        <div>Frontend / Backend...</div>
      </div>

      <Separator.Root aria-hidden="true" className="border border-outline" />

      <div>
        <h2>ENGINEER CAREER</h2>

        <div>Timeline...</div>
      </div>
    </main>
  );
}
