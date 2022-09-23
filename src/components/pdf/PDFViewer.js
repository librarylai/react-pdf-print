import { Document, Page, pdfjs } from 'react-pdf'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import styled from 'styled-components'
import { useState } from 'react'
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry'
// https://stackoverflow.com/questions/65740268/create-react-app-how-to-copy-pdf-worker-js-file-from-pdfjs-dist-build-to-your
pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker

const PaginationWrapper = styled.div`
  margin-top: 24px;
  display: flex;
  align-items: center;
  background-color: bisque;
`
const PaginationSizeWrapper = styled.p`
  margin-left: 12px;
`
export default function PDFViewer({ isShowPagination = false }) {
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
    return (
      <>
        <Page
          width={windowWidth <= 768 ? windowWidth : 1024}
          height={windowWidth <= 768 ? window.innerHeight : 500}
          key={`page-${pageNumber}`}
          pageNumber={pageNumber}
        />
        <PaginationWrapper>
          <Stack spacing={2}>
            <Pagination
              count={totalPdfPages ?? 0}
              variant='outlined'
              color='primary'
              onChange={(event, value) => {
                console.log('value', value)
                setPageNumber(value)
              }}
            />
          </Stack>
          <PaginationSizeWrapper>
            {pageNumber} / {totalPdfPages ?? 0}
          </PaginationSizeWrapper>
        </PaginationWrapper>
      </>
    )
  }
  return (
    <>
      <Document file={'/pdf/Monsta-Infinite.pdf'} onLoadSuccess={onDocumentLoadSuccess}>
        {isShowPagination ? renderPageNationPdf() : renderAllPdfPages()}
      </Document>
    </>
  )
}
