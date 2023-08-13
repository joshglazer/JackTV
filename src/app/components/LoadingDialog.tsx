import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";

interface LoadingDialogProps {
  isOpen: boolean;
}

export default function LoadingDialog({
  isOpen,
}: LoadingDialogProps): JSX.Element {
  return (
    <Dialog fullScreen open={isOpen}>
      <DialogContent>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </div>
      </DialogContent>
    </Dialog>
  );
}
