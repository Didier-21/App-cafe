import React, { useEffect, useRef, useState } from "react";
import { Bell } from "lucide-react";

export default function NotificationBell({ notifications, onClear }) {
  const [showPanel, setShowPanel] = useState(false);
  const panelRef = useRef(null);

  // Cerrar panel si se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        setShowPanel(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setShowPanel(false);
      }
    };

    if (showPanel) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [showPanel]);

  return (
    <div className="relative">
      <button
        onClick={() => setShowPanel((prev) => !prev)}
        className="relative"
        title="Ver notificaciones"
        aria-label="Ver notificaciones"
      >
        <Bell className="w-6 h-6 text-gray-800" />
        {notifications.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
            {notifications.length}
          </span>
        )}
      </button>

      {showPanel && (
        <div
          ref={panelRef}
          className="absolute right-0 mt-2 w-80 bg-white border rounded shadow-lg z-50 max-h-64 overflow-y-auto"
        >
          <div className="p-3">
            <h4 className="font-bold mb-2">Notificaciones</h4>
            {notifications.length === 0 ? (
              <p className="text-sm text-gray-500">Sin notificaciones</p>
            ) : (
              notifications.map((notif) => (
                <div
                  key={notif.id}
                  className="text-sm text-gray-800 border-b py-2"
                >
                  {notif.mensaje}
                </div>
              ))
            )}
            {notifications.length > 0 && (
              <button
                onClick={onClear}
                className="mt-2 text-sm text-blue-500 hover:underline"
              >
                Limpiar notificaciones
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
