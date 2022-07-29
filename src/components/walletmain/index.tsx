import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import styles from "./WalletMain.module.css";
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { providers } from "ethers";

export const WalletMain: React.FC = () => {

  const [web3Modal, setWeb3Modal] = useState<any>(null);
  const [address, setAddress] = useState<any>("");


  useEffect(() => {
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          infuraId: process.env.INFURA_ID,
        }
      },
    };

    const newWeb3Modal = new Web3Modal({
      cacheProvider: true, // very important
      network: "mainnet",
      providerOptions,
    });

    setWeb3Modal(newWeb3Modal);
    // alert(localStorage.getItem("WEB3_CONNECT_CACHED_PROVIDER"))
    
  }, [])

  useEffect(() => {
    // connect automatically and without a popup if user is already connected
    if(web3Modal && web3Modal.cachedProvider){
      connectWallet()
    }
  }, [web3Modal]);

  async function addListeners(web3ModalProvider: any) {

    web3ModalProvider.on("accountsChanged", (_accounts: any) => {
      window.location.reload()
    });
    
    // Subscribe to chainId change
    web3ModalProvider.on("chainChanged", (_chainId: any) => {
      window.location.reload()
    });
  }

  async function connectWallet() {
    const provider = await web3Modal.connect();
    addListeners(provider);
    const ethersProvider = new providers.Web3Provider(provider);
    const userAddress = await ethersProvider.getSigner().getAddress()
    setAddress(userAddress)
  }

  function disconnectWallet(){
    setAddress("");
    localStorage.removeItem("WEB3_CONNECT_CACHED_PROVIDER");
  }

  return (
    <div className="text-center py-4" style={{ backgroundColor: "#282c34" }}>
      <Container>
        <Row className={styles.connectWalletRow}>
          <Col className="mb-2" xs="12">
            {
              address.length == 0 && 
              (
                <button className="btn btn-flat" onClick={connectWallet}>Connect wallet</button>
              )
            }
              
          </Col>
          <Col className="mb-2" xs="12">
            {
              address.length > 0 && 
              (
                <button className="btn btn-danger" onClick={disconnectWallet}>Disconnect</button>
              )
            }
          </Col>
          <Col xs="12">
            <p className="text-white">{address}</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
