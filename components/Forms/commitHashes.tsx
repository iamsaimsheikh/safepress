import react, { SetStateAction, useContext, useState, Dispatch } from "react";
import { Grid, Input, StyledInputLabel } from "@nextui-org/react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Container, Row, Text, Spacer, Badge } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { CommitHash } from "../../types/types";
import CommitBadge from "./commitBadge";
import {CommitHashContext} from '../../context/CommitHashContext'
import { CommitHashContextType } from "../../types/context.types";

interface IFormInput {
  label:string,
  value: string
}

const CommitHashes: React.FC<{setStage: Dispatch<SetStateAction<string>>}> = ({setStage}) => {

  const {saveCommitHash} = useContext(CommitHashContext) as CommitHashContextType

  const [label, setLabel] = useState("");
  const [value, setValue] = useState("");
  const [commitHash, setCommitHash] = useState<CommitHash[]>([]);

  const appendCommitHash = () => {
    setCommitHash((prev) => [
      ...prev,
      { label: label, value: value },
    ]);
  };

  const { control, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    saveCommitHash(commitHash);
    console.log(commitHash)
    console.log('Commit Hashes ------------')
    setStage('Findings')
  };

  return (
    <Container css={{ height: "100%", width: "100%" }}>
      <Row>
        <Text h6 size={22} color="black" css={{ m: 0 }}>
          Commit Hashes
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
                name="label"
                control={control}
                render={({ field }) => (
                  <Input
                    label="Label"
                    onChange={(e) => setLabel(e.target.value)}
                    value={label}
                  />
                )}
              />
            </Grid>
            <Spacer x={1} />
            <Grid>
              <Controller
                name="value"
                control={control}
                render={({ field }) => (
                  <Input
                    label="Hash Value"
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
                  />
                )}
              />
            </Grid>
          </Grid.Container>

          <Spacer y={1} />
          <Grid.Container css={{display:'flex', justifyContent:'flex-start', paddingRight:'2.5vw'}}>
          <Grid
            css={{
              display: "flex",
              justifyContent: "end",
              paddingRight: "1vw",
            }}
          >
            <Button size="xs" onPress={appendCommitHash}>
              Add
            </Button>
          </Grid>
          <Grid
            css={{
              display: "flex",
              justifyContent: "end",
              paddingRight: "2vw",
            }}
          >
            <Button size="xs" type="submit">
              Next
            </Button>
          </Grid>
          </Grid.Container>
          <Spacer y={1} />
            <Text h6>Commits</Text>
          <Spacer y={0} />
          <CommitBadge commitHash={commitHash} setCommitHash={setCommitHash} />

          <Spacer y={0.5} />
          <Spacer y={1.5} />
        </form>
      </Row>
    </Container>
  );
};

export default CommitHashes;
