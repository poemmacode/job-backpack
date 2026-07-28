interface JobNotesProps {
  notes?: string | null;
}

export function JobNotes({ notes }: JobNotesProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Notes</h2>

      {notes ? (
        <p className="text-gray-700 whitespace-pre-wrap">{notes}</p>
      ) : (
        <p className="text-gray-400 italic">No notes yet</p>
      )}
    </div>
  );
}
