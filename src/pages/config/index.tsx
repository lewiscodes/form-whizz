import { useState } from 'react';
import { Navbar, NavbarGroup, Tabs, Tab } from '@blueprintjs/core';
import AppConfig from './appConfig';
import FormConfig from './formConfig';
import { configStyles } from './styles';

const ConfigPage = () => {
    enum ETab {
        APP = 'APP',
        FORM = 'FORM'
    }

    const tabItems = [
        { id: ETab.APP, title: 'App Config', panel: <AppConfig /> },
        { id: ETab.FORM, title: 'Form Config', panel: <FormConfig /> }
    ];
    const [selectedTab, setSelectedTab] = useState<ETab>(ETab.FORM);
    return (
        <>
            <Navbar style={configStyles.tabs}>
                <NavbarGroup>
                    <Tabs selectedTabId={selectedTab} onChange={(tabId) => setSelectedTab(tabId as ETab)}>
                        {tabItems.map(tabItem => <Tab key={tabItem.id} id={tabItem.id} title={tabItem.title} />)}
                    </Tabs>
                </NavbarGroup>
            </Navbar>
            {tabItems.find(tabItem => tabItem.id === selectedTab)?.panel}
        </>
    );
}

export default ConfigPage;