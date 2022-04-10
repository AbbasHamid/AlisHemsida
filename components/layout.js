import Header from './header';
import Footer from './footer';

const layout = ({ children }) => (
    <div className="website-body">
        <Header />
        {children}
        <Footer />
    </div>
);

export default layout;