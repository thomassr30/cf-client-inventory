import { DataGrid, GridColDef } from "@mui/x-data-grid";

interface Props {
  columns: GridColDef[];
  rows: any[];
  rowSelection?: boolean;
}

export const GenericTable = ({
  columns,
  rows,
  rowSelection = false,
}: Props) => {
  return (
    <div>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10]}
        rowSelection={rowSelection}
        checkboxSelection={rowSelection}
        sx={{
          backgroundColor: "white",
        }}
      />
    </div>
  );
};
