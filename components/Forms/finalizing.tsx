import react, { useContext, useState, Dispatch, SetStateAction } from "react";
import { Grid, Input } from "@nextui-org/react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Container, Row, Text, Spacer, Card } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import {
  BasicInfoContextType,
  ScopeContextType,
  CommitHashContextType,
  FindingContextType,
} from "../../types/context.types";
import { BasicInfoContext } from "../../context/BasicInfoContext";
import { ScopeContext } from "../../context/ScopeContext";
import { CommitHashContext } from "../../context/CommitHashContext";
import { FindingContext } from "../../context/FindingContext";
import { Audit, CommitHash, Finding } from "../../types/types";
import axios from 'axios'

interface IFormInput {
  version: string;
  custom_audit_id: string;
}

const addAudit = async (data : any) => {
  await axios.post('http://localhost:3000/api/audit', data).then((res) => {
    console.log(res.data);
  }).catch((e) => {
    console.log(e);
  })
}

const Finalizing: React.FC<{setStage: Dispatch<SetStateAction<string>>}> = ({setStage}) => {
  const { finding } = useContext(FindingContext) as FindingContextType;
  const { scope } = useContext(ScopeContext) as ScopeContextType;
  const { commitHash } = useContext(CommitHashContext) as CommitHashContextType;
  const { basicInfo } = useContext(BasicInfoContext) as BasicInfoContextType;
  const { control, handleSubmit } = useForm<IFormInput>();
  const [audit, setAudit] = useState<Audit | undefined>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    let chArr: any = [];
    let fArr: any = [];

    const commitHashArr: any = commitHash?.forEach((ch: CommitHash) => {
      chArr.push(ch);
    });

    const findingArr: any = finding?.forEach((f: Finding) => {
      fArr.push(f);
    });

    setAudit({
        version: data.version,
        custom_audit_id: data.custom_audit_id,
        client_name: basicInfo?.client_name!,
        start_date: basicInfo?.start_date!,
        end_date: basicInfo?.end_date!,
        type_of_smart_contract: basicInfo?.type_of_smart_contract!,
        scope: scope!,
        commit_hashes: commitHashArr,
        findings: findingArr,
      })

      addAudit(audit);

  };
  return (
    <>
      <Container css={{ height: "100%", width: "100%" }}>
        <Row>
          <Text h6 size={22} color="black" css={{ m: 0 }}>
            Finalizing
          </Text>
        </Row>
        <Spacer y={0.5} />
        <hr />
        <Spacer y={1} />
        <Row css={{ height: "100%" }}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <Grid.Container css={{ width: "100%", flexDirection: "column" }}>
              <Grid>
                <Card
                  variant="flat"
                  css={{
                    height: "5vh",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    paddingLeft: "10px",
                  }}
                >
                  <Text
                    css={{ display: "flex", flexDirection: "row" }}
                    size={14}
                  >
                    <b>Note: </b>
                    <Text
                      size={14}
                      css={{
                        marginLeft: "5px",
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      Please provide version if an audit already exists.{" "}
                      <Text
                        size={14}
                        color="gray"
                        css={{
                          marginLeft: "5px",
                        }}
                      >
                        Default (v1.00.00)
                      </Text>
                    </Text>
                  </Text>
                </Card>
              </Grid>
              <Spacer y={1} />
              <Grid>
                <Controller
                  name="version"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Input placeholder="vX.XX.XX" label="Version" {...field} />
                  )}
                />
              </Grid>
              <Spacer y={1} />
              <Grid>
                <Controller
                  name="custom_audit_id"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Input label="Custom Audit ID" {...field} />
                  )}
                />
              </Grid>
            </Grid.Container>
            <Spacer y={1.5} />
            <Grid
              css={{ display: "flex", justifyContent: "start", width: "100%" }}
            >
              <Button size="xs" type="submit">
                Save Audit
              </Button>
            </Grid>
          </form>
        </Row>
      </Container>
    </>
  );
};

export default Finalizing;
