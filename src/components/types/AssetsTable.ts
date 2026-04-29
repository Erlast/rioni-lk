import { IAssetModel } from "@/api/types";

export default interface IAssetsTabProps {
  currentAsset: Asset;
  items: IAssetModel[] | null;
}

export type Asset = 'action' | 'option' | 'futuries' | 'obligation' | 'currency';
