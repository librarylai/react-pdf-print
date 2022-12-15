import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useRef } from 'react'
import ReactToPdf from 'react-to-pdf'
import {
  useTheme,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from '@mui/material'
import styled from 'styled-components'
import { Helmet } from 'react-helmet-async'

const ReactToPDFContainer = styled.div`
  width: 100%;
`
const Title = styled.h1`
  color: deepskyblue;
`
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein }
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
]

export default function ReactToPDF() {
  // 透過 useRef Hook 產生一個 custom ref
  const pdfRef = useRef()
  const theme = useTheme()
  function renderMuiTableView() {
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Dessert (100g serving)</TableCell>
              <TableCell align="right">Calories</TableCell>
              <TableCell align="right">Fat&nbsp;(g)</TableCell>
              <TableCell align="right">Carbs&nbsp;(g)</TableCell>
              <TableCell align="right">Protein&nbsp;(g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>React to PDF</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Helmet prioritizeSeoTags>
        <title>來自 helmet 的 pdf</title>
        <meta property="og:title" content="來自 helmet 的 pdf" data-react-helmet="true" />
        <meta property="og:description" content="來自 helmet 的 pdf Desc" data-react-helmet="true" />
        <meta property="og:image" content="https://picsum.photos/id/2/200/200" data-react-helmet="true" />
      </Helmet>
      <main className={styles.main}>
        <h1>將下面內容透過 React-to-pdf 套件轉成 PDF 檔</h1>
        <div>
          {/* 將 ref 綁定到  targetRef props 上  */}
          <ReactToPdf targetRef={pdfRef} filename="muiTable.pdf">
            {({ toPdf }) => (
              <Button variant="contained" color={'primary'} onClick={toPdf}>
                產生PDF (Generate pdf)
              </Button>
            )}
          </ReactToPdf>
          {/* 將 ref 也綁定到需要轉成 PDF 的內容上  */}
          <ReactToPDFContainer ref={pdfRef}>
            <Title>MUI Table</Title>
            {renderMuiTableView()}
          </ReactToPDFContainer>
        </div>
      </main>
    </div>
  )
}
