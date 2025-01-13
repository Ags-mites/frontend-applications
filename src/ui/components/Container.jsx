import React, { useMemo, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { AppProvider, Navigation, Router } from "@toolpad/core/AppProvider";
import {
  PageContainer,
  PageHeader,
  PageHeaderToolbar,
} from "@toolpad/core/PageContainer";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import PrintIcon from "@mui/icons-material/Print";
import DownloadIcon from "@mui/icons-material/Download";

const NAVIGATION = [
  {
    segment: "orders",
    title: "Orders",
    icon: <DashboardIcon />,
  },
];

function useDemoRouter(initialPath) {
  const [pathname, setPathname] = useState(initialPath);

  const router = useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  return router;
}

const Skeleton = styled("div")(({ theme, height }) => ({
  backgroundColor: theme.palette.action.hover,
  borderRadius: theme.shape.borderRadius,
  height,
  content: '" "',
}));

function CustomPageToolbar() {
  return (
    <PageHeaderToolbar>
      <Stack direction="row" spacing={1} alignItems="center">
        <Button
          variant="outlined"
          size="small"
          color="neutral"
          startIcon={<DownloadIcon fontSize="inherit" />}
        >
          Download
        </Button>
        <Button
          variant="outlined"
          size="small"
          color="neutral"
          startIcon={<PrintIcon fontSize="inherit" />}
        >
          Print
        </Button>
      </Stack>
    </PageHeaderToolbar>
  );
}

function CustomPageHeader() {
  return <PageHeader slots={{ toolbar: CustomPageToolbar }} />;
}

export default function PageContainerBasic(props) {
  const { window } = props;
  const router = useDemoRouter("/orders");
  const theme = useTheme();
  const demoWindow = window ? window() : undefined;

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={theme}
      window={demoWindow}
      branding={{
        title: "ACME Inc.",
      }}
    >
      <Paper sx={{ p: 2, width: "100%" }}>
        <PageContainer
          slots={{
            header: CustomPageHeader,
          }}
        >
          <Grid container spacing={1}>
            <Grid size={5} />
            <Grid size={12}>
              <Skeleton height={14} />
            </Grid>
            <Grid size={12}>
              <Skeleton height={14} />
            </Grid>
            <Grid size={4}>
              <Skeleton height={100} />
            </Grid>
            <Grid size={8}>
              <Skeleton height={100} />
            </Grid>
          </Grid>
        </PageContainer>
      </Paper>
    </AppProvider>
  );
}
