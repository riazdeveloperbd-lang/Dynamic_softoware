import React, { useState, useEffect } from 'react';
import ClothShopApp from './cloth_shop_frontend/ClothShopApp';
import OrderManageApp from './order_manage_frontend/OrderManageApp';
import ClothShopAdminApp from './cloth_shop_admin_frontend/ClothShopAdminApp';
import AdminConsoleApp from './admin_app_frontend/AdminConsoleApp';
import SuperVpnApp from './super_vpn_frontend/SuperVpnApp';
import BookStoreApp from './book_store_frontend/BookStoreApp';
import CustomProjectApp from './components/CustomProjectApp';
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
    return 'book_store';
  });

  useEffect(() => {
    const syncCustom = () => setCustomProjects(loadCustomProjects());
    window.addEventListener('custom-projects-updated', syncCustom);
    return () => window.removeEventListener('custom-projects-updated', syncCustom);
  }, []);

  const handleSwitchProject = (projectId: string) => {
    setCustomProjects(loadCustomProjects());
    setActiveProject(projectId);
    if (typeof window !== 'undefined') {
      localStorage.setItem('active_studio_project', projectId);
      const url = new URL(window.location.href);
      url.searchParams.set('project', projectId);
      window.history.replaceState({}, '', url.toString());
    }
  };

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
}
