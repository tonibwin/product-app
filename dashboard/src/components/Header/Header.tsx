import { Divider } from '@mui/material';
import './Header.css';

const Header = () => {
    return (
        <>        
            <div className="header-background">
                <span className="header-text-style">DASHBOARD</span>
            </div>
            <Divider sx={{ backgroundColor: "#000000", marginBottom: "10px" }}/>
        </>
    );
};

export default Header;