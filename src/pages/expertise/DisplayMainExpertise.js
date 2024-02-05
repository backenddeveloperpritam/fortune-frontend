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
  delete_main_expertise,
  get_main_expertise,
  update_main_expertise,
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
import { connect } from "react-redux";
import * as ExpertiesActions from '../../redux/Actions/expertiesActions.js'

const DisplayMainExpertise = ({mainExpertiesData, dispatch}) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [mainExpertiseData, setMainExpertiseData] = useState();
  const [mainExpertise, setMainExpertise] = useState();
  const [open, setOpen] = useState(false);
  const [mainExpertiseId, setMainExpertiseId] = useState("");

  const [error, setError] = useState({});

  useEffect(function () {
    dispatch(ExpertiesActions.getMainExpertiesData())
  }, []);

  const fetchAllMainExperties = async () => {
    var response = await getData(get_main_expertise);
    setMainExpertiseData(response.mainExpertise);
  };

  const handleOpen = (rowData) => {
    setOpen(true);
    setMainExpertiseId(rowData._id);
    setMainExpertise(rowData.mainExpertise);
  };

  const handleClose = () => {
    setMainExpertiseId("");
    setMainExpertise("");
    setOpen(false);
  };

  const validation = () => {
    var isValid = true;
    if (!mainExpertise) {
      handleError("mainExpertise", "Please input Main expertise");
      isValid = false;
    }
    return isValid;
  };

  const handleError = (input, value) => {
    setError((prev) => ({ ...prev, [input]: value }));
  };

  const handleSubmit = async () => {
    if (validation()) {
      const data = {
        mainExpertiseId: mainExpertiseId,
        mainExpertise: mainExpertise,
      }
      dispatch(ExpertiesActions.updateMainExperties(data))
      handleClose();
    }
  };

  const handleDelete = (rowData) => {
    Swal.fire({
      title: "Are you sure to Delete this",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: Colors.primaryLight,
      cancelButtonColor: Colors.red_a,
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        confirmDelete(rowData);
      }
    });
  };

  const confirmDelete = async (rowData) => {
    var response = await postData(delete_main_expertise, {
      mainExpertiseId: rowData._id,
    });
    if (response.success) {
      Swal.fire({
        title: "Deleted!",
        text: "Main Expertise has been deleted.",
        icon: "success",
      });
      fetchAllMainExperties();
    } else {
      Swal.fire({
        title: "Failed",
        text: "Failed to Delete the Main Expertise!",
        icon: "error",
      });
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.box}>
        {mainExpertiesData && displayTable()}
        {editModal()}
      </div>
    </div>
  );
  function displayTable() {
    return (
      <Grid container spacing={1}>
        <Grid item lg={12} sm={12} md={12} xs={12}>
          <MaterialTable
            title="Main Expertise"
            data={mainExpertiesData}
            columns={[
              {
                title: "S.No",
                editable: "never",
                render: (rowData) => mainExpertiesData.indexOf(rowData) + 1,
              },
              { title: "Main Expertise", field: "mainExpertise" },
            ]}
            options={propStyles.tableStyles}
            style={{ fontSize: "1.4rem" }}
            actions={[
              {
                icon: "edit",
                tooltip: "Edit Main Expertise",
                onClick: (event, rowData) => handleOpen(rowData),
              },
              {
                icon: "delete",
                tooltip: "Delete Main Expertise",
                onClick: (event, rowData) => dispatch(ExpertiesActions.deleteMainExperties({main_experties_id: rowData?._id, main_experties: rowData?.mainExpertise})),
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
                onClick: () => navigate("/AddMainExpertise"),
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
              <div className={classes.heading}>Edit Main Expertise</div>
              <div onClick={handleClose} className={classes.closeButton}>
                <CloseRounded />
              </div>
            </div>
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <TextField
              label="Enter Exprtise"
              error={error.mainExpertise ? true : false}
              helperText={error.mainExpertise}
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
            <div onClick={handleClose} className={classes.denyButton}>
              Reset
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

const mapStateToProps = state =>({
  mainExpertiesData: state.experites.mainExpertiesData
})

const mapDispatchToProps = dispatch =>({dispatch})

export default connect(mapStateToProps, mapDispatchToProps)(DisplayMainExpertise); 
