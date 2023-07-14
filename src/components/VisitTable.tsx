import {
  Box,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Visit } from "@/types";
import Link from "next/link";
import styles from "./VisitTable.module.css";
import { Variant } from "@mui/material/styles/createTypography";
import { earliestArrival, latestDeparture } from "@/utils";

type Props = {
  visits?: Visit[];
  title: string;
  titleVariant?: Variant;
};

const VisitTable = ({ visits, title, titleVariant = "h5" }: Props) => {
  return (
    <>
      <Typography variant={titleVariant}>{title}</Typography>
      {visits === undefined ? (
        <Skeleton variant="rounded" width={500} height={100} />
      ) : visits.length === 0 ? (
        <p>Nothing here</p>
      ) : (
        <Box component={Paper} className={styles.tableContainer}>
          <Table className={styles.visitTable} size="small">
            <TableHead>
              <TableRow>
                <TableCell>Visit ID</TableCell>
                <TableCell>Number of visitors</TableCell>
                <TableCell>Start</TableCell>
                <TableCell>End</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {visits.map((v) => (
                <VisitRow key={v.id} visit={v} />
              ))}
            </TableBody>
          </Table>
        </Box>
      )}
    </>
  );
};

const VisitRow = ({ visit }: { visit: Visit }) => {
  const start = earliestArrival(visit)?.format("MMM D YYYY");
  const end = latestDeparture(visit)?.format("MMM D YYYY");
  return (
    <TableRow>
      <TableCell>{visit.id}</TableCell>
      <TableCell>{visit.visitors.length}</TableCell>
      <TableCell>{start}</TableCell>
      <TableCell>{end}</TableCell>
      <TableCell>
        <Link href={"/visit/" + visit.id} prefetch>
          View
        </Link>
      </TableCell>
    </TableRow>
  );
};

export default VisitTable;
