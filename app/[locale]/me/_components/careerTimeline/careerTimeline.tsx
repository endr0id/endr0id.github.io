import clsx from "clsx";
import { timelineItems } from "../../_constants";

const CareerTimeline = () => {
  return (
    <ol className="relative">
      {timelineItems.map((item, index) => {
        const isLast = index === timelineItems.length - 1;

        return (
          <li key={item.title} className="grid grid-cols-[112px_1fr]">
            <time
              className={clsx([
                "pt-1.5 pr-4",
                "text-sm font-normal leading-none text-right whitespace-nowrap",
              ])}
            >
              {item.date}
            </time>

            <div className={clsx(["relative", "border-s", !isLast && "pb-10"])}>
              {/* dot */}
              <div
                className={clsx([
                  "absolute size-3",
                  "mt-1.5 -start-1.5",
                  "rounded-full border border-buffer",
                  "bg-current",
                ])}
              ></div>

              <div className="ms-4">
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p
                  className={clsx([
                    "text-base font-normal",
                    item.link && "mb-4",
                  ])}
                >
                  {item.description}
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
