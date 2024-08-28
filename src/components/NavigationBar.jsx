import React from 'react';
import {
    Avatar,
    Dropdown,
    DropdownDivider,
    DropdownHeader,
    DropdownItem,
    Navbar,
    NavbarBrand,
    NavbarCollapse,
    NavbarLink,
    NavbarToggle,
  } from "flowbite-react";

function NavigationBar(props) {
    return (
        <Navbar className='w-full  pb-0 bg-[#30323d]'>
            <NavbarBrand>
                <img src="assets/logo-dark-mode.png" className="ml-3 h-20" alt="Flowbite React Logo" />
            </NavbarBrand>
      </Navbar>
    );
}

export default NavigationBar;