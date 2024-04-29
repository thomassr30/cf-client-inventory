import { ItemService } from "@/api/item.service";
import { LocationService } from "@/api/location.service";
import { SectionService } from "@/api/section.service";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

type optionDelete = "location" | "section" | "item" | "user";

interface Props {
  open: boolean;
  handleClose: () => void;
  option: optionDelete;
  title: string;
  description?: string;
  id: string | number;
}

export const DialogConfirm = ({
  open,
  handleClose,
  option,
  title,
  description,
  id,
}: Props) => {
  const handleDelete = async (opt: optionDelete) => {
    switch (opt) {
      case "location":
        await LocationService.deleteLocation(String(id));
        handleClose();
        break;
      case "section":
        await SectionService.deleteSection(String(id));
        handleClose();
        break;
      case "item":
        await ItemService.deleteItem(Number(id));
        handleClose();
        break;
      case "user":
        console.log("delete user");
        break;
      default:
        break;
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        {description && (
          <DialogContentText id="alert-dialog-description">
            {description}
          </DialogContentText>
        )}
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={handleClose}>
          Cancelar
        </Button>
        <Button color="success" onClick={() => handleDelete(option)} autoFocus>
          Eliminar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
