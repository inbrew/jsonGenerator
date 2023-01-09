import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const tabSelectState = atom({
    key: "tabSelect",
    default: {
        tabSelect: "DASHBOARD",
    },
    effects_UNSTABLE: [persistAtom],
});