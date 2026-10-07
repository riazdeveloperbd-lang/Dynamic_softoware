import React, { useState, useEffect } from 'react';
import ClothShopApp from './cloth_shop_frontend/ClothShopApp';
import OrderManageApp from './order_manage_frontend/OrderManageApp';
import ClothShopAdminApp from './cloth_shop_admin_frontend/ClothShopAdminApp';
import AdminConsoleApp from './admin_app_frontend/AdminConsoleApp';
import SuperVpnApp from './super_vpn_frontend/SuperVpnApp';
import BookStoreApp from './book_store_frontend/BookStoreApp';
import WebsiteLandingStudio from './website_builder_frontend/WebsiteLandingStudio';
import CustomProjectApp from './components/CustomProjectApp';
import FullWebsitePreloader from './components/FullWebsitePreloader';
import {
  CustomProjectDefinition,
  loadCustomProjects,
} from './utils/customProjectsStore';

/**
 * Root App component
 * Acts as the application shell and router, managing multi-project workspaces:
 * 1. Book Store (Bazar Editorial Book Store App)
 * 2. Super VPN
 * 3. Define Atelier (Cloth Shop App)
 * 4. Order Manage App
 * 5. Cloth Shop Admin App
 * 6. Any user-created Custom Projects generated via the Create New Project modal
 */
export default function App() {
  const [customProjects, setCustomProjects] = useState<CustomProjectDefinition[]>(() =>
    loadCustomProjects()
  );

  const [activeProject, setActiveProject] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const projParam = urlParams.get('project');
      if (projParam) {
        return projParam;
      }
      const saved = localStorage.getItem('active_studio_project');
      if (
        saved &&
        (saved === 'book_store' ||
          saved === 'website_landing' ||
          saved === 'super_vpn' ||
          saved === 'admin_app' ||
          saved === 'cloth_shop' ||
          saved === 'order_manage' ||
          saved === 'cloth_shop_admin' ||
          saved.startsWith('custom_'))
      ) {
        return saved;
      }
    }
    return 'website_landing';
  });

  const [lastMobileProject, setLastMobileProject] = useState<string>('book_store');
  const [isWebsiteLoading, setIsWebsiteLoading] = useState<boolean>(true);

  useEffect(() => {
    const initialTimer = setTimeout(() => {
      setIsWebsiteLoading(false);
    }, 850);
    return () => clearTimeout(initialTimer);
  }, []);

  const triggerWebsitePreloader = (duration = 650) => {
    setIsWebsiteLoading(true);
    setTimeout(() => {
      setIsWebsiteLoading(false);
    }, duration);
  };

  useEffect(() => {
    const syncCustom = () => setCustomProjects(loadCustomProjects());
    const onPlatformSwitch = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail === 'website') {
        handleSwitchProject('website_landing');
      } else {
        handleSwitchProject(lastMobileProject || 'book_store');
      }
    };
    window.addEventListener('custom-projects-updated', syncCustom);
    window.addEventListener('switch-studio-platform', onPlatformSwitch);
    return () => {
      window.removeEventListener('custom-projects-updated', syncCustom);
      window.removeEventListener('switch-studio-platform', onPlatformSwitch);
    };
  }, [lastMobileProject]);

  const handleSwitchProject = (projectId: string) => {
    triggerWebsitePreloader(600);
    setCustomProjects(loadCustomProjects());
    if (projectId !== 'website_landing') {
      setLastMobileProject(projectId);
    }
    setActiveProject(projectId);
    if (typeof window !== 'undefined') {
      localStorage.setItem('active_studio_project', projectId);
      const url = new URL(window.location.href);
      url.searchParams.set('project', projectId);
      window.history.replaceState({}, '', url.toString());
    }
  };

  const renderActiveWorkspace = () => {
    if (activeProject === 'website_landing') {
      return (
        <WebsiteLandingStudio
          onSwitchPlatformMode={(mode) => {
            if (mode === 'mobile') {
              handleSwitchProject(lastMobileProject || 'book_store');
            } else {
              handleSwitchProject('website_landing');
            }
          }}
        />
      );
    }

    if (activeProject === 'book_store') {
      return <BookStoreApp onSwitchProject={handleSwitchProject} />;
    }
    if (activeProject === 'super_vpn') {
      return <SuperVpnApp onSwitchProject={handleSwitchProject} />;
    }
    if (activeProject === 'admin_app') {
      return <AdminConsoleApp onSwitchProject={handleSwitchProject} />;
    }
    if (activeProject === 'order_manage') {
      return <OrderManageApp onSwitchProject={handleSwitchProject} />;
    }
    if (activeProject === 'cloth_shop') {
      return <ClothShopApp onSwitchProject={handleSwitchProject} />;
    }
    if (activeProject === 'cloth_shop_admin') {
      return <ClothShopAdminApp onSwitchProject={handleSwitchProject} />;
    }

    const matchedCustom = customProjects.find((p) => p.id === activeProject);
    if (matchedCustom) {
      return (
        <CustomProjectApp
          project={matchedCustom}
          onSwitchProject={handleSwitchProject}
          onProjectUpdated={() => setCustomProjects(loadCustomProjects())}
        />
      );
    }

    return <ClothShopAdminApp onSwitchProject={handleSwitchProject} />;
  };

  return (
    <>
      <FullWebsitePreloader visible={isWebsiteLoading} />
      {renderActiveWorkspace()}
    </>
  );
}
