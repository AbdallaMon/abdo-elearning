import React, {useState, useEffect} from 'react';
import CreateModal from "@/app/UiComponents/Models/CreateModal";
import EditModal from "@/app/UiComponents/Models/EditModal";
import {Button, Typography, Box, Divider, SwipeableDrawer, CircularProgress} from "@mui/material";
import DeleteModal from "@/app/UiComponents/Models/DeleteModal";

export default function MediaDrawer({lessonId, courseId, handleCloseDrawer}) {
    const [mediaItems, setMediaItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false)
    const multimediaInputs = [
        {
            data: {id: 'title', type: 'text', label: 'عنوان الوسائط'}, pattern: {
                required: {
                    value: true,
                    message: "Required field",
                }
            }
        },
        {
            data: {id: 'description', type: 'textarea', label: 'الوصف'}, pattern: {
                required: {
                    value: true,
                    message: "Required field",
                }
            }
        },
        {
            data: {id: 'link', type: 'text', label: 'الرابط'}, pattern: {
                required: {
                    value: true,
                    message: "Required field",
                }
            }
        },
        {
            data: {
                id: 'type',
                type: 'select',
                label: 'النوع',
                options: [{name: 'صورة', id: 'IMAGE'}, {name: 'فيديو', id: 'VIDEO'}, {name: 'بي دي اف', id: 'PDF'}]
            }, pattern: {
                required: {
                    value: true,
                    message: "Required field",
                }
            }
        },
        {
            data: {id: 'isFree', type: 'switch', label: 'مجاني؟'}, pattern: {
                required: {
                    value: true,
                    message: "Required field",
                }
            }
        },

        {
            data: {id: 'order', type: 'number', label: 'الترتيب'}, pattern: {
                required: {
                    value: true,
                    message: "Required field",
                }
            }
        },
    ];

    useEffect(() => {
        const fetchMedia = async () => {
            try {
                const response = await fetch(`/api/admin/courses/${courseId}/lessons/${lessonId}/media`);
                const res = await response.json();
                setMediaItems(res.data);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch media items", error);
                setLoading(false);
            }
        };

        fetchMedia();
    }, [lessonId]);

    const handleOpen = (item) => {
        setSelectedItem(item);
        setEditOpen(true)
    };

    const handleClose = () => {
        setSelectedItem(null);
        setEditOpen(false)
    };

    const handleDeleteOpen = (item) => {
        setSelectedItem(item);
        setDeleteOpen(true);
    };

    const handleDeleteClose = () => {
        setDeleteOpen(false);
        setSelectedItem(null);
    };


    return (
          <Box className="mt-2">
              <SwipeableDrawer
                    anchor="bottom"
                    open={lessonId}
                    onClose={handleCloseDrawer}
              >
                  <Box
                        sx={{width: 'auto', height: '90vh', padding: 2, overflowY: 'auto'}}
                        role="presentation"
                  >
                      {loading ? (
                            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
                                <CircularProgress/>
                            </Box>
                      ) : (
                            <>
                                <CreateModal
                                      setData={setMediaItems}
                                      label="Add Media"
                                      inputs={multimediaInputs}
                                      href={`/admin/courses/${courseId}/lessons/${lessonId}/media`}
                                      extraProps={{formTitle: 'Add Media', btnText: 'Create', extraId: lessonId}}
                                />
                                {mediaItems?.map((mediaItem) => (
                                      <Box key={mediaItem.id} sx={{mb: 2}}>
                                          <Typography variant="h6">{mediaItem.title}</Typography>
                                          <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => handleOpen(mediaItem)}
                                                sx={{mt: 1}}

                                          >
                                              تعديل
                                              <Typography variant="body2" ml={1}>  {mediaItem.title}</Typography>
                                          </Button>
                                          <Button
                                                variant="contained"
                                                color="secondary"
                                                onClick={() => handleDeleteOpen(mediaItem)}
                                                sx={{mt: 1, mx: 1}}
                                          >
                                              حذف
                                              <Typography variant="body2" ml={1}>  {mediaItem.title}</Typography>
                                          </Button>
                                          <Divider sx={{my: 2}}/>
                                      </Box>
                                ))}

                                <DeleteModal
                                      open={deleteOpen}
                                      handleClose={handleDeleteClose}
                                      item={selectedItem}
                                      setData={setMediaItems}
                                      href={`/admin/courses/${courseId}/lessons/${lessonId}/media`}
                                />
                                {
                                      selectedItem && (
                                            <EditModal
                                                  open={editOpen}
                                                  handleClose={handleClose}
                                                  item={selectedItem}
                                                  inputs={multimediaInputs}
                                                  setData={setMediaItems}
                                                  href={`/admin/courses/${courseId}/lessons/${lessonId}/media`}
                                            />
                                      )
                                }
                            </>
                      )}
                  </Box>
              </SwipeableDrawer>
          </Box>
    );
}
