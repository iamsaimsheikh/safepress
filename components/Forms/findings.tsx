import react, { SetStateAction, useContext, useState, Dispatch } from "react";
import { Grid, Input, StyledInputLabel } from "@nextui-org/react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Container, Row, Text, Spacer } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import {
  EClassification,
  EFindingStatus,
  EFindingLocationType,
} from "../../types/audit.enum";
import WWEditor from "./wizywyg";
import { Finding } from "../../types/types";
import {FindingContextType} from "../../types/context.types";
import {FindingContext} from "../../context/FindingContext";

interface IFormInput {
  title: string;
  classification: EClassification;
  status: EFindingStatus;
  location: {
    type: EFindingLocationType;
    name: string;
    line_number: {
      start: number;
      end: number;
    };
  };
}

const Findings: React.FC<{setStage: Dispatch<SetStateAction<string>>}> = ({setStage}) => {
  const {saveFinding} = useContext(FindingContext) as FindingContextType;
  const [description, setDescription] = useState("");
  const [recommendation, setRecommendation] = useState("");
  const [findings, setFindings] = useState<Finding[]>([]);

  const { control, handleSubmit, register, reset } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    setFindings((prev) => [...prev ,{
      title: data.title,
      description: description,
      recommendation: recommendation,
      classification: data.classification,
      status: data.status,
      location: {
        type: data.location.type,
        name: data.location.name,
        line_number: {
          start: data.location.line_number.start,
          end: data.location.line_number.end,
        },
      },
    }]);
    setDescription('');
    setRecommendation('');
    reset();
    saveFinding(findings);
  };

  return (
    <Container css={{ height: "100%", width: "100%", overflowY: "scroll" }}>
      <Row>
        <Text h6 size={22} color="black" css={{ m: 0 }}>
          Findings
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
            width: "100%",
          }}
        >
          <Grid.Container css={{ width: "100%" }}>
            <Grid>
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <Input required label="Title" {...field} />
                )}
              />
            </Grid>
          </Grid.Container>
          <Spacer y={1} />
          <Text size={15}>Add a description</Text>
          <Spacer y={1} />
          <Grid.Container css={{ width: "100%" }}>
            <Grid>
              <WWEditor setFunction={setDescription} />
            </Grid>
          </Grid.Container>

          <Spacer y={1} />
          <Text size={15}>Recommendation</Text>
          <Spacer y={1} />
          <Grid.Container css={{ width: "100%" }}>
            <Grid>
              <WWEditor setFunction={setRecommendation} />
            </Grid>
          </Grid.Container>

          <Spacer y={1.5} />
          <Grid.Container css={{ width: "100%" }}>
            <Grid css={{ display: "flex", flexDirection: "column" }}>
              <StyledInputLabel
                css={{
                  fontWeight: "$normal",
                  fontSize: "14px",
                  height: "42%",
                  paddingLeft: "5px",
                }}
              >
                Classification
              </StyledInputLabel>
              <Spacer y={1} />
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
                {...register("classification")}
              >
                <option value="CRITICAL">CRITICAL</option>
                <option value="HIGH">HIGH</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="LOW">LOW</option>
              </select>
            </Grid>
            <Spacer x={1} />
            <Grid css={{ display: "flex", flexDirection: "column" }}>
              <StyledInputLabel
                css={{
                  fontWeight: "$normal",
                  fontSize: "14px",
                  height: "42%",
                  paddingLeft: "5px",
                }}
              >
                Status
              </StyledInputLabel>
              <Spacer y={1} />
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
                {...register("status")}
              >
                <option value="CRITICAL">FIXED</option>
                <option value="HIGH">TODO</option>
              </select>
            </Grid>
          </Grid.Container>

          <Spacer y={1.5} />
          <Text size={15}>Location</Text>
          <Spacer y={1} />

          <Grid.Container css={{ width: "100%" }}>
            <Grid>
              <select
                placeholder="Type"
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
                {...register("location.type")}
              >
                <option value="" disabled selected hidden>
                  Type
                </option>
                <option value="CRITICAL">CRITICAL</option>
                <option value="HIGH">HIGH</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="LOW">LOW</option>
              </select>
            </Grid>
            <Spacer x={1} />
            <Grid>
              <Controller
                name="location.name"
                control={control}
                render={({ field }) => (
                  <Input required placeholder="Name" {...field} />
                )}
              />
            </Grid>
          </Grid.Container>

          <Spacer y={1.5} />
          <Text size={15}>Line Number</Text>
          <Spacer y={1} />

          <Grid.Container css={{ width: "100%" }}>
            <Grid>
              <Controller
                name="location.line_number.start"
                control={control}
                render={({ field }) => (
                  <Input required placeholder="Start" type='number' {...field} />
                )}
              />
            </Grid>
            <Spacer x={1} />
            <Grid>
              <Controller
                name="location.line_number.end"
                control={control}
                render={({ field }) => (
                  <Input required placeholder="End" type='number' {...field} />
                )}
              />
            </Grid>
          </Grid.Container>

          <Spacer y={1.5} />
          <Grid.Container
            css={{
              display: "flex",
              justifyContent: "flex-start",
              paddingRight: "2.5vw",
            }}
          >
            <Grid
              css={{
                display: "flex",
                justifyContent: "end",
                paddingRight: "1vw",
              }}
            >
              <Button size="xs" type="submit">
                Add Finding
              </Button>
            </Grid>
            <Grid
              css={{
                display: "flex",
                justifyContent: "end",
                paddingRight: "2vw",
              }}
            >
              <Button size="xs" onPress={() => setStage('Finalizing')}>
                Next
              </Button>
            </Grid>
          </Grid.Container>
          <Spacer y={2} />
        </form>
      </Row>
    </Container>
  );
};

export default Findings;
