import React, { useEffect, useState } from "react";
import { propStyles, useStyles } from "../../assets/styles.js";
import {
  Avatar,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { AddCircleRounded } from "@mui/icons-material";
import MaterialTable from "material-table";
import { Colors } from "../../assets/styles.js";
import logo_icon from "../../assets/images/logo_icon.png";
import {
  delete_subSkill,
  get_skills,
  get_subSkill,
  update_subSkill,
} from "../../utils/Constants.js";
import {
  deleteData,
  getData,
  postData,
} from "../../utils/FetchNodeServices.js";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { CloseRounded } from "@mui/icons-material";
import Swal from "sweetalert2";
import * as SkillActions from "../../redux/Actions/skillsActions.js";
import { connect } from "react-redux";

const DisplaySubSkills = ({ dispatch, subSkillData, skillsData }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [subSkillsData, setSubSkillsData] = useState();
  const [open, setOpen] = useState(false);
  const [subSkill_id, setSubSkill_id] = useState("");
  const [skill_id, setSkill_id] = useState("");
  const [subSkill, setSubSkill] = useState("");
  const [error, setError] = useState({});

  useEffect(function () {
    dispatch(SkillActions.getSubSkillData());
    dispatch(SkillActions.getSkillData());
  }, []);

  const handleOpen = (rowData) => {
    setOpen(true);
    setSubSkill_id(rowData._id);
    setSkill_id(rowData.skill._id);
    setSubSkill(rowData.subskill);
  };

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
      handleError("subSkill", "Please input Sub Skill");
      isValid = false;
    }
    return isValid;
  };

  const handleSubmit = async () => {
    if (validation()) {
      const data = {
        newSkillId: skill_id,
        subSkillId: subSkill_id,
        subskill: subSkill,
      };

      dispatch(SkillActions.updateSubSkill(data));
      handleClose();
    }
  };

  const handleClose = () => {
    setSkill_id("");
    setSubSkill_id("");
    setSubSkill("");
    setOpen(false);
  };

  const handleDelete = (rowData) => {
    Swal.fire({
      title: `Are you sure to Delete ${rowData.subskill}`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: Colors.primaryLight,
      cancelButtonColor: Colors.red,
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        confirmDelete(rowData);
      }
    });
  };

  const confirmDelete = async (rowData) => {
    console.log(rowData, "rowData");
    var response = await postData(delete_subSkill, {
      subSkillId: rowData._id,
    });
    if (response.success) {
      Swal.fire({
        title: "Deleted!",
        text: "Sub Skill has been deleted.",
        icon: "success",
      });
      // fetchAllSubSkills();
    } else {
      Swal.fire({
        title: "Failed",
        text: "Failed to Delete the Sub Skill",
        icon: "error",
      });
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.box}>
        {subSkillData && displayTable()}
        {editModal()}
      </div>
    </div>
  );

  function displayTable() {
    return (
      <Grid container spacing={1}>
        <Grid item lg={12} sm={12} md={12} xs={12}>
          <MaterialTable
            title="Sub Skills"
            data={subSkillData}
            columns={[
              {
                title: "S.No",
                editable: "never",
                render: (rowData) => subSkillData.indexOf(rowData) + 1,
              },
              { title: "Sub Skill", field: "subskill" },
              { title: "Skill", field: "skill.skill" },
            ]}
            options={propStyles.tableStyles}
            style={{ fontSize: "1.4rem" }}
            actions={[
              {
                icon: "edit",
                tooltip: "Edit Sub Skill",
                onClick: (event, rowData) => handleOpen(rowData),
              },
              {
                icon: "delete",
                tooltip: "Delete Sub Skill",
                onClick: (event, rowData) =>
                  dispatch(
                    SkillActions.deleteSubSkill({
                      subskill: rowData?.subskill,
                      sub_skill_id: rowData?._id,
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
                onClick: () => navigate("/addSubSkills"),
              },
            ]}
          />
        </Grid>
      </Grid>
    );
  }

  function editModal() {
    const fillSkillList = () => {
      return skillsData.map((item) => {
        return <MenuItem value={item._id}>{item.skill}</MenuItem>;
      });
    };
    const showEditForm = () => {
      return (
        <Grid container spacing={2}>
          <Grid item lg={12} sm={12} md={12} xs={12}>
            <div className={classes.headingContainer}>
              <div className={classes.heading}>Edit Sub Skill</div>
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
  subSkillData: state.skills.subSkillData,
  skillsData: state.skills.skillsData,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(DisplaySubSkills);
