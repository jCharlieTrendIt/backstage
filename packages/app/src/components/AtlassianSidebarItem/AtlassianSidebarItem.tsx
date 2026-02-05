import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  SidebarItem,
  SidebarSubmenu,
  SidebarSubmenuItem,
} from '@backstage/core-components';
import CloudIcon from '@material-ui/icons/Cloud';
import { useAtlassianAuth } from '../../hooks/useAtlassianAuth';
import { AtlassianAuthModal } from '../AtlassianAuthModal';

export const AtlassianSidebarItem = () => {
  const { isAuthenticated, signIn, isLoading } = useAtlassianAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    if (!isAuthenticated) {
      setModalOpen(true);
    }
  };

  const handleSignIn = async () => {
    await signIn();
  };

  const handleJiraClick = () => {
    if (!isAuthenticated) {
      setModalOpen(true);
    } else {
      navigate('/jira');
    }
  };

  const handleConfluenceClick = () => {
    if (!isAuthenticated) {
      setModalOpen(true);
    } else {
      navigate('/confluence');
    }
  };

  return (
    <>
      <SidebarItem icon={CloudIcon} text="Atlassian" onClick={handleClick}>
        {isAuthenticated && (
          <SidebarSubmenu title="Atlassian">
            <SidebarSubmenuItem
              title="Jira"
              to="/jira"
              icon={CloudIcon}
              onClick={handleJiraClick}
            />
            <SidebarSubmenuItem
              title="Confluence"
              to="/confluence"
              icon={CloudIcon}
              onClick={handleConfluenceClick}
            />
          </SidebarSubmenu>
        )}
      </SidebarItem>

      <AtlassianAuthModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSignIn={handleSignIn}
        isLoading={isLoading}
      />
    </>
  );
};
