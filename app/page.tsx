import Card from "@/src/components/card/Card";

export default function Home() {
  return (
    <section className="px-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card title="title" description="description text" />
      </div>
    </section>
  );
}
