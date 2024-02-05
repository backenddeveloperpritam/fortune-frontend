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
  base_url,
  delete_banner,
  get_banners,
  get_skills,
  get_subSkill,
  update_banner,
  update_subSkill,
} from "../../utils/Constants.js";
import { getData, postData } from "../../utils/FetchNodeServices.js";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { CloseRounded } from "@mui/icons-material";
import Swal from "sweetalert2";
import Loader from "../../Components/loading/Loader.js";
import { connect } from "react-redux";
import * as BannerActions from "../../redux/Actions/bannerActions.js";

const DisplayAppBanner = ({ dispatch, appBannerData }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [bannerId, setBannerId] = useState("");
  const [title, setTitle] = useState("");
  const [redirectTo, setRedirectTo] = useState("");
  const [url, setUrl] = useState("");
  const [icon, setIcon] = useState({ file: logo_icon, bytes: "" });
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function () {
    dispatch(BannerActions.getAppBanners());
  }, []);

  const handleOpen = (rowData) => {
    setOpen(true);
    setBannerId(rowData._id);
    setTitle(rowData.title);
    setRedirectTo(rowData.redirectTo);
    setUrl(rowData.redirectionUrl);
    setIcon({
      file: base_url + rowData.bannerImage,
      bytes: rowData.bannerImage,
    });
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

  const handleClose = () => {
    setOpen(false);
    setBannerId("");
    setTitle("");
    setRedirectTo("");
    setIcon({ file: "", bytes: "" });
    setUrl("");
  };

  const validation = () => {
    var isValid = true;
    if (!title) {
      handleError("title", "Please input Title");
      isValid = false;
    }
    if (!url) {
      handleError("url", "Please input Url");
      isValid = false;
    }
    return isValid;
  };

  const handleSubmit = async () => {
    if (validation()) {
      setIsLoading(true);
      var formData = new FormData();
      formData.append("bannersId", bannerId);
      formData.append("title", title);
      formData.append("bannerImage", icon.bytes);
      formData.append("redirectTo", redirectTo);
      formData.append("redirectionUrl", url);

      dispatch(BannerActions.editBanners(formData))

    }
  };


  return (
    <div className={classes.container}>
      <Loader />
      <div className={classes.box}>
        {appBannerData && displayTable()}
        {editModal()}
      </div>
    </div>
  );

  function displayTable() {
    return (
      <Grid container spacing={1}>
        <Grid item lg={12} sm={12} md={12} xs={12}>
          <MaterialTable
            title="All Banners"
            data={appBannerData}
            columns={[
              {
                title: "S.No",
                editable: "never",
                render: (rowData) => appBannerData.indexOf(rowData) + 1,
              },
              { title: "Title", field: "title" },

              {
                title: "Banner",
                render: (rowData) => (
                  <Avatar
                    src={base_url + rowData.bannerImage}
                    style={{ width: 100, height: 50 }}
                    variant="square"
                  />
                ),
              },
              {
                title: "Redirect Page",
                render: (rowData) => (
                  <div>
                    {rowData.redirectTo == 1
                      ? "Read Page"
                      : rowData.redirectTo == 2
                      ? "Astrologer Profile"
                      : "Recharge Offers"}
                  </div>
                ),
              },
              { title: "URL", field: "redirectionUrl" },
            ]}
            options={propStyles.tableStyles}
            actions={[
              {
                icon: "edit",
                tooltip: "Edit Banner",
                onClick: (event, rowData) => handleOpen(rowData),
              },
              {
                icon: "delete",
                tooltip: "Delete Banner",
                onClick: (event, rowData) => dispatch(BannerActions.deleteBanners(rowData)),
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
                onClick: () => navigate("/AddAppBanner"),
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
              <div className={classes.heading}>Edit Banner</div>
              <div onClick={handleClose} className={classes.closeButton}>
                <CloseRounded />
              </div>
            </div>
          </Grid>
          <Grid item lg={6} sm={12} md={12} xs={12}>
            <TextField
              label="Enter Title"
              error={error.title ? true : false}
              helperText={error.title}
              value={title}
              onFocus={() => handleError("title", null)}
              onChange={(event) => setTitle(event.target.value)}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item lg={6} sm={12} md={12} xs={12}>
            <FormControl fullWidth>
              <InputLabel id="select-label">Redirect Page</InputLabel>
              <Select
                label="Redirect Page"
                labelId="select-label"
                value={redirectTo}
                onChange={(e) => setRedirectTo(e.target.value)}
                variant="outlined"
                error={!!error.redirectTo}
              >
                <MenuItem value="1">Read Page</MenuItem>
                <MenuItem value="2">Astrologers Profile</MenuItem>
                <MenuItem value="3">Recharge Page</MenuItem>
              </Select>
              <div className={classes.errorstyles}>{error.redirectTo}</div>
            </FormControl>
          </Grid>
          <Grid item lg={6} sm={6} md={12} xs={12}>
            <TextField
              label="Enter URL"
              error={error.url ? true : false}
              helperText={error.url}
              value={url}
              onFocus={() => handleError("url", null)}
              onChange={(event) => setUrl(event.target.value)}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid
            item
            lg={4}
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
          <Grid item lg={2} sm={6} md={6} xs={6}>
            <Avatar
              color={Colors.primaryDark}
              src={icon.file}
              style={{ width: 56, height: 56 }}
            />
          </Grid>
          <Grid item lg={6} sm={12} md={6} xs={6}>
            <div onClick={handleSubmit} className={classes.submitbutton}>
              Submit
            </div>
          </Grid>
          <Grid item lg={6} sm={12} md={6} xs={6}>
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

const mapStateToProps = (state) => ({
  appBannerData: state.banners.appBannerData
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(DisplayAppBanner);
