import { createContext, useContext, useState, ReactNode } from "react";

export interface UserData {
  adSoyad: string;
  email: string;
  telefon: string;
  dogumTarihi: string;
  cinsiyet: string;
  uyelikTipi: "bireysel" | "kurumsal";
  adres: string;
  unvan: string;
  vergiDairesi: string;
  vergiNo: string;
  bildirimOnay: boolean;
}

export interface FavoriteItem {
  id: string;
  name: string;
  tarih: string;
  type: "tur" | "otel";
}

export interface ReservationItem {
  id: string;
  name: string;
  tarih: string;
  durum: string;
}

interface AuthContextType {
  user: UserData | null;
  favorites: FavoriteItem[];
  reservations: ReservationItem[];
  isLoginOpen: boolean;
  isRegisterOpen: boolean;
  openLogin: () => void;
  openRegister: () => void;
  closeModals: () => void;
  login: (email: string, _password: string) => boolean;
  register: (data: Partial<UserData> & { email: string; password: string }) => boolean;
  logout: () => void;
  updateUser: (data: Partial<UserData>) => void;
  removeFavorite: (id: string) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const MOCK_USER: UserData = {
  adSoyad: "Yunus Korkmaz",
  email: "yunus@rayzerdigital.com",
  telefon: "05322047277",
  dogumTarihi: "",
  cinsiyet: "Bay",
  uyelikTipi: "bireysel",
  adres: "",
  unvan: "",
  vergiDairesi: "",
  vergiNo: "",
  bildirimOnay: false,
};

const MOCK_RESERVATIONS: ReservationItem[] = [
  { id: "1", name: "Kıbrıs Tur Paketi 7 Gece", tarih: "15.03.2026", durum: "Onaylandı" },
  { id: "2", name: "Merit Royal Hotel", tarih: "20.04.2026", durum: "Beklemede" },
];

const MOCK_FAVORITES: FavoriteItem[] = [
  { id: "t1", name: "Prag & Viyana Turu", tarih: "10.02.2026", type: "tur" },
  { id: "t2", name: "Balkan Turu 8 Gün", tarih: "12.02.2026", type: "tur" },
  { id: "o1", name: "Merit Crystal Cove Hotel", tarih: "11.02.2026", type: "otel" },
  { id: "o2", name: "Elexus Hotel & Resort", tarih: "14.02.2026", type: "otel" },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null);
  const [favorites, setFavorites] = useState<FavoriteItem[]>(MOCK_FAVORITES);
  const [reservations] = useState<ReservationItem[]>(MOCK_RESERVATIONS);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const openLogin = () => { setIsLoginOpen(true); setIsRegisterOpen(false); };
  const openRegister = () => { setIsRegisterOpen(true); setIsLoginOpen(false); };
  const closeModals = () => { setIsLoginOpen(false); setIsRegisterOpen(false); };

  const login = (email: string, _password: string): boolean => {
    if (email) {
      setUser({ ...MOCK_USER, email });
      closeModals();
      return true;
    }
    return false;
  };

  const register = (data: Partial<UserData> & { email: string; password: string }): boolean => {
    if (data.email) {
      setUser({ ...MOCK_USER, ...data });
      closeModals();
      return true;
    }
    return false;
  };

  const logout = () => setUser(null);

  const updateUser = (data: Partial<UserData>) =>
    setUser((prev) => prev ? { ...prev, ...data } : prev);

  const removeFavorite = (id: string) =>
    setFavorites((prev) => prev.filter((f) => f.id !== id));

  return (
    <AuthContext.Provider value={{
      user, favorites, reservations,
      isLoginOpen, isRegisterOpen,
      openLogin, openRegister, closeModals,
      login, register, logout, updateUser, removeFavorite,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
