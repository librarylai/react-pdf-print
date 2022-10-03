import React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import MenuItem from '@mui/material/MenuItem'
import { NAVBAR_CONFIGS } from '../../../constants/pathConfig'
import { useRouter } from 'next/router'
import Link from 'next/link'

function Navbar(props) {
  const router = useRouter()
  function handleNavbarClick(item) {
    router.push(item.url)
  }
  return (
    <AppBar position="static">
      <Container maxWidth="xl" sx={{ display: 'flex' }}>
        <Link href="/">
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              fontFamily: 'monospace',
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            React PDF Demo
          </Typography>
        </Link>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {NAVBAR_CONFIGS.map((item) => (
            <MenuItem key={item.name} onClick={() => handleNavbarClick(item)}>
              <Typography sx={{ marginRight: '16px' }} textAlign="center">
                {item.name}
              </Typography>
            </MenuItem>
          ))}
        </Box>
      </Container>
    </AppBar>
  )
}

export default Navbar
