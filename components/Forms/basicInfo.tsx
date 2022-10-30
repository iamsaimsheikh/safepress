import react from "react";
import { Grid, Input } from "@nextui-org/react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Container, Row, Text, Spacer } from "@nextui-org/react";
import { Button } from "@nextui-org/react";

interface IFormInput {
  client_name: string;
  start_date: string;
  type_of_smart_contract: string;
  end_date?: string;
}

const BasicInfo: React.FC = () => {
  const { control, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

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
              <Controller
                name="type_of_smart_contract"
                control={control}
                defaultValue=""
                render={({ field }) => <Input required label="Type / Subtype" {...field} />}
              />
            </Grid>
            <Spacer x={1} />
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
