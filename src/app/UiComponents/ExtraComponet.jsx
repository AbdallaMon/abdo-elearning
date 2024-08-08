import React, { useState, useEffect } from 'react';
import CreateModal from "@/app/UiComponents/Models/CreateModal";
import EditModal from "@/app/UiComponents/Models/EditModal";
import { Button, Typography, Box, Divider, SwipeableDrawer } from "@mui/material";

const ExtraComponent = ({ inputs, href, setData, lessonId, existingData }) => {
    const [mediaItems, setMediaItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [drawerOpen, setDrawerOpen] = useState(false);

    useEffect(() => {
        if (existingData && existingData.length > 0) {
            setMediaItems(existingData);
        }
    }, [existingData]);

    const handleOpen = (item) => {
        setSelectedItem(item);
    };

    const handleClose = () => {
        setSelectedItem(null);
    };

    const handleAddNewMedia = () => {
        setSelectedItem({ new: true });
    };

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    return (
          <Box className="mt-2">
              <Button
                    variant="contained"
                    color="secondary"
                    onClick={toggleDrawer(true)}
              >
                    الوسائط
              </Button>
              <SwipeableDrawer
                    anchor="bottom"
                    open={drawerOpen}
                    onClose={toggleDrawer(false)}
                    onOpen={toggleDrawer(true)}
              >
                  <Box
                        sx={{ width: 'auto', height: '90vh', padding: 2, overflowY: 'auto' }}
                        role="presentation"
                        onClick={toggleDrawer(false)}
                        onKeyDown={toggleDrawer(false)}
                  >
                      {mediaItems.map((mediaItem) => (
                            <Box key={mediaItem.id} sx={{ mb: 2 }}>
                                <Typography variant="h6">{mediaItem.title}</Typography>
                                <Button
                                      variant="contained"
                                      color="primary"
                                      onClick={() => handleOpen(mediaItem)}
                                      sx={{ mt: 1 }}
                                >
                                    <Typography variant="body2">ID: {mediaItem.id}</Typography>
                                    تعديل
                                </Button>
                                <Divider sx={{ my: 2 }} />
                            </Box>
                      ))}
                      <Button
                            variant="contained"
                            color="secondary"
                            onClick={handleAddNewMedia}
                      >
                          Add Media
                      </Button>
                      {selectedItem && selectedItem.new ? (
                            <CreateModal
                                  key="create--1"
                                  setData={setMediaItems}
                                  label="Add Media"
                                  inputs={inputs}
                                  href={href}
                                  extraProps={{ formTitle: 'Add Media', btnText: 'Create', extraId: lessonId }}
                            />
                      ) : (
                            selectedItem && (
                                  <EditModal
                                        open={true}
                                        handleClose={handleClose}
                                        item={selectedItem}
                                        inputs={inputs}
                                        setData={setMediaItems}
                                        href={`${href}/${selectedItem.id}?extraId=${lessonId}`}
                                  />
                            )
                      )}
                  </Box>
              </SwipeableDrawer>
          </Box>
    );
};

export default ExtraComponent;
