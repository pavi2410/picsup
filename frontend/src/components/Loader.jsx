import { Box, CircularProgress } from '@mui/material'

export default function Loader() {
    return (
      <Box w="100%" justifyContent="center" alignItems="center" sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    )
  }