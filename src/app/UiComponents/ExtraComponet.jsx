import React, { useState, useEffect } from 'react';
import CreateModal from "@/app/UiComponents/Models/CreateModal";
import EditModal from "@/app/UiComponents/Models/EditModal";
import { Button, Typography, Box, Divider, SwipeableDrawer, CircularProgress } from "@mui/material";

export default function MediaDrawer({ lessonId, courseId, handleCloseDrawer }) {
    const [mediaItems, setMediaItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [loading, setLoading] = useState(true);

    const multimediaInputs = [
        { data: { id: 'title', type: 'text', label: 'عنوان الوسائط' } },
        { data: { id: 'description', type: 'text', label: 'الوصف' } },
        { data: { id: 'link', type: 'text', label: 'الرابط' } },
        { data: { id: 'type', type: 'select', label: 'النوع', options: [{ name: 'صورة', id: 'IMAGE' }, { name: 'فيديو', id: 'VIDEO' },{ name: 'بي دي اف', id: 'PDF' }] } },
        { data: { id: 'isFree', type: 'switch', label: 'مجاني؟' } },
        { data: { id: 'expectedDuration', type: 'number', label: 'المدة المتوقعة' } },
        { data: { id: 'order', type: 'number', label: 'الترتيب' } },
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
    };

    const handleClose = () => {
        setSelectedItem(null);
    };

    const handleAddNewMedia = () => {
        setSelectedItem({ new: true });
    };


    return (
          <Box className="mt-2">
              <SwipeableDrawer
                    anchor="bottom"
                    open={lessonId}
                    onClose={handleCloseDrawer}
              >
                  <Box
                        sx={{ width: 'auto', height: '90vh', padding: 2, overflowY: 'auto' }}
                        role="presentation"
                  >
                      {loading ? (
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                <CircularProgress />
                            </Box>
                      ) : (
                            <>
                                {mediaItems?.map((mediaItem) => (
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
                            <CreateModal
                                  key="create--1"
                                  setData={setMediaItems}
                                  label="Add Media"
                                  inputs={multimediaInputs}
                                  href={`/admin/courses/${courseId}/lessons/${lessonId}/media`}
                                  extraProps={{ formTitle: 'Add Media', btnText: 'Create', extraId: lessonId }}
                            />
                      {
                            selectedItem && (
                                  <EditModal
                                        open={true}
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
