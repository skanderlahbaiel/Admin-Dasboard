import { Box, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
// import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import React from "react";
import { useNavigate} from 'react-router-dom';
import axios from "axios";
import { useEffect, useState } from "react";




const Contacts = () => {
  
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const navigateToCalendar = () => {
    // 👇️ navigate to /contacts
    navigate('/learnerForm');
    };
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get("http://localhost:4000/learner/getLearners");
          const data = response.data;
          const newData = data.map((row, index) => {
            return {
              ...row,
              id: row._id, // add an id property with a unique value
              index: index + 1,
            };
          });
          setRows(newData);
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
        }
      };
      
      fetchData();
    }, []);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    // { field: "registrarId", headerName: "Registrar ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    
    {
      field: "number",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "dateOfBirth",
      headerName: "Date Of Birth",
      flex: 1,
    },
    {
      field: "cohort",
      headerName: "Cohort",
      flex: 1,
    },
    // {
    //   field: "city",
    //   headerName: "City",
    //   flex: 1,
    // },
    // {
    //   field: "zipCode",
    //   headerName: "Zip Code",
    //   flex: 1,
    // },
  ];

  return (
    
    <Box m="20px">
      
      
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="LEARNERS"
          subtitle="List of Learners for Future Reference"
        />
        <Box display="flex" justifyContent="end" mt="60px">
              <Button  type="submit" color="secondary" variant="contained" onClick={navigateToCalendar}>
                Add New LEARNER
              </Button>
              
              
        </Box>
      </Box>
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Contacts;