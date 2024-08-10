import React from "react";
import { Button, Flex, Box } from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";

import FormInput from "../../components/formComponents/FormInput";
import FormSelect from "../../components/formComponents/FormSelect";
import { IRequisitionDetails } from "../../interface/forms";
import { genderOptions, urgencyOptions } from "./constants";

interface RequisitionDetailsFormProps {
  handleNext: () => void;
  values: IRequisitionDetails;
  setValues: (values: IRequisitionDetails) => void;
}

const RequisitionDetailsForm: React.FC<RequisitionDetailsFormProps> = ({ handleNext, values, setValues }) => {
  const formik = useFormik<IRequisitionDetails>({
    initialValues: values,
    validationSchema: Yup.object().shape({
      requisitionTitle: Yup.string().required("Requisition title is required"),
      noOfOpenings: Yup.number()
        .typeError("Enter a valid number")
        .required("Number of openings is required")
        .positive("Enter a valid number")
        .min(1, "Enter a valid number"),
      urgency: Yup.string().required("Urgency is required"),
      gender: Yup.string().required("Gender is required"),
    }),
    onSubmit: (values) => {
      setValues(values);
      handleNext();
    },
  });

  // Custom onChange handler for FormInput
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formik.handleChange(e);
    setValues({ ...formik.values, [e.target.name]: e.target.value });
  };

  // Ensure FormSelect receives the correct value format
  const handleSelectChange = (name: string, selectedOption: { value: string; label: string } | null) => {
    const value = selectedOption ? selectedOption.label : "";
    formik.setFieldValue(name, value);
    setValues({ ...formik.values, [name]: value });
  };
  
  

  return (
    <Box width="100%" as="form" onSubmit={formik.handleSubmit as any}>
      <FormInput
        label="Requisition Title"
        placeholder="Enter requisition title"
        name="requisitionTitle"
        onChange={handleInputChange}
        onBlur={formik.handleBlur}
        value={formik.values.requisitionTitle}
        error={formik.errors.requisitionTitle}
        touched={formik.touched.requisitionTitle}
      />
      <FormInput
        label="Number of Openings"
        placeholder="Enter number of openings"
        name="noOfOpenings"
        onChange={handleInputChange}
        onBlur={formik.handleBlur}
        value={formik.values.noOfOpenings}
        error={formik.errors.noOfOpenings}
        touched={formik.touched.noOfOpenings}
      />
      <FormSelect
        label="Gender"
        name="gender"
        placeholder="Select gender"
        options={genderOptions}
        onChange={handleSelectChange}
        onBlur={formik.handleBlur}
        error={formik.errors.gender}
        touched={formik.touched.gender}
        value={formik.values.gender}
      />
      <FormSelect
        label="Urgency"
        name="urgency"
        placeholder="Select urgency"
        options={urgencyOptions}
        onChange={handleSelectChange}
        onBlur={formik.handleBlur}
        error={formik.errors.urgency}
        touched={formik.touched.urgency}
        value={formik.values.urgency} // This should be a value, not an object
      />
      <Flex w="100%" justify="flex-end" mt="4rem">
        <Button colorScheme="red" type="submit">
          Next
        </Button>
      </Flex>
    </Box>
  );
};

export default RequisitionDetailsForm;
