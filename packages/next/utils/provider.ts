import { providers } from "ethers";
import { alchemyId } from "./constants";
import { chain } from 'wagmi';

export const ropstenProvider = new providers.AlchemyProvider(chain.ropsten.id, alchemyId);