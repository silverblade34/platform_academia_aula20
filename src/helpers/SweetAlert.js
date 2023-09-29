import Swal from 'sweetalert2';
// Icon: warning, success, error, question, info

export function basicAlert(callback, icon, title, message) {
  Swal.fire({
    icon: icon,
    html: `<p class="text-lg font-semibold">${title}</p>
          <p class="text-base">${message}</p>`,
    showCancelButton: false,
    confirmButtonText: 'Aceptar',
    confirmButtonColor: '#006cac',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      callback();
    }
  });
}
