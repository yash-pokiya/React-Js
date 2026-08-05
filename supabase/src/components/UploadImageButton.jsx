import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CircularProgress from '@mui/material/CircularProgress';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function UploadImageButton({ onChange, uploading, uploaded }) {
  return (
    <Button
      component="label"
      role={undefined}
      variant={uploaded ? "outlined" : "contained"}
      color={uploaded ? "success" : "primary"}
      disabled={uploading}
      startIcon={
        uploading ? (
          <CircularProgress size={20} color="inherit" />
        ) : uploaded ? (
          <CheckCircleIcon color="success" />
        ) : (
          <CloudUploadIcon />
        )
      }
    >
      {uploading ? "Uploading..." : uploaded ? "Image Uploaded" : "Upload Image"}
      <VisuallyHiddenInput
        type="file"
        accept="image/*"
        onChange={onChange}
        disabled={uploading}
      />
    </Button>
  );
}
