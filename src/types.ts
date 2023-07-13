import dayjs, { Dayjs } from "dayjs";

type VisitBase = {
  id: number;
  requester: number;
  status: "draft" | "submitted" | "accepted";
};

export type Visit = VisitBase & {
  visitors: Visitor[];
};

export type VisitDto = VisitBase & {
  visitors: VisitorDto[];
};

type VisitorBase = {
  id: number;
};

export type Visitor = VisitorBase & {
  arrival: Dayjs;
  departure: Dayjs;
};

export type VisitorDto = VisitorBase & {
  arrival: string;
  departure: string;
};

function deserializeVisitor(dto: VisitorDto) {
  return {
    ...dto,
    arrival: dayjs(dto.arrival),
    departure: dayjs(dto.departure),
  };
}

export function deserialize(dtos: VisitDto[]) {
  return dtos.map((dto) => ({
    ...dto,
    visitors: dto.visitors.map(deserializeVisitor),
  }));
}
