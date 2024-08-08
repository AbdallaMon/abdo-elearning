import React, {useEffect, useState} from 'react';
import {Alert, Backdrop, Box, Fade, Modal, Snackbar} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import {Form} from "@/app/UiComponents/FormComponents/Forms/Form";
import AddMultiItem from "@/app/UiComponents/FormComponents/MUIInputs/AddMultiItems";

const EditModal = ({open, handleClose, item, inputs, setData, href,multimedia}) => {
    const [loading, setLoading] = useState(false);
    const [snackbar, setSnackbar] = useState({open: false, message: '', severity: 'success'});
    const [options, setOptions] = useState({});
    const [multiMediaItems, setMultiMediaItems] = useState(item.media || []);

    useEffect(() => {
        inputs.forEach(async (input) => {
            if (input.getData) {
                const result = await input.getData();
                setOptions((prevOptions) => ({
                    ...prevOptions,
                    [input.data.id]: result.data,
                }));
            }
        });
    }, [inputs, item]);

    const onSubmit = async (formData) => {
        setLoading(true);
        // Merge form data with multiMediaItems
        const changes =multimedia? {
            ...formData,
            media: multiMediaItems,
        }:formData;

        try {
            let options = {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(changes),
            };
            const response = await fetch(`${href}/${item.id}`, options);
            const result = await response.json();
            if (response.status === 200) {
                setData((prevData) => prevData.map((dataItem) => dataItem.id === result.data.id ? result.data : dataItem));
                setSnackbar({open: true, message: 'Successfully updated!', severity: 'success'});
                handleClose();
            } else {
                throw new Error(result.message || 'Something went wrong');
            }
        } catch (error) {
            setSnackbar({open: true, message: error.message, severity: 'error'});
        } finally {
            setLoading(false);
        }
    };

    const prefilledInputs = inputs.map(input => ({
        ...input,
        data: {
            ...input.data,
            defaultValue: item[input.data.id] ?? input.data.defaultValue,
        }
    }));

    return (
          <>
              {loading && (
                    <Backdrop open={true} sx={{zIndex: (theme) => theme.zIndex.drawer + 1000}}>
                        <CircularProgress color="inherit"/>
                    </Backdrop>
              )}
              <Modal
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition

              >
                  <Fade in={open}>
                      <Box sx={{...modalStyle}}>
                          <Form
                                onSubmit={onSubmit}
                                inputs={prefilledInputs.map(input => ({
                                    ...input,
                                    options: options[input.data.id] || [],
                                }))}
                                formTitle={`Edit ${item.title}`}
                                btnText="Save Changes"
                          >
                          </Form>

                      </Box>
                  </Fade>
              </Modal>
              <Snackbar
                    open={snackbar.open}
                    autoHideDuration={6000}
                    onClose={() => setSnackbar({...snackbar, open: false})}
              >
                  <Alert onClose={() => setSnackbar({...snackbar, open: false})} severity={snackbar.severity}>
                      {snackbar.message}
                  </Alert>
              </Snackbar>
          </>
    );
};

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxHeight: '90%',
    overflow: "auto",
    width: {
        xs: '100%',
        sm: '80%',
        md: '60%',
    },
    maxWidth: {
        md: '600px',
    },
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

export default EditModal;
