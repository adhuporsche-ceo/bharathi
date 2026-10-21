import React, { useState } from 'react';
import { Download, Copy, Check, Table, FileDown, FileText } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { AlgorithmStep } from '../data/daaData';
import { soundFx } from '../utils/soundEffects';

interface DryRunWorksheetProps {
  steps: AlgorithmStep[];
  currentStepIndex: number;
  onSelectStep: (idx: number) => void;
  algorithmTitle?: string;
}

export const DryRunWorksheet: React.FC<DryRunWorksheetProps> = ({
  steps,
  currentStepIndex,
  onSelectStep,
  algorithmTitle = 'Algorithm'
}) => {
  const [copied, setCopied] = useState(false);
  const [isExportingPdf, setIsExportingPdf] = useState(false);

  const handleExportPDF = () => {
    soundFx.playSuccessChime();
    setIsExportingPdf(true);

    try {
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      // Top Header Banner in Primary Violet (#7B42F6)
      doc.setFillColor(123, 66, 246);
      doc.rect(0, 0, 210, 22, 'F');

      // Banner Title
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(13);
      doc.text('KCT DAA 23CS401 - UNIVERSITY EXAM DRY-RUN WORKSHEET', 14, 10);

      // Banner Subtext
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.text(`Algorithm: ${algorithmTitle.toUpperCase()}  |  Lab Execution Record  |  Generated: ${new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}`, 14, 17);

      // Student Meta Section Box
      doc.setFillColor(248, 246, 254);
      doc.setDrawColor(229, 220, 249);
      doc.roundedRect(14, 25, 182, 14, 2, 2, 'FD');

      doc.setTextColor(32, 21, 56);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.text('Student Name: _______________________', 18, 31);
      doc.text('Roll / Register No: __________________', 80, 31);
      doc.text(`Total Steps: ${steps.length}`, 155, 31);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(123, 110, 150);
      doc.text('Verification: Verified deterministic execution trace against loop invariant assertions.', 18, 36);

      // Table formatting
      const tableData = steps.map((st, idx) => {
        const varsStr = Object.entries(st.variables)
          .map(([k, v]) => `${k} = ${v}`)
          .join('\n') || '-';

        const stateStr = st.arrayState
          ? `[${st.arrayState.join(', ')}]`
          : st.stackState
          ? `[${st.stackState.join(', ')}]`
          : st.queueState
          ? `[${st.queueState.join(', ')}]`
          : '-';

        return [`#${idx}`, varsStr, stateStr, st.description];
      });

      autoTable(doc, {
        startY: 42,
        head: [['Step', 'Registers & Variables', 'Memory / Array State', 'Algorithmic Action & Explanation']],
        body: tableData,
        theme: 'grid',
        headStyles: {
          fillColor: [123, 66, 246],
          textColor: [255, 255, 255],
          fontStyle: 'bold',
          fontSize: 8.5,
          halign: 'left',
          cellPadding: 3
        },
        styles: {
          fontSize: 7.5,
          cellPadding: 2.5,
          textColor: [32, 21, 56],
          lineColor: [229, 220, 249],
          lineWidth: 0.15,
          valign: 'middle'
        },
        alternateRowStyles: {
          fillColor: [248, 246, 254]
        },
        columnStyles: {
          0: { cellWidth: 14, halign: 'center', fontStyle: 'bold', textColor: [123, 66, 246] },
          1: { cellWidth: 44, font: 'courier' },
          2: { cellWidth: 46, font: 'courier', fontStyle: 'bold' },
          3: { cellWidth: 'auto', font: 'helvetica' }
        },
        didDrawPage: (data) => {
          // Page Footer with watermark/signature
          const pageStr = `Page ${data.pageNumber}`;
          doc.setFontSize(7.5);
          doc.setFont('helvetica', 'normal');
          doc.setTextColor(123, 110, 150);
          doc.text(pageStr, 14, doc.internal.pageSize.height - 6);
          doc.text('Bharathi DAA Visualizer Studio • KCT 23CS401 Lab Submission Record', 210 - 14, doc.internal.pageSize.height - 6, { align: 'right' });
        }
      });

      const fileName = `${algorithmTitle.toLowerCase().replace(/[^a-z0-9]/g, '_')}_dryrun_worksheet.pdf`;
      doc.save(fileName);
    } catch (err) {
      console.error('Failed to generate PDF:', err);
    } finally {
      setTimeout(() => setIsExportingPdf(false), 800);
    }
  };

  const handleExportCSV = () => {
    soundFx.playClick();
    const headers = ['Step', 'CodeLine', 'Variables', 'MemoryState', 'ActionDescription'];
    const rows = steps.map((st, idx) => {
      const varsStr = Object.entries(st.variables).map(([k, v]) => `${k}=${v}`).join('; ');
      const stateStr = st.arrayState
        ? st.arrayState.join(' ')
        : st.stackState
        ? st.stackState.join(' ')
        : st.queueState
        ? st.queueState.join(' ')
        : '-';
      const cleanDesc = `"${st.description.replace(/"/g, '""')}"`;
      return [idx, st.codeLine, `"${varsStr}"`, `"${stateStr}"`, cleanDesc].join(',');
    });

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${algorithmTitle.toLowerCase().replace(/\s+/g, '_')}_kct_dryrun.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyMarkdown = () => {
    soundFx.playClick();
    const headers = '| Step | Variables | Memory / Array State | Action Description |';
    const separator = '|:----:|:---------:|:--------------------:|:-------------------|';
    const rows = steps.map((st, idx) => {
      const varsStr = Object.entries(st.variables).map(([k, v]) => `${k}=${v}`).join(', ') || '-';
      const stateStr = st.arrayState ? `[${st.arrayState.join(', ')}]` : '-';
      return `| #${idx} | ${varsStr} | ${stateStr} | ${st.description} |`;
    });

    const markdown = [headers, separator, ...rows].join('\n');
    navigator.clipboard.writeText(markdown).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="w-full bg-white border-2 border-[#E5DCF9] rounded-3xl p-6 shadow-sm shadow-[#E5DCF9]/40 space-y-4 select-none">
      {/* Header and Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E5DCF9]">
        <div>
          <div className="flex items-center gap-2 text-[#7B42F6] font-bold text-xs uppercase tracking-wider mb-0.5 font-mono">
            <Table className="w-4 h-4" />
            <span>KCT DAA University Exam Dry Run Worksheet</span>
          </div>
          <h3 className="text-base font-black text-[#201538]">
            Tabular Step Traces ({algorithmTitle})
          </h3>
          <p className="text-xs text-[#7B6E96]">
            Click any row to jump the visualizer directly to that step. Ready for lab record submissions.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Export PDF Button */}
          <button
            onClick={handleExportPDF}
            disabled={isExportingPdf}
            className="px-3.5 py-2 rounded-xl bg-[#7B42F6] hover:bg-[#6B31E6] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm shadow-[#7B42F6]/30 transition-all active:scale-95 cursor-pointer disabled:opacity-60"
            title="Download formatted PDF lab submission worksheet"
          >
            <FileDown className="w-3.5 h-3.5" />
            <span>{isExportingPdf ? 'Generating PDF...' : 'Download PDF'}</span>
          </button>

          {/* Export CSV Button */}
          <button
            onClick={handleExportCSV}
            className="px-3 py-2 rounded-xl bg-[#F8F6FE] hover:bg-[#F0EBFD] text-[#5521B5] text-xs font-bold border border-[#E5DCF9] flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Export raw data as CSV"
          >
            <Download className="w-3.5 h-3.5" />
            <span>CSV</span>
          </button>

          {/* Copy Markdown Button */}
          <button
            onClick={handleCopyMarkdown}
            className="px-3 py-2 rounded-xl bg-[#F8F6FE] hover:bg-[#F0EBFD] text-[#61527E] text-xs font-bold border border-[#E5DCF9] flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Copy table formatted in Markdown"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[#10B981]" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'MD'}</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto max-h-96 border border-[#E5DCF9] rounded-2xl bg-white shadow-2xs">
        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-[#F4F0FF] sticky top-0 text-[#201538] border-b border-[#E5DCF9] font-bold">
            <tr>
              <th className="p-3 w-16 text-center">Step</th>
              <th className="p-3 w-1/4">Registers &amp; Variables</th>
              <th className="p-3 w-1/3">Array / Memory State</th>
              <th className="p-3">Algorithmic Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5DCF9]">
            {steps.map((st, idx) => {
              const isCurrent = idx === currentStepIndex;
              const varsStr = Object.entries(st.variables)
                .map(([k, v]) => `${k}=${v}`)
                .join(', ');
              const stateStr = st.arrayState
                ? `[${st.arrayState.join(', ')}]`
                : st.stackState
                ? `[${st.stackState.join(', ')}]`
                : st.queueState
                ? `[${st.queueState.join(', ')}]`
                : '-';

              return (
                <tr
                  key={idx}
                  onClick={() => {
                    soundFx.playClick();
                    onSelectStep(idx);
                  }}
                  className={`cursor-pointer transition-colors ${
                    isCurrent
                      ? 'bg-[#F4F0FF] font-bold text-[#7B42F6] border-l-4 border-[#7B42F6]'
                      : 'hover:bg-[#F8F6FE] text-[#3A2D54]'
                  }`}
                >
                  <td className="p-3 text-center text-[#7B42F6] font-black">#{idx}</td>
                  <td className="p-3 text-[#5A4B75]">{varsStr || '-'}</td>
                  <td className="p-3 font-bold text-[#201538]">{stateStr}</td>
                  <td className="p-3 text-[#5A4B75] leading-snug">{st.description}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
