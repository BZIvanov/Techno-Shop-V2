import { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import ConfirmDialog from '../../common/dialogs/ConfirmDialog/ConfirmDialog';
import { useSelector, useDispatch } from '../../../store/hooks';
import TextFieldAdapter from '../../common/forms/TextFieldAdapter/TextFieldAdapter';
import DatePickerFieldAdapter from '../../common/forms/DatePickerFieldAdapter/DatePickerFieldAdapter';
import { useForm } from '../../../providers/form/hooks';
import FormProvider from '../../../providers/form/FormProvider';
import {
  getCouponsAction,
  createCouponAction,
  deleteCouponAction,
} from '../../../store/features/coupon/couponSlice';
import { formConfig } from './form-schema';
import { Delete } from '../../mui/Icons';

const ROWS_PER_PAGE_OPTIONS = [10, 25, 50];

const Coupon = () => {
  const dispatch = useDispatch();

  const { coupons, totalCount } = useSelector((state) => state.coupon);
  const loading = useSelector((state) => state.apiCall.loading);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(ROWS_PER_PAGE_OPTIONS[0]);

  const formMethods = useForm(formConfig);
  const { formState, reset } = formMethods;

  useEffect(() => {
    dispatch(
      getCouponsAction({
        page,
        perPage: rowsPerPage,
      })
    );
  }, [dispatch, page, rowsPerPage]);

  const handleCategorySubmit = (values) => {
    dispatch(createCouponAction(values));

    reset();
  };

  const [removeCouponDialog, setRemoveCouponDialog] = useState({
    open: false,
    text: '',
    onConfirm: () => {},
  });

  const handleProductDeleteClick = (couponId) => () => {
    setRemoveCouponDialog({
      open: false,
      text: '',
      onConfirm: () => {},
    });

    dispatch(deleteCouponAction(couponId));
  };

  return (
    <Box sx={{ padding: (theme) => theme.spacing(1) }}>
      <Typography variant='h5'>Coupons</Typography>

      <Divider sx={{ marginBlock: 2 }} />

      <Box sx={{ margin: 1 }}>
        <FormProvider onSubmit={handleCategorySubmit} methods={formMethods}>
          <Box my={1}>
            <TextFieldAdapter name='name' label='Coupon Name' />
          </Box>

          <Box my={1}>
            <TextFieldAdapter
              name='discount'
              label='Discount %'
              type='number'
            />
          </Box>

          <Box my={1}>
            <DatePickerFieldAdapter
              name='expirationDate'
              label='Expiration Date'
            />
          </Box>

          <Button
            variant='contained'
            type='submit'
            disabled={formState.submitting || loading}
          >
            Create
          </Button>
        </FormProvider>
      </Box>

      <Divider sx={{ marginBlock: 2 }} />

      <Box>
        <Paper sx={{ margin: 1 }}>
          <TableContainer>
            <Table size='small'>
              <TableHead>
                <TableRow>
                  <TableCell align='center'>Name</TableCell>
                  <TableCell align='center'>Discount</TableCell>
                  <TableCell align='center'>Expiration Date</TableCell>
                  <TableCell align='center'>Created At</TableCell>
                  <TableCell align='center'>Remove</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {coupons.map(
                  ({ _id, name, discount, expirationDate, createdAt }) => {
                    return (
                      <TableRow key={_id}>
                        <TableCell align='center'>{name}</TableCell>
                        <TableCell align='center'>
                          - {discount.toFixed(2)} %
                        </TableCell>
                        <TableCell align='center'>
                          {format(parseISO(expirationDate), 'dd-MMM-yyyy')}
                        </TableCell>
                        <TableCell align='center'>
                          {format(parseISO(createdAt), 'dd-MMM-yyyy')}
                        </TableCell>
                        <TableCell align='center'>
                          <IconButton
                            size='small'
                            onClick={() =>
                              setRemoveCouponDialog({
                                open: true,
                                text: 'Are you sure you want to delete this coupon?',
                                onConfirm: handleProductDeleteClick(_id),
                              })
                            }
                          >
                            <Delete fontSize='inherit' />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  }
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
            component='div'
            count={totalCount}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(event, newPage) => setPage(newPage)}
            onRowsPerPageChange={(event) => {
              setRowsPerPage(parseInt(event.target.value, 10));
              setPage(0);
            }}
          />
        </Paper>
      </Box>

      <ConfirmDialog
        dialogConfig={removeCouponDialog}
        setDialogConfig={setRemoveCouponDialog}
      />
    </Box>
  );
};

export default Coupon;
