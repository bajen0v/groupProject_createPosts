import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Box } from '@mui/system';
import service from '../../service';
import { useState, useEffect } from 'react';

const pageSize = 12;

export default function AppPagination({SetpostData}) {

    const [pagination, setPagination] = useState({
        count: 0, 
        from: 0,
        to: pageSize
    });

    useEffect(() => {
        service.getData({from: pagination.from, to: pagination.to}).then(response => {
            setPagination({...pagination, count: response.count});
            
            SetpostData(response.data);
        })
    },[pagination.from, pagination.to]);

    const handlePageChange = (event, page) => {
        const from = (page - 1) * pageSize;
        const to = (page - 1) * pageSize + pageSize;
        setPagination({...pagination, from: from, to: to});
        window.scrollTo(0,0);
    }


  return (
    <Box justifyContent={"center"} alignItems={"center"} display={"flex"} sx={{margin: "20px 0px"}}>
        <Pagination
            color="primary"
            count={Math.ceil(pagination.count / pageSize)}
            onChange={handlePageChange}
        />
    </Box>
    
  );
}


