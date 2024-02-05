import React, { useState } from "react";
import { useStyles } from "../../assets/styles.js";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import DvrIcon from "@mui/icons-material/Dvr";
import { useNavigate } from "react-router-dom";

export const AddAstroblog = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [error, setError] = useState({
    name: "",
    profilePhoto: "",
    status: "",
    createBy: "",
    shortBio: "",
  });

  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [createBy, setCreateBy] = useState("");
  const [shortBio, setShortBio] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);

  const handleProfile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setProfilePhoto({
        file: URL.createObjectURL(e.target.files[0]),
        bytes: e.target.files[0],
      });
      // Add your logic for handling profile photo here
    }
  };

  const handleSubmit = () => {
    // Validate fields before submitting
    if (!name || !status || !createBy || !shortBio || !profilePhoto) {
      setError({
        name: !name ? "Name is required" : "",
        status: !status ? "Status is required" : "",
        createBy: !createBy ? "Create By is required" : "",
        shortBio: !shortBio ? "Short Bio is required" : "",
        profilePhoto: !profilePhoto ? "Profile Photo is required" : "",
      });
      return;
    }

    // Your submission logic
    // ...

    // Clear errors and reset form
    setError({
      name: "",
      profilePhoto: "",
      status: "",
      createBy: "",
      shortBio: "",
    });
    setName("");
    setStatus("");
    setCreateBy("");
    setShortBio("");
    setProfilePhoto(null);
  };

  const handleReset = () => {
    // Clear errors and reset form
    setError({
      name: "",
      profilePhoto: "",
      status: "",
      createBy: "",
      shortBio: "",
    });
    setName("");
    setStatus("");
    setCreateBy("");
    setShortBio("");
    setProfilePhoto(null);
  };

  return (
    <div className={classes.container}>
      <div className={classes.box}>
        <Grid container spacing={2}>
          <Grid item lg={12} sm={12} md={12} xs={12}>
            <div className={classes.headingContainer}>
              <div className={classes.heading}>Add Astroblog</div>
              <div
                onClick={() => navigate("/displayAstroblog")}
                className={classes.addButton}
              >
                <DvrIcon />
                <div className={classes.addButtontext}>
                  Display/AddAstroblog
                </div>
              </div>
            </div>
          </Grid>

          <Grid item lg={6} sm={12} md={12} xs={12}>
            <TextField
              label="Enter Title"
              value={name}
              onChange={(e) => setName(e.target.value)}
              variant="outlined"
              fullWidth
              error={!!error.name}
              helperText={error.name}
            />
          </Grid>

          <Grid
            item
            lg={3}
            sm={3}
            md={3}
            xs={3}
            className={classes.uploadContainer}
          >
            <Grid
              component="label"
              onClick={() => {} /* Don't forget to handleProfile here */}
              className={classes.uploadImageButton}
            >
              {profilePhoto ? (
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

          <Grid item lg={6} sm={12} md={12} xs={12}>
            <label>Create By</label>
            <TextField
              label="Enter Name"
              value={createBy}
              onChange={(e) => setCreateBy(e.target.value)}
              variant="outlined"
              fullWidth
              error={!!error.createBy}
              helperText={error.createBy}
            />
          </Grid>

          <Grid item lg={12} sm={12} md={12} xs={12}>
            <TextField
              id="outlined-multiline-static"
              multiline
              rows={4}
              label="Short Bio(max-150)"
              value={shortBio}
              onChange={(e) => setShortBio(e.target.value)}
              variant="outlined"
              fullWidth
              error={!!error.shortBio}
              helperText={error.shortBio}
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

export default AddAstroblog;