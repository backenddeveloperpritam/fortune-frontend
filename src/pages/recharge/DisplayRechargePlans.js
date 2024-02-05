import React, { useEffect, useState } from "react";
import { useStyles } from '../../assets/styles.js'
import { Grid, } from "@mui/material";
import { AddCircleRounded, Close } from '@mui/icons-material';
import MaterialTable from "material-table";
import { getData } from '../../utils/FetchNodeServices.js'
import { useNavigate } from "react-router-dom";
import { get_recharge_plans } from "../../utils/Constants.js";

const DisplayRechargePlans = () => {
    const classes = useStyles()
    const navigate = useNavigate()

    const [rechargePlansData, setRechargePlansData] = useState([])

    useEffect(function () {
        fetchAllrechargePlans()
    }, [])

    const fetchAllrechargePlans = async () => {
        var response = await getData(get_recharge_plans)
        setRechargePlansData(response.allRechargePlan)
    }

    return (
        <div className={classes.container}>
            <div className={classes.box}>
                {displayTable()}
            </div>
        </div >
    );


    function displayTable() {
        return (
            <Grid container spacing={1}>
                <Grid item lg={12} sm={12} md={12} xs={12}>
                    <MaterialTable
                        style={{ boxShadow: '0' }}
                        title="Recharge Plans"
                        data={rechargePlansData}
                        columns={[
                            {
                                title: 'S.No',
                                editable: 'never',
                                render: rowData => rechargePlansData.indexOf(rowData) + 1
                            },
                            { title: 'Amount', field: 'recharge_plan_amount' },
                            { title: 'Extra Percentage Amount', field: 'recharge_plan_extra_percent' },
                            { title: 'Start Date', field: 'recharge_start_date' },
                            { title: 'End Date', field: 'recharge_end_date' },
                            { title: 'Status', field: 'recharge_status' }
                        ]}
                        options={{
                            sorting: true,
                            search: true,
                            searchFieldAlignment: "right",
                            filtering: true,
                            paging: true,
                            // pageSizeOptions: createArrayWithBreakdowns(editable?.length, 5),
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
                                icon: () => (
                                    <div className={classes.addButton}
                                    >
                                        <AddCircleRounded />
                                        <div className={classes.addButtontext}>Add New</div>
                                    </div>
                                ),
                                tooltip: 'Add Skill',
                                isFreeAction: true,
                                onClick: () => navigate("/addRechargePlan")
                            }
                        ]}
                    />
                </Grid>
            </Grid>
        )
    }

}

export default DisplayRechargePlans;
