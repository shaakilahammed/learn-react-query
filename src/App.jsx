import { useState } from 'react';
import ProductDetails from './components/ProductDetails';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';

function App() {
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [toUpdate, setToUpdate] = useState(null);
    return (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
            <ProductForm
                toUpdate={toUpdate}
                onSetToUpdate={setToUpdate}
                key={toUpdate?.id}
            />
            <ProductList
                onSelected={setSelectedProductId}
                onSetToUpdate={setToUpdate}
            />
            {selectedProductId && (
                <ProductDetails
                    selectedProductId={selectedProductId}
                    onSetToUpdate={setToUpdate}
                />
            )}
        </div>
    );
}

export default App;
