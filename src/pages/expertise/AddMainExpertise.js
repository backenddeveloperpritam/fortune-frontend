import React, { useState } from "react";
import { useStyles } from "../../assets/styles.js";
import { Grid, TextField, MenuItem } from "@mui/material";
import DvrIcon from "@mui/icons-material/Dvr";
import { useNavigate } from "react-router-dom";
import logo_icon from "../../assets/images/logo_icon.png";
import { add_main_expertise } from "../../utils/Constants.js";
import Swal from "sweetalert2";
import { postData } from "../../utils/FetchNodeServices.js";
import * as ExpertiesActions from "../../redux/Actions/expertiesActions.js";
import { connect } from "react-redux";

const AddMainExpertise = ({ dispatch }) => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [mainExpertise, setMainExpertise] = useState("");
  const [error, setError] = useState({});

  const handleError = (input, value) => {
    setError((prev) => ({ ...prev, [input]: value }));
  };

  const validation = () => {
    let isValid = true;
    if (!mainExpertise.trim()) {
      handleError("mainExpertise", "Main Expertise is required");
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async () => {
    if (validation()) {
      dispatch(
        ExpertiesActions.createMainExperties({ mainExpertise: mainExpertise })
      );
      handleReset();
    }
  };

  const handleReset = () => {
    setMainExpertise("");
    setError({});
  };

  return (
    <div className={classes.container}>
      <div className={classes.box}>
        <Grid container spacing={2}>
          <Grid item lg={12} sm={12} md={12} xs={12}>
            <div className={classes.headingContainer}>
              <div className={classes.heading}>All Main Expertise</div>
              <div
                onClick={() => navigate("/displayMainExpertise")}
                className={classes.addButton}
              >
                <DvrIcon />
                <div className={classes.addButtontext}>Add Expertise</div>
              </div>
            </div>
          </Grid>
          <Grid item lg={12} md={6} sm={12} xs={12}>
            <TextField
              label="Enter Main Expertise"
              error={Boolean(error.title)}
              helperText={error.title}
              value={mainExpertise}
              onFocus={() => handleError("mainExpertise", null)}
              onChange={(event) => setMainExpertise(event.target.value)}
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

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(AddMainExpertise);
