import { useState } from "react";
import { useGetLocation } from "@/hooks/useGetLocation";
import { AddButon } from "@/shared/components/addButon/AddButon";
import { Loading } from "@/shared/components/loading/Loading";
import { MdEdit, MdDelete } from "react-icons/md";
import IconButton from "@mui/material/IconButton";
import {
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { ILocation } from "interfaces/location.interface";
import { LocationService } from "@/api/location.service";
import { DialogConfirm } from "@/shared/components/dialogConfirm/DialogConfirm";

export const LocationView = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [isEdit, setisEdit] = useState<boolean>(false);
  const [locationData, setlocationData] = useState<ILocation | undefined>(
    undefined
  );
  const [showDialog, setshowDialog] = useState(false);
  const [id, setId] = useState<string>("");

  const { data, isLoading, refetch, isRefetching } = useGetLocation();
  const { register, handleSubmit, reset } = useForm();

  if (isLoading || isRefetching) {
    return <Loading />;
  }

  const handleOpen = (data?: ILocation | null) => {
    setOpen(true);
    if (data) {
      setlocationData(data);
      setisEdit(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
    reset();
    if (isEdit) {
      setlocationData(undefined);
      setisEdit(false);
    }
  };

  const handleDeleteLocation = async (id: string) => {
    setshowDialog(true);
    setId(id);
  };

  const closeDialog = () => {
    setshowDialog(false);
    setId("");
    refetch();
  };

  const onSubmit = handleSubmit(async (data) => {
    if (isEdit) {
      const updateData: ILocation = {
        id: locationData?.id,
        name: data.name,
        description: data.description,
      };
      await LocationService.updateLocation(updateData);
      refetch();
    } else {
      const createData: ILocation = {
        name: data.name,
        description: data.description,
      };
      await LocationService.createLocation(createData);
      refetch();
    }
  });

  return (
    <div className="bg-white rounded-xl p-10">
      <h1>Locaciones</h1>

      <div className="flex justify-end mt-5">
        <AddButon title="Crear" onClick={() => handleOpen(null)} />
      </div>

      <div className="mt-10">
        <TableContainer sx={{ overflowX: "auto" }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>Nº</TableCell>
                <TableCell align="right">Nombre</TableCell>
                <TableCell align="right">Descripción</TableCell>
                <TableCell align="right">Acción</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row: ILocation, idx: number) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {idx + 1}
                  </TableCell>
                  <TableCell align="right">{row.name}</TableCell>
                  <TableCell align="right">{row.description}</TableCell>
                  <TableCell
                    align="right"
                    sx={{ display: "flex", flexDirection: "row" }}
                  >
                    <IconButton
                      aria-label="edit"
                      color="primary"
                      onClick={() => handleOpen(row)}
                    >
                      <MdEdit />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      color="error"
                      onClick={() => handleDeleteLocation(row.id ?? "")}
                    >
                      <MdDelete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white lg:w-[700px] w-3/4 p-5 rounded-xl">
          <h1 className="my-3 text-3xl text-gray-500">
            {isEdit ? `Editar ${locationData?.name}` : "Crear Locación"}
          </h1>
          <form onSubmit={onSubmit}>
            {isEdit && (
              <TextField
                {...register("id")}
                id="outlined-basic"
                label="Id"
                variant="outlined"
                fullWidth
                disabled={true}
                defaultValue={locationData?.id}
                sx={{ marginTop: "10px" }}
              />
            )}
            <TextField
              {...register("name", { required: true })}
              id="outlined-basic"
              label="Nombre"
              variant="outlined"
              fullWidth
              defaultValue={locationData?.name}
              sx={{ marginTop: "10px" }}
            />

            <TextField
              {...register("description", { required: true })}
              id="outlined-basic"
              label="Descripción"
              variant="outlined"
              fullWidth
              defaultValue={locationData?.description}
              sx={{ marginTop: "10px" }}
            />
            <button
              type="submit"
              className="w-full bg-green-100 text-green-600 mt-10 rounded-xl p-3"
            >
              Guardar
            </button>
          </form>
        </div>
      </Modal>
      <DialogConfirm
        open={showDialog}
        handleClose={closeDialog}
        option="location"
        title="Eliminar locación"
        description="¿Estás seguro de eliminar esta locación?"
        id={id}
      />
    </div>
  );
};
