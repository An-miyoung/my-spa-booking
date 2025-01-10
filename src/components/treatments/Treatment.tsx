import { Text } from "@chakra-ui/react";
import { TreatmentType } from "../../types";
import { Card } from "../common/Card";

interface TreatmentProps {
  treatmentData: TreatmentType;
}
const Treatment = ({ treatmentData }: TreatmentProps) => {
  const cardContent = <Text>{treatmentData.description}</Text>;

  return (
    <Card
      itemName={treatmentData.name}
      image={treatmentData.image}
      cardContents={cardContent}
    />
  );
};

export default Treatment;
