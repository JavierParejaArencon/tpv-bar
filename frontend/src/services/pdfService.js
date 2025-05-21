import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export function generatePdfTicket(venta) {
  const { mesa, lineas, total, ventaId } = venta;
  const docDefinition = {
    content: [
      { text: `Ticket Mesa ${mesa}`, style: 'header', margin: [0, 0, 0, 10] },
      {
        table: {
          widths: ['*', 'auto', 'auto'],
          body: [
            ['Producto', 'Cant', 'Importe'],
            ...lineas.map((l) => [l.nombre, l.cantidad, `${(l.precio * l.cantidad).toFixed(2)} €`])
          ]
        }
      },
      { text: `Total: ${total.toFixed(2)} €`, style: 'total', margin: [0, 10, 0, 0] },
      { text: `ID Venta: ${ventaId}`, style: 'small', margin: [0, 10, 0, 0] },
      { text: `Fecha: ${new Date(venta.fecha).toLocaleString()}`, style: 'small' }
    ],
    styles: {
      header: { fontSize: 18, bold: true },
      total: { fontSize: 14, bold: true },
      small: { fontSize: 10, color: 'gray' }
    },
    defaultStyle: { fontSize: 12 }
  };
  pdfMake.createPdf(docDefinition).download(`ticket-${ventaId}.pdf`);
}
