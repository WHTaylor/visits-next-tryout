"use client";
import TabbedWindow from "@/components/TabbedWindow";
import { deserialize, Visit } from "@/types";
import dayjs from "dayjs";
import { latestDeparture } from "@/utils";
import { Box } from "@mui/material";
import styles from "@/app/page.module.css";
import VisitTable from "@/components/VisitTable";
import { useEffect, useState } from "react";

function makeVisitTable(title: string, visits?: Visit[]) {
  return (
    <Box className={styles.content}>
      <VisitTable title={title} visits={visits} />
    </Box>
  );
}

const VisitTables = () => {
  const [visits, setVisits] = useState<Visit[] | null>(null);

  useEffect(() => {
    async function fetchVisits() {
      return await fetch("http://localhost:3000/api/visits?user=1", {
        method: "GET",
      })
        .then((res) => res.json())
        .then(deserialize);
    }

    fetchVisits().then(setVisits);
  }, []);

  const now = dayjs();
  const completeVisits = visits?.filter(
    (v) => v.status !== "draft" && latestDeparture(v)?.isBefore(now),
  );
  const draftVisits = visits?.filter((v) => v.status === "draft");
  const upcomingVisits = visits?.filter(
    (v) => v.status !== "draft" && latestDeparture(v)?.isAfter(now),
  );

  return (
    <TabbedWindow
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
  );
};

export default VisitTables;
