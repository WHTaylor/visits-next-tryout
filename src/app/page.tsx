import styles from "./page.module.css";
import { Box, Typography } from "@mui/material";
import VisitTable from "@/components/VisitTable";
import VisitTableTabs from "@/components/VisitTableTabs";
import { deserialize, Visit } from "@/types";
import { latestDeparture } from "@/utils";
import dayjs from "dayjs";

function makeVisitTable(title: string, visits: Visit[]) {
  return (
    <Box className={styles.content}>
      <VisitTable title={title} visits={visits} />
    </Box>
  );
}

export default async function Home() {
  const visits: Visit[] = await fetch("http://localhost:3000/api/visits")
    .then((res) => res.json())
    .then(deserialize);

  console.log(visits);
  const now = dayjs();
  const completeVisits = visits?.filter(
    (v) => v.status !== "draft" && latestDeparture(v)?.isBefore(now),
  );
  const draftVisits = visits?.filter((v) => v.status === "draft");
  const upcomingVisits = visits?.filter(
    (v) => v.status !== "draft" && latestDeparture(v)?.isAfter(now),
  );

  return (
    <main className={styles.main}>
      <Typography variant="h4" component="h1">
        Visits
      </Typography>
      <Typography variant="subtitle1">
        Some descriptive subtitle here
      </Typography>

      <VisitTableTabs
        tabs={[
          {
            label: "Current and Upcoming",
            child: (
              <>
                {makeVisitTable("Submitted Requests", upcomingVisits)}
                {makeVisitTable("Draft Requests", draftVisits)}
              </>
            ),
          },
          {
            label: "Completed",
            // eslint-disable-next-line react/jsx-key
            child: makeVisitTable("Previous Visits", completeVisits),
          },
        ]}
      />
    </main>
  );
}
