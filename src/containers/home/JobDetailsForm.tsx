import React from "react";
import { Button, Flex, Box } from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";

import FormInput from "../../components/formComponents/FormInput";
import { IJobDetails } from "../../interface/forms";

interface JobDetailsFormProps {
  handleNext: () => void;
  handlePrevious: () => void;
  values: IJobDetails;
  setValues: (values: IJobDetails) => void;
}

const JobDetailsForm: React.FC<JobDetailsFormProps> = ({ handleNext, handlePrevious, values, setValues }) => {
  const formik = useFormik<IJobDetails>({
    initialValues: values,
    validationSchema: Yup.object().shape({
      jobTitle: Yup.string().required("Job Title is required"),
      jobDetails: Yup.string().required("Job Details is required"),
      jobLocation: Yup.string().required("Job Location is required"),
    }),
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (formValues) => {
      setValues(formValues);
      handleNext();
    },
  });

  return (
    <Box width="100%" as="form" onSubmit={formik.handleSubmit as any}>
      <FormInput
        label="Job Title"
        placeholder="Enter job title"
        name="jobTitle"
        onChange={(e) => {
          formik.handleChange(e);
          setValues({ ...formik.values, [e.target.name]: e.target.value });
        }}
        onBlur={formik.handleBlur}
        value={formik.values.jobTitle}
        error={formik.errors.jobTitle}
        touched={formik.touched.jobTitle}
      />
      <FormInput
        label="Job Details"
        placeholder="Enter job details"
        name="jobDetails"
        onChange={(e) => {
          formik.handleChange(e);
          setValues({ ...formik.values, [e.target.name]: e.target.value });
        }}
        onBlur={formik.handleBlur}
        value={formik.values.jobDetails}
        error={formik.errors.jobDetails}
        touched={formik.touched.jobDetails}
      />
      <FormInput
        label="Job Location"
        placeholder="Enter job location"
        name="jobLocation"
        onChange={(e) => {
          formik.handleChange(e);
          setValues({ ...formik.values, [e.target.name]: e.target.value });
        }}
        onBlur={formik.handleBlur}
        value={formik.values.jobLocation}
        error={formik.errors.jobLocation}
        touched={formik.touched.jobLocation}
      />
      <Flex w="100%" justify="flex-end" mt="4rem" gap="20px">
        <Button colorScheme="gray" type="button" onClick={handlePrevious}>
          Previous
        </Button>
        <Button
          colorScheme="red"
          type="button"
          onClick={() => {
            formik.handleSubmit();
            const allFieldsTouched = Object.keys(formik.initialValues).every(
              (key) => formik?.touched[key]
            );
            if (Object.keys(formik.errors).length === 0 && allFieldsTouched) {
              handleNext(); // Only navigate if the form is valid
            }
          }}
        >
          Next
        </Button>
      </Flex>
    </Box>
  );
};

export default JobDetailsForm;
