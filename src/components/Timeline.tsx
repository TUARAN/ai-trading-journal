import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';

export interface TimelineItem {
  id: number;
  time: string;
  content: string;
  type: 'aiLog' | 'note';
}

export interface TimelineProps {
  items: TimelineItem[];
  months: string[];
  month: string;
  onMonthChange: (m: string) => void;
  getTypeLabel?: (type: 'aiLog' | 'note') => string;
}

const Timeline: React.FC<TimelineProps> = ({ items, months, month, onMonthChange, getTypeLabel }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalItem, setModalItem] = useState<TimelineItem | null>(null);
  const monthItems = items.filter(i => i.time.startsWith(month)).sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());
  return (
    <div className="bg-white rounded-lg shadow p-4 w-full">
      <div className="flex items-center mb-2">
        <h2 className="text-lg font-bold mr-4">时间线</h2>
        <select
          className="border rounded px-2 py-1 text-sm"
          value={month}
          onChange={e => onMonthChange(e.target.value)}
        >
          {months.map(m => <option key={m} value={m}>{m}</option>)}
        </select>
      </div>
      <div className="overflow-x-auto">
        <div className="relative w-full min-h-[200px]" style={{ minWidth: 400 }}>
          <div className="absolute left-0 right-0" style={{ top: 60, height: 2, background: '#e5e7eb', zIndex: 0 }} />
          {monthItems.map((item, idx) => {
            const leftPercent = monthItems.length > 1 ? (idx / (monthItems.length - 1)) * 100 : 50;
            return (
              <React.Fragment key={item.id + item.type}>
                <div
                  className="absolute z-10"
                  style={{ left: `calc(${leftPercent}% )`, top: 60, transform: 'translate(-50%, -50%)' }}
                >
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shadow ${item.type === 'aiLog' ? 'bg-blue-500 border-blue-700' : 'bg-amber-500 border-amber-700'}`}></div>
                </div>
                <div
                  className={`absolute z-20 w-44 cursor-pointer shadow-lg rounded-lg px-4 py-3 text-xs text-gray-800 bg-white border ${item.type === 'aiLog' ? 'border-blue-200' : 'border-amber-200'} hover:bg-blue-50`}
                  style={{ left: `calc(${leftPercent}% )`, top: 60 + 18 + 12, transform: 'translateX(-50%)' }}
                  onClick={() => { setModalItem(item); setModalOpen(true); }}
                >
                  <div className="flex items-center mb-1">
                    <span className={`inline-block w-2 h-2 rounded-full mr-2 ${item.type === 'aiLog' ? 'bg-blue-500' : 'bg-amber-500'}`}></span>
                    <span className="font-bold text-base">{item.time.slice(8, 10)}日</span>
                    <span className="ml-auto text-gray-400 text-sm">{getTypeLabel ? getTypeLabel(item.type) : (item.type === 'aiLog' ? '日志' : '笔记')}</span>
                  </div>
                  <div className="truncate" title={item.content}>{item.content.slice(0, 32)}{item.content.length > 32 ? '…' : ''}</div>
                </div>
              </React.Fragment>
            );
          })}
          {monthItems.length === 0 && <div className="text-gray-400 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">暂无内容</div>}
        </div>
      </div>
      <Dialog open={modalOpen} onClose={() => setModalOpen(false)} className="fixed z-50 inset-0 flex items-center justify-center">
        {modalOpen && <div className="fixed inset-0 bg-black/30 z-40" />}
        <Dialog.Panel className="relative bg-white rounded-lg shadow-lg p-6 w-80 mx-auto z-50">
          <Dialog.Title className="text-lg font-bold mb-2">{modalItem?.type === 'aiLog' ? (getTypeLabel ? getTypeLabel('aiLog') : '日志') : (getTypeLabel ? getTypeLabel('note') : '笔记')}</Dialog.Title>
          <div className="text-xs text-gray-500 mb-2">{modalItem?.time}</div>
          <div className="text-gray-800 mb-4 whitespace-pre-line">{modalItem?.content}</div>
          <button className="btn-primary w-full" onClick={() => setModalOpen(false)}>关闭</button>
        </Dialog.Panel>
      </Dialog>
    </div>
  );
};

export default Timeline; 