import React from "react";
import { Button, Flex, Box } from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";

import FormSelect from "../../components/formComponents/FormSelect";
import { IInterViewSettings } from "../../interface/forms";
import {
  interviewDurationOptions,
  interviewLanguageOptions,
  interviewModeOptions,
} from "./constants";

interface InterviewDetailsFormProps {
  handlePrevious: () => void;
  values: IInterViewSettings;
  setValues: (values: IInterViewSettings) => void;
}

const InterviewDetailsForm: React.FC<InterviewDetailsFormProps> = ({
  handlePrevious,
  values,
  setValues,
}) => {
  const formik = useFormik<IInterViewSettings>({
    initialValues: values,
    validationSchema: Yup.object({
      interviewMode: Yup.string().required("Interview Mode is required"),
      interviewDuration: Yup.string().required("Interview Duration is required"),
      interviewLanguage: Yup.string().required("Interview Language is required"),
    }),
    onSubmit: (values) => {
      setValues(values);
      alert("Form successfully submitted");
    },
  });

  const handleSelectChange = (
    name: string,
    selectedOption: { value: string; label: string } | null
  ) => {
    const value = selectedOption ? selectedOption.label : "";
    formik.setFieldValue(name, value);
    setValues({ ...formik.values, [name]: value });
  };

  return (
    <Box width="100%" as="form" onSubmit={formik.handleSubmit as any}>
      <FormSelect
        label="Interview Mode"
        placeholder="Select interview mode"
        name="interviewMode"
        options={interviewModeOptions}
        onChange={handleSelectChange}
        onBlur={() => formik.setFieldTouched("interviewMode", true)}
        value={formik.values.interviewMode}
        error={formik.errors.interviewMode}
        touched={formik.touched.interviewMode}
      />
      <FormSelect
        label="Interview Duration"
        placeholder="Select interview duration"
        name="interviewDuration"
        options={interviewDurationOptions}
        onChange={handleSelectChange}
        onBlur={() => formik.setFieldTouched("interviewDuration", true)}
        value={formik.values.interviewDuration}
        error={formik.errors.interviewDuration}
        touched={formik.touched.interviewDuration}
      />
      <FormSelect
        label="Interview Language"
        name="interviewLanguage"
        placeholder="Select interview language"
        options={interviewLanguageOptions}
        onChange={handleSelectChange}
        onBlur={() => formik.setFieldTouched("interviewLanguage", true)}
        value={formik.values.interviewLanguage}
        error={formik.errors.interviewLanguage}
        touched={formik.touched.interviewLanguage}
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
            if (
              Object.keys(formik.errors).length === 0 &&
              Object.keys(formik.touched).length === Object.keys(formik.initialValues).length
            ) {
              alert("Form is valid and can be submitted!");
              // Proceed with submission or call handleNext()
            }
          }}
        >
          Submit
        </Button>
      </Flex>
    </Box>
  );
};

export default InterviewDetailsForm;
