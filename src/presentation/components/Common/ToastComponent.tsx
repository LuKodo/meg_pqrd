import Swal from "sweetalert2";

export const Toast = Swal.mixin({
  icon: "success",
  toast: true,
  position: "top-end",
  timer: 3000,
  showConfirmButton: false,
  timerProgressBar: true,
});
