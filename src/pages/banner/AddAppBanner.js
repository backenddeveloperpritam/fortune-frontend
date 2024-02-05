import React, { useState } from "react";
import { useStyles } from "../../assets/styles.js";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import DvrIcon from "@mui/icons-material/Dvr";
import { useNavigate } from "react-router-dom";
import { add_banner } from "../../utils/Constants.js";
import Loader from "../../Components/loading/Loader.js";
import logo_icon from "../../assets/images/logo_icon.png";
import { Avatar, TextField } from "@mui/material";
import { Colors } from "../../assets/styles.js";
import { postData } from "../../utils/FetchNodeServices.js";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import * as BannerActions from "../../redux/Actions/bannerActions.js";

export const AddWebSiteBanaer = ({ dispatch }) => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [title, setTitle] = useState("");
  const [redirectTo, setRedirectTo] = useState("");
  const [url, setUrl] = useState("");
  const [icon, setIcon] = useState({ file: logo_icon, bytes: "" });
  const [error, setError] = useState({});
  const [isLoading, setisLoading] = useState(false);

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
    if (!title) {
      handleError("skill", "Please input title");
      isValid = false;
    }
    if (!icon.bytes) {
      handleError("icon", "Please Select Banner Image");
      isValid = false;
    }
    if (!redirectTo) {
      handleError("redirectTo", "Please Select Redirect Page");
      isValid = false;
    }
    return isValid;
  };

  const handleSubmit = async () => {
    if (validation()) {
      const data = {
        title: title,
        bannerImage: icon.bytes,
        redirectTo: redirectTo,
        redirectionUrl: url,
        bannerFor: 'app'
      };
      dispatch(BannerActions.uploadAppBanners(data));
    }
  };

  const handleReset = () => {
    setTitle("");
    setIcon({ file: logo_icon, bytes: "" });
    setRedirectTo("");
    setUrl("");
  };

  return (
    <div className={classes.container}>
      <div className={classes.box}>
        <Loader />
        <Grid container spacing={2}>
          <Grid item lg={12} sm={12} md={12} xs={12}>
            <div className={classes.headingContainer}>
              <div className={classes.heading}>Add App Banner</div>
              <div
                onClick={() => navigate("/displayAppBanner")}
                className={classes.addButton}
              >
                <DvrIcon />
                <div className={classes.addButtontext}>Displya Banner</div>
              </div>
            </div>
          </Grid>
          <Grid item lg={6} sm={6} md={12} xs={12}>
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
              <InputLabel id="select-label">Select Redirect Page</InputLabel>
              <Select
                label="Select Page"
                labelId="select-label"
                value={redirectTo}
                onChange={(e) => setRedirectTo(e.target.value)}
                variant="outlined"
                error={!!error.redirectTo}
              >
                <MenuItem value="1">Read Page</MenuItem>
                <MenuItem value="customer_home">Customer Home</MenuItem>
                <MenuItem value="astrologer_profile">Astrologers Profile</MenuItem>
                <MenuItem value="astrologer_home">Astrologers Home</MenuItem>
                <MenuItem value="4">Recharge Page</MenuItem>
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
          <Grid item lg={4} sm={6} md={6} xs={6}>
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

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(null, mapDispatchToProps)(AddWebSiteBanaer);
