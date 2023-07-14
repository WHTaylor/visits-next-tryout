import { deserialize, Visit } from "@/types";
import { Box, Link, Paper } from "@mui/material";
import styles from "./page.module.css";

type Props = {
  params: Params;
};

type Params = {
  id: number;
};

const ViewVisit = async ({ params }: Props) => {
  const visit: Visit | "error" = await fetch(
    "http://localhost:3000/api/visits/" + params.id,
  ).then(async (res) =>
    res.status !== 200
      ? "error"
      : ((await res.json().then((j) => deserialize(j.visit))) as Visit),
  );

  return visit === "error" ? (
    <Box
      className={"centered-column-flex " + styles.errorContainer}
      component={Paper}
    >
      <p>Visit {params.id} is unavailable.</p>
      <Link href="/">Go back</Link>
    </Box>
  ) : (
    <p>This is visit {visit.id}</p>
  );
};

export default ViewVisit;
