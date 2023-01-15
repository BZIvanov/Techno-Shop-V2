import { Fragment, useState } from 'react';
import { format, parseISO } from 'date-fns';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Collapse from '@mui/material/Collapse';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch } from '../../../store/hooks';
import { KeyboardArrowDown, KeyboardArrowUp } from '../../mui/Icons';
import { updateOrderStatusAction } from '../../../store/features/order/orderSlice';
import { orderStatuses } from '../constants';

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const OrderTableRow = ({ order, isAdminCell }) => {
  const dispatch = useDispatch();

  const [isRowExpanded, setIsRowExpanded] = useState(false);

  const {
    _id,
    createdAt,
    orderedBy: { username },
    totalAmount,
    deliveryAddress,
    orderStatus,
    coupon,
    products,
  } = order;
  const { name: couponName } = coupon || {};

  return (
    <Fragment>
      <TableRow>
        <TableCell align='center'>
          <IconButton
            size='small'
            onClick={() => setIsRowExpanded((prevValue) => !prevValue)}
          >
            {isRowExpanded ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell align='center'>{_id}</TableCell>
        <TableCell align='center'>
          {format(parseISO(createdAt), 'dd-MMM-yyyy')}
        </TableCell>
        {isAdminCell && <TableCell align='center'>{username}</TableCell>}
        <TableCell align='center'>
          {currencyFormatter.format(totalAmount)}
        </TableCell>
        <TableCell align='center'>{deliveryAddress}</TableCell>
        <TableCell align='center'>{couponName || '-'}</TableCell>
        <TableCell align='center'>
          {isAdminCell ? (
            <FormControl
              sx={{
                width: '100%',
              }}
            >
              <Select
                variant='standard'
                value={orderStatus}
                onChange={(event) => {
                  dispatch(
                    updateOrderStatusAction({
                      orderId: _id,
                      orderStatus: event.target.value,
                    })
                  );
                }}
              >
                {Object.keys(orderStatuses).map((orderStatusKey) => {
                  return (
                    <MenuItem
                      key={orderStatusKey}
                      value={orderStatuses[orderStatusKey]}
                    >
                      {orderStatuses[orderStatusKey]}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          ) : (
            orderStatus
          )}
        </TableCell>
      </TableRow>

      <TableRow sx={{ '& > *': { borderBottom: 'unset', borderTop: 'unset' } }}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={isRowExpanded} timeout='auto' unmountOnExit={true}>
            <Box sx={{ margin: 1 }}>
              <Typography variant='body1' gutterBottom={true}>
                Products
              </Typography>
              <Table size='small'>
                <TableHead>
                  <TableRow>
                    <TableCell align='center'>Product Name</TableCell>
                    <TableCell align='center'>Price</TableCell>
                    <TableCell align='center'>Quantity</TableCell>
                    <TableCell align='center'>Total Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody
                  sx={{
                    // remove the broders from the last row
                    '& > tr:last-child td': {
                      borderBottom: 'none',
                    },
                  }}
                >
                  {products.map((orderProduct) => {
                    const { product, count } = orderProduct;
                    return (
                      <TableRow key={product._id}>
                        <TableCell align='center'>{product.title}</TableCell>
                        <TableCell align='center'>
                          {currencyFormatter.format(product.price)}
                        </TableCell>
                        <TableCell align='center'>{count}</TableCell>
                        <TableCell align='center'>
                          {currencyFormatter.format(product.price * count)}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
};

export default OrderTableRow;
