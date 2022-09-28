import { Document, Page, pdfjs } from 'react-pdf'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import styled from 'styled-components'
import { useState } from 'react'
import pdfjsWorker from 'pdfjs-dist/legacy/build/pdf.worker.entry'
// https://github.com/mozilla/pdf.js/issues/8305#issuecomment-872091275
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
/*
 * isUsePaginationMode : 是否要用分頁模式 (預設一次將 PDF 內容全部渲染出來)
 * pdfUrl： PDF 文件路徑
 * */
export default function PDFViewer({ isUsePaginationMode = false, pdfUrl }) {
  // 紀錄 PDF 總共多少頁
  const [totalPdfPages, setTotalPdfPages] = useState(null)
  // 紀錄當前頁數
  const [pageNumber, setPageNumber] = useState(1)
  // 抓取當前 視窗寬度 (優化方面：可監聽 window.resize 調整)
  const windowWidth = window.innerWidth
  // 當 PDF 讀取成功時呼叫 cb
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
  function renderPaginationPdf() {
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
      {/*
       * file: 檔案路徑、Url
       * onLoadSuccess： 當 PDF 檔案讀取成功時，將該份 PDF 的總頁數存進 useState 中，方便之後『切換頁面』或是『一次 Render 全部』 使用
       *
       * */}
      <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
        {isUsePaginationMode ? renderPaginationPdf() : renderAllPdfPages()}
      </Document>
    </>
  )
}
