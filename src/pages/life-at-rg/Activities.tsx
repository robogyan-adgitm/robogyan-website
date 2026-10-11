import { activities } from "@/content/lifeAtRg";

/** Six regular activities as a plain 3-column list: title and one line each. */
export function Activities() {
  return (
    <ul className="grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
      {activities.map((a) => (
        <li key={a.id} className="border-t border-line pt-4">
          <h3 className="text-lg font-semibold">{a.title}</h3>
          <p className="mt-2 text-text-muted">{a.description}</p>
        </li>
      ))}
    </ul>
  );
}
