'use client';

import { TopSkill } from '../types/analytics';

interface TopSkillsProps {
  skills: TopSkill[];
}

export function TopSkills({ skills }: TopSkillsProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-sm font-medium text-gray-600 mb-4">Top Skills</h3>

      {skills.length === 0 ? (
        <p className="text-gray-500 text-sm">No data available</p>
      ) : (
        <div className="space-y-3">
          {skills.map((item, index) => (
            <div key={item.skill} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-400 w-5">{index + 1}</span>
                <span className="text-sm text-gray-700">{item.skill}</span>
              </div>
              <span className="text-sm font-medium text-gray-900">{item.count}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
