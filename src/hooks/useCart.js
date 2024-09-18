import { useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { addUserCartInfo } from '../store/slice/cartSlice';

const useCart = () => {

    // store
    const { userInfo } = useSelector((store) => store.user);

    // dispatch
    const dispatch = useDispatch();

    // state
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);

    const fetchUserCart = async () => {
        try {
            setIsLoading(true);
            const { id } = userInfo;
            const response = await axios.get(`https://dummyjson.com/carts/user/${id}`);
            if (response.data) {
                dispatch(addUserCartInfo(response.data.carts[0]));
            }
        } catch (error) {
            console.log('cart api error', error);
            setHasError(true);
        } finally {
            setIsLoading(false);
        }
    }

    return {
        isLoading,
        hasError,
        fetchUserCart,
    }

}

export default useCart;
