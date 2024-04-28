import { ItemService } from "@/api/item.service";
import { useGetSection } from "@/hooks/useGetSection";
import { AddButon } from "@/shared/components/addButon/AddButon";
import { Loading } from "@/shared/components/loading/Loading";
import {
  Autocomplete,
  FormControl,
  IconButton,
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
import { IGetItemBySection, IItemData } from "interfaces/item.interface";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { MdChecklist, MdEdit } from "react-icons/md";

export const ItemView = () => {
  const [itemData, setitemData] = useState<IGetItemBySection | undefined>();
  const [isloading, setisloading] = useState<boolean>(false);
  const [isEdit, setisEdit] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [dataSelected, setdataSelected] = useState<IItemData | undefined>(
    undefined
  );
  const [itemId, setitemId] = useState<number | undefined>(undefined);
  const [successData, setsuccessData] = useState(false);
  const [errorData, seterrorData] = useState(false);

  const { register, handleSubmit, reset, control } = useForm();

  const allSection = useGetSection();

  const handleOpen = (data?: IItemData | undefined) => {
    if (data) {
      setisEdit(true);
      setitemId(data.id);
    }
    setOpen(true);
    setdataSelected(data);
  };

  const handleClose = () => {
    setOpen(false);
    setisEdit(false);
    reset();
    setdataSelected(undefined);
    setitemId(undefined);
  };

  useEffect(() => {}, [itemData]);

  const handleSelectionChange = async (event: any, newValue: any | null) => {
    setisloading(true);
    const result = await getItems(newValue.id);
    setitemData(result);
    setisloading(false);
  };

  const getItems = async (sectionId: string) => {
    try {
      const items = await ItemService.itemsBySection(sectionId);
      return items;
    } catch (error) {
      throw new Error("Error al obtener items por sección");
    }
  };

  const onSubmit = handleSubmit(async (data) => {
    if (isEdit) {
      const dataUpdate = {
        name: data.name,
        description: data.description,
        quantity: data.quantity,
        sectionId: data.section,
      };
      const { status } = await ItemService.updateItem(itemId ?? 0, dataUpdate);
      if (status === 200 || status === 201) {
        setsuccessData(true);
      }

      if (status >= 300) {
        seterrorData(true);
      }
    } else {
      const dataCreate = {
        name: data.name,
        description: data.description,
        quantity: data.quantity,
        sectionId: data.section,
      };
      const { status } = await ItemService.createItem(dataCreate);

      if (status === 200 || status === 201) {
        setsuccessData(true);
      }

      if (status >= 300) {
        seterrorData(true);
      }
    }
  });

  return (
    <div className="bg-white rounded-xl p-10">
      <h1>Items</h1>

      <div className="flex flex-col gap-3 lg:flex-row justify-center lg:justify-between mt-5">
        <div className="w-full lg:w-1/3">
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={Array.isArray(allSection.data) ? allSection.data : []}
            getOptionLabel={(option) => option.name}
            sx={{ width: "100%" }}
            renderInput={(params) => <TextField {...params} label="section" />}
            onChange={handleSelectionChange}
          />
        </div>

        <AddButon title="Crear" onClick={() => handleOpen(undefined)} />
      </div>

      <div className="w-full my-5 border-b-2 border-gray-300" />

      {isloading && <Loading />}

      {Array.isArray(itemData?.items) && itemData.length !== 0 && (
        <div className="w-full">
          <TableContainer sx={{ overflowX: "auto" }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell>Nº</TableCell>
                  <TableCell align="right">Nombre</TableCell>
                  <TableCell align="right">Descripción</TableCell>
                  <TableCell align="right">Cantidad</TableCell>
                  <TableCell align="right">Acción</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {itemData?.items.map((row: any, idx: number) => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {idx + 1}
                    </TableCell>
                    <TableCell align="right">{row.name}</TableCell>
                    <TableCell align="right">{row.description}</TableCell>
                    <TableCell align="right">{row.quantity}</TableCell>
                    <TableCell align="right">
                      <IconButton
                        aria-label="delete"
                        onClick={() => handleOpen(row)}
                      >
                        <MdEdit />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}

      {Array.isArray(itemData) && itemData.length === 0 && (
        <div className="flex flex-col gap-3 justify-center items-center mt-10">
          <MdChecklist className="text-7xl text-gray-500" />
          <h1 className="my-3 text-xl text-gray-500">
            No se encontraron datos
          </h1>
        </div>
      )}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white lg:w-[700px] w-3/4 p-5 rounded-xl">
          <h1 className="my-3 text-3xl text-gray-500">
            {isEdit ? `Editar ${dataSelected?.name}` : "Crear Sección"}
          </h1>
          {successData && (
            <div className="bg-green-100 border-2 border-green-400 rounded-md my-3">
              <h1 className="text-green-600 text-center text-lg p-2">
                {isEdit
                  ? "Item modificados correctamente"
                  : "Item creado correctamente"}
              </h1>
            </div>
          )}

          {errorData && (
            <div className="bg-red-100 border-2 border-red-400 rounded-md my-3">
              <h1 className="text-red-600 text-center text-lg p-2">
                {isEdit ? "Error al modificar item" : "Error al crear item"}
              </h1>
            </div>
          )}
          <form onSubmit={onSubmit}>
            {isEdit && (
              <TextField
                {...register("id")}
                id="outlined-basic"
                label="Id"
                variant="outlined"
                fullWidth
                disabled={true}
                defaultValue={dataSelected ? dataSelected?.id : undefined}
                sx={{ marginTop: "10px" }}
              />
            )}
            <TextField
              {...register("name", { required: true })}
              id="outlined-basic"
              label="Nombre"
              variant="outlined"
              fullWidth
              defaultValue={dataSelected?.name}
              autoComplete="off"
              sx={{ marginTop: "10px" }}
            />

            <TextField
              {...register("description", { required: true })}
              id="outlined-basic"
              label="Descripción"
              variant="outlined"
              fullWidth
              defaultValue={dataSelected?.description}
              autoComplete="off"
              sx={{ marginTop: "10px" }}
            />

            <TextField
              {...register("quantity", { required: true, min: 1 })}
              id="outlined-basic"
              label="Cantidad"
              variant="outlined"
              type="number"
              fullWidth
              defaultValue={dataSelected?.quantity}
              autoComplete="off"
              sx={{ marginTop: "10px" }}
            />
            <Controller
              name="section"
              control={control}
              defaultValue={dataSelected?.sectionId || ""}
              rules={{ required: "Selecciona una sección" }}
              render={({ field }) => (
                <FormControl fullWidth sx={{ marginTop: "10px" }}>
                  <InputLabel id="demo-simple-select-label">Sección</InputLabel>
                  <Select
                    label="seccion"
                    value={field.value || ""}
                    onChange={(e) => field.onChange(e.target.value)}
                  >
                    {allSection.data?.map((section: any) => (
                      <MenuItem key={section.id} value={section.id}>
                        {section.name}
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
    </div>
  );
};
