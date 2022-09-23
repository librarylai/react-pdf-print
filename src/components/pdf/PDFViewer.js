import { Document, Page, pdfjs } from 'react-pdf'

import { useState } from 'react'
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry'
// https://stackoverflow.com/questions/65740268/create-react-app-how-to-copy-pdf-worker-js-file-from-pdfjs-dist-build-to-your
pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker

export default function PDFViewer() {
  const [totalPdfPages, setTotalPdfPages] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)
  const windowWidth = window.innerWidth
  function onDocumentLoadSuccess({ numPages }) {
    setTotalPdfPages(numPages)
  }
  // render Pdf 全部頁面內容
  function renderAllPdfPages() {
    if (!totalPdfPages) return
    const mockArray = [...new Array(totalPdfPages)]
    return mockArray.map((_, index) => {
      return <Page width={windowWidth <= 768 ? windowWidth : 1024} key={`page-${index}`} pageNumber={index + 1} />
    })
  }
  // 依照 分頁形式 render Pdf 內容
  function renderPageNationPdf() {
    return mockArray.map((_, index) => {
      return <Page width={windowWidth <= 768 ? windowWidth : 1024} key={`page-${pageNumber}`} pageNumber={pageNumber} />
    })
  }
  return (
    <>
      <Document file={'/pdf/Monsta-Infinite.pdf'} onLoadSuccess={onDocumentLoadSuccess}>
        {renderAllPdfPages()}
      </Document>
    </>
  )
}
