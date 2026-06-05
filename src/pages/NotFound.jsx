import { Link } from 'react-router-dom';

function NotFound() {
    return (
        <div className="text-center mt-20">
            <h1 className="text-4xl">404 - Page Not Found</h1>
            <Link to="/" className="text-blue-500 underline mt-4 inline-block">Go Home</Link>
        </div>
    );
}

export default NotFound;