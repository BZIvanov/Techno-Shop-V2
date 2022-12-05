import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from '../../../store/hooks';
import {
  Box,
  Typography,
  Button,
  Divider,
  Paper,
  Chip,
  TextField,
  FormControl,
} from '@mui/material';
import { SelectDropdownAdapter } from '../../common/forms/SelectDropdownAdapter';
import { TextFieldAdapter } from '../../common/forms/TextFieldAdapter';
import { ListItem } from '../../common/lists/ListItem';
import { ConfirmDialog } from '../../common/dialogs/ConfirmDialog';
import { getAllCategoriesAction } from '../../../store/features/category/categorySlice';
import {
  getSubcategoriesAction,
  createSubcategoryAction,
  updateSubcategoryAction,
  deleteSubcategoryAction,
} from '../../../store/features/subcategory/subcategorySlice';
import { ApiCallAlert } from '../../common/async/ApiCallAlert';
import { ApiCallLoader } from '../../common/async/ApiCallLoader';
import { formConfig } from './form-schema';
import useForm from '../../../providers/form/hooks/useForm';

const ManageSubcategory = () => {
  const { loading } = useSelector((state) => state.apiCall);
  const { categories } = useSelector((state) => state.category);
  const { subcategories } = useSelector((state) => state.subcategory);

  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [removeSubcategoryDialog, setRemoveSubcategoryDialog] = useState({
    open: false,
    text: '',
    onConfirm: () => {},
  });
  const [filterSubcategoryText, setFilterSubcategoryText] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategoriesAction());
    dispatch(getSubcategoriesAction());
  }, [dispatch]);

  const { control, handleSubmit, formState, reset, setValue } =
    useForm(formConfig);

  const handleSubcategorySubmit = ({ categoryId, subcategoryName }) => {
    if (selectedSubcategory) {
      dispatch(
        updateSubcategoryAction({
          _id: selectedSubcategory._id,
          name: subcategoryName,
          categoryId,
        })
      );
    } else {
      dispatch(createSubcategoryAction({ name: subcategoryName, categoryId }));
    }

    reset();

    setSelectedSubcategory(null);
  };

  const handleSubcategoryDeleteClick = (subcategoryId) => () => {
    setRemoveSubcategoryDialog({
      open: false,
      text: '',
      onConfirm: () => {},
    });
    dispatch(deleteSubcategoryAction(subcategoryId));
    setSelectedSubcategory(null);
  };

  return (
    <Box sx={{ padding: (theme) => theme.spacing(1) }}>
      <Typography variant='h5'>Manage Subcategories</Typography>

      <Box>
        <form onSubmit={handleSubmit(handleSubcategorySubmit)}>
          <Box my={1}>
            <SelectDropdownAdapter
              control={control}
              name='categoryId'
              label='Category'
              options={categories}
            />
          </Box>

          <Box my={1}>
            <TextFieldAdapter
              control={control}
              name='subcategoryName'
              label='Subcategory'
            />
          </Box>

          <Box mt={2} ml={1}>
            <Button
              variant='contained'
              color='secondary'
              type='button'
              onClick={() => {
                setSelectedSubcategory(null);
                reset();
              }}
              disabled={formState.submitting || loading}
            >
              Reset
            </Button>
            <Button
              sx={{ marginLeft: '5px' }}
              variant='contained'
              type='submit'
              disabled={formState.submitting || loading}
            >
              {selectedSubcategory ? 'Update' : 'Create'}
            </Button>
          </Box>
        </form>
      </Box>

      <Divider style={{ margin: '20px 0' }} />

      <Box sx={{ marginBottom: 2 }}>
        <FormControl sx={{ width: '100%' }}>
          <TextField
            label='Search'
            variant='standard'
            value={filterSubcategoryText}
            onChange={(e) => setFilterSubcategoryText(e.target.value)}
          />
        </FormControl>
      </Box>
      <Paper
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          listStyle: 'none',
          p: 2,
          m: 0,
        }}
        component='ul'
      >
        {subcategories.length ? (
          subcategories
            .filter(({ name }) =>
              name.toLowerCase().includes(filterSubcategoryText.toLowerCase())
            )
            .map(({ _id, name, categoryId }) => {
              return (
                <ListItem key={_id}>
                  <Chip
                    sx={{ '&:hover': { cursor: 'pointer' } }}
                    icon={undefined}
                    label={name}
                    onClick={() => {
                      setValue('categoryId', categoryId._id);
                      setValue('subcategoryName', name);
                      setSelectedSubcategory({ _id, name, categoryId });
                    }}
                    onDelete={() =>
                      setRemoveSubcategoryDialog({
                        open: true,
                        text: 'Are you sure you want to delete this subcategory?',
                        onConfirm: handleSubcategoryDeleteClick(_id),
                      })
                    }
                  />
                </ListItem>
              );
            })
        ) : (
          <Typography variant='subtitle2'>
            No subcategories. Use the form above to create some.
          </Typography>
        )}
      </Paper>

      <ConfirmDialog
        dialogConfig={removeSubcategoryDialog}
        setDialogConfig={setRemoveSubcategoryDialog}
      />

      <ApiCallLoader />

      <ApiCallAlert />
    </Box>
  );
};

export default ManageSubcategory;