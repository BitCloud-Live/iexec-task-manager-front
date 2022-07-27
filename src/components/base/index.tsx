import React from "react";

import { Header, Footer } from "@components";

export const Base: React.FC = (props: any) => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
        <div style={{ minHeight: "70vh" }}>
          {props.children}
        </div>
      <Footer />
    </div>
  );
};


