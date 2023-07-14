"use client";
import { deserializeVisitor, Visitor, VisitorDto } from "@/types";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  FormControl,
  FormHelperText,
  Typography,
} from "@mui/material";
import { ExpandMoreOutlined } from "@mui/icons-material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import styles from "./VisitorsInput.module.css";
import { useEffect, useState } from "react";

type Props = {
  visitors?: VisitorDto[];
};

const VisitorsInput = ({ visitors }: Props) => {
  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {visitors?.map((v, i) => (
          <VisitorAccordion
            visitor={deserializeVisitor(v)}
            idx={i}
            key={v.id}
          />
        ))}
      </LocalizationProvider>
    </div>
  );
};

type VisitorProps = {
  visitor: Visitor;
  idx: number;
};

// Can this be pulled up into a server component and passed down, to be inside
// LocalizationProvider whilst fetching on server?
const VisitorAccordion = ({ visitor, idx }: VisitorProps) => {
  const [visitorName, setVisitorName] = useState<string | null>(null);
  useEffect(() => {
    async function fetchUserName() {
      return await fetch(
        "http://localhost:3000/api/users/" + visitor.userNumber,
      )
        .then((res) =>
          res.status === 200
            ? res.json()
            : Promise.reject("Couldn't find user " + visitor.userNumber),
        )
        .catch(console.warn)
        .then((j) => j?.user?.fullName ?? null);
    }

    fetchUserName().then(setVisitorName);
  }, [visitor.userNumber]);

  const titleName = visitorName === null ? "" : ` - ${visitorName}`;
  const title = `Visitor ${idx + 1}` + titleName;

  return (
    <Accordion defaultExpanded={true}>
      <AccordionSummary expandIcon={<ExpandMoreOutlined />}>
        <Typography>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <div className={styles.visitorDatesContainer}>
          <FormControl>
            <DatePicker
              label={<label>Arrival</label>}
              format="DD/MM/YYYY"
              defaultValue={visitor.arrival}
            />
            <FormHelperText>
              The day this visitor will arrive at RAL
            </FormHelperText>
          </FormControl>
          <FormControl>
            <DatePicker
              label={<label>Departure</label>}
              format="DD/MM/YYYY"
              defaultValue={visitor.departure}
            />
            <FormHelperText>
              The day this visitor will depart from RAL
            </FormHelperText>
          </FormControl>
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default VisitorsInput;
