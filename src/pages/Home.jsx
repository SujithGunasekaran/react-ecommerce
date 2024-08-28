import Categories from '../components/Categories';
import '../styles/home.css';

const Home = () => {

    return (
        <>
            <div className='home-container'>
                <div className='home-category-container'>
                    <Categories />
                </div>
                <div className='home-product-container'>Products</div>
            </div>
        </>
    )
}

export default Home;