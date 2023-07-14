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
  visitors?: VisitorDto[];
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

export function deserialize(dto: VisitDto): Visit;
export function deserialize(dto: VisitDto[]): Visit[];
export function deserialize(dto: VisitDto | VisitDto[]) {
  function deserialize(v: VisitDto): Visit {
    return { ...v, visitors: v.visitors?.map(deserializeVisitor) ?? [] };
  }

  return Array.isArray(dto) ? dto.map(deserialize) : deserialize(dto);
}
