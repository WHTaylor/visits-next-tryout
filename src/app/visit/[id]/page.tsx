type Props = {
  params: Params;
};

type Params = {
  id: number;
};

let a = 1;
const ViewVisit = ({ params }: Props) => {
  a += 1;
  return (
    <p>
      This is visit {params.id} {a}
    </p>
  );
};

export default ViewVisit;
