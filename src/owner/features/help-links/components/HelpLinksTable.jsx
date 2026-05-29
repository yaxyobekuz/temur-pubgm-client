import { Pencil, Trash2 } from "lucide-react";
import Button from "@/shared/components/ui/button/Button";
import Badge from "@/shared/components/ui/badge/Badge";
import useModal from "@/shared/hooks/useModal";
import { MODAL } from "@/shared/constants/modals";

const HelpLinksTable = ({ items = [], isLoading }) => {
  const { openModal } = useModal();

  if (isLoading) {
    return <div className="p-4 text-sm text-muted-foreground">Yuklanmoqda...</div>;
  }
  if (!items.length) {
    return <div className="p-4 text-sm text-muted-foreground">Havolalar topilmadi</div>;
  }

  return (
    <div className="w-full overflow-x-auto rounded-[2px] border bg-white">
      <table className="w-full text-sm">
        <thead>
          <tr>
            <th className="px-3 py-2 font-medium">Nomi</th>
            <th className="px-3 py-2 font-medium">Havola</th>
            <th className="px-3 py-2 font-medium">Holat</th>
            <th className="px-3 py-2 font-medium text-right">Amallar</th>
          </tr>
        </thead>
        <tbody>
          {items.map((l) => (
            <tr key={l._id} className="border-t">
              <td className="px-3 py-2 font-medium">{l.name}</td>
              <td className="px-3 py-2">
                <a
                  href={l.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-muted-foreground hover:underline break-all"
                >
                  {l.url}
                </a>
              </td>
              <td className="px-3 py-2">
                <Badge variant={l.isActive ? "default" : "secondary"}>
                  {l.isActive ? "Faol" : "Nofaol"}
                </Badge>
              </td>
              <td className="px-3 py-2">
                <div className="flex items-center justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openModal(MODAL.HELP_LINK_EDIT, { link: l })}
                  >
                    <Pencil size={16} />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openModal(MODAL.HELP_LINK_DELETE, { link: l })}
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

export default HelpLinksTable;
