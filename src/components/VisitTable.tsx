import {
  Box,
  Paper,
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

type Props = {
  visits: Visit[];
  title: string;
  titleVariant?: Variant;
};

const VisitTable = ({ visits, title, titleVariant = "h5" }: Props) => {
  if (visits.length === 0) {
    return <p>Nothing here</p>;
  }
  return (
    <>
      <Typography variant={titleVariant}>{title}</Typography>
      <Box component={Paper} className={styles.tableContainer}>
        <Table className={styles.visitTable} size="small">
          <TableHead>
            <TableRow>
              <TableCell>Visit Number</TableCell>
              <TableCell>Something</TableCell>
              <TableCell>Something Else</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {visits.map((v) => (
              <TableRow key={v.id}>
                <TableCell>{v.id}</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>
                  <Link href={"/visit/" + v.id} prefetch>
                    View
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </>
  );
};

export default VisitTable;
