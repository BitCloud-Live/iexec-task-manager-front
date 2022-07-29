import React from "react";

import { Base, DynoTable, WalletMain, Main } from "@components";
import exampleData from "../src/utils/example_data.json";



const Home: React.FC = () => {
  return (
    <Base>
      <Main />
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

export default Home;
