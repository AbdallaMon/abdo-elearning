// src/app/UiComponents/Tables/MainTable.jsx
import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, CircularProgress } from '@mui/material';
import { colors, paginationOptions } from '@/app/constants';

const MainTable = ({ columns, rows, page, totalPages, limit, setPage, setLimit, loading }) => {
    const handlePageChange = (params) => {
        setPage(params.page + 1); // DataGrid page index starts from 0, but our API expects it to start from 1
    };

    const handlePageSizeChange = (params) => {
        setLimit(params.pageSize);
    };

    return (
          <Box
                sx={{
                    height: '100vh',
                    width: "100%",
                    overflow: 'auto', // Ensure no overflow beyond the parent container
                    '& .MuiDataGrid-root': {
                        direction: 'rtl', // Enable RTL
                    },
                    '& .MuiDataGrid-columnHeaders': {
                        backgroundColor: colors.heading, // Different background for the header row
                        color: colors.bgPrimary,
                        fontSize: '1rem',
                    },
                    '& .MuiDataGrid-columnHeader': {
                        backgroundColor: colors.heading,
                        color: colors.bgPrimary,
                        "&:hover": {
                            backgroundColor: colors.heading,
                        },
                    },
                    '& .MuiDataGrid-cell': {
                        color: colors.body,
                        fontSize: '0.875rem',
                    },
                    '& .MuiDataGrid-row:nth-of-type(odd)': {
                        backgroundColor: '#F5F5F5', // Light grey for odd rows
                    },
                    '& .MuiDataGrid-row:nth-of-type(even)': {
                        backgroundColor: '#E0E0E0', // Slightly darker grey for even rows
                    },
                    '& .MuiDataGrid-footerContainer': {
                        backgroundColor: colors.secondary,
                        color: 'white', // Set color to white for the footer pagination and row per item
                    },
                    '& .MuiTablePagination-root': {
                        backgroundColor: colors.secondary,
                        color: 'white', // Set color to white for the pagination controls
                    },

                }}
          >
              {loading ? (
                    <Box
                          sx={{
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              height: '100%',
                          }}
                    >
                        <CircularProgress />
                    </Box>
              ) : (
                    <DataGrid
                          rows={rows}
                          columns={columns}
                          disableColumnMenu // Disable the column menu
                          sx={{
                              "& .MuiDataGrid-columnHeaders .MuiDataGrid-filler": {
                                  backgroundColor: colors.heading,
                              },
                              width: '100%',
                          }}
                          pagination
                          pageSize={limit}
                          rowsPerPageOptions={paginationOptions}
                          rowCount={totalPages * limit}
                          paginationMode="server"
                          onPageChange={handlePageChange}
                          onPageSizeChange={handlePageSizeChange}
                          page={page - 1} // DataGrid page index starts from 0
                          loading={loading}
                    />
              )}
          </Box>
    );
};

export default MainTable;
