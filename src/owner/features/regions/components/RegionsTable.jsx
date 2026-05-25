import { Pencil, Trash2 } from "lucide-react";
import Button from "@/shared/components/ui/button/Button";
import useModal from "@/shared/hooks/useModal";
import { MODAL } from "@/shared/constants/modals";

const formatGmt = (n) => {
  if (n === null || n === undefined) return "-";
  if (n === 0) return "GMT+0";
  return n > 0 ? `GMT+${n}` : `GMT${n}`;
};

const RegionsTable = ({ items = [], isLoading }) => {
  const { openModal } = useModal();

  if (isLoading) {
    return <div className="p-4 text-sm text-muted-foreground">Yuklanmoqda...</div>;
  }
  if (!items.length) {
    return <div className="p-4 text-sm text-muted-foreground">Mintaqalar topilmadi</div>;
  }

  return (
    <div className="w-full overflow-x-auto rounded-[2px] border bg-white">
      <table className="w-full text-sm">
        <thead>
          <tr>
            <th className="px-3 py-2 font-medium">Nomi</th>
            <th className="px-3 py-2 font-medium">Vaqt</th>
            <th className="px-3 py-2 font-medium text-right">Amallar</th>
          </tr>
        </thead>
        <tbody>
          {items.map((r) => (
            <tr key={r._id} className="border-t">
              <td className="px-3 py-2 font-medium">{r.name}</td>
              <td className="px-3 py-2 font-mono">{formatGmt(r.gmtOffset)}</td>
              <td className="px-3 py-2">
                <div className="flex items-center justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openModal(MODAL.REGION_EDIT, { region: r })}
                  >
                    <Pencil size={16} />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openModal(MODAL.REGION_DELETE, { region: r })}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RegionsTable;
