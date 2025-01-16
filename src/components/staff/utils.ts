import { StaffType } from "../../types";

export const filterdByTreatment = (
  staff: StaffType[],
  treatmentName: string
) => {
  return staff.filter((person) =>
    person.treatmentNames
      .map((treatment) => treatment.toLowerCase())
      .includes(treatmentName.toLowerCase())
  );
};
