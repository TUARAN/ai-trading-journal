import React from 'react';

export interface TabItem {
  key: string;
  label: string;
}

export interface TabSwitcherProps {
  tabs: TabItem[];
  value: string;
  onChange: (key: string) => void;
}

const TabSwitcher: React.FC<TabSwitcherProps> = ({ tabs, value, onChange }) => (
  <div className="flex gap-2">
    {tabs.map(tab => (
      <button
        key={tab.key}
        className={`px-4 py-2 rounded-lg font-semibold border transition-all ${value === tab.key ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-50'}`}
        onClick={() => onChange(tab.key)}
      >
        {tab.label}
      </button>
    ))}
  </div>
);

export default TabSwitcher; 