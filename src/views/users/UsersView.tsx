import { useGetUsers } from "@/hooks/useGetUsers";
import { GenericTable } from "@/shared/components";
import { MdEdit } from "react-icons/md";
import { GridColDef } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import { FaCircle } from "react-icons/fa";

interface RowData {
  id: number;
  lastName: string;
  firstName: string;
  age: number | null;
  isActive: boolean;
}

export const UsersView = () => {
  const query = useGetUsers();
  console.log(query.data?.data);

  const handleEdit = (row: any) => {
    console.log(row);
  };

  const columns: GridColDef<RowData>[] = [
    {
      field: "rut",
      headerName: "RUT",
      width: 90,
      editable: false,
      filterable: false,
      sortable: false,
      hideable: false,
    },
    {
      field: "name",
      headerName: "Nombre",
      width: 150,
      editable: false,
      filterable: false,
      sortable: false,
      hideable: false,
    },
    {
      field: "lastName",
      headerName: "Apellido Paterno",
      width: 150,
      editable: false,
      filterable: false,
      sortable: false,
      hideable: false,
    },
    {
      field: "email",
      headerName: "Correo",
      width: 250,
      editable: false,
      filterable: false,
      sortable: false,
      hideable: false,
    },
    {
      field: "phone",
      headerName: "Telefono",
      width: 150,
      editable: false,
      filterable: false,
      sortable: false,
      hideable: false,
      renderCell: (params) => {
        if (params.value === null) {
          return "----";
        }
        return params.value;
      },
    },
    {
      field: "isActive",
      headerName: "Activo",
      editable: false,
      filterable: false,
      sortable: false,
      hideable: false,
      width: 160,
      renderCell: (params) => {
        const isActive = params.value === true;

        return (
          <>
            <span className="flex flex-row gap-1 items-center">
              <FaCircle
                className={
                  isActive
                    ? "text-green-500 text-[10px]"
                    : "text-red-500 text-[10px]"
                }
              />
              {isActive ? "Activo" : "Inactivo"}
            </span>
          </>
        );
      },
    },
    {
      field: "editButton",
      headerName: "Editar",
      width: 100,
      editable: false,
      filterable: false,
      sortable: false,
      hideable: false,
      align: "center", // Centrar el contenido del botón
      renderCell: (params) => {
        return (
          <IconButton
            aria-label="delete"
            onClick={() => handleEdit(params.row)}
          >
            <MdEdit />
          </IconButton>
        );
      },
    },
  ];

  return (
    <div className="w-full">
      <GenericTable columns={columns} rows={query.data?.data ?? []} />
    </div>
  );
};
