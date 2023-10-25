import {
  EuiPanel,
  EuiButtonEmpty,
  EuiCard,
  EuiIcon,
  EuiFlexGroup,
  EuiFlexItem,
  EuiButton,
} from "@elastic/eui";
import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import useAuth from "../hooks/useAuth";
import MiniNav from "../components/MiniNav";
import Quiz from "../components/QuizComponents/Quiz"
import Static from "../components/QuizComponents/Static"

export default function QuizMain() {
  useAuth();

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        flexDirection: "column",
      }}
    > 
      <Header />
      <MiniNav />
      <EuiFlexGroup justifyContent="center" style={{ margin: "1rem" }}>
        <EuiFlexItem>
          <EuiPanel>
      <EuiFlexItem>
          <Static />
            <Quiz />
      </EuiFlexItem>
          </EuiPanel>
        </EuiFlexItem>
      </EuiFlexGroup>
    </div>
  );
}
