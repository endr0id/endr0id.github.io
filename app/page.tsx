import Card from "@/src/components/card/Card";
import Link from "next/link";

export default function Home() {
  return (
    <div className="px-10">
      <p className="my-16 text-center sm:text-3xl md:text-5xl lg:text-7xl font-semibold">
        Hello, world
      </p>
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link href="/blog/react">
            <Card title="title" description="description text" />
          </Link>
        </div>
      </section>
    </div>
  );
}
