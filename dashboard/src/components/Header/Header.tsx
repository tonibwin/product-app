import React, { useEffect, useState } from "react";
import { Divider } from '@mui/material';
import './Header.css';

const Header = () => {
    return (
        <>        
            <div className="header-background">
                <span className="header-text-style">DASHBOARD</span>
            </div>
            <Divider sx={{ backgroundColor: "#000000" }}/>
        </>
    );
};

export default Header;