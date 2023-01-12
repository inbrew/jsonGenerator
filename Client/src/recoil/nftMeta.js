import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const nftMetaState = atom({
    key: "nftMetaData",
    default: {
        name: '',
        description: ''
    },
    effects_UNSTABLE: [persistAtom],
});