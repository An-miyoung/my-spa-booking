import { Box, Heading, HStack } from "@chakra-ui/react";
import Treatment from "../components/treatments/Treatment";
import { treatments } from "../components/temp-data";

const Treatments = () => {
  return (
    <Box>
      <Heading mt={10} textAlign="center">
        Available Treatments
      </Heading>
      <HStack m={10} spacing={8} justify="center">
        {treatments.map((treatmentData) => (
          <Treatment key={treatmentData.id} treatmentData={treatmentData} />
        ))}
      </HStack>
    </Box>
  );
};

export default Treatments;
