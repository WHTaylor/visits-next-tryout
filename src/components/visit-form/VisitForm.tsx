import { serialize, Visit } from "@/types";
import { Box, Paper, Typography } from "@mui/material";
import styles from "./VisitForm.module.css";
import VisitorsInput from "@/components/visit-form/VisitorsInput";
import { capitalize } from "@/utils";

type Props = {
  visit: Visit;
};

const VisitForm = ({ visit }: Props) => {
  return (
    <Box component={Paper} className={styles.visitFormContainer}>
      <Typography variant="subtitle1" component="h3">
        Visit {visit.id}
      </Typography>
      <Typography variant="body1" component="p">
        Status: {capitalize(visit.status)}
      </Typography>

      <VisitorsInput visitors={serialize(visit).visitors} visitId={visit.id} />
    </Box>
  );
};

export default VisitForm;
