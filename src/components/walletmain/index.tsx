import React from "react";
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import styles from "./WalletMain.module.css";
import { Spinner } from "@components/spinner";
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from "@web3-react/injected-connector";
import { injected } from "../../utils/connector";
import { useEagerConnect, useInactiveListener } from "../../utils/hooks";

function getErrorMessage(error: any) {
  if (error instanceof NoEthereumProviderError) {
    return "No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.";
  } else if (error instanceof UnsupportedChainIdError) {
    return "You're connected to an unsupported network.";
  } else if (error instanceof UserRejectedRequestErrorInjected) {
    return "Please authorize this website to access your Ethereum account.";
  } else {
    console.error(error);
    return "An unknown error occurred. Check the console for more details.";
  }
}

const connectorsByName: { [id: string]: any } = {
  Injected: injected,
};

export const WalletMain: React.FC = () => {
  const context = useWeb3React();
  const {
    connector,
    library,
    chainId,
    account,
    activate,
    deactivate,
    active,
    error,
  } = context;

  // handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] = React.useState();
  React.useEffect(() => {
    console.log("running");
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect();

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager || !!activatingConnector);

  return (
    <div className="text-center py-4" style={{ backgroundColor: "#282c34" }}>
      <Container>
        <Row className={styles.connectWalletRow}>
          <div className="col-6">
            <q className="text-light">Connect your Metamask wallet</q>
            {Object.keys(connectorsByName).map((name) => {
              const currentConnector = connectorsByName[name];
              const activating = currentConnector === activatingConnector;
              const connected = currentConnector === connector;
              const disabled =
                !triedEager || !!activatingConnector || connected || !!error;

              return (
                <button
                  className="btn btn-flat"
                  style={{
                    borderRadius: "1rem",
                    padding: "10px",
                    borderColor: activating
                      ? "orange"
                      : connected
                      ? "green"
                      : "unset",
                    cursor: disabled ? "unset" : "pointer",
                    position: "relative",
                  }}
                  disabled={disabled}
                  key={name}
                  onClick={() => {
                    setActivatingConnector(currentConnector);
                    activate(connectorsByName[name]);
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "0",
                      left: "0",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      color: "black",
                      margin: "0 0 0 1rem",
                    }}
                  >
                    {activating && (
                      <Spinner
                        color={"black"}
                        style={{ height: "25%", marginLeft: "-1rem" }}
                      />
                    )}
                    {connected && (
                      <span role="img" aria-label="check">
                        ✅
                      </span>
                    )}
                  </div>
                  {name}
                </button>
              );
            })}
          </div>

          <div className="col-6">
            {(active || error) && (
              <button
                style={{
                  height: "3rem",
                  marginTop: "2rem",
                  borderRadius: "1rem",
                  borderColor: "red",
                  cursor: "pointer",
                }}
                onClick={() => {
                  deactivate();
                }}
              >
                Deactivate
              </button>
            )}

            {!!error && (
              <h4
                style={{
                  marginTop: "1rem",
                  marginBottom: "0",
                  color: "whitesmoke",
                  display: "block",
                }}
              >
                {getErrorMessage(error)}
              </h4>
            )}
            <p className="text-white mt-3">{account}</p>
          </div>
        </Row>
      </Container>
    </div>
  );
};
