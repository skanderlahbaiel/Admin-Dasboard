import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import axios from "axios";


const CohortForm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

const handleFormSubmit = async (values) => {
    try {
      const response = await axios.post("http://127.0.0.1:4000/cohort/AddCohort", values);
      console.log(response.data);
      // Handle successful response or perform any necessary actions
    } catch (error) {
      if (error.response) {
        // Request was made but server responded with something other than 2xx
        console.error(error.response.data);
        console.error(error.response.status);
        console.error(error.response.headers);
      } else if (error.request) {
        // Request was made but no response was received
        console.error(error.request);
      } else {
        // Something else happened in making the request that triggered an error
        console.error('Error', error.message);
      }
      console.error(error.config);
      console.log(error)
    }
  };

  return (
    <Box m="20px">
      <Header title="NEW COHORT" subtitle="Create a New Cohort" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchemaCohort}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              {/* <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Cohort ID"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.cohortId}
                name="cohortId"
                error={!!touched.cohortId && !!errors.cohortId}
                helperText={touched.cohortId && errors.cohortId}
                sx={{ gridColumn: "span 2" }}
              /> */}
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Cohort Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.cohortName}
                name="name"
                error={!!touched.cohortName && !!errors.cohortName}
                helperText={touched.cohortName && errors.cohortName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="date"
                label="Start Date"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.startDate}
                name="start_date"
                error={!!touched.startDate && !!errors.startDate}
                helperText={touched.startDate && errors.startDate}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="date"
                label="End Date"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.endDate}
                name="end_date"
                error={!!touched.endDate && !!errors.endDate}
                helperText={touched.endDate && errors.endDate}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Instructor"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.instructor}
                name="professor_name"
                error={!!touched.instructor && !!errors.instructor}
                helperText={touched.instructor && errors.instructor}
                sx={{ gridColumn: "span 4" }}
              />
              {/* <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Address 2"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address2}
                name="address2"
                error={!!touched.address2 && !!errors.address2}
                helperText={touched.address2 && errors.address2}
                sx={{ gridColumn: "span 4" }}
              /> */}
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New Cohort
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};


const checkoutSchemaCohort = yup.object().shape({
  
  name: yup.string().required("required"),
  start_date: yup.string().required("required"),
  end_date: yup.string().required("required"),
  professor_name: yup.string().required("required"),
});
const initialValues = {
  
  name: "",
  start_date: "",
  end_date: "",
  professor_name: "",
};

export default CohortForm;