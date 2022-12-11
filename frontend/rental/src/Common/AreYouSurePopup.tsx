import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { observer } from "mobx-react-lite";

type Props = {
  title: string,
  isOpen: boolean,
  functionToClose: () => void,
  functionToExecute: () => void,
};

const AreYouSurePopup = (props: Props) => {
  return (
    <Dialog
      open={props.isOpen}
      onClose={props.functionToClose}
      maxWidth="lg"
    >
      <DialogTitle>{props.title}</DialogTitle>
      <DialogContent>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => props.functionToClose()}>No</Button>
        <Button onClick={() => props.functionToExecute()}>Yes</Button>
      </DialogActions>
    </Dialog>
  );
};

export default observer(AreYouSurePopup);
