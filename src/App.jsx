import ProductDetails from './components/ProductDetails';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';

function App() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
            <ProductForm />
            <ProductList />
            <ProductDetails />
        </div>
    );
}

export default App;
