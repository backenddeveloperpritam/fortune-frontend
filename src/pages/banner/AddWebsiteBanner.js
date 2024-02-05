import React, { useState } from "react";
import { useStyles } from "../../assets/styles.js";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import DvrIcon from "@mui/icons-material/Dvr";
import { useNavigate } from "react-router-dom";

export const AddWebSiteBanaer = () => {
  var classes = useStyles();
  const navigate = useNavigate();

  const [error, setError] = useState({
    status: "",
    profilePhoto: "",
  });

  const [status, setStatus] = useState("");
  const [Submit, setSubmit] = useState("");
  const [Reset, setReset] = useState("");

  const [profilePhoto, setProfilePhoto] = useState({
    file: null,
    bytes: null,
  });

  const handleProfile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const fileSize = e.target.files[0].size / 1024; // in KB
      const allowedFileSize = 1024; // 1 MB

      if (fileSize > allowedFileSize) {
        setError((prevError) => ({
          ...prevError,
          profilePhoto: "File size exceeds the limit (1 MB).",
        }));
        setProfilePhoto({
          file: null,
          bytes: null,
        });
      } else {
        setProfilePhoto({
          file: URL.createObjectURL(e.target.files[0]),
          bytes: e.target.files[0],
        });
        setError((prevError) => ({
          ...prevError,
          profilePhoto: "",
        }));
      }
    }
  };

  const handleSubmit = () => {
    // Validate fields before submitting
    if (!status || !profilePhoto.bytes) {
      setError({
        status: !status ? "Status is required" : "",
        profilePhoto: !profilePhoto.bytes ? "Profile Photo is required" : error.profilePhoto,
      });
      return;
    }

    // Your submission logic
    // ...

    // Clear errors and reset form
    setError({
      status: "",
      profilePhoto: "",
    });
    setStatus("");
    setProfilePhoto({
      file: null,
      bytes: null,
    });
  };

  const handleReset = () => {
    // Clear errors and reset form
    setError({
      status: "",
      profilePhoto: "",
    });
    setStatus("");
    setProfilePhoto({
      file: null,
      bytes: null,
    });
  };

  return (
    <div className={classes.container}>
      <div className={classes.box}>
        <Grid container spacing={2}>
          <Grid item lg={12} sm={12} md={12} xs={12}>
            <div className={classes.headingContainer}>
              <div className={classes.heading}>Add WebsiteBanner</div>
              <div
                onClick={() => navigate("/displayWebsiteBanner")}
                className={classes.addButton}
              >
                <DvrIcon />
                <div className={classes.addButtontext}>
                  Display/AddWebSiteBanaer
                </div>
              </div>
            </div>
          </Grid>

          <Grid item lg={6} sm={12} md={12} xs={12}>
            <label>Redirect To</label>
            <FormControl fullWidth>
              <InputLabel id="select-label">Select</InputLabel>
              <Select
                label="Select Option"
                labelId="select-label"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                variant="outlined"
                error={!!error.status}
              >
                <MenuItem value="option1">Read Page</MenuItem>
                <MenuItem value="option2">Astrologers Profile</MenuItem>
                <MenuItem value="option3">Recharge Page</MenuItem>
              </Select>
              <div className={classes.errorstyles}>{error.status}</div>
            </FormControl>
          </Grid>

          <Grid
            item
            lg={4}
            sm={12}
            md={12}
            xs={12}
            className={classes.uploadContainer}
          >
            <Grid
              component="label"
              onClick={() => {} /* Don't forget to handleProfile here */}
              className={classes.uploadImageButton}
            >
              {profilePhoto.file ? (
                <img src={profilePhoto.file} alt="Profile Preview" />
              ) : (
                "Upload Profile Icon"
              )}
              <input
                onChange={handleProfile}
                hidden
                accept="image/*"
                type="file"
              />
            </Grid>
            <div className={classes.errorstyles}>{error.profilePhoto}</div>
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

export default AddWebSiteBanaer;