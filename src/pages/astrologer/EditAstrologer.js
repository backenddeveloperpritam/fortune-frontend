import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useStyles } from "../../assets/styles.js";
import Radio from "@material-ui/core/Radio";
import moment from "moment";
import RadioGroup from "@material-ui/core/RadioGroup";
import {
  Grid,
  TextField,
  Select,
  Avatar,
  InputLabel,
  MenuItem,
  FormControl,
  Checkbox,
  FormGroup,
  FormControlLabel,
  FormLabel,
  Modal,
  Box,
  Typography,
} from "@mui/material";
import { getData, postData } from "../../utils/FetchNodeServices.js";
import { useNavigate } from "react-router-dom";
import { Colors } from "../../assets/styles.js";
import logo_icon from "../../assets/images/logo_icon.png";
import {
  add_astrologer,
  base_url,
  editAstrologer,
  get_expertise,
  get_main_expertise,
  get_remedy,
  get_skills,
  update_astrologer,
} from "../../utils/Constants.js";

import * as ExpertiesActions from "../../redux/Actions/expertiesActions.js";
import * as SkillsActions from "../../redux/Actions/skillsActions.js";
import * as RemediesActions from "../../redux/Actions/remediesActions.js";
import * as AstrologerActions from "../../redux/Actions/astrologerActions.js";
import { connect } from "react-redux";
import Loader from "../../Components/loading/Loader.js";

const preferredDaysList = ["Mon", "Tues", "Wed", "Thu", "Fri", "Sat", "Sun"];
const languageData = ["Hindi", "English"];

const EditAstrologer = ({
  dispatch,
  expertiesData,
  mainExpertiesData,
  skillsData,
  remediesData,
}) => {
  var classes = useStyles();
  const location = useLocation();

  const astroData = location.state && location.state.astroData;
  console.log(astroData)
  const [state, setState] = useState({
    error: {},
    name: astroData?.astrologerName,
    email: astroData?.email,
    mobile: astroData?.phoneNumber,
    altMobile: astroData?.alternateNumber,
    currency: astroData?.currency,
    gender: astroData?.gender,
    password: astroData?.password,
    dob: astroData?.dateOfBirth,
    experience: astroData?.experience,
    countryPhoneCode: astroData?.country_phone_code,
    pinCode: astroData?.zipCode,
    startTime: astroData?.startTime,
    endTime: astroData?.endTime,
    rating: astroData?.rating,
    language: astroData?.language,
    address: astroData?.address,
    country: astroData?.country,
    countryState: astroData?.state,
    city: astroData?.city,
    youtubeLink: astroData?.youtubeLink,
    freeMinutes: astroData?.free_min,
    bankName: astroData?.account_name,
    bankAccountNumber: astroData?.account_number,
    accountType: astroData?.account_type,
    ifscCode: astroData?.IFSC_code,
    accountHolderName: astroData?.account_holder_name,
    panNumber: astroData?.panCard,
    aadharNumber: astroData?.aadharNumber,
    consultationPrice: astroData?.consultation_price,
    callPrice: astroData?.call_price,
    commissionCallPrice: astroData?.commission_call_price,
    chatPrice: astroData?.chat_price,
    commissionChatPrice: astroData?.commission_chat_price,
    commissionRemark: astroData?.commission_remark,
    skills: [],
    remedies: [],
    expertise: [],
    mainExpertise: [],
    shortBio: astroData?.short_bio,
    longBio: astroData?.long_bio,
    about: astroData?.about,
    preferredDays: astroData?.preferredDays,
    working: astroData?.workingOnOtherApps,
  });

  useEffect(() => {
    dispatch(ExpertiesActions.getExpertiesData());
    dispatch(ExpertiesActions.getMainExpertiesData());
    dispatch(SkillsActions.getSkillData());
    dispatch(RemediesActions.getRemediesData());
    get_astrologer_details();
  }, []);

  const get_astrologer_details = () => {
    try {
      let selectedSkills = [];
      if (!!astroData?.skill) {
       selectedSkills = astroData?.skill.map((item) => item?._id);
      }

      let selecteRemedies = [];
      if (!!astroData.remedies) {
        selecteRemedies = astroData.remedies.map((item) => item?._id);
      }

      let selectedExpertise = [];
      if (!!astroData.expertise) {
        selectedExpertise =astroData.expertise.map((item) => item?._id);
      }

      let selectedMainExpertise = [];
      if (!!astroData.expertise) {
        selectedMainExpertise = astroData.mainExpertise.map((item) => item?._id);
      }


      updateState({
        skills: selectedSkills,
        remedies: selecteRemedies,
        expertise: selectedExpertise,
        mainExpertise: selectedMainExpertise,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const [profilePhoto, setprofilePhoto] = useState({
    file: base_url + astroData?.profileImage,
    bytes: astroData?.profileImage,
  });

  const [bankProof, setbankProof] = useState({
    file: base_url + astroData?.bank_proof_image,
    bytes: astroData?.bank_proof_image,
  });

  const [idProof, setidProof] = useState({
    file: base_url + astroData?.id_proof_image,
    bytes: astroData?.id_proof_image,
  });

  const handleRatingChange = (e) => {
    const newRating = e.target.value;
    if (isNaN(newRating) || newRating === "") {
      handleError("rating", "Please enter a valid number");
    } else {
      const parsedRating = parseFloat(newRating);
      if (parsedRating >= 0 && parsedRating <= 5) {
        handleError("rating", null);
        updateState({ rating: parsedRating });
      } else {
        handleError("rating", "Rating must be between 0 and 5");
      }
    }
  };

  const handleSkills = (item) => {
    if (skills.some((selectedItem) => selectedItem === item._id)) {
      let skilData = skills.filter((skill) => skill !== item?._id);
      updateState({ skills: skilData });
    } else {
      updateState({ skills: [...skills, item?._id] });
    }
    handleError("skills", null);
  };

  const handleRemedies = (item) => {
    if (remedies.some((selectedItem) => selectedItem === item._id)) {
      let remedyData = remedies.filter(
        (selectedItem) => selectedItem !== item._id
      );
      updateState({ remedies: remedyData });
    } else {
      updateState({ remedies: [...remedies, item?._id] });
    }
    handleError("remedies", null);
  };

  const handleExpertise = (item) => {
    if (expertise.some((selectedItem) => selectedItem === item._id)) {
      const expertiesData = expertise.filter(
        (selectedItem) => selectedItem !== item._id
      );
      updateState({ expertise: expertiesData });
    } else {
      updateState({ expertise: [...expertise, item?._id] });
    }
    handleError("expertise", null);
  };

  const handleMainExpertise = (item) => {
    if (mainExpertise.some((selectedItem) => selectedItem === item._id)) {
      const mainExpertiesData = mainExpertise.filter(
        (selectedItem) => selectedItem !== item._id
      );
      updateState({ mainExpertise: mainExpertiesData });
    } else {
      updateState({ mainExpertise: [...mainExpertise, item?._id] });
    }
    handleError("mainExpertise", null);
  };

  const handlePreferredDays = (item) => {
    if (preferredDays.some((selectedItem) => selectedItem === item)) {
      const preferdayData = preferredDays.filter(
        (selectedItem) => selectedItem !== item
      );
      updateState({ preferredDays: preferdayData });
    } else {
      updateState({ preferredDays: [...preferredDays, item] });
    }
    handleError("preferredDays", null);
  };

  const handleProfile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setprofilePhoto({
        file: URL.createObjectURL(e.target.files[0]),
        bytes: e.target.files[0],
      });
      handleError("profilePhoto", null);
      handleError("bankProof", null);
    }
  };

  const handlebankProof = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setbankProof({
        file: URL.createObjectURL(e.target.files[0]),
        bytes: e.target.files[0],
      });
      updateState({ error: { bankProof: null } });
      handleError("bankProof", null);
    }
  };

  const handleidProof = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setidProof({
        file: URL.createObjectURL(e.target.files[0]),
        bytes: e.target.files[0],
      });
      updateState({ error: { idProof: null } });
    }
  };

  const handleTimeChange = (e, editTo) => {
    const newStartTime = e.target.value;
    // Create a date object with a specific date (e.g., "1998-10-10") and combine it with the entered time
    const currentDate = new Date("1998-10-10");
    const enteredTime = new Date(
      currentDate.toDateString() + " " + newStartTime
    );

    // Check if the entered time is a valid date
    if (isNaN(enteredTime.getTime())) {
      updateState({ error: { startTime: "Please enter a valid time" } });
    } else {
      // Clear the error if the entered time is valid
      updateState({ error: { startTime: null } });

      // Format the time to the desired format "1998-10-10T00:00:00.000Z"
      const formattedTime = enteredTime.toISOString();
      // Update the state with the formatted time
      if (editTo == "startTime") {
        updateState({ startTime: formattedTime });
        updateState({ error: { startTime: null } });
      } else {
        updateState({ endTime: formattedTime });
        updateState({ error: { endTime: null } });
      }
    }
  };

  const handleError = (field, message) => {
    updateState({ error: { ...error, [field]: message } });
  };

  const handleValidation = () => {
    try{
      var isValid = true;
      if (name.length == 0) {
        handleError("name", "Name is required");
        isValid = false;
      } else if (email.length == 0) {
        handleError("email", "Email is required");
        isValid = false;
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        handleError("email", "invalid Email address");
        isValid = false;
      } else if (mobile.length == 0) {
        handleError("mobile", "Mobile Number is required");
        isValid = false;
      } else if (!/^[0-9]{10}$/.test(mobile)) {
        handleError("mobile", "Invalid Mobile Number");
        isValid = false;
      } else if (altMobile.length == 0) {
        handleError("altMobile", "Alternate Mobile Number is required");
        isValid = false;
      } else if (altMobile && !/^[0-9]{10}$/.test(altMobile)) {
        handleError("altMobile", "invalid Alternate Mobile Number");
        isValid = false;
      } else if (currency.length == 0) {
        handleError("currency", "Currency is required");
        isValid = false;
      } else if (gender.length == 0) {
        handleError("gender", "Gender is required");
        isValid = false;
      } else if (password.length == 0) {
        handleError("password", "Password is required");
        isValid = false;
      } else if (dob.length == 0) {
        handleError("dob", "Date Of Birth is required");
        isValid = false;
      } else if (experience.length == 0) {
        handleError("experience", "Experience is required");
        isValid = false;
      } else if (language.length == 0) {
        handleError("language", "Language is required");
        isValid = false;
      } else if (address.length == 0) {
        handleError("address", "Address is required");
        isValid = false;
      } else if (country.length == 0) {
        handleError("country", "Country is required");
        isValid = false;
      } else if (countryState.length == 0) {
        handleError("state", "State is required");
        isValid = false;
      } else if (city.length == 0) {
        handleError("city", "City is required");
        isValid = false;
      } else if (youtubeLink.length == 0) {
        handleError("youtubeLink", "youtubeLink is required");
        isValid = false;
      } else if (freeMinutes.length == 0) {
        handleError("freeMinutes", "freeMinutes is required");
        isValid = false;
      } else if (pinCode.length == 0) {
        handleError("pinCode", "Pin Code is required");
        isValid = false;
      } else if (countryPhoneCode.length == 0) {
        handleError("countryPhoneCode", "Country Phone Code is required");
        isValid = false;
      } else if (about.length == 0) {
        handleError("about", "About is required");
        isValid = false;
      } else if (startTime.length == 0) {
        handleError("startTime", "Start Time is required");
        isValid = false;
      } else if (endTime.length == 0) {
        handleError("endTime", "End Time is required");
        isValid = false;
      } else if (rating.length == 0) {
        handleError("rating", "Rating is required");
        isValid = false;
      } else if (!preferredDays || preferredDays.length === 0) {
        handleError("preferredDays", "Preferred Days is required");
        isValid = false;
      } else if (working !== "Yes" && working !== "No") {
        handleError("working", "Working must be either 'Yes' or 'No'");
        isValid = false;
      } else if (profilePhoto.bytes.length == 0) {
        handleError("profilePhoto", "Please Select a Profile Picutre");
        isValid = false;
      } else if (bankProof.bytes.length == 0) {
        handleError("bankProof", "Please Select a Bank Proof");
        isValid = false;
      } else if (idProof.bytes.length == 0) {
        handleError("idProof", "Please Select a Id Proof");
        isValid = false;
      }  else if (bankAccountNumber.length == 0) {
        handleError("bankAccountNumber", "Bank Account Number is required");
        isValid = false;
      } else if (isNaN(bankAccountNumber) || bankAccountNumber <= 0) {
        handleError("bankAccountNumber", "Invalid Bank Account Number");
        isValid = false;
      } else if (bankName.length == 0) {
        handleError("bankName", "Bank Name is required");
        isValid = false;
      } else if (!accountType || accountType === "-Select Account Type-") {
        handleError("accountType", "Account type is required");
        isValid = false;
      } else if (ifscCode.length == 0) {
        handleError("ifscCode", "IFSC Code is required");
        isValid = false;
      } else if (accountHolderName.length == 0) {
        handleError("accountHolderName", "Account Holder Name is required");
        isValid = false;
      } else if (panNumber.length == 0) {
        handleError("panNumber", "PAN Number is required");
        isValid = false;
      } else if (aadharNumber.length == 0) {
        handleError("aadharNumber", "Aadhar Number is required");
        isValid = false;
      } else if (consultationPrice.length == 0) {
        handleError("consultationPrice", "Consultation Price is required");
        isValid = false;
      } else if (callPrice.length == 0) {
        handleError("callPrice", "Call Price is required");
        isValid = false;
      } else if (commissionCallPrice.length == 0) {
        handleError("commissionCallPrice", "Commision Call Price is required");
        isValid = false;
      } else if (!chatPrice) {
        handleError("chatPrice", "Chat Price is required");
        isValid = false;
      } else if (!commissionChatPrice) {
        handleError("commissionChatPrice", "Commission Chat Price is required");
        isValid = false;
      } else if (callPrice.length == 0) {
        handleError("callPrice", "Call Price is required");
        isValid = false;
      } else if (shortBio.length == 0) {
        handleError("shortBio", "Short Bio is required");
        isValid = false;
      }  else if (longBio.length == 0) {
        handleError("longBio", "Long Bio is required");
        isValid = false;
      } else if (skills.length == 0) {
        handleError("skills", "Skills is required");
        isValid = false;
      } else if (!remedies || remedies.length === 0) {
        handleError("remedies", "Please Select Remedies");
        isValid = false;
      } else if (!skills || skills.length === 0) {
        handleError("skills", "Please Select skills");
        isValid = false;
      } else if (!expertise || expertise.length === 0) {
        handleError("expertise", "Please Select expertise");
        isValid = false;
      } else if (!mainExpertise || mainExpertise.length === 0) {
        handleError("mainExpertise", "Please Select Main Expertise");
        isValid = false;
      }
  
      // Validate if working is either "Yes" or "No"
  
      // Validate if startTime is before endTime
      else if (startTime && endTime) {
        const startDateTime = new Date(startTime);
        const endDateTime = new Date(endTime);
  
        if (!startTime) {
          handleError("startTime", "Start Time is Required");
        }
        if (startDateTime >= endDateTime) {
          handleError("endTime", "End Time must be after Start Time");
          isValid = false;
        }
      }
      return isValid;
    }catch(e){
      console.log(e)
      return false
    }

  };


  const handleEdit = async () => {
    if (handleValidation()) {
      var formData = new FormData();
      formData.append("astrologerId", astroData?._id);
      formData.append("astrologerName", name);
      formData.append("email", email);
      formData.append("phoneNumber", mobile);
      formData.append("alternateNumber", altMobile);
      formData.append("currency", currency);
      formData.append("gender", gender);
      formData.append("password", password);
      formData.append("dateOfBirth", dob);
      formData.append("experience", experience);
      formData.append("preferredDays", JSON.stringify(preferredDays));
      formData.append("address", address);
      formData.append("country", country);
      formData.append("state", countryState);
      formData.append("city", city);
      formData.append("youtubeLink", youtubeLink);
      formData.append("free_min", freeMinutes);
      formData.append("bankName", bankName);
      formData.append("workingOnOtherApps", working);
      formData.append("profileImage", profilePhoto.bytes);
      formData.append("bank_proof_image", bankProof.bytes);
      formData.append("id_proof_image", idProof.bytes);
      formData.append("account_number", bankAccountNumber);
      formData.append("bankName", bankName);
      formData.append("account_type", accountType);
      formData.append("IFSC_code", ifscCode);
      formData.append("account_holder_name", accountHolderName);
      formData.append("panCard", panNumber);
      formData.append("aadharNumber", aadharNumber);
      formData.append("consultation_price", consultationPrice);
      formData.append("call_price", callPrice);
      formData.append("commission_call_price", commissionCallPrice);
      formData.append("chat_price", chatPrice);
      formData.append("commission_chat_price", commissionChatPrice);
      formData.append("commission_remark", commissionRemark);
      formData.append("short_bio", shortBio);
      formData.append("long_bio", longBio);
      formData.append("startTime", startTime);
      formData.append("endTime", endTime);
      formData.append("zipCode", pinCode);
      formData.append("about", about);
      formData.append("countryPhoneCode", countryPhoneCode);
      formData.append("rating", rating);
      for (let i = 0; i < language.length; i++) {
        formData.append(`language[${i}]`, language[i]);
      }
      for (let i = 0; i < skills.length; i++) {
        formData.append(`skill[${i}]`, skills[i]);
      }
      for (let i = 0; i < remedies.length; i++) {
        formData.append(`remedies[${i}]`, remedies[i]);
      }
      for (let i = 0; i < expertise.length; i++) {
        formData.append(`expertise[${i}]`, expertise[i]);
      }
      for (let i = 0; i < mainExpertise.length; i++) {
        formData.append(`mainExpertise[${i}]`, mainExpertise[i]);
      }
      dispatch(AstrologerActions.updateAstrologerData(formData));
    }
  };

  const updateState = (data) => {
    setState((prevState) => {
      const newData = { ...prevState, ...data };
      return newData;
    });
  };

  const {
    error,
    name,
    email,
    mobile,
    altMobile,
    currency,
    gender,
    password,
    dob,
    experience,
    countryPhoneCode,
    pinCode,
    startTime,
    endTime,
    rating,
    language,
    country,
    countryState,
    city,
    freeMinutes,
    bankName,
    bankAccountNumber,
    ifscCode,
    accountHolderName,
    accountType,
    aadharNumber,
    about,
    youtubeLink,
    address,
    working,
    panNumber,
    preferredDays,
    longBio,
    shortBio,
    skills,
    mainExpertise,
    expertise,
    remedies,
    callPrice,
    chatPrice,
    commissionCallPrice,
    commissionChatPrice,
    commissionRemark,
    consultationPrice,
  } = state;

  return (
    <div className={classes.container}>
      <Loader />
      <div className={classes.box}>
        <Grid container spacing={2}>
          {astrologerInputsInfo()}

          {/* days & working */}
          <Grid item lg={4} sm={12} md={12} xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Preferred Days</FormLabel>
              <FormGroup aria-label="position" row>
                {preferredDaysList &&
                  preferredDaysList.map((item) => {
                    return (
                      <div className={classes.chips}>
                        <FormControlLabel
                          value={item}
                          control={
                            <Checkbox
                              checked={
                                preferredDays && preferredDays.includes(item)
                              }
                              onChange={() => handlePreferredDays(item)}
                            />
                          }
                          label={item}
                          labelPlacement="end"
                        />
                      </div>
                    );
                  })}
              </FormGroup>
            </FormControl>
            {error.preferredDays && (
              <div className={classes.errorstyles}>{error.preferredDays}</div>
            )}
          </Grid>

          <Grid item lg={4} sm={12} md={12} xs={12}>
            <FormControl component="fieldset">
              <FormLabel
                component="legend"
                style={{
                  fontFamily: "Philospher",
                  color: Colors.black,
                  fontSize: "1.2rem",
                }}
              >
                Are you working on any other online portal?
              </FormLabel>
              <RadioGroup
                row
                aria-label="position"
                name="position"
                defaultValue={working}
                onChange={(e) => updateState({ working: e.target.value })}
              >
                <FormControlLabel
                  value={"No"}
                  control={<Radio color="primary" />}
                  label="No"
                />
                <FormControlLabel
                  value={"Yes"}
                  control={<Radio color="primary" />}
                  label="Yes"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          {/* days & working */}

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
              onClick={handleProfile}
              className={classes.uploadImageButton}
            >
              Upload Profile Photo
              <input
                onChange={handleProfile}
                hidden
                accept="image/*"
                type="file"
              />
            </Grid>
            <div className={classes.errorstyles}>{error.profilePhoto}</div>
          </Grid>
          <Grid item lg={1} sm={1} md={1} xs={1}>
            <Avatar
              color={Colors.primaryDark}
              src={profilePhoto.file}
              style={{ width: 56, height: 56 }}
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
              onClick={handlebankProof}
              className={classes.uploadImageButton}
            >
              Upload Bank Proof
              <input
                onChange={handlebankProof}
                hidden
                accept="image/*"
                type="file"
              />
            </Grid>
            <div className={classes.errorstyles}>{error.bankProof}</div>
          </Grid>
          <Grid item lg={1} sm={1} md={1} xs={1}>
            <Avatar
              color={Colors.primaryDark}
              src={bankProof.file}
              style={{ width: 56, height: 56 }}
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
              onClick={handleidProof}
              className={classes.uploadImageButton}
            >
              Upload Id Proof
              <input
                onChange={handleidProof}
                hidden
                accept="image/*"
                type="file"
              />
            </Grid>
            <div className={classes.errorstyles}>{error.idProof}</div>
          </Grid>
          <Grid item lg={1} sm={1} md={1} xs={1}>
            <Avatar
              color={Colors.primaryDark}
              src={idProof.file}
              style={{ width: 56, height: 56 }}
            />
          </Grid>

          <Grid item lg={3} sm={12} md={12} xs={12}>
            <TextField
              label="Bank Account Number"
              value={bankAccountNumber}
              variant="outlined"
              fullWidth
              onFocus={() => handleError("bankAccountNumber", null)}
              onChange={(e) =>
                updateState({ bankAccountNumber: e.target.value })
              }
              helperText={error.bankAccountNumber}
              error={error.bankAccountNumber ? true : false}
            />
          </Grid>
          <Grid item lg={3} sm={12} md={12} xs={12}>
            <TextField
              label="Enter Bank Name"
              value={bankName}
              variant="outlined"
              fullWidth
              onChange={(e) => updateState({ bankName: e.target.value })}
              helperText={error.bankName}
              error={!!error.bankName ? true : false}
            />
          </Grid>
          <Grid item lg={3} md={12} sm={12} xs={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Account Type
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Account Type"
                value={accountType}
                onFocus={() => handleError("accountType", null)}
                onChange={(e) => updateState({ accountType: e.target.value })}
                helperText={error.accountType}
                error={error.accountType ? true : false}
              >
                <div className={classes.errorstyles}>{error.accountType}</div>
                <MenuItem disabled value={null}>
                  -Select Account type-
                </MenuItem>
                <MenuItem value="saving">Saving</MenuItem>
                <MenuItem value="current">Current</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item lg={3} sm={12} md={12} xs={12}>
            <TextField
              label="Enter IFSC Code"
              value={ifscCode}
              variant="outlined"
              fullWidth
              onChange={(e) => updateState({ ifscCode: e.target.value })}
              helperText={error.ifscCode}
              error={error.ifscCode ? true : false}
            />
          </Grid>

          <Grid item lg={4} sm={12} md={12} xs={12}>
            <TextField
              label="Account Holder Name"
              value={accountHolderName}
              variant="outlined"
              fullWidth
              onChange={(e) =>
                updateState({ accountHolderName: e.target.value })
              }
              helperText={error.accountHolderName}
              error={error.accountHolderName ? true : false}
            />
          </Grid>
          <Grid item lg={4} sm={12} md={12} xs={12}>
            <TextField
              label="PAN card Number"
              value={panNumber}
              variant="outlined"
              fullWidth
              onChange={(e) => updateState({ panNumber: e.target.value })}
              helperText={error.panNumber}
              error={error.panNumber ? true : false}
            />
          </Grid>
          <Grid item lg={4} sm={12} md={12} xs={12}>
            <TextField
              type="number"
              label="Adhar card Number"
              inputMode="numeric"
              value={aadharNumber}
              variant="outlined"
              fullWidth
              onChange={(e) => updateState({ aadharNumber: e.target.value })}
              helperText={error.aadharNumber}
              error={error.aadharNumber ? true : false}
            />
          </Grid>
          <Grid item lg={4} sm={12} md={12} xs={12}>
            <TextField
              label="Consultation Price"
              inputMode="numeric"
              value={consultationPrice}
              variant="outlined"
              fullWidth
              onChange={(e) =>
                updateState({ consultationPrice: e.target.value })
              }
              helperText={error.consultationPrice}
              error={error.consultationPrice ? true : false}
            />
          </Grid>
          <Grid item lg={4} sm={12} md={12} xs={12}>
            <TextField
              inputMode="numeric"
              label="Call Price (Per/Min)"
              value={callPrice}
              variant="outlined"
              fullWidth
              onFocus={() => handleError("callPrice", null)}
              onChange={(e) => updateState({ callPrice: e.target.value })}
              helperText={error.callPrice}
              error={error.callPrice ? true : false}
            />
          </Grid>
          <Grid item lg={4} sm={12} md={12} xs={12}>
            <TextField
              label=" Commission Call Price"
              inputMode="numeric"
              value={commissionCallPrice}
              variant="outlined"
              fullWidth
              onFocus={() => handleError("commissionCallPrice", null)}
              onChange={(e) =>
                updateState({ commissionCallPrice: e.target.value })
              }
              helperText={error.commissionCallPrice}
              error={error.commissionCallPrice ? true : false}
            />
          </Grid>
          <Grid item lg={4} sm={12} md={12} xs={12}>
            <TextField
              label=" Chat Price (Per/Min)"
              inputMode="numeric"
              value={chatPrice}
              variant="outlined"
              fullWidth
              onFocus={() => handleError("chatPrice", null)}
              onChange={(e) => updateState({ chatPrice: e.target.value })}
              helperText={error.chatPrice}
              error={error.chatPrice ? true : false}
            />
          </Grid>
          <Grid item lg={4} sm={12} md={12} xs={12}>
            <TextField
              label=" Commission Chat Price"
              value={commissionChatPrice}
              variant="outlined"
              inputMode="numeric"
              fullWidth
              onFocus={() => handleError("commissionChatPrice", null)}
              onChange={(e) =>
                updateState({ commissionChatPrice: e.target.value })
              }
              helperText={error.commissionChatPrice}
              error={error.commissionChatPrice ? true : false}
            />
          </Grid>
          <Grid item lg={4} sm={12} md={12} xs={12}>
            <TextField
              label="Commission Remark"
              value={commissionRemark}
              variant="outlined"
              fullWidth
              onFocus={() => handleError("commissionRemark", null)}
              onChange={(e) =>
                updateState({ commissionRemark: e.target.value })
              }
              helperText={error.commissionRemark}
              error={error.commissionRemark ? true : false}
            />
          </Grid>
          <Grid item lg={6} sm={12} md={12} xs={12}>
            <TextField
              id="outlined-multiline-static"
              multiline
              rows={4}
              label="Short Bio(max-150)"
              value={shortBio}
              variant="outlined"
              fullWidth
              onFocus={() => handleError("shortBio", null)}
              onChange={(e) => updateState({ shortBio: e.target.value })}
              helperText={error.shortBio}
              error={error.shortBio ? true : false}
            />
          </Grid>
          <Grid item lg={6} sm={12} md={12} xs={12}>
            <TextField
              id="outlined-multiline-static"
              multiline
              rows={4}
              label="Long Bio"
              value={longBio}
              variant="outlined"
              fullWidth
              onFocus={() => handleError("longBio", null)}
              onChange={(e) => updateState({ longBio: e.target.value })}
              helperText={error.longBio}
              error={error.longBio ? true : false}
            />
          </Grid>
          <Grid item lg={6} sm={12} md={12} xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Skills</FormLabel>
              <FormGroup aria-label="position" row>
                {skillsData &&
                  skillsData.map((item) => {
                    return (
                      <div className={classes.chips}>
                        <FormControlLabel
                          value={item._id}
                          control={
                            <Checkbox
                              checked={skills && skills.includes(item._id)}
                              onChange={() => handleSkills(item)}
                            />
                          }
                          label={item.skill}
                          labelPlacement="end"
                        />
                      </div>
                    );
                  })}
              </FormGroup>
            </FormControl>
            {error.skills && (
              <div className={classes.errorstyles}>{error.skills}</div>
            )}
          </Grid>
          <Grid item lg={6} sm={12} md={12} xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Remedies</FormLabel>
              <FormGroup aria-label="position" row>
                {remediesData &&
                  remediesData.map((item) => {
                    return (
                      <div key={item._id} className={classes.chips}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={remedies && remedies.includes(item._id)}
                              onChange={() => handleRemedies(item)}
                            />
                          }
                          label={item.remedy}
                          labelPlacement="end"
                        />
                      </div>
                    );
                  })}
              </FormGroup>
            </FormControl>
            {error.remedies && (
              <div className={classes.errorstyles}>{error.remedies}</div>
            )}
          </Grid>
          <Grid item lg={6} sm={12} md={12} xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Expertise</FormLabel>
              <FormGroup aria-label="position" row>
                {expertiesData &&
                  expertiesData.map((item) => {
                    return (
                      <div className={classes.chips}>
                        <FormControlLabel
                          value={item._id}
                          control={
                            <Checkbox
                              checked={
                                expertise && expertise.includes(item._id)
                              }
                              onChange={() => handleExpertise(item)}
                            />
                          }
                          label={item.expertise}
                          labelPlacement="end"
                        />
                      </div>
                    );
                  })}
              </FormGroup>
            </FormControl>
            {error.expertise && (
              <div className={classes.errorstyles}>{error.expertise}</div>
            )}
          </Grid>
          <Grid item lg={6} sm={12} md={12} xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend"> Main Expertise</FormLabel>
              <FormGroup aria-label="position" row>
                {mainExpertiesData &&
                  mainExpertiesData.map((item) => {
                    return (
                      <div className={classes.chips}>
                        <FormControlLabel
                          value={item._id}
                          control={
                            <Checkbox
                              checked={
                                mainExpertise &&
                                mainExpertise.includes(item._id)
                              }
                              onChange={() => handleMainExpertise(item)}
                            />
                          }
                          label={item.mainExpertise}
                          labelPlacement="end"
                        />
                      </div>
                    );
                  })}
              </FormGroup>
            </FormControl>
            {error.mainExpertise && (
              <div className={classes.errorstyles}>{error.mainExpertise}</div>
            )}
          </Grid>
          <Grid item lg={6} sm={6} md={6} xs={6}>
            <div onClick={handleEdit} className={classes.submitbutton}>
              Submit
            </div>
          </Grid>
          <Grid item lg={6} sm={6} md={6} xs={6}>
            <div className={classes.denyButton}>Cancel</div>
          </Grid>
        </Grid>
      </div>
    </div>
  );

  function astrologerInputsInfo() {
    return (
      <>
        <Grid item lg={12} sm={12} md={12} xs={12}>
          <div className={classes.headingContainer}>
            <div className={classes.heading}>Edit Astrologer</div>
          </div>
        </Grid>
        <Grid item lg={4} sm={12} md={12} xs={12}>
          <TextField
            label="Enter Name"
            value={name}
            variant="outlined"
            fullWidth
            error={error.name ? true : false}
            onFocus={() => handleError("name", null)}
            onChange={(e) => updateState({ name: e.target.value })}
            helperText={error.name}
          />
        </Grid>
        <Grid item lg={4} sm={12} md={12} xs={12}>
          <TextField
            label="Enter Email"
            value={email}
            variant="outlined"
            fullWidth
            error={error.email ? true : false}
            onFocus={() => handleError("email", null)}
            onChange={(e) => updateState({ email: e.target.value })}
            helperText={error.email}
          />
        </Grid>
        <Grid item lg={4} sm={12} md={12} xs={12}>
          <TextField
            label="Enter Mobile Number"
            value={mobile}
            variant="outlined"
            fullWidth
            helperText={error.mobile}
            error={error.mobile ? true : false}
            onFocus={() => handleError("mobile", null)}
            onChange={(e) => updateState({ mobile: e.target.value })}
          />
        </Grid>
        <Grid item lg={4} sm={12} md={12} xs={12}>
          <TextField
            label="Alternate Mobile Number"
            value={altMobile}
            variant="outlined"
            fullWidth
            helperText={error.altMobile}
            error={error.altMobile ? true : false}
            onFocus={() => handleError("altMobile", null)}
            onChange={(e) => updateState({ altMobile: e.target.value })}
          />
        </Grid>
        <Grid item lg={4} md={12} sm={12} xs={12}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Currency</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="currency"
              value={currency}
              error={error.currency ? true : false}
              onFocus={() => handleError("currency", null)}
              onChange={(e) => updateState({ currency: e.target.value })}
            >
              <MenuItem disabled value={null}>
                -Select Currency-
              </MenuItem>
              <MenuItem value="INR">INR</MenuItem>
              <MenuItem value="USD">USD</MenuItem>
            </Select>
            {error.currency && (
              <div className={classes.errorstyles}>{error.currency}</div>
            )}
          </FormControl>
        </Grid>
        <Grid item lg={4} md={12} sm={12} xs={12}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Gender</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="gender"
              value={gender}
              error={error.gender ? true : false}
              onFocus={() => handleError("gender", null)}
              onChange={(e) => updateState({ gender: e.target.value })}
            >
              <MenuItem disabled value={null}>
                -Select Gender-
              </MenuItem>
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
            {error.gender && (
              <div className={classes.errorstyles}>{error.gender}</div>
            )}
          </FormControl>
        </Grid>
        <Grid item lg={4} sm={12} md={12} xs={12}>
          <TextField
            label="Password"
            type="password"
            value={password}
            variant="outlined"
            fullWidth
            onFocus={() => handleError("password", null)}
            onChange={(e) => updateState({ password: e.target.value })}
            helperText={error.password}
            error={error.password ? true : false}
          />
        </Grid>
        <Grid item lg={4} sm={12} md={12} xs={12}>
          <TextField
            type="date"
            value={dob}
            variant="outlined"
            fullWidth
            onFocus={() => handleError("dob", null)}
            onChange={(e) => updateState({ dob: e.target.value })}
            helperText={error.dob}
            error={error.dob ? true : false}
          />
        </Grid>
        <Grid item lg={4} md={12} sm={12} xs={12}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Experience in Years
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Experience in years"
              value={experience}
              onFocus={() => handleError("experience", null)}
              onChange={(e) => updateState({ experience: e.target.value })}
              error={error.experience ? true : false} // Highlight the field if there's an error
            >
              <MenuItem disabled value={null}>
                -Experience in Years-
              </MenuItem>
              <MenuItem value="1">1</MenuItem>
              <MenuItem value="2">2</MenuItem>
              <MenuItem value="3">3</MenuItem>
              <MenuItem value="4">4</MenuItem>
              <MenuItem value="5">5</MenuItem>
              <MenuItem value="6">6</MenuItem>
              <MenuItem value="7">7</MenuItem>
              <MenuItem value="8">8</MenuItem>
              <MenuItem value="9">9</MenuItem>
              <MenuItem value="10">10</MenuItem>
            </Select>
            {error.experience && (
              <div className={classes.errorstyles}>{error.experience}</div>
            )}
          </FormControl>
        </Grid>
        <Grid item lg={4} sm={12} md={12} xs={12}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Language</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="language"
              value={language}
              multiple
              error={error.language ? true : false}
              onFocus={() => handleError("language", null)}
              onChange={(e) => updateState({ language: e.target.value })}
            >
              <MenuItem disabled value={null}>
                -Select Language-
              </MenuItem>
              {languageData.map((item) => {
                return (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                );
              })}
            </Select>
            {error.language && (
              <div className={classes.errorstyles}>{error.language}</div>
            )}
          </FormControl>
          {/* <TextField
            label="Language"
            value={language}
            variant="outlined"
            
            fullWidth
            onFocus={() => handleError("language", null)}
            onChange={(e) => updateState({ language: e.target.value })}
            helperText={error.language}
            error={error.language} // Highlight the field if there's an error
          /> */}
        </Grid>
        <Grid item lg={4} sm={12} md={12} xs={12}>
          <TextField
            label="Address"
            value={address}
            variant="outlined"
            fullWidth
            onFocus={() => handleError("address", null)}
            onChange={(e) => updateState({ address: e.target.value })}
            helperText={error.address}
            error={error.address ? true : false}
          />
        </Grid>
        <Grid item lg={4} md={12} sm={12} xs={12}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Country</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Country"
              value={country}
              onFocus={(e) => handleError("country", null)}
              onChange={(e) => updateState({ country: e.target.value })}
              error={error.country ? true : false} // Highlight the field if there's an error
            >
              <MenuItem disabled value={null}>
                -Select your Country-
              </MenuItem>
              <MenuItem value="India">India</MenuItem>
              <MenuItem value="Brazil">Brazil</MenuItem>
              {/* Add more countries as needed */}
            </Select>
            {error.country && (
              <div className={classes.errorstyles}>{error.country}</div>
            )}
          </FormControl>
        </Grid>
        <Grid item lg={4} md={12} sm={12} xs={12}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">State</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="State"
              value={countryState}
              onFocus={() => handleError("state", null)}
              onChange={(e) => updateState({ countryState: e.target.value })}
              error={error.state ? true : false}
            >
              <MenuItem disabled value={null}>
                -Select your State-
              </MenuItem>
              <MenuItem value="Jammu & Kashmir">Jammu & Kashmir</MenuItem>
              <MenuItem value="Uttar Pradesh">Uttar Pradesh</MenuItem>
              <MenuItem value="UttraKhand">UttraKhand</MenuItem>
            </Select>
            {error.state && (
              <div className={classes.errorstyles}>{error.state}</div>
            )}
          </FormControl>
        </Grid>
        <Grid item lg={4} md={12} sm={12} xs={12}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">City</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="City"
              value={city}
              onFocus={() => handleError("city", null)}
              onChange={(e) => updateState({ city: e.target.value })}
              error={error.city ? true : false}
            >
              <MenuItem disabled value={null}>
                -Select your City-
              </MenuItem>
              <MenuItem value="Meerut">Meerut</MenuItem>
              <MenuItem value="Delhi">Delhi</MenuItem>
              <MenuItem value="Noida">Noida</MenuItem>
              {/* Add more cities as needed */}
            </Select>
            {error.city && (
              <div className={classes.errorstyles}>{error.city}</div>
            )}
          </FormControl>
        </Grid>
        <Grid item lg={4} sm={12} md={12} xs={12}>
          <TextField
            label="Youtube Link"
            value={youtubeLink}
            variant="outlined"
            fullWidth
            onFocus={() => handleError("youtubeLink", null)}
            onChange={(e) => updateState({ youtubeLink: e.target.value })}
            helperText={error.youtubeLink}
            error={error.youtubeLink ? true : false}
          />
        </Grid>
        <Grid item lg={4} sm={12} md={12} xs={12}>
          <TextField
            label="Free Minutes"
            value={freeMinutes}
            variant="outlined"
            fullWidth
            onChange={(e) => updateState({ freeMinutes: e.target.value })}
            helperText={error.freeMinutes}
            error={error.freeMinutes ? true : false}
          />
        </Grid>
        <Grid item lg={4} sm={12} md={12} xs={12}>
          <TextField
            label="Pin Code"
            value={pinCode}
            variant="outlined"
            fullWidth
            onFocus={() => handleError("pinCode", null)}
            onChange={(e) => updateState({ pinCode: e.target.value })}
            helperText={error.pinCode}
            error={error.pinCode ? true : false}
          />
        </Grid>
        <Grid item lg={4} sm={12} md={12} xs={12}>
          <TextField
            label="Country Phone Code"
            value={countryPhoneCode}
            variant="outlined"
            fullWidth
            onFocus={() => handleError("countryPhoneCode", null)}
            onChange={(e) => updateState({ countryPhoneCode: e.target.value })}
            helperText={error.countryPhoneCode}
            error={error.countryPhoneCode ? true : false}
          />
        </Grid>
        <Grid item lg={4} sm={12} md={12} xs={12}>
          <TextField
            label="About"
            value={about}
            variant="outlined"
            fullWidth
            onFocus={() => handleError("about", null)}
            onChange={(e) => updateState({ about: e.target.value })}
            helperText={error.about}
            error={error.about ? true : false}
          />
        </Grid>
        <Grid item lg={4} sm={12} md={12} xs={12}>
          <TextField
            type="time"
            label="Start Time"
            value={startTime && moment(startTime).format("HH:mm:ss")}
            variant="outlined"
            fullWidth
            helperText={error.startTime}
            onFocus={() => handleError("startTime", null)}
            onChange={(e) => handleTimeChange(e, "startTime")}
            error={error.startTime ? true : false}
          />
        </Grid>
        <Grid item lg={4} sm={12} md={12} xs={12}>
          <TextField
            type="time"
            label="End Time"
            value={endTime && moment(endTime).format("HH:mm:ss")}
            variant="outlined"
            fullWidth
            onFocus={() => handleError("endTime", null)}
            onChange={(e) => handleTimeChange(e, "endTime")}
            helperText={error.endTime}
            error={error.endTime ? true : false}
          />
        </Grid>
        <Grid item lg={4} sm={12} md={12} xs={12}>
          <TextField
            type="number"
            label="Rating"
            value={rating}
            variant="outlined"
            fullWidth
            onFocus={() => handleError("rating", null)}
            onChange={handleRatingChange}
            helperText={error.rating}
            error={error.rating ? true : false}
          />
        </Grid>
      </>
    );
  }
};

const mapStateToProps = (state) => ({
  expertiesData: state.experites.expertiesData,
  mainExpertiesData: state.experites.mainExpertiesData,
  skillsData: state.skills.skillsData,
  remediesData: state.remedies.remediesData,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(EditAstrologer);
