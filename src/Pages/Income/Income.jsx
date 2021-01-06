import { useContext, useEffect, useState } from "react";
import { Context } from "../../Context/Context";
import { getTransactions } from "../../configs/services";
import Header from "../../elements/Header/Header";
import "./income.css";
import TableIncome from "./Table";

function Income() {
  const [state, dispatch] = useContext(Context);
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    getTransactions(setTransactions);
  }, []);
  return (
    <div className="page-income">
      <Header />
      <p className="title">Income transaction</p>
      <div style={{ marginTop: 250 }}>
        <TableIncome data={transactions} dispatch={dispatch} />
      </div>
    </div>
  );
}

export default Income;
