import React, { useState } from "react";
import { useStyles } from "../../assets/styles.js";
import MaterialTable from 'material-table'; // Import MaterialTable

import {
    Grid,
    TextField,
    DateField

} from "@mui/material";
import DvrIcon from "@mui/icons-material/Dvr";
import { useNavigate } from "react-router-dom";

import logo_icon from "../../assets/images/logo_icon.png";

export const SaleSummary = () => {
    var classes = useStyles();
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [selectedDate, setSelectedDate] = useState('');
    const [status, setStatus] = useState("");
    const [shortBio, setShortBio] = useState("");
    const [working, setworking] = useState("");
    const [Submit, setsubmit] = useState("");
    const [Reset, setreset] = useState("");

    const [profilePhoto, setprofilePhoto] = useState({
        file: logo_icon,
        bytes: "",
    });
    const [bankProof, setbankProof] = useState({
        file: logo_icon,
        bytes: "",
    });
    const [idProof, setidProof] = useState({
        file: logo_icon,
        bytes: "",
    });
    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    };

    const handleProfile = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setprofilePhoto({
                file: URL.createObjectURL(e.target.files[0]),
                bytes: e.target.files[0],
            });
            // handleError("profilePhoto", null);
        }
    };
    const handlebankProof = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setbankProof({
                file: URL.createObjectURL(e.target.files[0]),
                bytes: e.target.files[0],
            });
        }
    };
    const handleidProof = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setidProof({
                file: URL.createObjectURL(e.target.files[0]),
                bytes: e.target.files[0],
            });
        }
    };
    const handleOpen = (rowData) => {
        // Implement the logic to handle the opening of a record
        console.log("Opening record:", rowData);
        // You can add more logic here based on what you want to achieve
    };
    // Placeholder array for subSkillsData
    const subSkillsData = [
        // Define your data here
    ];

    return (
        <div className={classes.container}>
            <div className={classes.box}>
                <Grid container spacing={2}>
                    <Grid item lg={3} sm={12} md={12} xs={12}>
                        <div className={classes.headingContainer}>
                            <div className={classes.heading}>GST Sale Summary</div>
                        </div>
                    </Grid>
                    <Grid item lg={12} sm={12} md={12} xs={12}>
                        <div className={classes.headingContainer}>
                            <Grid item lg={4} sm={12} md={12} xs={12}>
                                <label>Frome Date</label>
                                <input
                                    type="date"
                                    id="fromDateInput"
                                    name="fromDateInput"
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                    style={{ width: '100%', height: '50px' }}
                                />
                            </Grid>
                            <Grid item lg={4} sm={12} md={12} xs={12}>
                                <label>End Date</label>
                                <input
                                    type="date"
                                    id="endDateInput"
                                    name="endDateInput"
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                    style={{ width: '100%', height: '50px' }}
                                />
                            </Grid>
                            <Grid item lg={2} sm={12} md={12} xs={12}>
                                <div onClick={Submit} className={classes.submitbutton}>
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
                                        title: 'Invoice Date',
                                        editable: 'never',
                                        render: rowData => subSkillsData.indexOf(rowData) + 1
                                    },
                                    {
                                        title: 'Invoice id',
                                        editable: 'never',
                                        render: rowData => subSkillsData.indexOf(rowData) + 1
                                    },
                                    {
                                        title: 'Txn id',
                                        editable: 'never',
                                        render: rowData => subSkillsData.indexOf(rowData) + 1
                                    },
                                    {
                                        title: 'Txn Type Call/Chat/Report',
                                        editable: 'never',
                                        render: rowData => subSkillsData.indexOf(rowData) + 1
                                    },
                                    {
                                        title: 'Duretion',
                                        editable: 'never',
                                        render: rowData => subSkillsData.indexOf(rowData) + 1
                                    },
                                    {
                                        title: 'Customer Name',
                                        editable: 'never',
                                        render: rowData => subSkillsData.indexOf(rowData) + 1
                                    },
                                    {
                                        title: 'Country',
                                        editable: 'never',
                                        render: rowData => subSkillsData.indexOf(rowData) + 1
                                    },
                                    {
                                        title: 'Sales',
                                        editable: 'never',
                                        render: rowData => subSkillsData.indexOf(rowData) + 1
                                    },
                                    {
                                        title: 'Discount',
                                        editable: 'never',
                                        render: rowData => subSkillsData.indexOf(rowData) + 1
                                    },
                                    {
                                        title: 'Sale Total',
                                        editable: 'never',
                                        render: rowData => subSkillsData.indexOf(rowData) + 1
                                    },
                                    {
                                        title: 'IGST On Sales @18%',
                                        editable: 'never',
                                        render: rowData => subSkillsData.indexOf(rowData) + 1
                                    },
                                    {
                                        title: 'Total Sales',
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
                                        onClick: (event, rowData) => handleOpen(rowData),
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

export default SaleSummary;