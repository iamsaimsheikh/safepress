import react, { SetStateAction, useContext, useState, Dispatch } from "react";
import { Grid, Input, StyledInputLabel } from "@nextui-org/react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Container, Row, Text, Spacer, Badge } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { Auditor } from "../../types/types";
import { ETestsStatus } from "../../types/audit.enum";
import NameBadge from "./nameBadge";
import { ScopeContextType } from "../../types/context.types";
import { Scope as ScopeType } from "../../types/types";
import { ScopeContext } from "../../context/ScopeContext";

interface IFormInput {
  repository_link: string;
  documentation: string;
  tests_status: ETestsStatus;
  auditors_first_name: string;
  auditors_last_name: string;
  reviewed_by_first_name: string;
  reviewed_by_last_name: string;
  smart_contract_audited: string;
}

const Scope: React.FC<{setStage: Dispatch<SetStateAction<string>>}> = ({setStage}) => {
  const {saveScope} = useContext(ScopeContext) as ScopeContextType;
  const [auditorFirstName, setAuditorFirstName] = useState("");
  const [auditorLastName, setAuditorLastName] = useState("");
  const [auditors, setAuditors] = useState<Auditor[]>([]);

  const appendAuditor = () => {
    setAuditors((prev) => [
      ...prev,
      { first_name: auditorFirstName, last_name: auditorLastName },
    ]);
    setAuditorFirstName("");
    setAuditorLastName("");
  };

  const [reviewerFirstName, setReviewerFirstName] = useState("");
  const [reviewerLastName, setReviewerLastName] = useState("");
  const [reviewers, setReviewer] = useState<Auditor[]>([]);

  const appendReviewers = () => {
    setReviewer((prev) => [
      ...prev,
      { first_name: reviewerFirstName, last_name: reviewerLastName },
    ]);
    setReviewerFirstName("");
    setReviewerLastName("");
  };

  const { control, handleSubmit, register } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => {

    let rArr : any = [];
    let aArr : any = [];
    const auditArr: any = auditors.forEach((aud: Auditor, index: number) => {
      aArr.push(aud);
    });

    const revArr: any = reviewers.forEach((rev: Auditor) => {
       rArr.push(rev);
    });

    saveScope({
      repository_link: data.repository_link,
      documentation: [data.documentation],
      tests_status: data.tests_status,
      auditors: aArr,
      reviewed_by: rArr,
      smart_contract_audited: [data.smart_contract_audited],
    });

    setStage('Commit Hashes')
  };

  return (
    <Container css={{ height: "100%", width: "100%" }}>
      <Row>
        <Text h6 size={22} color="black" css={{ m: 0 }}>
          Scope
        </Text>
      </Row>
      <Spacer y={0.5} />
      <hr />
      <Spacer y={1} />
      <Row css={{ height: "100%", width: "100%" }}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            height: "60vh",
            display: "flex",
            flexDirection: "column",
            overflowY: "scroll",
            width: "100%",
          }}
        >
          <Grid.Container css={{ width: "90%" }}>
            <Grid css={{ width: "100%" }}>
              <Controller
                name="repository_link"
                control={control}
                render={({ field }) => (
                  <Input
                    css={{ width: "100%" }}
                    required
                    label="Repository"
                    {...field}
                  />
                )}
              />
            </Grid>
          </Grid.Container>
          <Spacer x={1} />
          <Grid css={{ width: "90%" }}>
            <Controller
              name="documentation"
              control={control}
              render={({ field }) => (
                <Input
                  css={{ width: "100%" }}
                  required
                  label="Documentation"
                  {...field}
                />
              )}
            />
          </Grid>
          <Spacer y={1} />
          <Text h6>Add Auditor</Text>
          <NameBadge auditor={auditors} setAuditors={setAuditors} />
          <Spacer y={0.5} />

          <Grid.Container css={{ width: "100%" }}>
            <Grid>
              <Controller
                name="auditors_first_name"
                control={control}
                render={({ field }) => (
                  <Input
                    
                    label="First Name"
                    onChange={(e) => setAuditorFirstName(e.target.value)}
                    value={auditorFirstName}
                  />
                )}
              />
            </Grid>
            <Spacer x={1} />
            <Grid>
              <Controller
                name="auditors_last_name"
                control={control}
                render={({ field }) => (
                  <Input
                    label="Last Name"
                    onChange={(e) => setAuditorLastName(e.target.value)}
                    value={auditorLastName}
                  />
                )}
              />
            </Grid>
          </Grid.Container>

          <Spacer y={1} />
          <Grid
            css={{
              display: "flex",
              justifyContent: "end",
              paddingRight: "3.5vw",
            }}
          >
            <Button size="xs" onPress={appendAuditor}>
              Add
            </Button>
          </Grid>

          <Spacer y={0.5} />
          <Text h6>Add Reviewer</Text>
          <NameBadge auditor={reviewers} setAuditors={setReviewer} />
          <Spacer y={0.5} />

          <Grid.Container css={{ width: "100%" }}>
            <Grid>
              <Controller
                name="reviewed_by_first_name"
                control={control}
                render={({ field }) => (
                  <Input
                  
                    label="First Name"
                    onChange={(e) => setReviewerFirstName(e.target.value)}
                    value={reviewerFirstName}
                  />
                )}
              />
            </Grid>
            <Spacer x={1} />
            <Grid>
              <Controller
                name="reviewed_by_last_name"
                control={control}
                render={({ field }) => (
                  <Input
                    label="Last Name"
                    onChange={(e) => setReviewerLastName(e.target.value)}
                    value={reviewerLastName}
                  />
                )}
              />
            </Grid>
          </Grid.Container>
          <Spacer y={1} />
          <Grid
            css={{
              display: "flex",
              justifyContent: "end",
              paddingRight: "3.5vw",
            }}
          >
            <Button size="xs" onPress={appendReviewers}>
              Add
            </Button>
          </Grid>
          <Spacer y={1.5} />
          <Grid.Container css={{ width: "100%" }}>
            <Grid css={{ display: "flex", flexDirection: "column" }}>
              <StyledInputLabel
                css={{ fontWeight: "$normal", fontSize: "14px", height: "42%" }}
              >
                Test Status
              </StyledInputLabel>
              <select
                style={{
                  fontSize: "13px",
                  background: "#f1f3f5",
                  color: "black",
                  borderRadius: "10px",
                  border: "none",
                  outline: "none",
                  width: "11vw",
                  height: "5.5vh",
                  padding: "10px",
                }}
                {...register("tests_status")}
              >
                <option value="FAILING">FAILING</option>
                <option value="PASSING">PASSING</option>
                <option value="NO_TESTS">NO_TESTS</option>
              </select>
            </Grid>
            <Spacer x={1} />
            <Grid>
              <Controller
                name="smart_contract_audited"
                control={control}
                render={({ field }) => (
                  <Input label="Smart Contract Audited" {...field} />
                )}
              />
            </Grid>
          </Grid.Container>
          <Spacer y={1.5} />
          <Grid
            css={{
              display: "flex",
              justifyContent: "end",
              paddingRight: "3.5vw",
            }}
          >
            <Button size="sm" type="submit">
              Create
            </Button>
          </Grid>
        </form>
      </Row>
    </Container>
  );
};

export default Scope;
