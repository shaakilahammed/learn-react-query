import Product from './Product';

const ProductList = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 col-span-3 gap-1">
            <Product />
            <Product />
            <Product />
            <Product />
        </div>
    );
};

export default ProductList;
