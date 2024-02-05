import React, { useState } from "react";
import { useStyles } from "../../assets/styles.js";
import { Avatar, Grid, IconButton, TextField, Button } from "@mui/material";
import DvrIcon from "@mui/icons-material/Dvr";
import { add_skill, get_skills } from "../../utils/Constants.js";
import { postData } from "../../utils/FetchNodeServices.js";
import Swal from "sweetalert2";
import { Colors } from "../../assets/styles.js";
import { useNavigate } from "react-router-dom";
import logo_icon from "../../assets/images/logo_icon.png";
import { connect } from "react-redux";
import * as SkillActions from '../../redux/Actions/skillsActions.js'

const AddSkills = ({dispatch}) => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [skill, setSkill] = useState("");
  const [icon, setIcon] = useState({ file: logo_icon, bytes: "" });
  const [error, setError] = useState({});

  const handleError = (input, value) => {
    setError((prev) => ({ ...prev, [input]: value }));
  };

  const handleIcon = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setIcon({
        file: URL.createObjectURL(e.target.files[0]),
        bytes: e.target.files[0],
      });
      handleError("icon", null);
    }
  };

  const validation = () => {
    var isValid = true;
    if (!skill) {
      handleError("skill", "Please input Skill");
      isValid = false;
    }
    if (!icon.bytes) {
      handleError("icon", "Please Select icon");
      isValid = false;
    }
    return isValid;
  };

  const handleSubmit = async () => {
    if (validation()) {
      var formData = new FormData();
      formData.append("skill", skill);
      formData.append("image", icon.bytes);
      console.log(formData)

      dispatch(SkillActions.createSkill(formData))
 
    }
  };

  const handleReset = () => {
    setSkill("");
    setIcon({ file: logo_icon, bytes: "" });
  };

  // console.log(skill)
  return (
    <div className={classes.container}>
      <div className={classes.box}>
        <Grid container spacing={2}>
          <Grid item lg={12} sm={12} md={12} xs={12}>
            <div className={classes.headingContainer}>
              <div className={classes.heading}>Add Skill</div>
              <div
                onClick={() => navigate("/displaySkills")}
                className={classes.addButton}
              >
                <DvrIcon />
                <div className={classes.addButtontext}>Display Skills</div>
              </div>
            </div>
          </Grid>

          <Grid item lg={12} sm={12} md={12} xs={12}>
            <TextField
              label="Enter Skill"
              error={error.skill ? true : false}
              helperText={error.skill}
              value={skill}
              onFocus={() => handleError("skill", null)}
              onChange={(event) => setSkill(event.target.value)}
              variant="outlined"
              fullWidth
            />
            {/* <div className={classes.errorstyles}>{error.skill}</div> */}
          </Grid>
          <Grid
            item
            lg={2}
            sm={6}
            md={6}
            xs={6}
            className={classes.uploadContainer}
          >
            <Grid
              component="label"
              onClick={handleIcon}
              className={classes.uploadImageButton}
            >
              Upload Picutre
              <input
                onChange={handleIcon}
                hidden
                accept="image/*"
                type="file"
              />
            </Grid>
            <div className={classes.errorstyles}>{error.icon}</div>
          </Grid>
          <Grid item lg={10} sm={6} md={6} xs={6}>
            <Avatar
              color={Colors.primaryDark}
              src={icon.file}
              style={{ width: 56, height: 56 }}
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

const mapDispatchToProps = dispatch =>({dispatch})

export default connect(null, mapDispatchToProps)(AddSkills);
