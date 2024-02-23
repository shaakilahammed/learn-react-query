import { useQuery } from '@tanstack/react-query';
import Loader from './Loader';
import Product from './Product';

const ProductList = ({ onSelected, onSetToUpdate }) => {
    const { isLoading, isSuccess, isError, error, data } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const response = await fetch(
                'https://json-server-mock-api.vercel.app/products'
            );
            const data = response.json();
            return data;
        },
    });

    let content = null;
    if (isLoading) {
        content = (
            <>
                <Loader />
                <Loader />
                <Loader />
                <Loader />
                <Loader />
            </>
        );
    }

    if (!isLoading && isError) {
        content = (
            <p className="text-md font-semibold tracking-tight text-orange-600">
                {error.message}
            </p>
        );
    }

    if (!isLoading && !isError && isSuccess && data?.length === 0) {
        content = (
            <p className="text-xl font-semibold tracking-tight text-gray-900">
                No Product Found!
            </p>
        );
    }

    if (!isLoading && !isError && isSuccess && data?.length > 0) {
        content = data?.map((product) => (
            <Product
                key={product.id}
                {...product}
                onSelected={onSelected}
                onSetToUpdate={onSetToUpdate}
            />
        ));
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 col-span-3 gap-1 pt-5">
            {content}
        </div>
    );
};

export default ProductList;
