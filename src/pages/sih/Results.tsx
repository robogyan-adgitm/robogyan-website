import { Chip, DataTable, Tabs, type DataColumn } from "@/components";
import type { SihTeamResult } from "@/content/schemas";
import { sihSelectedTeams, sihWaitlistedTeams } from "@/content/sihResults";

/** Filtering matches team and leader names only: the number and status columns opt out. */
const columns: DataColumn<SihTeamResult>[] = [
  {
    id: "sNo",
    header: "S.No.",
    accessor: () => "",
    cell: (r) => r.sNo,
    align: "right",
    // Row order only, so it yields to the names on narrow screens.
    className: "hidden w-16 text-text-muted sm:table-cell",
  },
  {
    id: "team",
    header: "Team",
    accessor: (r) => r.teamName,
    cell: (r) => <span className="font-semibold text-text">{r.teamName}</span>,
  },
  { id: "leader", header: "Team leader", accessor: (r) => r.leaderName },
  {
    id: "status",
    header: "Status",
    accessor: () => "",
    align: "right",
    cell: (r) => (
      <Chip tone={r.status === "Selected" ? "signal" : "neutral"} dot={r.status === "Selected"}>
        {r.status}
      </Chip>
    ),
  },
];

function Table({ rows, caption }: { rows: SihTeamResult[]; caption: string }) {
  return (
    <DataTable
      columns={columns}
      rows={rows}
      getRowId={(r) => r.id}
      caption={caption}
      filter={{ label: "Filter by team or leader name", placeholder: "Team or leader name" }}
      maxHeight="36rem"
      emptyMessage="No team or leader matches that name."
    />
  );
}

/** Selected (45) / Waitlisted (5) tables behind a tab switch. */
export function ResultsTables() {
  return (
    <Tabs
      label="Result lists"
      tabs={[
        {
          id: "selected",
          label: `Selected (${sihSelectedTeams.length})`,
          content: (
            <Table rows={sihSelectedTeams} caption="Teams nominated to the SIH 2026 portal" />
          ),
        },
        {
          id: "waitlisted",
          label: `Waitlisted (${sihWaitlistedTeams.length})`,
          content: <Table rows={sihWaitlistedTeams} caption="Waitlisted teams for SIH 2026" />,
        },
      ]}
    />
  );
}
