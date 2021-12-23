import { useState } from 'react';
import { Box, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';

const ProductInfoTabs = ({ description }) => {
  const [tabValue, setTabValue] = useState('0');

  return (
    <TabContext value={tabValue}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <TabList
          onChange={(event, newValue) => {
            setTabValue(newValue);
          }}
        >
          <Tab label='Description' value={'0'} />
          <Tab label='Contact us' value={'1'} />
        </TabList>
      </Box>
      <TabPanel value={'0'}>{description}</TabPanel>
      <TabPanel value={'1'}>
        Contact us on +359899 000 111 or on email: info@test.com
      </TabPanel>
    </TabContext>
  );
};

export default ProductInfoTabs;
