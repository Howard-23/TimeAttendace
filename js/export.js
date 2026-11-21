/**
 * Attendance data export – Excel (XLSX) and PDF
 * Requires:
 *   - SheetJS (xlsx) for Excel
 *   - jsPDF + jspdf-autotable for PDF
 */

// ---------- Sample / current dashboard data ----------
const ATTENDANCE_DATA = {
  company: 'Qatar Project',
  date: '17 November 2026',
  generatedAt: new Date().toISOString(),
  summary: [
    { metric: 'Work Rate', value: '92.4%', note: 'Benchmark: 90%' },
    { metric: 'Total Users', value: '48', note: 'Active roster' },
    { metric: 'Normal', value: '31', note: 'On time' },
    { metric: 'Rest Day', value: '6', note: 'Scheduled off' },
    { metric: 'On Leave', value: '4', note: 'Approved' },
    { metric: 'Tardiness', value: '5', note: 'Late In / Early Out' },
    { metric: 'No Clocking', value: '1', note: 'Missing punch' },
    { metric: 'Absent', value: '1', note: 'Unauthorized' }
  ],
  flexiUsers: [
    { userId: '10001005', name: 'API_Test', type: 'Flexi', workHours: '7.5 h', overtime: '0.0 h', lastClocking: '17 Nov 08:12', status: 'In / Out' },
    { userId: '10001012', name: 'Sara Al-Mansoori', type: 'Flexi', workHours: '8.2 h', overtime: '0.7 h', lastClocking: '17 Nov 17:45', status: 'In / Out' },
    { userId: '10001018', name: 'Mohammed Hassan', type: 'Job Costing', workHours: '6.0 h', overtime: '—', lastClocking: '17 Nov 09:03', status: 'Late In' },
    { userId: '10001022', name: 'Fatima Al-Kuwari', type: 'Flexi', workHours: '—', overtime: '—', lastClocking: '—', status: 'On Leave' },
    { userId: '10001031', name: 'James Wilson', type: 'Flexi', workHours: '—', overtime: '—', lastClocking: '16 Nov 18:20', status: 'No Clocking' }
  ],
  exceptions: [
    { user: 'Mohammed Hassan', type: 'Late In', time: '09:03' },
    { user: 'James Wilson', type: 'No Clocking', time: '—' },
    { user: 'Nora Abdullah', type: 'Early Out', time: '15:42' },
    { user: 'Khalid Al-Thani', type: 'Extended Break', time: '13:15–14:05' }
  ],
  workRateHistory: [
    { date: '11 Nov', rate: 94 },
    { date: '12 Nov', rate: 91 },
    { date: '13 Nov', rate: 89 },
    { date: '14 Nov', rate: 96 },
    { date: '15 Nov', rate: 93 },
    { date: '16 Nov', rate: 90 },
    { date: '17 Nov', rate: 92.4 }
  ]
};

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 100);
}

function timestamp() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}_${pad(d.getHours())}${pad(d.getMinutes())}`;
}

// ---------- Excel export ----------
function exportToExcel() {
  if (typeof XLSX === 'undefined') {
    alert('Excel library (SheetJS) failed to load. Please check your internet connection.');
    return;
  }

  const wb = XLSX.utils.book_new();

  const summaryRows = [
    ['TimeTec Attendance – Workforce Overview'],
    ['Company', ATTENDANCE_DATA.company],
    ['Report Date', ATTENDANCE_DATA.date],
    ['Generated', new Date().toLocaleString()],
    [],
    ['Metric', 'Value', 'Note'],
    ...ATTENDANCE_DATA.summary.map((r) => [r.metric, r.value, r.note])
  ];
  const wsSummary = XLSX.utils.aoa_to_sheet(summaryRows);
  wsSummary['!cols'] = [{ wch: 18 }, { wch: 12 }, { wch: 22 }];
  XLSX.utils.book_append_sheet(wb, wsSummary, 'Summary');

  const flexiHeader = ['User ID', 'Name', 'Type', 'Total Work Hours', 'Total Overtime', 'Last Clocking', 'Status'];
  const flexiRows = [
    flexiHeader,
    ...ATTENDANCE_DATA.flexiUsers.map((u) => [
      u.userId, u.name, u.type, u.workHours, u.overtime, u.lastClocking, u.status
    ])
  ];
  const wsFlexi = XLSX.utils.aoa_to_sheet(flexiRows);
  wsFlexi['!cols'] = [{ wch: 12 }, { wch: 20 }, { wch: 12 }, { wch: 16 }, { wch: 14 }, { wch: 16 }, { wch: 12 }];
  XLSX.utils.book_append_sheet(wb, wsFlexi, 'Flexi Users');

  const excRows = [
    ['User', 'Type', 'Time'],
    ...ATTENDANCE_DATA.exceptions.map((e) => [e.user, e.type, e.time])
  ];
  const wsExc = XLSX.utils.aoa_to_sheet(excRows);
  wsExc['!cols'] = [{ wch: 20 }, { wch: 16 }, { wch: 14 }];
  XLSX.utils.book_append_sheet(wb, wsExc, 'Exceptions');

  const rateRows = [
    ['Date', 'Work Rate %'],
    ...ATTENDANCE_DATA.workRateHistory.map((r) => [r.date, r.rate])
  ];
  const wsRate = XLSX.utils.aoa_to_sheet(rateRows);
  wsRate['!cols'] = [{ wch: 12 }, { wch: 14 }];
  XLSX.utils.book_append_sheet(wb, wsRate, 'Work Rate History');

  const filename = `TimeTec_Attendance_${timestamp()}.xlsx`;
  XLSX.writeFile(wb, filename);
}

// ---------- PDF export ----------
function exportToPDF() {
  if (typeof jspdf === 'undefined' && typeof window.jspdf === 'undefined') {
    alert('PDF library (jsPDF) failed to load. Please check your internet connection.');
    return;
  }

  const { jsPDF } = window.jspdf || jspdf;
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

  const margin = 14;
  let y = 18;

  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('TimeTec Attendance – Workforce Overview', margin, y);
  y += 8;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(80);
  doc.text(`Company: ${ATTENDANCE_DATA.company}`, margin, y);
  y += 5;
  doc.text(`Report Date: ${ATTENDANCE_DATA.date}`, margin, y);
  y += 5;
  doc.text(`Generated: ${new Date().toLocaleString()}`, margin, y);
  y += 10;
  doc.setTextColor(0);

  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Summary', margin, y);
  y += 4;

  if (doc.autoTable) {
    doc.autoTable({
      startY: y,
      head: [['Metric', 'Value', 'Note']],
      body: ATTENDANCE_DATA.summary.map((r) => [r.metric, r.value, r.note]),
      margin: { left: margin, right: margin },
      styles: { fontSize: 9, cellPadding: 2.5 },
      headStyles: { fillColor: [26, 115, 232], textColor: 255 },
      alternateRowStyles: { fillColor: [245, 247, 250] }
    });
    y = doc.lastAutoTable.finalY + 10;

    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Flexi Dashboard Users', margin, y);
    y += 4;

    doc.autoTable({
      startY: y,
      head: [['User ID', 'Name', 'Type', 'Work Hours', 'OT', 'Last Clocking', 'Status']],
      body: ATTENDANCE_DATA.flexiUsers.map((u) => [
        u.userId, u.name, u.type, u.workHours, u.overtime, u.lastClocking, u.status
      ]),
      margin: { left: margin, right: margin },
      styles: { fontSize: 8, cellPadding: 2 },
      headStyles: { fillColor: [26, 115, 232], textColor: 255 },
      alternateRowStyles: { fillColor: [245, 247, 250] }
    });
    y = doc.lastAutoTable.finalY + 10;

    if (y > 250) {
      doc.addPage();
      y = 18;
    }
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text("Today's Exceptions", margin, y);
    y += 4;

    doc.autoTable({
      startY: y,
      head: [['User', 'Type', 'Time']],
      body: ATTENDANCE_DATA.exceptions.map((e) => [e.user, e.type, e.time]),
      margin: { left: margin, right: margin },
      styles: { fontSize: 9, cellPadding: 2.5 },
      headStyles: { fillColor: [245, 158, 11], textColor: 0 },
      alternateRowStyles: { fillColor: [255, 251, 235] }
    });
  } else {
    doc.setFontSize(9);
    ATTENDANCE_DATA.summary.forEach((r) => {
      doc.text(`${r.metric}: ${r.value}  (${r.note})`, margin, y);
      y += 5;
    });
  }

  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text(
      `Page ${i} of ${pageCount}  |  TimeTec Attendance Demo`,
      margin,
      doc.internal.pageSize.getHeight() - 8
    );
  }

  doc.save(`TimeTec_Attendance_${timestamp()}.pdf`);
}

// ---------- Wire up buttons ----------
function initExportButtons() {
  const excelBtn = document.getElementById('btnExportExcel');
  const pdfBtn = document.getElementById('btnExportPDF');
  const legacyExport = document.getElementById('btnExport');

  if (excelBtn) excelBtn.addEventListener('click', exportToExcel);
  if (pdfBtn) pdfBtn.addEventListener('click', exportToPDF);

  if (legacyExport) {
    legacyExport.addEventListener('click', exportToExcel);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initExportButtons);
} else {
  initExportButtons();
}

window.exportToExcel = exportToExcel;
window.exportToPDF = exportToPDF;
window.ATTENDANCE_DATA = ATTENDANCE_DATA;
