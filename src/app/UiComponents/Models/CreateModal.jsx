import React, { useState } from "react";
import {
  Alert,
  Backdrop,
  Box,
  Button,
  Fade,
  Modal,
  Snackbar,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import {Form} from "@/app/UiComponents/FormComponents/Forms/Form";
import AddMultiItem from "@/app/UiComponents/FormComponents/MUIInputs/AddMultiItems";

const CreateModal = ({
  setData,
  label,
  inputs,
  href,
  extraProps, multimedia,handleSubmit
}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [multiMediaItems, setMultiMediaItems] = useState([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onSubmit = async (formData) => {
    setLoading(true);
    if(extraProps.extraId){
      href=`${href}?extraId=${extraProps.extraId}`
    }

    try {
      let options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(multimedia?{ ...formData, media: multiMediaItems }:formData),
      };

      const response = await fetch(href, options);
      const result = await response.json();
      if (response.status === 200) {
        if(handleSubmit){
            handleSubmit(result.data);
        }else{

        setData((prevData) => [...prevData, result.data]);
        }
        setSnackbar({
          open: true,
          message: "Successfully created!",
          severity: "success",
        });
        handleClose();
      } else {
        throw new Error(result.message || "Something went wrong");
      }
    } catch (error) {
      setSnackbar({ open: true, message: error.message, severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={"px-2 mb-1"}>
        <Button variant="contained" color="secondary" onClick={handleOpen}>
          {label}
        </Button>
      </div>
      {loading && (
            <Backdrop
                  open={true}
                  sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition

      >
        <Fade in={open}>
          <Box sx={{ ...modalStyle }}>
            <Form
              onSubmit={onSubmit}
              inputs={inputs}
              {...extraProps}
            >

            </Form>

          </Box>
        </Fade>
      </Modal>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: {
    xs: "100%",
    sm: "80%",
    md: "60%",
  },
  maxWidth: {
    md: "600px",
  },
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default CreateModal;

