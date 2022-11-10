import react, { useState, Dispatch, SetStateAction } from "react";
import BasicInfo from "./basicInfo";
import CommitHashes from "./commitHashes";
import Findings from "./findings";
import Scope from "./scope";
import WWEditor from "./wizywyg";
import BasicInfoProvider from "../../context/BasicInfoContext";
import ScopeProvider from "../../context/ScopeContext";
import CommitHashProvider from "../../context/CommitHashContext";
import FindingProvider from "../../context/FindingContext";
import Finalizing from "./finalizing";

const FormContainer: React.FC<{
  stage: string;
  setStage: Dispatch<SetStateAction<string>>;
}> = ({ stage, setStage }) => {


  return (
    <>
      <ScopeProvider>
        <BasicInfoProvider>
          <CommitHashProvider>
            <FindingProvider>
              {stage === "Basic Info" ? (
                <BasicInfo setStage={setStage} />
              ) : stage === "Scope" ? (
                <Scope setStage={setStage} />
              ) : stage === "Commit Hashes" ? (
                <CommitHashes setStage={setStage} />
              ) : stage === "Findings" ? (
                <Findings setStage={setStage} />
              ) : (
                <Finalizing setStage={setStage}/>
              )}
            </FindingProvider>
          </CommitHashProvider>
        </BasicInfoProvider>
      </ScopeProvider>
    </>
  );
};

export default FormContainer;
