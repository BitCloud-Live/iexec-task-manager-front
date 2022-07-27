import { Base } from "@components";
import { useForm, useWatch, Control } from "react-hook-form";
import { Form, Button, Card, Row, Col } from "react-bootstrap";

type FormValues = {
  appaddress: string;
};

function IsolateReRender({ control }: { control: Control<FormValues> }) {
  const appaddress = useWatch({
    control,
    name: "appaddress",
    defaultValue: "default",
  });

  return <div>{appaddress}</div>;
}

const CreateOrder: React.FC = () => {
  const { register, control, handleSubmit } = useForm<FormValues>();
  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <Base>
      <Row>
        <Col>
          <Card className="m-4">
            <Card.Header>Create a new Order</Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <input className="form-control" {...register("appaddress")} />

                <IsolateReRender control={control} />
                <div className="col-12 d-flex mt-3 justify-content-center">
                  <input
                    className="form-control btn btn-flat w-50"
                    type="submit"
                  />
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Base>
  );
};

export default CreateOrder;
