import React from "react";
import { Container } from "react-bootstrap";
import TypeAnimation from "react-type-animation";


export const Main: React.FC = () => {
  return (
    <div className="text-center py-2" style={{ backgroundColor: "#282c34" }}>
      <Container>
       
          <TypeAnimation
            cursor={false}
            sequence={[`${process.env.siteName}`, 1000, '']}
            wrapper="h2"
            className="typedtext"
          />
       
        
        <p className="lead text-white">
          Manage <b className="greenseab">dApps & Tasks</b> on iExec here ... 
        </p>
        
        <blockquote className="text-light">Consider to connect at least one account using your wallet</blockquote>
        
      </Container>
    </div>
  );
};
