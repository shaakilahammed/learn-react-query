import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

const ProductForm = ({ toUpdate, onSetToUpdate }) => {
    const queryClient = useQueryClient();

    const {
        mutate: addProduct,
        isError,
        error,
        isPending,
    } = useMutation({
        mutationFn: async (newProduct) => {
            const response = await fetch(
                'https://json-server-mock-api.vercel.app/products',
                {
                    method: 'POST',
                    body: JSON.stringify({
                        ...newProduct,
                        id: crypto.randomUUID(),
                    }),
                    headers: {
                        'Content-type': 'application/json',
                    },
                }
            );
            const data = await response.json();

            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['products']);
            setInput({
                title: '',
                description: '',
                rating: 1,
                price: 0,
                thumbnail: '',
            });
        },
    });

    const {
        mutate: updateProduct,
        isError: updateIsError,
        error: updateError,
        isPending: updateIsPeneding,
    } = useMutation({
        mutationFn: async (newProduct) => {
            const response = await fetch(
                `https://json-server-mock-api.vercel.app/products/${newProduct.id}`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify(newProduct),
                }
            );
            const data = await response.json();
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['products']);
            onSetToUpdate(null);
        },
    });

    const [input, setInput] = useState(
        toUpdate || {
            title: '',
            description: '',
            rating: 5,
            price: '',
            thumbnail: '',
        }
    );

    const handleChange = (e) => {
        setInput((prev) => ({
            ...prev,
            [e.target.name]:
                e.target.type === 'number' ? +e.target.value : e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (toUpdate) {
            updateProduct(input);
        } else {
            addProduct(input);
        }
    };
    return (
        <form className="m-2 p-2" onSubmit={handleSubmit}>
            <h2 className="text-center pb-4 text-xl font-bold">
                {toUpdate ? 'Update Product' : 'Add Product'}
            </h2>
            <div className="relative h-11 w-full min-w-[200px] mb-4">
                <input
                    placeholder="Enter Title"
                    className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                    name="title"
                    value={input.title}
                    onChange={handleChange}
                    required
                />
                <label className="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    Title
                </label>
            </div>
            <div className="relative h-11 w-full min-w-[200px] mb-4">
                <input
                    placeholder="Enter Description"
                    className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                    name="description"
                    value={input.description}
                    onChange={handleChange}
                    required
                />
                <label className="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    Description
                </label>
            </div>
            <div className="relative h-11 w-full min-w-[200px] mb-4">
                <input
                    placeholder="Enter Price"
                    className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                    type="number"
                    min={1}
                    name="price"
                    value={input.price}
                    onChange={handleChange}
                    required
                />
                <label className="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    Price
                </label>
            </div>
            <div className="relative h-11 w-full min-w-[200px] mb-4">
                <input
                    placeholder="Enter Rating"
                    className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                    type="number"
                    min={1}
                    max={5}
                    step={0.01}
                    name="rating"
                    value={input.rating}
                    onChange={handleChange}
                    required
                />
                <label className="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    Rating
                </label>
            </div>
            <div className="relative h-11 w-full min-w-[200px] mb-4">
                <input
                    placeholder="Enter Thumbnail Link"
                    className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
                    name="thumbnail"
                    value={input.thumbnail}
                    onChange={handleChange}
                    required
                />
                <label className="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    Thumbnail
                </label>
            </div>

            <button
                type="submit"
                disabled={isPending || updateIsPeneding}
                className="w-full text-white bg-[#2e86de] hover:bg-[#14528f] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:cursor-not-allowed"
            >
                {toUpdate ? 'Update' : 'Add'}
            </button>

            {toUpdate && (
                <button
                    disabled={isPending}
                    onClick={() => onSetToUpdate(null)}
                    className="w-full mt-2 text-white bg-[#de2e63] hover:bg-[#ab1e48] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:cursor-not-allowed"
                >
                    Cancel
                </button>
            )}
            {isError && <p className="text-red-600">{error.message}</p>}
            {updateIsError && (
                <p className="text-red-600">{updateError.message}</p>
            )}
        </form>
    );
};

export default ProductForm;
