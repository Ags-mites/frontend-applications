import { useEffect } from "react";
import { AppLayout } from "../layout/AppLayout";
import { ReportsAccountView } from "../views/ReportsAccountView";
import { useDispatch, useSelector } from "react-redux";
import { fetchReportData } from "../../store";

export const IncomeStatementPage = () => {
  const dispatch = useDispatch();
  const { report } = useSelector((state) => state.app);
  useEffect(() => {
    dispatch(fetchReportData("reports/incomeStatement"));
  }, [dispatch])
  
  return (
    <AppLayout>
      <ReportsAccountView
      title={"Estado de resultados"}
      data={report} />
    </AppLayout>
  );
};