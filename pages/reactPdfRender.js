import { useState } from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import Checkbox from '@mui/material/Checkbox'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'

// https://github.com/wojtekmaj/react-pdf/issues/136#issuecomment-405393139
// 透過 dynamic import 上設定 ssr 為 false 解決 browser api 在 node 環境下不支援問題。
const PDFViewer = dynamic(import('../src/components/pdf/PDFViewer'), { ssr: false })

// 參考文件：https://www.npmjs.com/package/react-pdf
function ReactPdfRender() {
  const [isUsePaginationMode, setIsUsePaginationMode] = useState(false)
  const handleCheckboxChange = (event) => {
    setIsUsePaginationMode(event.target.checked)
  }
  const renderPdfModeCheckbox = () => {
    return (
      <FormGroup sx={{ margin: '16px' }}>
        <FormControlLabel
          control={
            <Checkbox
              sx={{ color: '#ccc' }}
              size="small"
              color="primary"
              checked={isUsePaginationMode}
              onChange={handleCheckboxChange}
            />
          }
          label="顯示分頁模式"
        />
      </FormGroup>
    )
  }
  return (
    <div>
      <Head>
        <title>React render PDF</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {renderPdfModeCheckbox()}
      <PDFViewer pdfUrl={'/pdf/Monsta-Infinite.pdf'} isUsePaginationMode={isUsePaginationMode} />
    </div>
  )
}
export default ReactPdfRender
