import React from "react";
import exampleData from "../src/utils/example_data.json";
import { Base, DynoTable, WalletMain } from "@components";

const Accounts: React.FC = () => {
  return (
    <Base>
      <WalletMain />
      <div className="p-3">
        <DynoTable 
            headers={exampleData.headers} 
            rows={exampleData.rows} 
            selectable={true}
        />
      </div>
    </Base>
  );
};

export default Accounts;
