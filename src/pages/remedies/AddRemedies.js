import React, { useCallback, useState } from "react";
import { useStyles } from "../../assets/styles.js";
import {
  Avatar,
  Grid,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Colors } from "../../assets/styles.js";
import DvrIcon from "@mui/icons-material/Dvr";
import { useNavigate } from "react-router-dom";
import logo_icon from "../../assets/images/logo_icon.png";
import { add_remedy } from "../../utils/Constants.js";
import { postData } from "../../utils/FetchNodeServices.js";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import * as RemedyActions from "../../redux/Actions/remediesActions.js";

const AddRemedies = ({ dispatch }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [remedy, setRemedy] = useState("");
  const [icon, setIcon] = useState({ file: logo_icon, bytes: "" });
  const [error, setError] = useState({ remedy: "", icon: "" });
  const [description, setDescriptionText] = useState("");

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
      formData.append("remedy", remedy);
      formData.append("remedyIcon", icon.bytes);
      formData.append("description", description);

      dispatch(
        RemedyActions.createRemedy({ data: formData, reset: handleReset })
      );
    }
  };

  const handleReset = useCallback(() => {
    setRemedy("");
    setDescriptionText("");
    setIcon({ file: logo_icon, bytes: "" });
    setError({ remedy: "", icon: "" });
  });

  return (
    <div className={classes.container}>
      <div className={classes.box}>
        <Grid container spacing={2}>
          <Grid item lg={12} sm={12} md={12} xs={12}>
            <div className={classes.headingContainer}>
              <div className={classes.heading}>Add Remedies</div>
              <div
                onClick={() => navigate("/displayRemedise")}
                className={classes.addButton}
              >
                <DvrIcon />
                <div className={classes.addButtontext}>Display Remedies</div>
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
              onChange={(event) => setDescriptionText(event.target.value)}
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

export default connect(null, mapDispatchToProps)(AddRemedies);
