import React, { useEffect } from "react";
import { Box, IconButton, Tooltip, Container, Typography } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridPaginationModel,
  GridRenderCellParams,
  GridRowsProp,
  GridToolbar,
} from "@mui/x-data-grid";
import { useState } from "react";
import axios from "axios";
const SLOTS_PROPS = {
  toolbar: {
    showQuickFilter: true,
    quickFilterProps: { debounceMs: 500 },
  },
};

const SLOTS = {
  toolbar: GridToolbar,
};

const ROWS_PER_PAGE = [10, 25, 50, 100];
const convertData = (data: any[]) =>
  data.map((el, index) => {
    return {
      id: el.id["S"],
      amount: el.amount["S"],
      type: el.type["S"],
    };
  });


export default function Home() {
  const [data, setData] = useState<any[]>([]);
  const [rowCount, setcount] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/getAll?page=${pagination.page}`);
        const responseData: any = response.data;
        console.log(responseData);

        setData(responseData.itens);
        setcount(responseData.count);

      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchData();
  }, []);
  const [pagination, setPagination] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });

  const rows: GridRowsProp = convertData(data)


  const columns: GridColDef[] = [
    { field: "id", headerName: "Id", flex: 1 },
    { field: "amount", headerName: "Amount", flex: 1 },
    { field: "type", headerName: "Type", flex: 1 },
  ];

  const GRID_INITIL_STATE = {
    pagination: {
      paginationModel: { pageSize: pagination.pageSize, page: pagination.page },
    },
  };

  function handleOnPageChange(paginationModel: GridPaginationModel) {
    setPagination({
      page: paginationModel.page + 1,
      pageSize: paginationModel.pageSize,
    });
  }


  return (
    <Container maxWidth="lg" sx={{ color: "white", my: 12 }}>
      <Box sx={{ display: "flex", height: 700 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          slots={SLOTS}
          slotProps={SLOTS_PROPS}
          disableColumnFilter
          disableColumnSelector
          disableDensitySelector
          disableRowSelectionOnClick
          disableColumnMenu
          initialState={GRID_INITIL_STATE}
          onPaginationModelChange={handleOnPageChange}
          rowCount={rowCount}
          pageSizeOptions={ROWS_PER_PAGE}
        />
      </Box>
    </Container>
  );
}
