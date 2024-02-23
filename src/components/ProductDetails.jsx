import { useQuery } from '@tanstack/react-query';
import Loader from './Loader';
import Rating from './Rating';

const ProductDetails = ({ selectedProductId, onSetToUpdate }) => {
    const {
        isLoading,
        data: product,
        isError,
        isSuccess,
        error,
    } = useQuery({
        queryKey: ['products', selectedProductId],
        queryFn: async ({ queryKey }) => {
            const response = await fetch(
                `https://json-server-mock-api.vercel.app/products/${queryKey[1]}`
            );
            const data = await response.json();
            return data;
        },
    });
    if (isLoading) {
        return <Loader />;
    }

    if (!isLoading && isError) {
        return (
            <p className="text-xl font-semibold tracking-tight text-orange-600">
                {error}
            </p>
        );
    }

    if (
        !isLoading &&
        !isError &&
        isSuccess &&
        Object.keys(product).length === 0
    ) {
        return (
            <p className="text-xl font-semibold tracking-tight text-gray-900">
                No Product Found!
            </p>
        );
    }

    return (
        <div className="w-full bg-white border border-gray-200 rounded-lg shadow pt-5">
            <img
                className="rounded-t-lg w-full"
                src={product.thumbnail}
                alt="product image"
            />

            <div className="px-5 pb-5">
                <h5 className="text-xl font-semibold tracking-tight text-gray-900">
                    {product.title}
                </h5>
                <p className="text-md font-thin tracking-tight text-gray-700">
                    {product.description}
                </p>

                <Rating rating={product.rating} />
                <div className="flex flex-col gap-4 justify-between">
                    <span className="text-3xl font-bold text-gray-900">
                        ${product.price}
                    </span>
                    <button
                        onClick={() =>
                            onSetToUpdate({
                                ...product,
                            })
                        }
                        className="text-white bg-[#2e86de] hover:bg-[#14528f] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                        Edit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
