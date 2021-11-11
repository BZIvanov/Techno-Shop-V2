import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllRoomsAction } from '../../store/action-creators';

const Rooms = () => {
  const { loading } = useSelector((state) => state.apiCall);
  const { rooms } = useSelector((state) => state.rooms);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllRoomsAction());
  }, [dispatch]);

  console.log(loading, rooms);
  return <div>Works</div>;
};

export default Rooms;
