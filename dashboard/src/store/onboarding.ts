import { ActionType } from '@/interfaces/action';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface EmailInfo {
  subject: string;
  company: string;
  emailFormat: string;
}
interface OnboardingState {
  selectedAction: ActionType | null;
  selectAction: (card: ActionType) => void;
  removeSelectedAction: (card: ActionType) => void;
  emailInfo: EmailInfo | null;
  setEmailInfo: (info: EmailInfo) => void;
}

export const useOnboardingStore = create<OnboardingState>()(
  devtools(
    (set) => ({
      selectedAction: null,
      selectAction: (actionType) =>
        set((state) => ({
          ...state,
          selectedAction: actionType,
        })),
      removeSelectedAction: (cardToRemove) => {
        set((state) => ({
          ...state,
          selectedAction: null,
        }));
      },
      emailInfo: null,
      setEmailInfo: (info: EmailInfo) => set((state) => ({ ...state, emailInfo: info })),
    }),
    {
      name: 'global-store',
    },
  ),
);
