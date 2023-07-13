import styles from "./page.module.css";
import { Box, Paper, Typography } from "@mui/material";
import VisitTable from "@/components/VisitTable";
import VisitTableTabs from "@/components/VisitTableTabs";
import { Visit } from "@/types";

function makeVisitTable(title: string, visits: Visit[]) {
  return (
    <Box className={styles.content}>
      <VisitTable title={title} visits={visits} />
    </Box>
  );
}

export default function Home() {
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
                {makeVisitTable("Submitted Requests", [{ id: 123 }])}
                {makeVisitTable("Draft Requests", [{ id: 321 }, { id: 323 }])}
              </>
            ),
          },
          {
            label: "Completed",
            // eslint-disable-next-line react/jsx-key
            child: makeVisitTable("Previous Visits", [{ id: 111 }]),
          },
        ]}
      />
    </main>
  );
}
