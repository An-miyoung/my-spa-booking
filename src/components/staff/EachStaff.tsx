import { Text } from "@chakra-ui/react";

import type { StaffType } from "../../types";

import { Card } from "../../components/common/Card";

interface StaffProps {
  staffData: StaffType;
}
export function EachStaff({ staffData }: StaffProps) {
  const cardContents = (
    <Text textAlign="center">{staffData.treatmentNames.join(", ")}</Text>
  );

  return (
    <Card
      itemName={staffData.name}
      image={staffData.image}
      cardContents={cardContents}
    />
  );
}
