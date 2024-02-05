import React, { useCallback, useEffect, useState } from "react";
import { propStyles, useStyles } from "../../assets/styles.js";
import { Avatar, Grid, TextField } from "@mui/material";
import { Colors } from "../../assets/styles.js";
import { AddCircleRounded } from "@mui/icons-material";
import logo_icon from "../../assets/images/logo_icon.png";
import MaterialTable from "material-table";
import { useNavigate } from "react-router-dom";
import { CloseRounded } from "@mui/icons-material";
import Swal from "sweetalert2";
import {
  get_remedy,
  delete_remedy,
  update_remedy,
  base_url,
} from "../../utils/Constants.js";
import { deleteData, getData, putData } from "../../utils/FetchNodeServices.js";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { connect } from "react-redux";
import * as RemedyActions from "../../redux/Actions/remediesActions.js";

const DisplayRemedies = ({ dispatch, remediesData }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [remedyData, setRemedyData] = useState();
  const [remedy_id, setRemedy_id] = useState("");
  const [remedy, setRemedy] = useState("");
  const [icon, setIcon] = useState({ file: logo_icon, bytes: "" });
  const [error, setError] = useState("");
  const [description, setDescription] = useState("");

  useEffect(function () {
    dispatch(RemedyActions.getRemediesData());
  }, []);

  const fetchAllRemedy = async () => {
    var response = await getData(get_remedy);
    // setRemedyData(response.remedies);
    console.log(response);
  };

  const handleOpen = (rowData) => {
    setOpen(true);
    setRemedy_id(rowData._id);
    setRemedy(rowData.remedy);
    setIcon({ file: base_url + rowData.remedyIcon, bytes: rowData.remedyIcon });
    setDescription(rowData.description);
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

  const handleError = (field, message) => {
    setError((prevError) => ({ ...prevError, [field]: message }));
  };

  const validation = () => {
    var isValid = true;
    if (!remedy) {
      handleError("remedy", "Please input Remedy");
      isValid = false;
    }
    if (!icon.bytes) {
      handleError("icon", "Please Select icon");
      isValid = false;
    }
    if (!description) {
      handleError("description", "Please input Description");
      isValid = false;
    }
    return isValid;
  };

  const handleSubmit = async () => {
    if (validation()) {
      var formData = new FormData();
      formData.append("remedyId", remedy_id);
      formData.append("remedy", remedy);
      formData.append("remedyIcon", icon.bytes);
      formData.append("description", description);

      dispatch(
        RemedyActions.updateRemedy({ data: formData, reset: handleClose })
      );
    }
  };

  const handleDelete = (rowData) => {
    Swal.fire({
      title: "Are you sure to Delete this",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        confirmDelete(rowData);
        // Swal.fire({
        //   title: "Deleted!",
        //   text: "Your file has been deleted.",
        //   icon: "success"
        // });
      }
    });
  };

  const confirmDelete = async (rowData) => {
    console.log(rowData, "rowData");
    var response = await deleteData(`${delete_remedy}/${rowData._id}`);
    console.log(response, "response");
  };

  const handleClose = useCallback(() => {
    setRemedy_id("");
    setRemedy("");
    setIcon({ file: logo_icon, bytes: "" });
    setDescription("");
    setOpen(false);
  });

  return (
    <div className={classes.container}>
      <div className={classes.box}>
        {remediesData && displayTable()}
        {editModal()}
      </div>
    </div>
  );
  function displayTable() {
    return (
      <Grid container spacing={1}>
        <Grid item lg={12} sm={12} md={12} xs={12}>
          <MaterialTable
            title="Remedies"
            data={remediesData}
            columns={[
              {
                title: "S.No",
                editable: "never",
                render: (rowData) => remediesData.indexOf(rowData) + 1,
              },
              { title: "Remedies", field: "remedy" },

              {
                title: "Icon",
                field: "remedyIcon",
                render: (rowData) => (
                  <Avatar
                    src={base_url + rowData.remedyIcon}
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
                tooltip: "Edit Sub Remedy",
                onClick: (event, rowData) => handleOpen(rowData),
              },
              {
                icon: "delete",
                tooltip: "Delete Sub Remedy",
                onClick: (event, rowData) =>
                  dispatch(
                    RemedyActions.deleteRemedy({
                      remedy_id: rowData?._id,
                      remedy: rowData?.remedy,
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
                tooltip: "Add remedy",
                isFreeAction: true,
                onClick: () => navigate("/AddRemedies"),
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
              <div className={classes.heading}>Edit Remedy</div>
              <div onClick={handleClose} className={classes.closeButton}>
                <CloseRounded />
              </div>
            </div>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <label>Remedy</label>
            <TextField
              label="Enter Remedy"
              error={error.remedy ? true : false}
              helperText={error.remedy}
              value={remedy}
              onFocus={() => handleError("remedy", null)}
              onChange={(event) => setRemedy(event.target.value)}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid
            item
            lg={3}
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
          <Grid item lg={3} sm={6} md={6} xs={6}>
            <Avatar
              color={Colors.primaryDark}
              src={icon.file}
              style={{ width: 56, height: 56 }}
            />
          </Grid>
          <Grid item lg={12} sm={6} md={6} xs={6}>
            <TextField
              id="outlined-description-static"
              label="Description"
              multiline
              rows={4}
              fullWidth
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              variant="outlined"
              error={error.description ? true : false}
              helperText={error.description}
            />
          </Grid>

          <Grid item lg={6} sm={6} md={6} xs={6}>
            <div onClick={handleSubmit} className={classes.submitbutton}>
              Submit
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
  remediesData: state.remedies.remediesData,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(DisplayRemedies);
