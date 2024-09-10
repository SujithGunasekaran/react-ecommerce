import propTypes from 'prop-types';
import ProductCardItem from './ProductCardItem';


const ProductCardList = (props) => {

    // props
    const { productList } = props;

    return (
        <div className='product-list-container'>
            {
                productList.length > 0 &&
                productList.map((product) => (
                    <ProductCardItem
                        key={product.id}
                        product={product}
                    />
                ))
            }
        </div>
    )
}

ProductCardList.propTypes = {
    productList: propTypes.array,
};

export default ProductCardList;
