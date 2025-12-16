interface Option {
  name: string;
  subtitle?: string;
}

interface MemoryStorageSelectorProps {
  memory?: Option[];
  storage?: Option[];
  selectedMemory: number;
  selectedStorage: number;
  onMemoryChange: (index: number) => void;
  onStorageChange: (index: number) => void;
}

export default function MemoryStorageSelector({
  memory,
  storage,
  selectedMemory,
  selectedStorage,
  onMemoryChange,
  onStorageChange,
}: MemoryStorageSelectorProps) {
  if ((!memory || memory.length === 0) && (!storage || storage.length === 0)) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {memory && memory.length > 0 && (
        <div>
          <label className="text-foreground font-medium block mb-2">Memory</label>
          <select
            value={selectedMemory}
            onChange={(e) => onMemoryChange(Number(e.target.value))}
            className="w-full px-3 py-2 border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          >
            {memory.map((mem, index) => (
              <option key={index} value={index}>
                {mem.name} {mem.subtitle}
              </option>
            ))}
          </select>
        </div>
      )}
      {storage && storage.length > 0 && (
        <div>
          <label className="text-foreground font-medium block mb-2">Storage</label>
          <select
            value={selectedStorage}
            onChange={(e) => onStorageChange(Number(e.target.value))}
            className="w-full px-3 py-2 border border-border rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          >
            {storage.map((stor, index) => (
              <option key={index} value={index}>
                {stor.name} {stor.subtitle}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}

