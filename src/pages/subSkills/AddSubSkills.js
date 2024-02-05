import React, { useState, useEffect } from "react";
import { useStyles } from "../../assets/styles.js";
import {
  Avatar,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import DvrIcon from "@mui/icons-material/Dvr";
import { add_subSkill, get_skills } from "../../utils/Constants.js";
import { getData, postData } from "../../utils/FetchNodeServices.js";
import Swal from "sweetalert2";
import { Colors } from "../../assets/styles.js";
import { useNavigate } from "react-router-dom";
import logo_icon from "../../assets/images/logo_icon.png";
import { connect } from "react-redux";
import * as SkillActions from "../../redux/Actions/skillsActions.js";
import Loader from "../../Components/loading/Loader.js";

const AddSubSkills = ({ dispatch, skillsData }) => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [skill_id, setSkill_id] = useState("");
  const [subSkill, setSubSkill] = useState("");
  const [error, setError] = useState({});

  useEffect(function () {
    if (!skillsData) {
      dispatch(SkillActions.getSkillData());
    }
  }, []);

  const handleError = (input, value) => {
    setError((prev) => ({ ...prev, [input]: value }));
  };

  const validation = () => {
    var isValid = true;
    if (!skill_id) {
      handleError("skill_id", "Please Select Skill");
      isValid = false;
    }
    if (!subSkill) {
      handleError("subSkill", "Please input Skill");
      isValid = false;
    }
    return isValid;
  };

  const handleSubmit = async () => {
    if (validation()) {
      const data = {
        skillId: skill_id,
        subskill: subSkill,
      };
      dispatch(SkillActions.createSubSkill(data));
      handleReset()
    }
  };

  const handleReset = () => {
    setSkill_id(null);
    setSubSkill("");
  };

  return (
    <div className={classes.container}>
      <Loader />
      <div className={classes.box}>
        <Grid container spacing={2}>
          <Grid item lg={12} sm={12} md={12} xs={12}>
            <div className={classes.headingContainer}>
              <div className={classes.heading}>Add Sub Skill</div>
              <div
                onClick={() => navigate("/displaySubSkills")}
                className={classes.addButton}
              >
                <DvrIcon />
                <div className={classes.addButtontext}>Display Sub Skills</div>
              </div>
            </div>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextField
              label="Enter Sub Skill"
              error={error.subSkill ? true : false}
              helperText={error.subSkill}
              value={subSkill}
              onFocus={() => handleError("subSkill", null)}
              onChange={(event) => setSubSkill(event.target.value)}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Skill</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Skill"
                value={skill_id}
                onFocus={() => handleError("skill_id", null)}
                onChange={(e) => setSkill_id(e.target.value)}
                error={error.skill_id ? true : false}
              >
                <MenuItem disabled value={null}>
                  -Select Skill-
                </MenuItem>
                {skillsData && fillSkillList()}
              </Select>
            </FormControl>
            <div className={classes.errorstyles}>{error.skill_id}</div>
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

  function fillSkillList() {
    return skillsData.map((item) => {
      return <MenuItem value={item._id}>{item.skill}</MenuItem>;
    });
  }
};

const mapStateToProps = (state) => ({
  subSkillData: state.skills.subSkillData,
  skillsData: state.skills.skillsData,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(AddSubSkills);
