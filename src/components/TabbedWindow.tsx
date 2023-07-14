"use client";

import React, { useState } from "react";
import { Box, Paper, Tab, Tabs } from "@mui/material";
import styles from "./VisitTableTabs.module.css";

type Props = {
  tabs: TableTab[];
};

type TableTab = {
  label: string;
  child: React.JSX.Element;
};

const TabbedWindow = ({ tabs }: Props) => {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <Box
      component={Paper}
      className={"centered-column-flex " + styles.tabbedWindowContainer}
    >
      <Tabs value={activeIdx} onChange={(_, i) => setActiveIdx(i)}>
        {tabs.map((t) => (
          <Tab key={t.label} label={t.label} disableRipple />
        ))}
      </Tabs>
      <Box className={styles.activeTabContainer}>{tabs[activeIdx].child}</Box>
    </Box>
  );
};

export default TabbedWindow;
