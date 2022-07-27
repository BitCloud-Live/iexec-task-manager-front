import React from "react";
import exampleData from "../src/utils/example_data.json";
import { Base, DynoTable, WalletMain } from "@components";
import { Web3Provider } from "@ethersproject/providers";
import {
  Web3ReactProvider,
} from "@web3-react/core";

function getLibrary(provider: any) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 8000;
  return library;
}

const Accounts: React.FC = () => {
  return (
    <Base>
      <Web3ReactProvider getLibrary={getLibrary}>
        <WalletMain />
      </Web3ReactProvider>
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
