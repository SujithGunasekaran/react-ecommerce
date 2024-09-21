import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { addUserCartInfo, setLoading, setHasError } from '../store/slice/cartSlice';

const useCart = () => {

    // store
    const { userInfo } = useSelector((store) => store.user);

    // dispatch
    const dispatch = useDispatch();

    const fetchUserCart = async () => {
        try {
            dispatch(setLoading(true));
            const { id } = userInfo;
            const response = await axios.get(`https://dummyjson.com/carts/user/${id}`);
            if (response.data) {
                dispatch(addUserCartInfo(response.data.carts?.[0]?.products ?? []));
            }
        } catch (error) {
            console.log('cart api error', error);
            dispatch(setHasError(true));
        } finally {
            dispatch(setLoading(false));
        }
    }

    return {
        fetchUserCart,
    }

}

export default useCart;
