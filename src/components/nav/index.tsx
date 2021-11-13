import { Alignment, Button, Classes, Icon, Navbar, NavbarDivider, NavbarGroup, NavbarHeading } from '@blueprintjs/core';
import { Link } from 'react-router-dom';
import { ERoutes } from '../../router';

const Nav = () => {
    return (
        <Navbar>
            <NavbarGroup align={Alignment.LEFT}>
                <NavbarHeading>Form Whizz</NavbarHeading>
                <NavbarDivider />
                <Button className={Classes.MINIMAL} icon='home' text='Dashboard' />
                <Button className={Classes.MINIMAL} icon='document' text='New' />
                <Button className={Classes.MINIMAL} icon='issue' text='Incidents' />
            </NavbarGroup>
            <NavbarGroup align={Alignment.RIGHT}>
                <div className={Classes.INPUT_GROUP}>
                    <Icon icon='search' />
                    <input className={Classes.INPUT} type='search' placeholder='Search' />
                </div>
                <Link to={ERoutes.CONFIG}><Button className={Classes.MINIMAL} icon='cog' /></Link>
                <Button className={Classes.MINIMAL} icon='user' />
            </NavbarGroup>
        </Navbar>
    );
}

export default Nav;
