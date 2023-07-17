"use client";
import { deserializeVisitor, Visitor, VisitorDto } from "@/types";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  Typography,
} from "@mui/material";
import { ExpandMoreOutlined, Save, Delete } from "@mui/icons-material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import styles from "./VisitorsInput.module.css";
import { useEffect, useRef, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { withoutItem } from "@/utils";

type Props = {
  visitors?: VisitorDto[];
  visitId: number;
};

const VisitorsInput = ({ visitors, visitId }: Props) => {
  const [unsaved, setUnsaved] = useState<Visitor[]>([]);
  // This is a dreadful way of handling this, but I'm almost at the end of this and feeling lazy
  const [saved, setSaved] = useState<Visitor[]>([]);

  const saveNewVisitor = async (
    idx: number,
    arrival: Dayjs,
    departure: Dayjs,
  ) => {
    const res = await fetch(
      `http://localhost:3000/api/visits/${visitId}/visitors`,
      {
        method: "POST",
        body: JSON.stringify({
          userNumber: "1",
          arrival: arrival.toISOString(),
          departure: departure.toISOString(),
        }),
      },
    );

    if (res.status === 200) {
      const id = (await res.json()).id;
      setSaved(saved.concat({ ...unsaved[idx], id }));
      setUnsaved(withoutItem(unsaved, idx));
    }
  };

  const readonlyVisitors = saved.concat(
    visitors?.map(deserializeVisitor) ?? [],
  );

  return (
    <div className={styles.visitorsInputContainer}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {readonlyVisitors.map((v, i) => (
          <VisitorAccordion visitor={v} idx={i} key={v.id} />
        ))}
        {unsaved.map((v, i) => (
          <VisitorAccordion
            visitor={v}
            idx={i + (readonlyVisitors?.length ?? 0)}
            key={i + (readonlyVisitors?.length ?? 0)}
            cancel={() => setUnsaved(withoutItem(unsaved, i))}
            save={(arrival, departure) => saveNewVisitor(i, arrival, departure)}
          />
        ))}
        <Button
          className={styles.addVisitorButton}
          variant="outlined"
          onClick={() =>
            setUnsaved(
              unsaved.concat({
                id: -1,
                userNumber: "1",
                arrival: dayjs(),
                departure: dayjs(),
              }),
            )
          }
          disableRipple
        >
          Add visitor
        </Button>
      </LocalizationProvider>
    </div>
  );
};

type VisitorProps = {
  visitor: Visitor;
  idx: number;
  cancel?: () => void;
  save?: (arrival: Dayjs, departure: Dayjs) => void;
};

// Can this be pulled up into a server component and passed down, to be inside
// LocalizationProvider whilst fetching on server?
const VisitorAccordion = ({ visitor, idx, cancel, save }: VisitorProps) => {
  const [arrival, setArrival] = useState<Dayjs | null>(visitor.arrival);
  const [departure, setDeparture] = useState<Dayjs | null>(visitor.departure);
  const [visitorName, setVisitorName] = useState<string | null>(null);
  const isNew = save !== undefined && cancel !== undefined;

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
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreOutlined />}>
        {isNew && (
          <>
            <IconButton
              size="small"
              onClick={(ev) => {
                ev.stopPropagation();
                if (
                  arrival === null ||
                  departure === null ||
                  arrival.isAfter(departure)
                ) {
                  alert("invalid");
                } else {
                  save(arrival, departure);
                }
              }}
            >
              <Save />
            </IconButton>
            <IconButton
              size="small"
              onClick={(ev) => {
                ev.stopPropagation();
                cancel();
              }}
            >
              <Delete />
            </IconButton>
          </>
        )}
        <Typography>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <div className={styles.visitorDatesContainer}>
          <FormControl>
            <DatePicker
              value={arrival}
              onChange={(newValue) => setArrival(newValue)}
              label={<label>Arrival</label>}
              format="DD/MM/YYYY"
              readOnly={!isNew}
            />
            <FormHelperText>
              The day this visitor will arrive at RAL
            </FormHelperText>
          </FormControl>
          <FormControl>
            <DatePicker
              value={departure}
              onChange={(newValue) => setDeparture(newValue)}
              label={<label>Departure</label>}
              format="DD/MM/YYYY"
              readOnly={!isNew}
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
