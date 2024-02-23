import { useMutation, useQueryClient } from '@tanstack/react-query';
import Rating from './Rating';

const Product = ({
    id,
    title,
    description,
    price,
    rating,
    thumbnail,
    onSelected,
    onSetToUpdate,
}) => {
    const queryClient = useQueryClient();
    const { isPending, mutate } = useMutation({
        mutationFn: async (productId) => {
            const response = await fetch(
                `https://json-server-mock-api.vercel.app/products/${productId}`,
                {
                    method: 'DELETE',
                }
            );
            const data = response.json();
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['products']);
        },
    });

    const handleDelete = (e, productId) => {
        e.stopPropagation();
        if (confirm('Do you realy want to delete this?')) mutate(productId);
    };

    const handleDetails = (productId) => {
        onSelected(productId);
    };

    // if (isPending) {
    //     return <Loader />;
    // }
    return (
        <div
            className="w-full bg-white border border-gray-200 rounded-lg shadow cursor-pointer"
            onClick={() => handleDetails(id)}
        >
            <img
                className="rounded-t-lg w-full min-h-48 max-h-48 object-cover"
                src={thumbnail}
                alt={title}
            />

            <div className="px-5 pb-5 flex flex-col justify-between">
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 cursor-pointer hover:text-[#3498db]">
                    {title}
                </h5>
                {rating && <Rating rating={rating} />}
                <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-gray-900">
                        ${price}
                    </span>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onSetToUpdate({
                                id,
                                title,
                                description,
                                price,
                                rating,
                                thumbnail,
                            });
                        }}
                        className="text-white bg-[#2e86de] hover:bg-[#14528f] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1.5 text-center"
                    >
                        Edit
                    </button>
                    <button
                        onClick={(e) => handleDelete(e, id)}
                        disabled={isPending}
                        className="text-white bg-[#ff6348] hover:bg-[#ff4757] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1.5 text-center disabled:cursor-not-allowed"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Product;
