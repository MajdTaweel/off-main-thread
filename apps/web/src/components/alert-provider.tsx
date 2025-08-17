import { Terminal, X } from 'lucide-react';
import { createContext, type ReactNode, useContext, useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

type AlertType = 'default' | 'destructive' | 'success' | 'warning';

interface AlertData {
  id: string;
  type: AlertType;
  title?: string;
  message: string;
}

interface AlertContextType {
  showAlert: (type: AlertType, message: string, title?: string) => void;
  clearAlert: (id: string) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export function AlertProvider({ children }: { children: ReactNode }) {
  const [alerts, setAlerts] = useState<AlertData[]>([]);

  const showAlert = (type: AlertType, message: string, title?: string) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newAlert: AlertData = { id, type, title, message };

    setAlerts((prev) => [...prev, newAlert]);

    // Auto-remove after 5 seconds
    setTimeout(() => {
      clearAlert(id);
    }, 5000);
  };

  const clearAlert = (id: string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  };

  return (
    <AlertContext.Provider value={{ showAlert, clearAlert }}>
      {children}

      {/* Alert Container */}
      <div className="fixed top-4 right-4 z-50 w-full max-w-sm space-y-3">
        {alerts.map((alert) => (
          <Alert
            key={alert.id}
            variant={alert.type === 'destructive' ? 'destructive' : 'default'}
          >
            <Terminal />
            {alert.title && <AlertTitle>{alert.title}</AlertTitle>}
            <AlertDescription>{alert.message}</AlertDescription>

            <button
              className="absolute top-2 right-2 ml-2 text-muted-foreground hover:text-foreground"
              onClick={() => clearAlert(alert.id)}
              type="button"
            >
              <X className="h-4 w-4" />
            </button>
          </Alert>
        ))}
      </div>
    </AlertContext.Provider>
  );
}

export function useAlert() {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
}
