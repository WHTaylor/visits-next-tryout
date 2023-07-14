import dayjs, { Dayjs } from "dayjs";

type VisitBase = {
  id: number;
  requester: string;
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
  userNumber: string;
};

export type Visitor = VisitorBase & {
  arrival: Dayjs;
  departure: Dayjs;
};

export type VisitorDto = VisitorBase & {
  arrival: string;
  departure: string;
};

export function deserializeVisitor(dto: VisitorDto) {
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

function serializeVisitor(visitor: Visitor) {
  return {
    ...visitor,
    arrival: visitor.arrival.toISOString(),
    departure: visitor.departure.toISOString(),
  };
}

export function serialize(visit: Visit): VisitDto {
  return { ...visit, visitors: visit.visitors.map(serializeVisitor) };
}

export type User = {
  userNumber: string;
  fullName: string;
};
