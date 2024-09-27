import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { API_URL } from '../variables';
import { setUsers } from '../store/usersSlice';
import { RootState } from '../store/store';

export default function useUsers() {
    
    const dispatch = useDispatch();

    const {users} =  useSelector<RootState, any>((state) => state.users);

    const fetchUsers = async (query = "") => {
        try {
            const response = await axios.get(`${API_URL}users/${query}`);
            if(response.data)
                dispatch(setUsers(response.data.users));
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
    }

  return {fetchUsers, users};
}
