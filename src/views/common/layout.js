import React, { useState } from 'react';
import Sidebar from './sidebar';

function Layout(props) {
    const [locale, setLocale] = useState(props.locale ?? 'en');
    const [rtl, setRtl] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    const [image, setImage] = useState(true);
    const [toggled, setToggled] = useState(false);

    const handleCollapsedChange = (checked) => {
        setCollapsed(checked);
    };
    const handleRtlChange = (checked) => {
        setRtl(checked);
    };
    const handleImageChange = (checked) => {
        setImage(checked);
    };
    const handleToggleSidebar = (value) => {
        setToggled(value);
    };

    return (
        <div className={`app ${rtl ? 'rtl' : ''} ${toggled ? 'toggled' : ''}`}>
            <Sidebar
                image={image}
                collapsed={collapsed}
                rtl={rtl}
                toggled={toggled}
                handleToggleSidebar={handleToggleSidebar}
            />
            {props.children}
        </div>
    );
}

export default Layout;