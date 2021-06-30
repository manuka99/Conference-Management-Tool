import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import UserForm from "../User";
import ResearcherForm from "./ResearcherForm";
import Api from "../../../../../common/Api";
import { authenticate } from "../../../../../common/auth";
import Success from "./Success";
import Error from "../../../../../components/alerts/Error";
import { getConvertedFormData } from "../../../../../common/util";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ButtonProgress from "../../../../../components/common/ButtonProgress/ButtonProgress";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  layout: {
    width: "auto",
  },
  paper: {
    padding: theme.spacing(2, 4, 0),
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
    width: "60%",
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ["Profile", "Researcher details"];

export default function Index() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = React.useState(0);
  const [loadingBtn, setLoadingBtn] = React.useState(false);

  const [registerInfo, setRegisterInfo] = useState({
    role: "MEMBER",
    sub_role: "RESEARCHER",
  });

  const [file, setFile] = useState({});

  const [errors, setErrors] = useState({});

  const handleForm = (event) => {
    setRegisterInfo({
      ...registerInfo,
      [event.target.name]: event.target.value,
    });
    delete errors[event.target.name];
  };

  const handleUpload = (files) => {
    console.log(files);
    if (files.length > 0) setFile(files[0]);
    else setFile({});
  };

  const registerSubmit = () => {
    setErrors({});
    var registerFormData = getConvertedFormData(registerInfo);
    registerFormData.append("file", file);
    setLoadingBtn(true);
    Api()
      .post("/public/register", registerFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        const { user, token } = res.data.data;
        setTimeout(() => {
          authenticate(user, token);
        }, 5000);
        setActiveStep(activeStep + 1);
      })
      .catch(
        (err) =>
          err.response &&
          err.response.data &&
          setErrors({
            msg: err.response.data.data.msg,
            ...err.response.data.data.params,
          })
      )
      .finally(() => setLoadingBtn(false));
  };

  const handleNext = () => {
    if (activeStep === steps.length - 1) registerSubmit();
    else setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <UserForm
            registerInfo={registerInfo}
            handleForm={handleForm}
            errors={errors}
          />
        );
      case 1:
        return (
          <ResearcherForm
            file={file}
            handleUpload={handleUpload}
            errors={errors}
          />
        );
      default:
        throw new Error("Unknown step");
    }
  }

  return (
    <React.Fragment>
      <main className={classes.layout}>
        <div className={classes.paper}>
          <Button
            onClick={() => navigate("/public/auth/register")}
            variant="outlined"
            color="secondary"
            size="small"
            startIcon={<ArrowBackIcon />}
          >
            Back to registration
          </Button>
          <Typography variant="h5" align="center">
            <b>Register as an Researcher</b>
          </Typography>
          {errors.msg && <Error message={errors.msg} />}
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <React.Fragment>
            {activeStep === steps.length ? (
              <Success />
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  {activeStep === steps.length - 1 ? (
                    <ButtonProgress
                      variant="contained"
                      color="primary"
                      name="Register now"
                      onClick={handleNext}
                      loading={loadingBtn}
                      className={classes.button}
                    />
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      className={classes.button}
                    >
                      Next
                    </Button>
                  )}
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </div>
      </main>
    </React.Fragment>
  );
}
