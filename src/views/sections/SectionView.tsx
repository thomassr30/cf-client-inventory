import { useState } from "react";
import { useGetLocation } from "@/hooks/useGetLocation";
import { AddButon } from "@/shared/components/addButon/AddButon";
import { Loading } from "@/shared/components/loading/Loading";
import { MdEdit, MdDelete } from "react-icons/md";
import IconButton from "@mui/material/IconButton";
import { IoEyeSharp } from "react-icons/io5";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { ISection } from "interfaces/section.interface";
import { useGetSection } from "@/hooks/useGetSection";
import { ILocation } from "interfaces/location.interface";
import { SectionService } from "@/api/section.service";
import { ListItemComponent } from "@/shared/components/listItemComponent/ListItemComponent";
import { DialogConfirm } from "@/shared/components/dialogConfirm/DialogConfirm";

export const SectionView = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [showModalList, setshowModalList] = useState<boolean>(false);
  const [isEdit, setisEdit] = useState<boolean>(false);
  const [sectionData, setsectionData] = useState<ISection | undefined>(
    undefined
  );
  const [idLocation, setidLocation] = useState<string>("");
  const [showDialog, setshowDialog] = useState(false);
  const [id, setId] = useState<string>("");

  const query = useGetLocation();
  const { data, isLoading, refetch, isRefetching } = useGetSection();
  const { register, handleSubmit, reset, control } = useForm();

  if (isLoading || isRefetching) {
    return <Loading />;
  }

  const handleDeleteSection = async (id: string) => {
    setshowDialog(true);
    setId(id);
  };

  const closeDialog = () => {
    setshowDialog(false);
    setId("");
    refetch();
  };

  const handleOpen = (data?: ISection | null) => {
    setOpen(true);
    if (data) {
      setsectionData(data);
      setisEdit(true);
    }
  };
  const handleClose = () => {
    setOpen(false);
    reset();
    if (isEdit) {
      setsectionData(undefined);
      setisEdit(false);
    }
  };

  const handleListOpen = (locationId: string) => {
    setidLocation(locationId);
    setshowModalList(true);
  };
  const handleListClose = () => {
    setshowModalList(false);
    setidLocation("");
  };

  const onSubmit = handleSubmit(async (data) => {
    if (isEdit) {
      const updateData: ISection = {
        name: data.name,
        description: data.description,
        locationId: data.locacion,
      };

      await SectionService.updateSection(sectionData?.id ?? "", updateData);

      refetch();
    } else {
      const createData: ISection = {
        name: data.name,
        description: data.description,
        locationId: data.locacion,
      };
      await SectionService.createSection(createData);
      refetch();
    }
  });

  return (
    <div className="bg-white rounded-xl p-10">
      <h1>Secciones</h1>

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
                <TableCell align="right">Locación</TableCell>
                <TableCell align="right">Items</TableCell>
                <TableCell align="right">Acción</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row: ISection, idx: number) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {idx + 1}
                  </TableCell>
                  <TableCell align="right">{row.name}</TableCell>
                  <TableCell align="right">{row.description}</TableCell>
                  <TableCell align="right">{row.location}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      aria-label="fingerprint"
                      color="primary"
                      onClick={() => handleListOpen(row.id ?? "")}
                    >
                      <IoEyeSharp />
                    </IconButton>
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ display: "flex", flexDirection: "row" }}
                  >
                    <IconButton
                      color="primary"
                      aria-label="delete"
                      onClick={() => handleOpen(row)}
                    >
                      <MdEdit />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      color="error"
                      onClick={() => handleDeleteSection(row.id ?? "")}
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
            {isEdit ? `Editar ${sectionData?.name}` : "Crear Sección"}
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
                defaultValue={sectionData?.id}
                sx={{ marginTop: "10px" }}
              />
            )}
            <TextField
              {...register("name", { required: true })}
              id="outlined-basic"
              label="Nombre"
              variant="outlined"
              fullWidth
              defaultValue={sectionData?.name}
              autoComplete="off"
              sx={{ marginTop: "10px" }}
            />

            <TextField
              {...register("description", { required: true })}
              id="outlined-basic"
              label="Descripción"
              variant="outlined"
              fullWidth
              defaultValue={sectionData?.description}
              autoComplete="off"
              sx={{ marginTop: "10px" }}
            />
            <Controller
              name="locacion"
              control={control}
              defaultValue={sectionData?.locationId || ""}
              rules={{ required: "Selecciona una locación" }}
              render={({ field }) => (
                <FormControl fullWidth sx={{ marginTop: "10px" }}>
                  <InputLabel id="demo-simple-select-label">
                    Locación
                  </InputLabel>
                  <Select
                    {...field}
                    label="locacion"
                    value={field.value || ""}
                    onChange={(e) => field.onChange(e.target.value)}
                  >
                    {query.data?.map((location: ILocation) => (
                      <MenuItem key={location.id} value={location.id}>
                        {location.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
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

      <Modal
        open={showModalList}
        onClose={handleListClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <>
          <ListItemComponent locationId={idLocation} />
        </>
      </Modal>
      <DialogConfirm
        open={showDialog}
        handleClose={closeDialog}
        option="section"
        title="Eliminar Sección"
        description="¿Estás seguro de eliminar esta Sección?"
        id={id}
      />
    </div>
  );
};
