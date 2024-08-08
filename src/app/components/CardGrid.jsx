import React, { useState } from 'react';
import {
    Backdrop,
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Divider,
    FormControl,
    Grid,
    MenuItem,
    Pagination,
    Select,
    Typography
} from '@mui/material';
import EditModal from "@/app/UiComponents/Models/EditModal";
import { colors } from "@/constants/constants";

export default function AdminCardGrid({
                                          data,
                                          properties,
                                          page,
                                          setPage,
                                          limit,
                                          setLimit,
                                          total,
                                          setData,
                                          inputs,
                                          loading,
                                          withEdit,
                                          editHref,
                                          extraComponent: ExtraComponent,
                                          extraComponentProps
                                      }) {
    const [open, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const handleOpen = (item) => {
        setSelectedItem(item);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedItem(null);
    };

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const handleLimitChange = (event) => {
        setLimit(parseInt(event.target.value, 10));
    };

    const totalPages = Math.ceil(total / limit);

    const getPropertyValue = (item, propertyPath) => {
        return propertyPath.split('.').reduce((acc, part) => acc && acc[part], item);
    };

    return (
          <Box sx={{ padding: '16px' }}>
              <Grid container spacing={3} sx={{ width: '100%' }}>
                  {data?.map((item) => (
                        <Grid item xs={12} sm={6} md={4} xl={3} key={item.id}>
                            <Card
                                  sx={{
                                      backgroundColor: colors.backgroundColor1,
                                      color: colors.headingColor,
                                      borderRadius: '8px',
                                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                      '&:hover': {
                                          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                                      },
                                      "&.MuiPaper-root ": {
                                          height: '100%'
                                      }
                                  }}
                            >
                                {item.image && (
                                      <img
                                            height={250}
                                            width={'100%'}
                                            src={item.image}
                                            className={"h-[220px] max-h-[220px]"}
                                            alt={item.title || 'Image'}
                                      />
                                )}
                                <CardContent sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    height: '100%'
                                }}>
                                    <Box>
                                        {properties.map((prop) => (
                                              <Box key={prop.name} sx={{ marginBottom: '12px', direction: "ltr" }}>
                                                  <Typography
                                                        variant="body2"
                                                        color="textSecondary"
                                                        sx={{ fontWeight: 'bold', display: 'inline' }}
                                                  >
                                                      {prop.label ? `${prop.label}: ` : ''}
                                                  </Typography>
                                                  <Typography
                                                        variant="body2"
                                                        color="textPrimary"
                                                        sx={{
                                                            display: 'inline',
                                                            whiteSpace: 'normal',
                                                            wordBreak: 'break-word'
                                                        }}
                                                  >
                                                      {getPropertyValue(item, prop.name)}
                                                  </Typography>
                                              </Box>
                                        ))}
                                    </Box>

                                    <Divider sx={{ marginY: '16px' }} />
                                    {withEdit &&
                                          <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => handleOpen(item)}
                                                sx={{ width: '100%' }}
                                          >
                                              تعديل
                                          </Button>}
                                    {ExtraComponent && (
                                          <ExtraComponent
                                                {...extraComponentProps}
                                                lessonId={item.id}
                                                setData={setData}
                                                existingData={item.media || []}
                                          />
                                    )}
                                </CardContent>
                            </Card>
                        </Grid>
                  ))}
              </Grid>
              <Box sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: '16px',
                  flexDirection: 'row-reverse'
              }}>
                  <Pagination
                        count={totalPages}
                        page={page}
                        onChange={handlePageChange}
                        color="primary"
                  />
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography variant="body2" sx={{ marginRight: '8px' }}>
                          Number of items per page:
                      </Typography>
                      <FormControl variant="outlined" size="small">
                          <Select
                                value={limit}
                                onChange={handleLimitChange}
                                sx={{ backgroundColor: 'white' }}
                          >
                              {[1, 20, 50, 100].map((size) => (
                                    <MenuItem key={size} value={size}>
                                        {size}
                                    </MenuItem>
                              ))}
                          </Select>
                      </FormControl>
                  </Box>
              </Box>
              {selectedItem && withEdit && (
                    <EditModal
                          open={open}
                          handleClose={handleClose}
                          item={selectedItem}
                          inputs={inputs}
                          setData={setData}
                          href={editHref}
                    />
              )}
              <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
                  <CircularProgress color="inherit" />
              </Backdrop>
          </Box>
    );
};
