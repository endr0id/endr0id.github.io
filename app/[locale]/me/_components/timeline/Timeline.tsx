import clsx from "clsx";
import { type CareerHistory } from "../../_types";

const CareerTimeline = ({
  careerHistories,
}: {
  careerHistories: CareerHistory[];
}) => {
  return (
    <ol className="relative">
      {careerHistories.map((careerHistory, index) => {
        const isLast = index === careerHistories.length - 1;

        return (
          <li key={careerHistory.title} className="grid grid-cols-[112px_1fr]">
            <time
              className={clsx([
                "pt-1.5 pr-4",
                "text-sm font-normal leading-none text-right whitespace-nowrap",
              ])}
            >
              {careerHistory.period}
            </time>

            <div className={clsx(["relative", "border-s", !isLast && "pb-10"])}>
              {/* dot */}
              <div
                className={clsx([
                  "absolute size-3",
                  "mt-1.5 -start-1.5",
                  "rounded-full border",
                  "bg-current",
                ])}
              ></div>

              <div className="ms-4">
                <h3 className="text-lg font-semibold mb-2">
                  {careerHistory.title}
                </h3>
                <p
                  className={clsx(["text-sm font-normal whitespace-pre-line"])}
                >
                  {careerHistory.achievements}
                </p>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
};

export default CareerTimeline;
