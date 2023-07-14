import { deserialize, Visit } from "@/types";

type Props = {
  params: Params;
};

type Params = {
  id: number;
};

let a = 1;
const ViewVisit = async ({ params }: Props) => {
  const visit: Visit | "oh no" = await fetch(
    "http://localhost:3000/api/visits/" + params.id,
  ).then(async (res) =>
    res.status === 404
      ? "oh no"
      : ((await res.json().then((j) => deserialize(j.visit))) as Visit),
  );

  return visit === "oh no" ? (
    <p>
      That visit doesn&apos;t exist, and I don&apos;t know how to do error
      handling properly
    </p>
  ) : (
    <p>This is visit {visit.id}</p>
  );
};

export default ViewVisit;
