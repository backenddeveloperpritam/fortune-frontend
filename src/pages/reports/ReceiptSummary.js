import React, { useState } from "react";
import MaterialTable from "material-table";
import { Grid } from "@mui/material";
import { useStyles } from "../../assets/styles.js";


export const ReceiptSummary = () => {
  const classes = useStyles();
  const [selectedFromDate, setSelectedFromDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");
  const [dateError, setDateError] = useState("");
  const [subSkillsData, setSubSkillsData] = useState([]); // Replace with your actual data

  const handleDateChange = (date, field) => {
    if (field === "fromDate") {
      setSelectedFromDate(date);
    } else if (field === "endDate") {
      setSelectedEndDate(date);
    }
  };

  const handleApply = () => {
    if (selectedFromDate && selectedEndDate) {
      const fromDate = new Date(selectedFromDate);
      const endDate = new Date(selectedEndDate);

      if (fromDate > endDate) {
        setDateError("From Date must be before End Date");
      } else {
        setDateError(""); // Reset error if dates are valid
      
        setSubSkillsData([]); // Replace with your actual data
      }
    } else {
      setDateError("Please select both From Date and End Date");
    }
  };


    return (
        <div className={classes.container}>
            <div className={classes.box}>
                <Grid container spacing={2}>
                    <Grid item lg={3} sm={12} md={12} xs={12}>
                        <div className={classes.headingContainer}>
                            <div className={classes.heading}>Receipt Summary</div>
                        </div>
                    </Grid>
                    <Grid item lg={12} sm={12} md={12} xs={12}>
            <div className={classes.headingContainer}>
              <Grid item lg={4} sm={12} md={12} xs={12}>
                <label>From Date</label>
                <input
                  type="date"
                  value={selectedFromDate}
                  onChange={(e) => handleDateChange(e.target.value, "fromDate")}
                  style={{ width: "100%", height: "50px" }}
                />
              </Grid>
              <Grid item lg={4} sm={12} md={12} xs={12}>
                <label>End Date</label>
                <input
                  type="date"
                  value={selectedEndDate}
                  onChange={(e) => handleDateChange(e.target.value, "endDate")}
                  style={{ width: "100%", height: "50px" }}
                />
              </Grid>
              <Grid item lg={2} sm={12} md={12} xs={12}>
                <div
                  onClick={handleApply}
                  className={classes.submitbutton}
                >
                  Apply
                </div>
              </Grid>
            </div>



            <Grid item lg={12} sm={12} md={12} xs={12} style={{ marginTop: 15 }}>
              <MaterialTable
                title="Entry"
                data={subSkillsData}
                                columns={[
                                    {
                                        title: 'S.No',
                                        editable: 'never',
                                        render: rowData => subSkillsData.indexOf(rowData) + 1
                                    },
                                    {
                                        title: 'Txn Date',
                                        editable: 'never',
                                        render: rowData => subSkillsData.indexOf(rowData) + 1
                                    },
                                    {
                                        title: 'Txn id',
                                        editable: 'never',
                                        render: rowData => subSkillsData.indexOf(rowData) + 1
                                    },
                                    {
                                        title: 'Receipt No',
                                        editable: 'never',
                                        render: rowData => subSkillsData.indexOf(rowData) + 1
                                    },
                                    {
                                        title: 'Customer name',
                                        editable: 'never',
                                        render: rowData => subSkillsData.indexOf(rowData) + 1
                                    },
                                    {
                                        title: 'Country',
                                        editable: 'never',
                                        render: rowData => subSkillsData.indexOf(rowData) + 1
                                    },
                                    {
                                        title: 'Recharge Value',
                                        editable: 'never',
                                        render: rowData => subSkillsData.indexOf(rowData) + 1
                                    },
                                    {
                                        title: 'Discount',
                                        editable: 'never',
                                        render: rowData => subSkillsData.indexOf(rowData) + 1
                                    },
                                    {
                                        title: 'Gift/Coupon',
                                        editable: 'never',
                                        render: rowData => subSkillsData.indexOf(rowData) + 1
                                    },
                                    {
                                        title: 'Sub Total',
                                        editable: 'never',
                                        render: rowData => subSkillsData.indexOf(rowData) + 1
                                    },
                                    {
                                        title: 'Tax @18%',
                                        editable: 'never',
                                        render: rowData => subSkillsData.indexOf(rowData) + 1
                                    },
                                  
                                    {
                                        title: 'Total Record',
                                        editable: 'never',
                                        render: rowData => subSkillsData.indexOf(rowData) + 1
                                    },

                                    // Add more columns as needed
                                ]}
                                options={{
                                    sorting: true,
                                    search: true,
                                    searchFieldAlignment: "right",
                                    filtering: true,
                                    paging: true,
                                    pageSize: 5,
                                    paginationType: "stepped",
                                    showFirstLastPageButtons: true,
                                    paginationPosition: "bottom",
                                    exportButton: false,
                                    exportAllData: false,
                                    exportFileName: "Category data",
                                    addRowPosition: "first",
                                    actionsColumnIndex: -1,
                                    selection: false,
                                    showSelectAllCheckbox: false,
                                }}
                                actions={[
                                    {
                                        icon: 'edit',
                                        tooltip: 'Edit Skill',
                                     
                                    },
                                ]}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

export default ReceiptSummary;