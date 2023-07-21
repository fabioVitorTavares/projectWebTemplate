import React from "react";

const Dashboard = () => {
  return (
    <>
      <h1 style={{ margin: 0 }}>Tela publica inicial</h1>
      <button onClick={() => (window.location.href = "/configurador/login")}>
        Login
      </button>
    </>
  );
};

export default Dashboard;
