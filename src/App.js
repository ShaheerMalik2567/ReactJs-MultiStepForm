import FirstForm from "./components/Forms/FirstForm/FirstForm";
import SecondForm from "./components/Forms/Second Form/SecondForm";
import ThirdForm from "./components/Forms/ThirdForm/ThirdForm";
import Layout from "./components/UI/Layout";
import OverAllData from "../src/components/Forms/Data/FormData";

import React, { useState } from "react";

function App() {
  const [page, setPage] = useState(0);

  const componentList = [
    <FirstForm page={page} setPage={setPage} />,
    <ThirdForm page={page} setPage={setPage} />,

    <SecondForm page={page} setPage={setPage} />,
  ];

  return (
    <Layout>
      <div>
        <h2>Let's get started!</h2>
        <div className="progress-bar">
          <div
            style={{
              width:
                page === 0
                  ? "0%"
                  : page === 1
                  ? "35%"
                  : page === 2
                  ? "70%"
                  : "100%",
            }}
          ></div>
        </div>
        <div>{componentList[page]}</div>
        <OverAllData />
      </div>
    </Layout>
  );
}

export default App;
