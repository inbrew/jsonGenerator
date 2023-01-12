import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const readyState = atom({
    key: "isReady",
    default: {
        isReady: false,
    },
    effects_UNSTABLE: [persistAtom],
});