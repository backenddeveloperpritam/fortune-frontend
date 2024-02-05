import React, { useState } from "react";
import { useStyles } from '../../assets/styles.js';
import { Grid, TextField, MenuItem, FormControl, InputLabel, Select } from "@mui/material";
import DvrIcon from '@mui/icons-material/Dvr';
import { add_recharge_plans } from "../../utils/Constants.js";
import { postData } from '../../utils/FetchNodeServices.js';
import Swal from "sweetalert2";
import "react-datepicker/dist/react-datepicker.css"; // Add this line
import { useNavigate } from "react-router-dom";
import Loader from '../../Components/loading/Loader.js'


const AddRechargePlans = () => {

    const navigate = useNavigate();
    const classes = useStyles();
    const [rechargeAmount, setRechargeAmount] = useState('');
    const [extraPercent, setExtraPercent] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [status, setStatus] = useState('');
    const [error, setError] = useState({});
    const [isLoading, setIsLoading] = useState(false)

    const handleError = (input, value) => {
        setError((prev) => ({ ...prev, [input]: value }));
    };

    const validation = () => {
        let isValid = true;
        if (!rechargeAmount) {
            handleError('rechargeAmount', 'Please enter Recharge Amount');
            isValid = false;
        }
        if (!extraPercent) {
            handleError('extraPercent', 'Please enter Extra Percent');
            isValid = false;
        }
        if (!startDate) {
            handleError('startDate', 'Please select Start Date');
            isValid = false;
        }
        if (!endDate) {
            handleError('endDate', 'Please select End Date');
            isValid = false;
        }
        if (!status) {
            handleError('status', 'Please select Status');
            isValid = false;
        }

        return isValid;
    };

    const handleSubmit = async () => {
        if (validation()) {
            setIsLoading(true)
            var body = {
                "recharge_plan_amount": rechargeAmount,
                "recharge_plan_extra_percent": extraPercent,
                "recharge_start_date": startDate,
                "recharge_end_date": endDate,
                "recharge_status": status
            }
            var response = await postData(add_recharge_plans, body);
            setIsLoading(false)
            console.log(response)
            if (response.success) {
                Swal.fire({
                    icon: 'success',
                    title: "Recharge Plan Added Successfully",
                    showConfirmButton: false,
                    timer: 2000
                });
                handleReset();
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: "Server Error",
                    text: "Recharge Submission Failed",
                    showConfirmButton: false,
                    timer: 2000
                });
            }
        }
    };

    const handleReset = () => {
        setRechargeAmount('');
        setExtraPercent('');
        setStartDate('');
        setEndDate('')
        setStatus('');
        setError({});
    };

    return (
        <div className={classes.container}>
            <Loader isVisible={isLoading} />
            <div className={classes.box}>
                <Grid container spacing={2}>
                    <Grid item lg={12} sm={12} md={12} xs={12}>
                        <div className={classes.headingContainer}>
                            <div className={classes.heading} >
                                Add Recharge Plan
                            </div>
                            <div onClick={() => navigate("/displayRechargePlan")} className={classes.addButton}>
                                <DvrIcon />
                                <div className={classes.addButtontext}>Display Plans</div>
                            </div>
                        </div>
                    </Grid>

                    <Grid item lg={6} sm={12} md={12} xs={12} >
                        <TextField
                            label="Enter Recharge Amount"
                            type="number"
                            error={Boolean(error.rechargeAmount)}
                            helperText={error.rechargeAmount}
                            value={rechargeAmount}
                            onFocus={() => handleError('rechargeAmount', null)}
                            onChange={(event) => setRechargeAmount(event.target.value)}
                            variant='outlined' fullWidth />
                    </Grid>
                    <Grid item lg={6} sm={12} md={12} xs={12} >
                        <TextField
                            label="Enter Extra Percent"
                            type="number"
                            error={Boolean(error.extraPercent)}
                            helperText={error.extraPercent}
                            value={extraPercent}
                            onFocus={() => handleError('extraPercent', null)}
                            onChange={(event) => setExtraPercent(event.target.value)}
                            variant='outlined' fullWidth />
                    </Grid>
                    <Grid item lg={6} sm={12} md={12} xs={12} >
                        <label>Start Date</label>
                        <TextField
                            type="date"
                            error={Boolean(error.startDate)}
                            helperText={error.startDate}
                            value={startDate}
                            onFocus={() => handleError('startDate', null)}
                            onChange={(event) => setStartDate(event.target.value)}
                            variant='outlined'
                            fullWidth
                        />
                    </Grid>
                    <Grid item lg={6} sm={12} md={12} xs={12} >
                        <label>End Date</label>
                        <TextField
                            type="date"
                            error={Boolean(error.endDate)}
                            helperText={error.endDate}
                            value={endDate}
                            onFocus={() => handleError('endDate', null)}
                            onChange={(event) => setEndDate(event.target.value)}
                            variant='outlined'
                            fullWidth
                        />
                    </Grid>
                    <Grid item lg={6} sm={12} md={12} xs={12} >
                        <FormControl fullWidth>
                            <InputLabel id="select-label">Select Status</InputLabel>
                            <Select
                                label="Select Status"
                                labelId="select-label"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                variant="outlined"
                                error={error.status ? true : false}
                                fullWidth
                            >
                                <MenuItem value="null" disabled>Select Status</MenuItem>
                                <MenuItem value="Active">Active</MenuItem>
                                <MenuItem value="Inactive">Inactive</MenuItem>
                            </Select>
                            {error.status && (
                                <div className={classes.errorstyles}>{error.status}</div>
                            )}
                        </FormControl>
                    </Grid>
                    <Grid item lg={6} sm={12} md={12} xs={12} ></Grid>
                    <Grid item lg={6} sm={6} md={6} xs={6} >
                        <div onClick={handleSubmit} className={classes.submitbutton}>
                            Submit
                        </div>
                    </Grid>
                    <Grid item lg={6} sm={6} md={6} xs={6} >
                        <div onClick={handleReset} className={classes.denyButton}>
                            Reset
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

export default AddRechargePlans;