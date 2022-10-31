import react, {useContext, Dispatch, SetStateAction} from "react";
import { Grid, Input } from "@nextui-org/react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Container, Row, Text, Spacer, StyledInputLabel } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import {BasicInfoContextType} from '../../types/context.types'
import {BasicInfoContext} from '../../context/BasicInfoContext'
import {ETypeOfSmartContract} from '../../types/audit.enum'

interface IFormInput {
  client_name: string;
  start_date: string;
  type_of_smart_contract: ETypeOfSmartContract;
  end_date?: string;
}

const BasicInfo: React.FC<{setStage: Dispatch<SetStateAction<string>>}> = ({setStage}) => {
  const {basicInfo ,saveBasicInfo} = useContext(BasicInfoContext) as BasicInfoContextType;
  const { control, handleSubmit, register } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    saveBasicInfo(data)
    setStage('Scope');
  }

  return (
    <Container css={{ height: "100%", width: "100%" }}>
      <Row>
        <Text h6 size={22} color="black" css={{ m: 0 }}>
          Basic Info
        </Text>
      </Row>
      <Spacer y={0.5} />
      <hr />
      <Spacer y={1} />
      <Row css={{height:'100%'}}>
        <form onSubmit={handleSubmit(onSubmit)} style={{height:'100%', display:'flex', flexDirection:'column'}}>
          <Grid.Container css={{width:'100%'}}>
            <Grid>
              <Controller
                name="client_name"
                control={control}
                defaultValue=""
                render={({ field }) => <Input required label="Client Name" {...field} />}
              />
            </Grid>
            <Spacer x={1} />
            <Grid>
              <Controller
                name="start_date"
                control={control}
                render={({ field }) => <Input required type='date' label="Start Date" {...field} />}
              />
            </Grid>
          </Grid.Container>
          <Spacer y={1} />
          <Grid.Container css={{width:'100%'}}>
            <Grid>
              <StyledInputLabel
                css={{
                  fontWeight: "$normal",
                  fontSize: "14px",
                  height: "0%",
                  paddingLeft: "5px",
                }}
              >
                Type / Subtype
              </StyledInputLabel>
              <Spacer y={0.3} />
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
                {...register("type_of_smart_contract")}
              >
                <option value="BRIDGE">BRIDGE</option>
              </select>
            </Grid>
            <Spacer x={1.7} />
            <Grid>
              <Controller
                name="end_date"
                control={control}
                render={({ field }) => <Input type='date' label="End Date" {...field} />}
              />
            </Grid>
          </Grid.Container>
          <Spacer y={1.5} />
          <Grid css={{display:'flex', justifyContent:'end'}}>
          <Button size='sm' type="submit" >Create</Button>
          </Grid>
        </form>
      </Row>
    </Container>
  );
};

export default BasicInfo;
