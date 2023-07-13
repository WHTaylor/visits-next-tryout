"use client";

import React, { useState } from "react";
import { Box, Tab, Tabs } from "@mui/material";
import styles from "./VisitTableTabs.module.css";

type Props = {
  tabs: TableTab[];
};

type TableTab = {
  label: string;
  child: React.JSX.Element;
};

const VisitTableTabs = ({ tabs }: Props) => {
  const [tabValue, setTabValue] = useState(0);

  return (
    <Box className={styles.visitTableTabsContainer}>
      <Tabs value={tabValue} onChange={(_, i) => setTabValue(i)}>
        {tabs.map((t) => (
          <Tab key={t.label} label={t.label} />
        ))}
      </Tabs>
      <Box className={styles.activeVisitTableContainer}>
        {tabs[tabValue].child}
      </Box>
    </Box>
  );
};

export default VisitTableTabs;
