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
  delete_expertise,
  get_expertise,
  update_expertise,
} from "../../utils/Constants.js";
import { getData, postData } from "../../utils/FetchNodeServices.js";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { CloseRounded } from "@mui/icons-material";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import * as ExpertiesActions from '../../redux/Actions/expertiesActions.js'

const DisplayExpertise = ({dispatch, expertiesData}) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [expertiseId, setExpertiseId] = useState();
  const [expertise, setExpertise] = useState();

  const [error, setError] = useState({});

  useEffect(function () {
    if(!expertiesData){
      dispatch(ExpertiesActions.getExpertiesData())
    }

  }, []);


  const handleOpen = (rowData) => {
    setOpen(true);
    setExpertiseId(rowData._id);
    setExpertise(rowData.expertise);
  };

  const handleClose = () => {
    setExpertiseId("");
    setExpertise("");
    setOpen(false);
  };

  const validation = () => {
    var isValid = true;
    if (!expertise) {
      handleError("expertise", "Please input expertise");
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
        expertiseId: expertiseId,
        expertise: expertise,
      }
      dispatch(ExpertiesActions.updateExperties(data))
      handleClose()
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.box}>
        {expertiesData && displayTable()}
        {editModal()}
      </div>
    </div>
  );
  function displayTable() {
    return (
      <Grid container spacing={1}>
        <Grid item lg={12} sm={12} md={12} xs={12}>
          <MaterialTable
            title="Expertise"
            data={expertiesData}
            columns={[
              {
                title: "S.No",
                editable: "never",
                render: (rowData) => expertiesData.indexOf(rowData) + 1,
              },
              { title: "Expertise", field: "expertise" },
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
                onClick: (event, rowData) => dispatch(ExpertiesActions.deleteExperties({experties: rowData?.expertise, experties_id: rowData?._id })),
              },
              {
                icon: () => (
                  <div className={classes.addButton}>
                    <AddCircleRounded />
                    <div className={classes.addButtontext}>Add New</div>
                  </div>
                ),
                tooltip: "Add MainExperties",
                isFreeAction: true,
                onClick: () => navigate("/AddExpertise"),
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
              <div className={classes.heading}>Edit Expertise</div>
            </div>
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <TextField
              label="Enter Exprtise"
              error={error.expertise ? true : false}
              helperText={error.expertise}
              value={expertise}
              onFocus={() => handleError("expertise", null)}
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

const mapStateToProps = state =>({
  expertiesData: state.experites.expertiesData
})

const mapDispatchToProps = dispatch =>({dispatch})

export default connect(mapStateToProps, mapDispatchToProps)(DisplayExpertise);
