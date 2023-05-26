import React from 'react';
import { BottomNavigation, Icon, Page } from 'zmp-ui';
import ClusterListPage from './ClusterListPage';
import RancherForm from './RancherForm';
import UserListPage from './UserListPage';

enum Tab {
  Clusters = '/clusters',
  Users = '/users',
  Settings = '/settings',
}

const HomePage: React.FunctionComponent = () => {
  const [activeTab, setActiveTab] = React.useState<Tab>(Tab.Clusters);

  return (
    <Page className="page">
      {activeTab === Tab.Clusters && (
        <ClusterListPage />
      )}
      {activeTab === Tab.Users && (
        <UserListPage />
      )}

      {activeTab === Tab.Settings && (
        <RancherForm />
      )}
      <BottomNavigation
        id="bottom-tabs"
        fixed
        activeKey={activeTab}
        onChange={(key: Tab) => {
          setActiveTab(key);
        }}>
        <BottomNavigation.Item
          key={Tab.Clusters}
          label="Clusters"
          icon={<Icon icon="zi-list-1" />}
          activeIcon={<Icon icon="zi-list-1" />}
        />

        <BottomNavigation.Item
          key={Tab.Users}
          label="Người dùng"
          icon={<Icon icon="zi-user-search-solid" />}
          activeIcon={<Icon icon="zi-user-search-solid" />}
        />

        <BottomNavigation.Item
          key={Tab.Settings}
          label="Cài đặt"
          icon={<Icon icon="zi-setting" />}
          activeIcon={<Icon icon="zi-setting" />}
        />
      </BottomNavigation>
    </Page>
  );
};

export default HomePage;
