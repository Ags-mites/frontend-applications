import { useEffect } from "react";
import { ReportsAccountView } from "../views/ReportsAccountView";
import { useDispatch, useSelector } from "react-redux";
import { fetchReportData } from "../../store";
import { AppLayout } from "../layout/AppLayout";

export const BalanceSheetPage = () => {
  const dispatch = useDispatch();
  const { report } = useSelector((state) => state.app);
  useEffect(() => {
    dispatch(fetchReportData("reports/balanceSheet"));
  }, [dispatch])
  

  return (
    <AppLayout>
      <ReportsAccountView data={report}
      title={"Balance general"} />
    </AppLayout>
  );
};
