import React, { useState } from "react";
import {
  Container,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Heading,
  Box,
  Grid,
} from "@chakra-ui/react";
import InterviewSettingsForm from "./InterviewSettingsForm";
import JobDetailsForm from "./JobDetailsForm";
import RequisitionDetailsForm from "./RequisitionDetailsForm";
import DisplayCard from "./PreviewCard";
import { IRequisitionDetails, IJobDetails, IInterViewSettings } from "../../interface/forms";

const HomeLayout: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const [requisitionDetails, setRequisitionDetails] = useState<IRequisitionDetails>({
    requisitionTitle: "",
    noOfOpenings: 0,
    urgency: "",
    gender: "",
  });

  const [jobDetails, setJobDetails] = useState<IJobDetails>({
    jobTitle: "",
    jobDetails: "",
    jobLocation: "",
  });

  const [interviewSettings, setInterviewSettings] = useState<IInterViewSettings>({
    interviewMode: "",
    interviewDuration: "",
    interviewLanguage: "",
  });

  const handleNext = () => {
    if (currentIndex < 2) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <Box w="100%">
      <Container maxW="1200px">
        <Heading fontFamily="Poppins" fontSize="1.5rem" my="2rem">
          Create Candidate Requisition
        </Heading>
        <Tabs index={currentIndex} isLazy>
          <TabList>
            <Tab>Requisition Details</Tab>
            <Tab>Job Details</Tab>
            <Tab>Interview Settings</Tab>
          </TabList>
          <Grid display="grid" gridTemplateColumns="3fr 2fr" gap="24px">
            <TabPanels>
              <TabPanel>
                <RequisitionDetailsForm
                  handleNext={handleNext}
                  values={requisitionDetails}
                  setValues={setRequisitionDetails}
                />
              </TabPanel>
              <TabPanel>
                <JobDetailsForm
                  handleNext={handleNext}
                  handlePrevious={handlePrevious}
                  values={jobDetails}
                  setValues={setJobDetails}
                />
              </TabPanel>
              <TabPanel>
                <InterviewSettingsForm
                  handlePrevious={handlePrevious}
                  values={interviewSettings}
                  setValues={setInterviewSettings}
                />
              </TabPanel>
            </TabPanels>
            <DisplayCard 
              requisitionDetails={requisitionDetails}
              jobDetails={jobDetails}
              interviewSettings={interviewSettings}
            />
          </Grid>
        </Tabs>
      </Container>
    </Box>
  );
};

export default HomeLayout;
