import React, { useState } from "react";
import { useStyles } from '../../assets/styles.js';
import {  Grid, TextField } from "@mui/material";
import DvrIcon from '@mui/icons-material/Dvr';
import { useNavigate } from "react-router-dom";
import { add_expertise, } from "../../utils/Constants.js";
import { postData } from '../../utils/FetchNodeServices.js';
import Swal from "sweetalert2";
import { connect } from "react-redux";
import * as ExpertiesActions from '../../redux/Actions/expertiesActions.js'


const AddExpertise = ({dispatch}) => {
    var classes = useStyles();
    const navigate = useNavigate();
    const [expertise, setExpertise] = useState("");
    const [error, setError] = useState({});

    const handleError = (input, value) => {
        setError((prev) => ({ ...prev, [input]: value }));
    };

    const validation = () => {
        let isValid = true;
        if (!expertise.trim()) {
          handleError("expertise", "Expertise is required");
          isValid = false;
        }

        return isValid;
    };

    
    const handleSubmit = async () => {
        if (validation()) {

          dispatch(ExpertiesActions.createExperties({expertise: expertise}))

            // var response = await postData(add_expertise,{expertise:expertise})
            // if (response.success) {
            //     Swal.fire({
            //         icon:"success",
            //       title: "Expertise Added Successfull",
            //       showConfirmButton: false,
            //       timer: 2000,
            //     });
            //     handleReset()
            // }
            // else {
            //     Swal.fire({
            //       icon: "error",
            //       title: "Server Error",
            //       text: "Expertise Submission Failed",
            //       showConfirmButton: false,
            //       timer: 2000,
            //     });
            // }
        }
    }

    
    const handleReset = () => {
        setExpertise("");
        setError({});
    };

    return (
      <div className={classes.container}>
        <div className={classes.box}>
          <Grid container spacing={2}>
            <Grid item lg={12} sm={12} md={12} xs={12}>
              <div className={classes.headingContainer}>
                <div className={classes.heading}>Add Expertise</div>
                <div
                  onClick={() => navigate("/DisplayExpertise")}
                  className={classes.addButton}
                >
                  <DvrIcon />
                  <div className={classes.addButtontext}>Display Expertise</div>
                </div>
              </div>
            </Grid>
            <Grid item lg={12} md={6} sm={12} xs={12}>
              <TextField
                label="Experties"
                error={Boolean(error.experties)}
                helperText={error.experties}
                value={expertise}
                onFocus={() => handleError("experties", null)}
                onChange={(event) => setExpertise(event.target.value)}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item lg={6} sm={6} md={6} xs={6}>
              <div onClick={handleSubmit} className={classes.submitbutton}>
                Submit
              </div>
            </Grid>
            <Grid item lg={6} sm={6} md={6} xs={6}>
              <div onClick={handleReset} className={classes.denyButton}>
                Reset
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    );
};

const mapStateToProps = state =>({

})

const mapDispatchToProps = dispatch =>({dispatch})

export default connect(mapStateToProps, mapDispatchToProps)(AddExpertise);