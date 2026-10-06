import React, { useState, useEffect } from 'react';
import ClothShopApp from './cloth_shop_frontend/ClothShopApp';
import OrderManageApp from './order_manage_frontend/OrderManageApp';
import ClothShopAdminApp from './cloth_shop_admin_frontend/ClothShopAdminApp';
import CustomProjectApp from './components/CustomProjectApp';
import {
  CustomProjectDefinition,
  loadCustomProjects,
} from './utils/customProjectsStore';

/**
 * Root App component
 * Acts as the application shell and router, managing multi-project workspaces:
 * 1. Define Atelier (Cloth Shop App)
 * 2. Order Manage App
 * 3. Cloth Shop Admin App
 * 4. Any user-created Custom Projects generated via the Create New Project modal
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
      if (saved) {
        return saved;
      }
    }
    return 'cloth_shop_admin';
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
