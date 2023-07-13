type Props = {
  params: Params;
};

type Params = {
  id: number;
};

const ViewVisit = ({ params }: Props) => <p>This is visit {params.id}</p>;

export default ViewVisit;
