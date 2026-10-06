import React, { useState, useEffect } from 'react';
import ClothShopApp from './cloth_shop_frontend/ClothShopApp';
import OrderManageApp from './order_manage_frontend/OrderManageApp';
import ClothShopAdminApp from './cloth_shop_admin_frontend/ClothShopAdminApp';

/**
 * Root App component
 * Acts as the application shell and router, managing multi-project workspaces:
 * 1. Define Atelier (Cloth Shop App)
 * 2. Order Manage App
 * 3. Cloth Shop Admin App
 */
export default function App() {
  const [activeProject, setActiveProject] = useState<'cloth_shop' | 'order_manage' | 'cloth_shop_admin'>(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const projParam = urlParams.get('project');
      if (projParam === 'cloth_shop' || projParam === 'order_manage' || projParam === 'cloth_shop_admin') {
        return projParam;
      }
      const saved = localStorage.getItem('active_studio_project');
      if (saved === 'cloth_shop' || saved === 'order_manage' || saved === 'cloth_shop_admin') {
        return saved;
      }
    }
    return 'cloth_shop_admin';
  });

  const handleSwitchProject = (projectId: string) => {
    if (projectId === 'cloth_shop' || projectId === 'order_manage' || projectId === 'cloth_shop_admin') {
      setActiveProject(projectId as any);
      if (typeof window !== 'undefined') {
        localStorage.setItem('active_studio_project', projectId);
        const url = new URL(window.location.href);
        url.searchParams.set('project', projectId);
        window.history.replaceState({}, '', url.toString());
      }
    }
  };

  if (activeProject === 'order_manage') {
    return <OrderManageApp onSwitchProject={handleSwitchProject} />;
  }
  if (activeProject === 'cloth_shop') {
    return <ClothShopApp onSwitchProject={handleSwitchProject} />;
  }

  return <ClothShopAdminApp onSwitchProject={handleSwitchProject} />;
}
