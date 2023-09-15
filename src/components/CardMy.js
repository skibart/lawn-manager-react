import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from '@material-tailwind/react';

const CardMy = (props) => {
  return (
    <main className=" flex-1 p-1">
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-1">
        <Card className="mt-1 w-full md:w-auto pb-10">
          <CardHeader
            floated={false}
            shadow={false}
            className="m-0 grid bg-green-600 rounded-b-none p-4"
          >
            <Typography variant="h5" color="white" className="">
              {props.title}
            </Typography>
          </CardHeader>

          <CardBody>{props.children}</CardBody>
        </Card>
      </div>
    </main>
  );
};

export default CardMy;
