import React, { useState, Children, cloneElement, isValidElement } from 'react';
interface TabsProps {
  defaultValue: string;
  children: React.ReactNode;
}
interface TabsContentProps {
  value: string;
  children: React.ReactNode;
}
interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
}
export function Tabs({
  defaultValue,
  children
}: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue);
  return <div className="tabs" data-active-tab={activeTab}>
      {Children.map(children, child => {
      if (isValidElement(child)) {
        return cloneElement(child as React.ReactElement<any>, {
          activeTab,
          setActiveTab
        });
      }
      return child;
    })}
    </div>;
}
export function TabsList({
  children,
  activeTab,
  setActiveTab
}: any) {
  return <div className="flex space-x-2 mb-6 border-b border-gray-200">
      {Children.map(children, child => {
      if (isValidElement(child)) {
        return cloneElement(child, {
          activeTab,
          setActiveTab
        });
      }
      return child;
    })}
    </div>;
}
export function TabsTrigger({
  value,
  children,
  activeTab,
  setActiveTab
}: any) {
  return <button className={`px-4 py-2 text-sm font-medium ${activeTab === value ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab(value)}>
      {children}
    </button>;
}
export function TabsContent({
  value,
  children,
  activeTab
}: any) {
  if (activeTab !== value) return null;
  return <div className="bg-white rounded-lg shadow p-6">{children}</div>;
}