import React from 'react';
import {
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu,
    SidebarHeader,
    SidebarFooter,
    SidebarContent
} from 'react-pro-sidebar';
import { useHistory, Link } from 'react-router-dom';
import { FaTachometerAlt, FaList, FaPowerOff, FaRegLaughWink, FaDesktop } from 'react-icons/fa';
import sidebarBg from '../../assets/bg1.jpg';
import axios from 'axios';
import { Config } from '../../config/config';
axios.defaults.baseURL = Config.api_url;

const Sidebar = ({ 
    image, collapsed, rtl, toggled, handleToggleSidebar 
}) => {
    const history = useHistory();
    const logout = () => {
        axios.get(`/signout`)
            .then(({ data }) => {
                if (data.success) {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    history.push('/login');
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    const user = JSON.parse(localStorage.getItem('user'));

    const menus = []
    menus.push({
        icon: <FaList />,
        title: "Dashboard",
        href: "/"
    })
    menus.push({
        icon: <FaRegLaughWink />,
        title: "User Settings",
        href: "/settings"
    })

    return (
        <ProSidebar
            image={image ? sidebarBg : false}
            rtl={rtl}
            collapsed={collapsed}
            toggled={toggled}
            breakPoint="md"
            onToggle={handleToggleSidebar}
        >
            <SidebarHeader>
                <div
                    style={{
                        padding: '24px',
                        textTransform: 'uppercase',
                        fontWeight: 'bold',
                        fontSize: 14,
                        letterSpacing: '1px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                    }}
                >
                    {user ? (
                        <>
                            Hello, <strong>{user.firstname} {user.lastname}</strong>
                        </>
                    ) : 'Video Panel'}
                </div>
            </SidebarHeader>

            <SidebarContent>
                <br />
                {menus.map((menu, index) => {
                    return (
                        <Menu key={index} iconShape="circle">
                            <MenuItem
                                icon={menu.icon}
                                suffix={<span className="badge red"></span>}
                            >
                                {menu.title}

                                {menu.href && (
                                    <Link to={menu.href} />
                                )}
                            </MenuItem>
                        </Menu>
                    )
                })}
            </SidebarContent>

            <SidebarFooter style={{ textAlign: 'center' }}>
                <div
                    className="sidebar-btn-wrapper"
                    style={{
                        padding: '20px 24px',
                    }}
                >
                    <a
                        href="#"
                        className="sidebar-btn"
                        rel="noopener noreferrer"
                        onClick={() => logout()}
                    >
                        <FaPowerOff />
                        <span> {"Logout"}</span>
                    </a>
                </div>
            </SidebarFooter>
        </ProSidebar>
    );
};

export default Sidebar;