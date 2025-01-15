import { Box, Heading, HStack, Radio, RadioGroup } from "@chakra-ui/react";
import { EachStaff } from "../components/staff/EachStaff";
import { useStaff } from "../components/staff/hooks/useStaff";
import { useTreatment } from "../components/treatments/hooks/useTreatments";

const Staff = () => {
  const { staff, filter, setFilter } = useStaff();
  const treatments = useTreatment();

  return (
    <Box>
      <Heading mt={10} textAlign="center">
        Our Staff
      </Heading>
      <HStack m={10} spacing={8} justify="center">
        {staff.map((staffData) => (
          <EachStaff key={staffData.id} staffData={staffData} />
        ))}
      </HStack>
      <RadioGroup onChange={setFilter} value={filter}>
        <HStack my={10} spacing={8} justify="center">
          <Heading size="md">Filter by treatment:</Heading>
          <Radio value="all">All</Radio>
          {treatments.map((t) => (
            <Radio key={t.id} value={t.name}>
              {t.name}
            </Radio>
          ))}
        </HStack>
      </RadioGroup>
    </Box>
  );
};

export default Staff;
