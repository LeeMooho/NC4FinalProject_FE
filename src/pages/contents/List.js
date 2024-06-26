import styled from '@emotion/styled';
import { Box, Button, Container, Pagination, Typography } from '@mui/material'
import React from 'react'
import { Helmet } from 'react-helmet'
import ContentsList from '../../components/organisms/contents/list/ContentsList';
import ContantsFilters from '../../components/organisms/contents/list/ContentsFilters';

// style
const ContainerStyle = styled(Container)(({ theme }) => ({
  padding: 0,
  paddingTop: theme.spacing(2),

  // product header
  // h3
  "& .productHeader": {
    fontSize: 30,
    fontWeight: 500,
  },
}));


const List = () => {
  return (
    <>
      {/* Helmet */}
      <Helmet>
        <title>Products | MUI Dash</title>
      </Helmet>

      <ContainerStyle maxWidth="lg">

        <ContantsFilters />

        {/* Contents List */}
        <ContentsList />

        {/* Contents Paging */}
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 3}}>
          <Pagination count={10} />
        </Box>
        
      </ContainerStyle>
      
    </>
  );
}

export default List