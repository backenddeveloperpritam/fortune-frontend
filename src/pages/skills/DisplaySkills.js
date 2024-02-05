import React, { useEffect, useState } from "react";
import { Colors, propStyles, useStyles } from "../../assets/styles.js";
import { Avatar, Grid, Button, TextField } from "@mui/material";
import { AddCircleRounded, Close } from "@mui/icons-material";
import MaterialTable from "material-table";
import logo_icon from "../../assets/images/logo_icon.png";
import {
  base_url,
  delete_skill,
  get_skills,
  update_skill,
} from "../../utils/Constants.js";
import {
  deleteData,
  getData,
  postData,
  putData,
} from "../../utils/FetchNodeServices.js";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { CloseRounded } from "@mui/icons-material";
import Swal from "sweetalert2";
import Loader from "../../Components/loading/Loader.js";
import { connect } from "react-redux";
import * as SkillActions from "../../redux/Actions/skillsActions.js";

const DisplaySkills = ({ dispatch, skillsData }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [skill_id, setSkill_id] = useState("");
  const [skill, setSkill] = useState("");
  const [icon, setIcon] = useState({ file: "", bytes: "" });
  const [error, setError] = useState({});

  useEffect(function () {
    dispatch(SkillActions.getSkillData());
  }, []);

  const handleOpen = (rowData) => {
    setSkill_id(rowData._id);
    setSkill(rowData.skill);
    setIcon({ file: base_url + rowData.image, bytes: rowData.image });
    setOpen(true);
  };

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
      formData.append("skillId", skill_id);
      formData.append("image", icon.bytes);

      dispatch(SkillActions.updateSkill(formData));
      setOpen(false);
    }
  };

  const handleClose = () => {
    setSkill_id("");
    setSkill("");
    setIcon({ file: logo_icon, bytes: "" });
    setOpen(false);
  };

  return (
    <div className={classes.container}>
      <Loader />
      <div className={classes.box}>
        {skillsData && displayTable()}
        {editModal()}
      </div>
    </div>
  );

  function displayTable() {
    return (
      <Grid container spacing={1}>
        <Grid item lg={12} sm={12} md={12} xs={12}>
          <MaterialTable
            title="Skills"
            data={skillsData}
            columns={[
              {
                title: "S.No",
                editable: "never",
                render: (rowData) => skillsData.indexOf(rowData) + 1,
              },
              { title: "Skill", field: "skill" },
              {
                title: "Icon",
                field: "icon",
                render: (rowData) => (
                  <Avatar
                    src={base_url + rowData.image}
                    style={{ width: 50, height: 50 }}
                    variant="rounded"
                  />
                ),
              },
            ]}
            options={propStyles.tableStyles}
            style={{ fontSize: "1.4rem" }}
            actions={[
              {
                icon: "edit",
                tooltip: "Edit Skill",
                onClick: (event, rowData) => handleOpen(rowData),
              },
              {
                icon: "delete",
                tooltip: "Delete Skill",
                onClick: (event, rowData) =>
                  dispatch(
                    SkillActions.deleteSkill({
                      skill: rowData?.skill,
                      skill_id: rowData?._id,
                    })
                  ),
              },
              {
                icon: () => (
                  <div className={classes.addButton}>
                    <AddCircleRounded />
                    <div className={classes.addButtontext}>Add New</div>
                  </div>
                ),
                tooltip: "Add Skill",
                isFreeAction: true,
                onClick: () => navigate("/addSkills"),
              },
            ]}
          />
        </Grid>
      </Grid>
    );
  }

  function editModal() {
    const showEditForm = () => {
      return (
        <Grid container spacing={2}>
          <Grid item lg={12} sm={12} md={12} xs={12}>
            <div className={classes.headingContainer}>
              <div className={classes.heading}>Edit Skill</div>
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
          </Grid>
          <Grid
            item
            lg={6}
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
          </Grid>
          <Grid item lg={6} sm={6} md={6} xs={6}>
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
            <div onClick={handleClose} className={classes.denyButton}>
              Cancel
            </div>
          </Grid>
        </Grid>
      );
    };
    return (
      <div>
        <Dialog open={open}>
          <DialogContent>{showEditForm()}</DialogContent>
        </Dialog>
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  skillsData: state.skills.skillsData,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(DisplaySkills);
