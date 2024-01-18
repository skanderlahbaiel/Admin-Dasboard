import { Box, useTheme, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
// import { mockDataTeam } from "../../data/mockData";
// import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
// import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
// import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

import { useNavigate} from 'react-router-dom';






const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([
    
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "start_date",
      headerName: "Start Date",
      type: "number",
      headerAlign: "left",
      align: "left",
      flex: 1,
    },
    {
      field: "end_date",
      headerName: "End Date",
      flex: 1,
    },
    {
      field: "professor_name",
      headerName: "Instructor",
      flex: 1,
    },
   
     {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      
      renderCell: (cellValues) => {
        const name = cellValues.row.name;
       
        return (
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box>
              <Button onClick={() => handleClick(name)} type="submit" color="secondary" variant="contained">
              Manage Cohort
              </Button>
            </Box>
            <Box marginLeft="4px">
              <Button  type="submit" color="secondary" variant="contained">
              Edit
              </Button>
            </Box>
          </Box>
        )
      }
      
      
    },
  ]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/cohort/getCohorts");
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

  const updatedColumns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "name", headerName: "Name", flex: 1, cellClassName: "name-column--cell" },
    { field: "number", headerName: "Phone Number", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "dateOfBirth", headerName: "Date Of Birth", flex: 1 },
    { field: "cohort", headerName: "Cohort", flex: 1 },
    { field: "attendance", headerName: "Attendance", flex: 1, valueGetter: () => "100%", },
  ];
  const navigateToCalendar = () => {
    // 👇️ navigate to /contacts
    navigate('/cohortForm');
    };
    const handleClick = (cohortName) => {
      console.log(`Clicked on row with cohort name ${cohortName}`);
      
      const fetchData = async (cohortName) => {
        try {
          const response = await axios.get(`http://localhost:4000/learner/learnerBycohort/${cohortName}`);
          const data = response.data;
          console.log(data)
          const newData = data.map((row, index) => {
            return {
              ...row,
              id: row._id, // add an id property with a unique value
              index: index + 1,
            };
          });
          setRows(newData);
          
          // Create a new variable with the updated column values
          
          setColumns(updatedColumns);
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
      
      fetchData(cohortName);
    };
    
     

  
  return (
    <Box id="12" m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="COHORT"
          subtitle="Managing Cohorts"
        />
        <Box display="flex" justifyContent="end" mt="60px">
              <Button  type="submit" color="secondary" variant="contained" onClick={navigateToCalendar}>
                Add New COHORT
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
          
          // onCellClick= {handleCellClick}
        />
      </Box>
    </Box>
  );
};

export default Team;