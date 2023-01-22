import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";

export const useShopContext = () => useContext(ShopContext)